'use client';

import { useState } from "react";

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
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({ name, reason, date, time });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 bg-white p-4 rounded-xl shadow border">
      <h3 className="text-lg font-semibold text-blue-800 mb-4">
        Confirm Appointment - {time} on {date.toDateString()}
      </h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          placeholder="Reason for visit"
          value={reason}
          required
          onChange={(e) => setReason(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </form>
  );
}