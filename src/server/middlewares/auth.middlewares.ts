import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

type AuthenticatedHandler = (req: NextRequest, user: { id: string; role: string }) => Promise<NextResponse>;

export function withAuth(handler: AuthenticatedHandler) {
  return async (req: NextRequest) => {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
      const decoded = verifyToken(token);
      return handler(req, decoded);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }
  };
}
