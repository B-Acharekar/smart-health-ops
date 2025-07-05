import { NextResponse } from "next/server";
import { loginSchema } from "@/server/validators/login.schema";
import { loginUserService } from "@/server/services/login.service";

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

    return NextResponse.json({
      success: true,
      token: result.token,
      user: result.user,
    });
  } catch (err: any) {
    console.error("[LOGIN_CONTROLLER_ERROR]", err);
    return NextResponse.json(
      { error: err.message || "Internal server error." },
      { status: 500 }
    );
  }
}
