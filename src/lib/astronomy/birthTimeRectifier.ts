/**
 * Birth-Time Rectification Engine (Định Giờ Sinh Học Thuật)
 * Disambiguates candidate birth hours (Canh giờ) using deterministic ZiWei & BaZi traits.
 * Generates 4 targeted verification questions and scores user responses with weighted confidence.
 */

import { computeTuViAstrolabe, AstrolabeResult } from "../tu-vi/tuviService";
import { computeBaZi, BaZiResult } from "../bat-tu/baziService";

export interface CandidateHourProfile {
  timeIndex: number;
  hourLabel: string;
  hourRange: string;
  branchName: string;
  menhPalaceBranch: string;
  menhStars: string[];
  menhStarsDisplay: string;
  hourPillarVi: string;
  temperament: string;
  physique: string;
  careerStyle: string;
  familyDynamic: string;
  earlyMilestone: string;
  baziStrength: string;
  favorableElement: string;
}

export interface RectificationQuestionOption {
  optionId: string;
  label: string;
  description: string;
  matchedTimeIndex: number;
}

export interface RectificationQuestion {
  id: string;
  title: string;
  description: string;
  options: RectificationQuestionOption[];
}

export interface CandidateScoreResult {
  candidate: CandidateHourProfile;
  score: number;
  percentage: number;
  isRecommended: boolean;
  matchReasons: string[];
}

export interface RectificationReport {
  candidates: CandidateScoreResult[];
  recommended: CandidateScoreResult;
  academicRationale: string;
}

const TIME_INDEX_LABELS: Record<number, { name: string; range: string }> = {
  0: { name: "Tảo Tý", range: "00h00 - 00h59" },
  1: { name: "Sửu", range: "01h00 - 02h59" },
  2: { name: "Dần", range: "03h00 - 04h59" },
  3: { name: "Mão", range: "05h00 - 06h59" },
  4: { name: "Thìn", range: "07h00 - 08h59" },
  5: { name: "Tỵ", range: "09h00 - 10h59" },
  6: { name: "Ngọ", range: "11h00 - 12h59" },
  7: { name: "Mùi", range: "13h00 - 14h59" },
  8: { name: "Thân", range: "15h00 - 16h59" },
  9: { name: "Dậu", range: "17h00 - 18h59" },
  10: { name: "Tuất", range: "19h00 - 20h59" },
  11: { name: "Hợi", range: "21h00 - 22h59" },
  12: { name: "Vãn Tý", range: "23h00 - 23h59" },
};

