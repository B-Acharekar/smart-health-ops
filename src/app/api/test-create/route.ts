// src/app/api/test-create/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await prisma.user.create({
    data: {
      name: "Dummy User",
      email: "dummy@example.com",
      password: "123456", // Use bcrypt for real apps
      role: "DOCTOR",
    },
  });

  return NextResponse.json(user);
}
