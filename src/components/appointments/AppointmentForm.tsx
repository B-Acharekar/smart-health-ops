// components/appointments/AppointmentForm.tsx
'use client';

import { useState } from "react";
import { FiUser, FiMail, FiPhone, FiX } from "react-icons/fi";

export default function AppointmentForm({
  date,
  time,
  onConfirm,
  onCancel,
}: {
  date: Date;
  time: string;
  onConfirm: (details: any) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({ name, email, phone, reason, date, time });
  };

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50 p-4 border-black">
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-xl p-6 animate-fade-in ">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <FiX size={22} />
        </button>

        <h3 className="text-2xl font-semibold text-blue-700 mb-4 text-center">
          Book for {date.toDateString()}, {time}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border rounded px-3 py-2">
            <FiUser className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center border rounded px-3 py-2">
            <FiMail className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          <div className="flex items-center border rounded px-3 py-2">
            <span className="text-gray-500 mr-2">🇮🇳 +91</span>
            <input
              type="tel"
              placeholder="Phone Number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          <textarea
            placeholder="Reason / Symptoms / Tags"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border rounded px-3 py-2 h-24 resize-none"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Confirm Appointment
          </button>
        </form>
      </div>
    </div>
  );
}