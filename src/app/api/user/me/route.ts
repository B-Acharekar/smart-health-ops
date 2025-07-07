import { withAuth } from "@/server/middlewares/auth.middlewares";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = withAuth(async (req, user) => {
  try {
    const foundUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!foundUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(foundUser);
  } catch (err) {
    console.error("[ME ERROR]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
});