function describeStarGroup(stars: string[]): {
  temperament: string;
  physique: string;
  careerStyle: string;
  familyDynamic: string;
  earlyMilestone: string;
} {
  const sStr = stars.join(" ");

  if (sStr.includes("Tử Vi") || sStr.includes("Thiên Phủ")) {
    return {
      temperament: "Phong thái đĩnh đạc, trọng thể diện, có khí chất quản lý, thận trọng và thích tích lũy bền vững.",
      physique: "Khuôn mặt đầy đặn hoặc thanh tú, phong thái chững chạc hơn tuổi, ánh mắt điềm tĩnh uy nghiêm.",
      careerStyle: "Thiên hướng tổ chức, điều hành, quản trị tài chính, doanh nghiệp lớn hoặc công quyền uy tín.",
      familyDynamic: "Thường có trách nhiệm nâng đỡ người trong nhà, được phụ mẫu đặt nhiều kỳ vọng lớn lao.",
      earlyMilestone: "Tuổi trẻ định hình phong cách sớm, thích môi trường quy củ, ít chịu cảnh bấp bênh rày đây mai đó.",
    };
  }

  if (sStr.includes("Thất Sát") || sStr.includes("Phá Quân") || sStr.includes("Tham Lang")) {
    return {
      temperament: "Tính cách quyết liệt, thích xông pha khai phá, không ngại va chạm, ghét sự gò bó đơn điệu.",
      physique: "Ánh mắt linh hoạt hoặc sắc bén, tác phong nhanh nhẹn, năng động, dáng người săn chắc hoặc có nét phong trần.",
      careerStyle: "Thích hợp kinh doanh tự chủ, khởi nghiệp, kỹ nghệ thực chiến, bán hàng lớn hoặc các ngành nghề biến động mạnh.",
      familyDynamic: "Tính độc lập cao, sớm tách khỏi gia đình tự bươn chải, mối quan hệ với cha mẹ độc lập và ít phụ thuộc.",
      earlyMilestone: "Trước tuổi 25-28 thường trải qua ít nhất 1-2 lần thay đổi lớn về định hướng học tập, công việc hoặc nơi ở.",
    };
  }

  if (sStr.includes("Thiên Cơ") || sStr.includes("Thái Âm") || sStr.includes("Thiên Đồng") || sStr.includes("Thiên Lương")) {
    return {
      temperament: "Tâm tính thiện lương, nho nhã, trọng tình cảm, giỏi mưu lược phân tích, thích sự hòa nhã và an ổn.",
      physique: "Khuôn mặt thư sinh hoặc phúc hậu, ánh mắt hiền hòa, nụ cười thân thiện, phong thái mềm mại.",
      careerStyle: "Thích hợp chuyên môn sâu, công chức, giáo dục, tài chính cố vấn, công nghệ thông tin hoặc nghiên cứu hoạch định.",
      familyDynamic: "Rất gắn kết với cha mẹ hoặc người thân, dễ bị ảnh hưởng bởi tâm trạng gia đình, hiếu thuận chu đáo.",
      earlyMilestone: "Quá trình học tập và lập nghiệp tiến triển tuần tự, ít đột biến gãy đổ nhưng dễ trăn trở nội tâm khi ra quyết định.",
    };
  }

  if (sStr.includes("Thái Dương") || sStr.includes("Cự Môn")) {
    return {
      temperament: "Khẳng khái, thích tranh luận bảo vệ chính kiến, hướng ngoại, giỏi ăn nói hoặc có tính cách bộc trực.",
      physique: "Giọng nói vang rõ, ánh mắt sáng có thần, diện mạo sáng sủa, tạo ấn tượng rõ rệt ngay từ lần đầu tiếp xúc.",
      careerStyle: "Hợp ngoại giao, giảng dạy, luật pháp, marketing truyền thông, quảng bá thị trường hoặc tư vấn chiến lược.",
      familyDynamic: "Quan hệ gia đình thẳng thắn, đôi khi khắc khẩu do bất đồng quan điểm nhưng tâm tính không để bụng.",
      earlyMilestone: "Thời trẻ hay gặp thị phi khẩu thiệt hoặc phải trải qua giai đoạn tranh đấu chứng minh năng lực trước tập thể.",
    };
  }

  if (sStr.includes("Vũ Khúc") || sStr.includes("Liêm Trinh")) {
    return {
      temperament: "Cương trực, nguyên tắc cao, nhạy cảm với con số và kỷ luật, lòng tự trọng rất lớn, làm việc dứt khoát.",
      physique: "Đường nét gương mặt góc cạnh rõ ràng, ánh nhìn thẳng thắn nghiêm túc, tạo cảm giác đáng tin cậy.",
      careerStyle: "Hợp tài chính ngân hàng, kiểm toán, kỹ thuật chính xác, pháp chế hoặc quân sự an ninh.",
      familyDynamic: "Ít bộc lộ cảm xúc bằng lời nói, thể hiện tình cảm qua hành động thực tế, tính tình độc lập cứng cỏi.",
      earlyMilestone: "Tuổi trẻ sớm coi trọng độc lập kinh tế, thích tự kiếm tiền sớm và không thích nương tựa vào người khác.",
    };
  }

  // Vô Chính Diệu
  return {
    temperament: "Tính cách đa diện, thích ứng hoàn cảnh cực nhanh, khéo léo hòa đồng nhưng sâu thẳm hay trăn trở tự vấn.",
    physique: "Ngoại hình dễ biến hóa theo hoàn cảnh, phong thái nhẹ nhàng, dễ mến và tạo cảm giác gần gũi.",
    careerStyle: "Hợp làm phó tướng, chuyên gia tư vấn trung gian, dịch vụ đa ngành hoặc môi trường đòi hỏi xoay xở linh hoạt.",
    familyDynamic: "Tuổi nhỏ thường nương tựa hoặc ở xa phụ mẫu, duyên phụ mẫu biến động hoặc tự lập sớm.",
    earlyMilestone: "Thời thiếu niên thường trải qua nhiều ngã rẽ thử nghiệm trước khi tìm được bến đỗ chuyên môn thực sự.",
  };
}

