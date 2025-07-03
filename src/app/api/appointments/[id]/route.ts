// src/app/api/appointments/[id]/route.ts
export const dynamic = "force-dynamic";

import { updateAppointment } from "@/server/controllers/appointment.controller";
import { NextRequest } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  return updateAppointment(req, context.params);
}
