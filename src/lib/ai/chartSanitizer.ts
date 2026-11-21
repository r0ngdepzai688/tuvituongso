/**
 * PII Anonymizer & Token Compactor for Metaphysics LLM Context
 * - Strips all Personally Identifiable Information (fullName, address, provinceName, solarDate, lunarDate, birthTime, coordinates)
 * - Compacts verbose BaZi & ZiWei JSON payloads (removing ages[], empty arrays, duplicate fields) to save ~55-70% tokens
 */

const PII_KEYS = new Set([
  "fullName",
  "giaChu",
  "address",
  "diaChi",
  "provinceName",
  "provinceId",
  "solarDate",
  "lunarDate",
  "chineseDate",
  "birthTime",
  "originalTimeStr",
  "trueSolarTimeStr",
  "adjustedDateStr",
  "trueSolarTime",
  "coordinates",
  "longitude",
  "latitude",
  "lng",
  "lat",
  "email",
  "phone",
]);

function formatStarCompact(s: any): string {
  if (!s) return "";
  const name = s.nameVi || s.name || "";
  const tags: string[] = [];
  if (s.brightnessVi) tags.push(s.brightnessVi);
  if (s.mutagen) tags.push(s.mutagen);
  return tags.length > 0 ? `${name}(${tags.join(",")})` : name;
}

function compactPalace(p: any) {
  if (!p || typeof p !== "object") return null;
  const obj: Record<string, unknown> = {
    cung: p.nameVi || p.name,
    canChi: `${p.heavenlyStemVi || p.heavenlyStem || ""} ${p.earthlyBranchVi || p.earthlyBranch || ""}`.trim(),
  };
  if (p.isBodyPalace) obj.anThan = true;
  if (p.decadal?.range) obj.daiHan = `${p.decadal.range[0]}-${p.decadal.range[1]}`;
  if (p.changsheng12) obj.truongSinh = p.changsheng12;

  const majors = Array.isArray(p.majorStars) ? p.majorStars.map(formatStarCompact).filter(Boolean) : [];
  if (majors.length) obj.chinhTinh = majors;

  const minors = Array.isArray(p.minorStars) ? p.minorStars.map(formatStarCompact).filter(Boolean) : [];
  if (minors.length) obj.phuTinh = minors;

  return obj;
}

function compactBaZi(d: any, currentYear: number) {
  const pillars = d.pillars
    ? {
        nam: `${d.pillars.year?.ganVi} ${d.pillars.year?.zhiVi} (${d.pillars.year?.shiShenGan}, ${d.pillars.year?.naYin})`,
        thang: `${d.pillars.month?.ganVi} ${d.pillars.month?.zhiVi} (${d.pillars.month?.shiShenGan}, ${d.pillars.month?.naYin})`,
        ngay: `${d.pillars.day?.ganVi} ${d.pillars.day?.zhiVi} (Nhật Chủ, ${d.pillars.day?.naYin})`,
        gio: `${d.pillars.hour?.ganVi} ${d.pillars.hour?.zhiVi} (${d.pillars.hour?.shiShenGan}, ${d.pillars.hour?.naYin})`,
      }
    : undefined;

  // Keep only current + next 2 DaYun decades to minimize token bloat
  let daYunCompact: any[] | undefined;
  if (Array.isArray(d.daYunList) && d.daYunList.length > 0) {
    const activeIdx = d.daYunList.findIndex(
      (dy: any) => currentYear >= dy.startYear && currentYear <= dy.endYear
    );
    const startSlice = activeIdx >= 0 ? activeIdx : 0;
    daYunCompact = d.daYunList.slice(startSlice, startSlice + 3).map((dy: any) => ({
      tuoi: `${dy.startAge}-${dy.endAge}`,
      nam: `${dy.startYear}-${dy.endYear}`,
      canChi: dy.ganZhiVi,
      nguHanh: `${dy.ganWuXing}/${dy.zhiWuXing}`,
    }));
  }

  const out: Record<string, unknown> = {
    gioiTinh: d.gender,
    namXemHan: currentYear,
    nhatChu: d.dayMaster
      ? `${d.dayMaster.ganVi} ${d.dayMaster.element} (${d.dayMaster.polarity})`
      : undefined,
    vuongSuy: d.strengthStatus,
    diemVuongSuy: d.strengthScore,
    loaiCachCuc: d.patternType,
    chiTietDiem: d.scoreBreakdown,
    cachCuc: d.patternName || d.enrichment?.geJu?.name,
    dungThan: d.favorableElement,
    hyThan: d.supportingElement,
    kyThan: d.unfavorableElement,
    tuTru: pillars,
  };

  if (d.elementsPercentage) out.tyLeNguHanh = d.elementsPercentage;
  if (daYunCompact) out.daiVanHienTaiVaKeTiep = daYunCompact;

  if (d.enrichment) {
    const enrich: Record<string, unknown> = {};
    if (d.enrichment.tiaoHou) {
      enrich.dieuHau = `${d.enrichment.tiaoHou.season} — Ưu tiên: ${d.enrichment.tiaoHou.recommendedStems?.join(", ")}`;
    }
    if (d.enrichment.ganRelations?.length) enrich.canHopXung = d.enrichment.ganRelations;
    if (d.enrichment.zhiRelations?.length) enrich.chiHopXung = d.enrichment.zhiRelations;
    if (d.enrichment.shenSha?.length) {
      enrich.thanSat = d.enrichment.shenSha.map((s: any) => `${s.name} (${s.pillars?.join(", ")})`);
    }
    if (Object.keys(enrich).length) out.boTroChuyenSau = enrich;
  }

  return out;
}

