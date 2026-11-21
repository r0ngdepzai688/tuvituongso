import { NextRequest, NextResponse } from "next/server";
import { computeQiMenChart } from "@/lib/qimen/qimenService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const now = new Date();
    const year = body.year ? Number(body.year) : now.getFullYear();
    const month = body.month ? Number(body.month) : now.getMonth() + 1;
    const day = body.day ? Number(body.day) : now.getDate();
    const hour = body.hour ? Number(body.hour) : now.getHours();
    const minute = body.minute ? Number(body.minute) : now.getMinutes();

    const result = computeQiMenChart(year, month, day, hour, minute);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Lỗi bấm bàn Kỳ Môn" }, { status: 500 });
  }
}
