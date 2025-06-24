'use client';

import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar/sidebar";

type Appointment = {
  id: number;
  date: string;
  time: string;
  completed: boolean;
  patientName: string;
  type: "Regular" | "Emergency";
  notes?: string;
};

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Mock fetching appointments
  useEffect(() => {
    setAppointments([
      {
        id: 1,
        date: "2025-07-24",
        time: "10:00 AM",
        completed: false,
        patientName: "Bhushan Acharekar",
        type: "Regular",
      },
      {
        id: 2,
        date: "2025-07-25",
        time: "ASAP",
        completed: false,
        patientName: "Emergency Case",
        type: "Emergency",
        notes: "Severe chest pain reported",
      },
    ]);
  }, []);

  const markCompleted = (id: number) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, completed: true } : appt
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-10 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">👨‍⚕️ Doctor Dashboard - Appointments</h1>

        <div className="space-y-4">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className={`p-5 rounded-lg shadow-md ${
                appt.type === "Emergency" ? "bg-red-50 border border-red-400" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-lg text-blue-900">{appt.patientName}</p>
                  <p className="text-sm text-gray-600">
                    {appt.date} at {appt.time} — {appt.type}
                  </p>
                  {appt.notes && <p className="text-sm text-red-600 mt-1">📝 {appt.notes}</p>}
                </div>
                {!appt.completed ? (
                  <button
                    onClick={() => markCompleted(appt.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    Mark Completed
                  </button>
                ) : (
                  <span className="text-green-700 font-medium">✅ Completed</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
