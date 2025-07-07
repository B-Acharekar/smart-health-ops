import { NextResponse } from "next/server";
import { loginSchema } from "@/server/validators/login.schema";
import { loginUserService } from "@/server/services/auth.service";

export async function loginController(req: Request) {
  try {
    const body = await req.json();
    body.role = body.role?.toLowerCase(); // ✅ normalize role input


    const parsed = loginSchema.safeParse(body);
    console.log("Parsed result:", parsed);
    if (!parsed.success) {
      console.log("Validation error:", parsed.error.format());
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const result = await loginUserService(parsed.data);

    const response = NextResponse.json({
      success: true,
      user: result.user,
    });

    response.cookies.set("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 2, // 2 hours
    });

    return response;
  } catch (err: any) {
    console.error("[LOGIN_CONTROLLER_ERROR]", err);
    return NextResponse.json(
      { error: err.message || "Internal server error." },
      { status: 500 }
    );
  }
}

export async function logoutController() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0), // Expire immediately
  });

  return response;
}
