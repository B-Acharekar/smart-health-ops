import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      patientName,
      patientEmail,
      patientPhone,
      famName,
      famEmail,
      famPhone,
      reason,
      doctor,
      date,
      time,
      type
    } = body;

    const appointment = await prisma.appointment.create({
      data: {
        patientName,
        patientEmail,
        patientPhone,
        famName,
        famEmail,
        famPhone,
        reason,
        doctor,
        date: new Date(date),
        time,
        type: type || "Regular",
      },
    });

    return NextResponse.json({ success: true, appointment });
  } catch (error) {
    console.error("[APPOINTMENT_CREATE_ERROR]", error);
    return NextResponse.json({ error: "Failed to create appointment." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { date: "asc" },
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("[APPOINTMENT_FETCH_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch appointments." }, { status: 500 });
  }
}
