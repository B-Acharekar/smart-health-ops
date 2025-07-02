import { z } from 'zod'

export const appointmentSchema = z.object({
  patientName: z.string(),
  patientEmail: z.string().email(),
  patientPhone: z.string(),
  famName: z.string(),
  famEmail: z.string().email(),
  famPhone: z.string(),
  reason: z.string(),
  doctor: z.string(),
  date: z.string(), // Will be converted to Date in controller
  time: z.string(),
  type: z.enum(["Regular", "Emergency"]).optional(),
})
