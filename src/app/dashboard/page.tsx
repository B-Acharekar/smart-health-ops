"use client";

import { useEffect, useState } from "react";
import DashboardPatient from "@/components/dashboard/DashboardPatient";
import DashboardStaff from "@/components/dashboard/DashboardStaff";

export default function DashboardPage() {
  const [role, setRole] = useState<"Patient" | "Doctor" | "Admin" | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const formattedRole = storedRole
      ? storedRole.charAt(0).toUpperCase() + storedRole.slice(1).toLowerCase()
      : null;

    if (
      formattedRole === "Patient" ||
      formattedRole === "Doctor" ||
      formattedRole === "Admin"
    ) {
      setRole(formattedRole);
    }
  }, []);

  if (!role) {
    return <div className="p-4 text-gray-700">Loading dashboard...</div>;
  }

  return (
    <div className="text-gray-800 bg-white min-h-screen">
      {role === "Patient" && <DashboardPatient />}
      {(role === "Doctor" || role === "Admin") && <DashboardStaff />}
    </div>
  );
}