export function buildCandidateHourProfiles(
  solarDateStr: string,
  gender: "male" | "female",
  candidateIndexes: number[]
): CandidateHourProfile[] {
  const [y, m, d] = solarDateStr.split("-").map(Number);

  return candidateIndexes.map((timeIdx) => {
    const lbl = TIME_INDEX_LABELS[timeIdx] || { name: `Giờ ${timeIdx}`, range: "" };

    // Compute ZiWei
    const ziwei: AstrolabeResult = computeTuViAstrolabe(solarDateStr, timeIdx, gender);
    const menhPalace =
      ziwei.palaces.find((p) => p.name === "命宫" || p.nameVi.includes("Mệnh")) ||
      ziwei.palaces[0];
    const menhStars = menhPalace.majorStars.map((s) => s.nameVi);
    const menhStarsDisplay = menhStars.length > 0 ? menhStars.join(", ") : "Vô Chính Diệu";

    // Compute BaZi
    const hourVal = timeIdx === 12 ? 23 : timeIdx === 0 ? 0 : timeIdx * 2;
    const bazi: BaZiResult = computeBaZi(y, m, d, hourVal, gender, 2, 0);

    const desc = describeStarGroup(menhStars);

    return {
      timeIndex: timeIdx,
      hourLabel: `${lbl.name} (${lbl.range})`,
      hourRange: lbl.range,
      branchName: lbl.name,
      menhPalaceBranch: menhPalace.earthlyBranchVi,
      menhStars,
      menhStarsDisplay,
      hourPillarVi: `${bazi.pillars.hour.ganVi} ${bazi.pillars.hour.zhiVi}`,
      temperament: desc.temperament,
      physique: desc.physique,
      careerStyle: desc.careerStyle,
      familyDynamic: desc.familyDynamic,
      earlyMilestone: desc.earlyMilestone,
      baziStrength: bazi.strengthStatus,
      favorableElement: bazi.favorableElement,
    };
  });
}

export function generateRectificationQuestions(
  candidates: CandidateHourProfile[]
): RectificationQuestion[] {
  if (candidates.length === 0) return [];

  // Question 1: Thần thái & Tính cách cốt lõi
  const q1: RectificationQuestion = {
    id: "temperament",
    title: "Câu 1: Thần thái, tính cách & Tác phong hành xử",
    description: "Khi người khác tiếp xúc hoặc nhận xét khách quan về bạn, đặc điểm nào dưới đây miêu tả CHÍNH XÁC NHẤT phong thái tự nhiên của bạn?",
    options: candidates.map((c) => ({
      optionId: `q1_${c.timeIndex}`,
      label: `Phong thái: ${c.branchName}`,
      description: `${c.temperament} (${c.physique})`,
      matchedTimeIndex: c.timeIndex,
    })),
  };

  // Question 2: Phong cách làm việc & Phương thức giải quyết vấn đề
  const q2: RectificationQuestion = {
    id: "career",
    title: "Câu 2: Phong cách làm việc & Định hướng phát triển",
    description: "Trong công việc, học tập hoặc khi đối diện thử thách lớn, cách tiếp cận nào phản ánh rõ nhất tư duy của bạn?",
    options: candidates.map((c) => ({
      optionId: `q2_${c.timeIndex}`,
      label: `Xu hướng: ${c.branchName}`,
      description: `${c.careerStyle}`,
      matchedTimeIndex: c.timeIndex,
    })),
  };

  // Question 3: Mối quan hệ gia đạo & Sự tự lập
  const q3: RectificationQuestion = {
    id: "family",
    title: "Câu 3: Mối quan hệ gia đình & Hoàn cảnh tự lập",
    description: "Nhìn lại mối quan hệ giữa bạn với phụ mẫu và bối cảnh trưởng thành thuở nhỏ:",
    options: candidates.map((c) => ({
      optionId: `q3_${c.timeIndex}`,
      label: `Gia đạo: ${c.branchName}`,
      description: `${c.familyDynamic}`,
      matchedTimeIndex: c.timeIndex,
    })),
  };

  // Question 4: Cột mốc biến động tuổi trẻ
  const q4: RectificationQuestion = {
    id: "milestone",
    title: "Câu 4: Cột mốc biến động & Xu hướng vận trình ban đầu",
    description: "Giai đoạn học tập, bước vào đời (18–28 tuổi) của bạn có đặc thù nào nổi bật nhất?",
    options: candidates.map((c) => ({
      optionId: `q4_${c.timeIndex}`,
      label: `Vận hạn: ${c.branchName}`,
      description: `${c.earlyMilestone}`,
      matchedTimeIndex: c.timeIndex,
    })),
  };

  return [q1, q2, q3, q4];
}

