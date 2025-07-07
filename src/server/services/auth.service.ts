import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginInput } from "@/server/validators/login.schema";

const JWT_SECRET = process.env.JWT_SECRET!;
const VALID_ROLES = ["PATIENT", "DOCTOR", "ADMIN"] as const;
type Role = typeof VALID_ROLES[number];

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: string;
}

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

export async function registerUserService({ name, email, password, role }: RegisterInput) {
  const normalizedRole = role.toUpperCase();
  if (!VALID_ROLES.includes(normalizedRole as Role)) {
    throw new Error("Invalid role.");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    throw new Error("Email already in use.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: normalizedRole as Role,
    },
  });

  return {
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
}
