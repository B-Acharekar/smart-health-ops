import { NextRequest, NextResponse } from 'next/server'
import { createAppointment, getAllAppointments } from '@/server/services/appointment.service'
import { appointmentSchema } from '@/server/validators/appointment.schema'
import * as appointmentService from "@/server/services/appointment.service";

export async function handlePOST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = appointmentSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    const appointment = await createAppointment({
      ...parsed.data,
      date: new Date(parsed.data.date),
      type: parsed.data.type || "Regular",
    })

    return NextResponse.json({ success: true, appointment })
  } catch (error) {
    console.error("[APPOINTMENT_CREATE_ERROR]", error)
    return NextResponse.json({ error: "Failed to create appointment." }, { status: 500 })
  }
}

export async function handleGET() {
  try {
    const appointments = await getAllAppointments()
    return NextResponse.json(appointments)
  } catch (error) {
    console.error("[APPOINTMENT_FETCH_ERROR]", error)
    return NextResponse.json({ error: "Failed to fetch appointments." }, { status: 500 })
  }
}

export async function updateAppointment(
  req: NextRequest,
  params: { id: string }
) {
  try {
    const {completed} = await req.json();
    
    const updated = await appointmentService.updateAppointment(params.id,completed)
    return NextResponse.json(updated);
  } catch(error){
    console.error("[CONTROLLER] updateAppointment error",error);
    return NextResponse.json({error: "Failed to update"},{status: 500})
  }
}