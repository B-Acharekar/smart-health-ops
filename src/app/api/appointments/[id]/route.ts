import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { completed } = await req.json();

    const updated = await prisma.appointment.update({
      where: { id: params.id },
      data: { completed },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[PATCH_APPOINTMENT]", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
