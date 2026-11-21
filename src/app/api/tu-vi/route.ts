import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { computeTuViAstrolabe } from "@/lib/tu-vi/tuviService";
import { calculateVietnamTrueSolarTime } from "@/lib/astronomy/vietnamTrueSolarTime";
import { checkSolarTermBoundary } from "@/lib/astronomy/solarTermGuard";

const TuViRequestSchema = z
  .object({
    solarDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Ngày sinh dương lịch phải đúng định dạng YYYY-MM-DD."),
    timeIndex: z.coerce.number().int().min(0).max(23).default(0),
    hour: z.coerce.number().int().min(0).max(23).optional(),
    minute: z.coerce.number().int().min(0).max(59).default(0),
    gender: z.enum(["male", "female"]).default("male"),
    fixLeap: z.boolean().default(true),
    provinceId: z.string().max(64).optional(),
    useTrueSolarTime: z.boolean().default(false),
  })
  .refine(
    (d) => {
      const [y, m, day] = d.solarDate.split("-").map(Number);
      if (y < 1900 || y > 2100) return false;
      const check = new Date(y, m - 1, day);
      return check.getFullYear() === y && check.getMonth() === m - 1 && check.getDate() === day;
    },
    { message: "Ngày dương lịch không tồn tại hoặc ngoài khoảng hỗ trợ (1900–2100)." }
  );

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();
    const parsed = TuViRequestSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Dữ liệu đầu vào Tử Vi không hợp lệ.",
          details: parsed.error.issues.map((i) => i.message),
        },
        { status: 400 }
      );
    }

    const { solarDate, timeIndex, hour, minute, gender, fixLeap, provinceId, useTrueSolarTime } =
      parsed.data;

    let finalDate = solarDate;
    let finalTimeIndex = timeIndex;
    let trueSolarTime = null;

    if (useTrueSolarTime && provinceId && typeof hour === "number") {
      trueSolarTime = calculateVietnamTrueSolarTime(solarDate, hour, minute, provinceId);
      finalDate = trueSolarTime.adjustedDateStr;
      finalTimeIndex = trueSolarTime.adjustedTimeIndex;
    }

    const [y, m, d] = finalDate.split("-").map(Number);
    const checkHour =
      trueSolarTime?.adjustedHour ??
      hour ??
      (finalTimeIndex === 12 ? 23 : finalTimeIndex === 0 ? 0 : finalTimeIndex * 2);
    const checkMin = trueSolarTime?.adjustedMinute ?? minute;
    const boundaryWarning = checkSolarTermBoundary(y, m, d, checkHour, checkMin);

    const result = computeTuViAstrolabe(finalDate, finalTimeIndex, gender, fixLeap);
    return NextResponse.json({
      ...result,
      trueSolarTime,
      boundaryWarning,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Lỗi tính toán lá số Tử Vi" }, { status: 500 });
  }
}
