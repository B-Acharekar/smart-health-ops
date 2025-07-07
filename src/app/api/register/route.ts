import { registerController } from "@/server/controllers/auth.controller";

export async function POST(req: Request) {
  return registerController(req);
}
