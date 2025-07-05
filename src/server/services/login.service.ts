import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginInput } from "@/server/validators/login.schema";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function loginUserService({ email, password, role }: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid email or password.");
  }

  if (user.role.toLowerCase() !== role.toLowerCase()) {
    throw new Error("Incorrect role selected.");
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "2h" }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}