export function scoreCandidateHours(
  candidates: CandidateHourProfile[],
  userAnswers: Record<string, number> // questionId -> chosen timeIndex
): RectificationReport {
  const scores: Record<number, number> = {};
  const reasonsMap: Record<number, string[]> = {};

  for (const c of candidates) {
    scores[c.timeIndex] = 0;
    reasonsMap[c.timeIndex] = [];
  }

  const weights: Record<string, { weight: number; label: string }> = {
    temperament: { weight: 35, label: "Khớp Thần Thái & Cốt Cách Cung Mệnh" },
    career: { weight: 25, label: "Khớp Phong Cách Hành Động & Công Danh" },
    family: { weight: 20, label: "Khớp Duyên Phụ Mẫu & Cung Huynh Đệ" },
    milestone: { weight: 20, label: "Khớp Cột Mốc Biến Động & Vận Hạn Đầu Đời" },
  };

  let maxPossibleScore = 0;

  for (const [qId, chosenTimeIndex] of Object.entries(userAnswers)) {
    const meta = weights[qId] || { weight: 25, label: "Khớp khảo sát thực chứng" };
    maxPossibleScore += meta.weight;

    if (chosenTimeIndex !== undefined && scores[chosenTimeIndex] !== undefined) {
      scores[chosenTimeIndex] += meta.weight;
      reasonsMap[chosenTimeIndex].push(meta.label);
    }
  }

  const denominator = maxPossibleScore > 0 ? maxPossibleScore : 100;

  const candidateScores: CandidateScoreResult[] = candidates.map((c) => {
    const raw = scores[c.timeIndex] || 0;
    const percentage = Math.round((raw / denominator) * 100);
    return {
      candidate: c,
      score: raw,
      percentage,
      isRecommended: false,
      matchReasons: reasonsMap[c.timeIndex] || [],
    };
  });

  candidateScores.sort((a, b) => b.percentage - a.percentage);

  if (candidateScores.length > 0) {
    candidateScores[0].isRecommended = true;
  }

  const top = candidateScores[0] || {
    candidate: candidates[0],
    score: 0,
    percentage: 0,
    isRecommended: true,
    matchReasons: [],
  };

  const rationale = `Dựa trên kết quả đối chiếu 4 trục kiểm chứng thực chứng (Thần thái Mệnh Thân, Phong cách công danh, Mối liên hệ gia đạo và Cột mốc vận trình), canh giờ **${top.candidate.hourLabel}** đạt độ tương thích cao nhất (**${top.percentage}%**). Cung Mệnh an tại **${top.candidate.menhPalaceBranch}** có sao **${top.candidate.menhStarsDisplay}** thủ chiếu, phối hợp cùng Trụ Giờ Bát Tự **${top.candidate.hourPillarVi}** phản ánh chính xác nhất tính cách và hành trình đời thực của quý bạn.`;

  return {
    candidates: candidateScores,
    recommended: top,
    academicRationale: rationale,
  };
}