function stripPiiRecursive(val: unknown): unknown {
  if (Array.isArray(val)) {
    return val.map(stripPiiRecursive);
  }
  if (val && typeof val === "object") {
    const cleaned: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
      if (PII_KEYS.has(k)) continue;
      if (v === undefined || v === null || v === "") continue;
      if (Array.isArray(v) && v.length === 0) continue;
      cleaned[k] = stripPiiRecursive(v);
    }
    return cleaned;
  }
  return val;
}

export function sanitizeAndCompactChartData(rawChartData: unknown): Record<string, unknown> {
  if (!rawChartData || typeof rawChartData !== "object") {
    return {};
  }

  const d = rawChartData as Record<string, any>;
  const currentYear = new Date().getFullYear();

  // Case 1: Dual Verification mode (Song Kiếm Hợp Bích)
  if (d.bazi && d.ziweiSummary) {
    const out: Record<string, unknown> = {
      cheDo: "Song Kiếm Hợp Bích (Đối chiếu Bát Tự × Tử Vi)",
      namXemHan: currentYear,
      batTu: compactBaZi(d.bazi, currentYear),
      tuVi: {
        cuc: d.ziweiSummary.fiveElementsClass,
        menhChu: d.ziweiSummary.soul,
        thanChu: d.ziweiSummary.body,
        cungMenh: d.ziweiSummary.soulPalace ? compactPalace(d.ziweiSummary.soulPalace) : undefined,
      },
    };
    if (Array.isArray(d.kline) && d.kline.length) {
      out.kLineTomTat = d.kline.map((c: any) => `${c.ageRange} ${c.ganZhiVi}: ${c.close}đ (${c.phaseLabel})`);
    }
    return out;
  }

  // Case 2: ZiWei Astrolabe (12 Palaces)
  if (Array.isArray(d.palaces) && d.fiveElementsClass) {
    return {
      gioiTinh: d.gender,
      amDuong: d.yinYang,
      namXemHan: currentYear,
      cuc: d.fiveElementsClass,
      menhChu: d.soul,
      thanChu: d.body,
      gioSinh: d.timeBranchVi,
      muoiHaiCung: d.palaces.map(compactPalace).filter(Boolean),
    };
  }

  // Case 3: BaZi Chart
  if (d.pillars && d.dayMaster) {
    return compactBaZi(d, currentYear);
  }

  // Case 4: QiMen / General fallback — recursively strip PII and empty arrays
  return stripPiiRecursive(d) as Record<string, unknown>;
}
