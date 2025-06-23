'use client';

import { useState } from "react";
import AppointmentForm from "@/components/appointments/AppointmentForm";
import ConfirmationMessage from "@/components/appointments/ConfrimationMessage";
import Sidebar from "@/components/sidebar/sidebar";
import { FiX, FiUser } from "react-icons/fi";

type AvailableSlot = {
  date: string;
  slots: string[];
};

type Appointment = {
  date: Date;
  time: string;
  completed: boolean;
  id: number;
  type?: string;
  doctor?: string;
};

const availableDatesSlots: AvailableSlot[] = [
  { date: "2025-07-24", slots: ["10:00 AM", "11:30 AM", "02:00 PM"] },
  { date: "2025-07-25", slots: ["09:00 AM", "01:00 PM", "03:30 PM"] },
  { date: "2025-07-26", slots: ["10:30 AM", "12:00 PM"] },
];

export default function AppointmentPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentData, setAppointmentData] = useState<{ date: string; time: string } | null>(null);

  const [showEmergencyForm, setShowEmergencyForm] = useState(false);
  const [loadingEmergency, setLoadingEmergency] = useState(false);

  const openAppointmentForm = (date: string, time: string) => {
    setAppointmentData({ date, time });
  };

  const closeForm = () => {
    setAppointmentData(null);
  };

  const handleConfirm = (data: any) => {
    const newAppointment: Appointment = {
      id: Date.now(),
      date: data.date,
      time: data.time,
      completed: false,
      type: data.type || "Regular",
      doctor: data.doctor || "Assigned Doctor",
    };
    setAppointments((prev) => [...prev, newAppointment]);
    closeForm();
  };

  const markCompleted = (id: number) => {
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === id ? { ...appt, completed: true } : appt))
    );
  };

  const upcomingAppointment = appointments
    .filter((a) => !a.completed && a.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())[0] || null;

  const recentAppointment = appointments
    .filter((a) => a.completed)
    .sort((a, b) => b.date.getTime() - a.date.getTime())[0] || null;

  // Emergency form internal component
  function EmergencyForm({
    onConfirm,
    onCancel,
  }: {
    onConfirm: (details: { name: string; phone: string; reason: string }) => void;
    onCancel: () => void;
  }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [reason, setReason] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!name || !phone || !reason) {
        alert("Please fill all fields.");
        return;
      }
      onConfirm({ name, phone, reason });
    };

    return (
      <>
        <div className="fixed inset-0 backdrop-blur-sm bg-[rgba(255,255,255,0.15)] z-50"></div>

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-white rounded-xl shadow-xl p-6 text-gray-900">
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition"
              aria-label="Close emergency form"
            >
              <FiX size={24} />
            </button>

            <h2 className="text-2xl font-semibold text-center mb-6 text-blue-800 font-serif">
              Emergency Appointment
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Full Name</label>
                <div className="flex items-center border rounded px-3 py-2">
                  <FiUser className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Your full name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full outline-none text-gray-900"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Your phone number"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border rounded px-3 py-2 text-gray-900 outline-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium">Reason / Symptoms</label>
                <textarea
                  placeholder="Reason / Symptoms"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border rounded px-3 py-2 h-24 resize-none text-gray-900"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-semibold"
              >
                Submit Emergency Request
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  const handleEmergencyConfirm = (details: { name: string; phone: string; reason: string }) => {
    setLoadingEmergency(true);
    const emergencyAppointment: Appointment = {
      id: Date.now(),
      date: new Date(),
      time: "ASAP",
      completed: false,
      doctor: "Any available doctor",
      type: "Emergency",
    };
    setTimeout(() => {
      setAppointments((prev) => [...prev, emergencyAppointment]);
      setLoadingEmergency(false);
      setShowEmergencyForm(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-10 max-w-5xl mx-auto">
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">📌 Upcoming Appointment</h3>
            {upcomingAppointment ? (
              <div className="space-y-1 text-gray-800">
                <p>
                  <strong>Date:</strong>{" "}
                  {upcomingAppointment.date.toLocaleDateString(undefined, {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p><strong>Time:</strong> {upcomingAppointment.time}</p>
                <p><strong>Doctor:</strong> {upcomingAppointment.doctor}</p>
                <button
                  onClick={() => markCompleted(upcomingAppointment.id)}
                  className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Mark as Completed
                </button>
              </div>
            ) : (
              <p className="text-gray-800">No upcoming appointments.</p>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">🕒 Recent Appointment</h3>
            {recentAppointment ? (
              <div className="space-y-1 text-gray-800">
                <p>
                  <strong>Date:</strong>{" "}
                  {recentAppointment.date.toLocaleDateString(undefined, {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p><strong>Time:</strong> {recentAppointment.time}</p>
                <p><strong>Doctor:</strong> {recentAppointment.doctor}</p>
              </div>
            ) : (
              <p className="text-gray-800">No recent appointments.</p>
            )}
          </div>
        </section>

        <section className="mb-10 bg-red-50 border border-red-300 rounded-xl p-6 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-red-700 mb-2">🚨 Urgent / Emergency Appointment</h3>
            <p className="text-red-600 max-w-md">
              Get an immediate appointment with any available doctor. We'll assign ASAP.
            </p>
          </div>
          <button
            onClick={() => setShowEmergencyForm(true)}
            disabled={loadingEmergency}
            className={`px-6 py-3 rounded-lg font-semibold text-white shadow-md transition ${
              loadingEmergency ? "bg-red-300 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loadingEmergency ? "Booking..." : "Book Emergency Appointment"}
          </button>
        </section>

        <section className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-2xl font-bold mb-6 text-blue-900">Available Dates & Time Slots</h3>

          <table className="w-full table-fixed border-collapse border border-gray-200">
            <thead>
              <tr className="bg-blue-100 text-blue-900">
                <th className="border border-gray-300 p-3 w-1/2 text-left">Date</th>
                <th className="border border-gray-300 p-3 w-1/2 text-left">Time Slots</th>
              </tr>
            </thead>
            <tbody>
              {availableDatesSlots.map(({ date, slots }) => (
                <tr key={date} className="hover:bg-blue-50 cursor-pointer">
                  <td
                    onClick={() => openAppointmentForm(date, slots[0])}
                    className="border border-gray-300 p-3 font-medium text-blue-700"
                    title="Click to book first slot"
                  >
                    {new Date(date).toLocaleDateString(undefined, {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="border border-gray-300 p-3 space-x-2">
                    {slots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => openAppointmentForm(date, slot)}
                        className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
                      >
                        {slot}
                      </button>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {appointmentData && (
          <>
            <div
              onClick={closeForm}
              className="fixed inset-0 bg-black bg-opacity-30 z-40 cursor-pointer"
            ></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
                <button
                  onClick={closeForm}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 text-xl font-bold"
                  aria-label="Close appointment form"
                >
                  &times;
                </button>
                <AppointmentForm
                  date={new Date(appointmentData.date)}
                  time={appointmentData.time}
                  onConfirm={handleConfirm}
                  onCancel={closeForm}
                />
              </div>
            </div>
          </>
        )}

        {showEmergencyForm && (
          <EmergencyForm
            onConfirm={handleEmergencyConfirm}
            onCancel={() => setShowEmergencyForm(false)}
          />
        )}
      </main>
    </div>
  );
}
