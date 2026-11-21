import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { computeBaZi } from "@/lib/bat-tu/baziService";
import { calculateVietnamTrueSolarTime } from "@/lib/astronomy/vietnamTrueSolarTime";

const BaZiRequestSchema = z
  .object({
    year: z.coerce.number().int().min(1900).max(2100),
    month: z.coerce.number().int().min(1).max(12),
    day: z.coerce.number().int().min(1).max(31),
    hour: z.coerce.number().int().min(0).max(23).default(12),
    minute: z.coerce.number().int().min(0).max(59).default(0),
    gender: z.enum(["male", "female"]).default("male"),
    sect: z.union([z.literal(1), z.literal(2)]).default(2),
    provinceId: z.string().max(64).optional(),
    useTrueSolarTime: z.boolean().default(false),
  })
  .refine(
    (d) => {
      const check = new Date(d.year, d.month - 1, d.day);
      return (
        check.getFullYear() === d.year &&
        check.getMonth() === d.month - 1 &&
        check.getDate() === d.day
      );
    },
    { message: "Ngày dương lịch không tồn tại trên lịch thực tế (ví dụ: 30/02)." }
  );

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();
    const parsed = BaZiRequestSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Dữ liệu đầu vào Bát Tự không hợp lệ.",
          details: parsed.error.issues.map((i) => i.message),
        },
        { status: 400 }
      );
    }

    const { year, month, day, hour, minute, gender, sect, provinceId, useTrueSolarTime } = parsed.data;

    let calcYear = year;
    let calcMonth = month;
    let calcDay = day;
    let calcHour = hour;
    let calcMinute = minute;
    let trueSolarTime = null;

    if (useTrueSolarTime && provinceId) {
      const dateStr = `${calcYear}-${String(calcMonth).padStart(2, "0")}-${String(calcDay).padStart(2, "0")}`;
      trueSolarTime = calculateVietnamTrueSolarTime(dateStr, calcHour, minute, provinceId);
      const [ay, am, ad] = trueSolarTime.adjustedDateStr.split("-").map(Number);
      calcYear = ay;
      calcMonth = am;
      calcDay = ad;
      calcHour = trueSolarTime.adjustedHour;
      calcMinute = trueSolarTime.adjustedMinute;
    }

    const result = computeBaZi(calcYear, calcMonth, calcDay, calcHour, gender, sect, calcMinute);
    return NextResponse.json({
      ...result,
      sect,
      trueSolarTime,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Lỗi tính toán Bát Tự" }, { status: 500 });
  }
}
