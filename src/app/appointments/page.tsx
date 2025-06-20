// app/appointments/page.tsx
'use client';

import { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import AppointmentForm from "@/components/appointments/AppointmentForm";
import SlotSelector from "@/components/appointments/SlotSelector";
import ConfirmationMessage from "@/components/appointments/ConfrimationMessage";
import Sidebar from "@/components/sidebar/sidebar";

export default function AppointmentPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<any>(null);

  const availableSlots = ["10:00 AM", "11:30 AM", "02:00 PM", "04:00 PM"];

  const handleDateChange: CalendarProps['onChange'] = (value) => {
    setConfirmed(null);
    setSelectedSlot(null);
    if (Array.isArray(value)) {
      setSelectedDate(value[0]);
    } else {
      setSelectedDate(value);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-10">
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-8 text-blue-900 text-center border-b pb-4">
            📅 Schedule Your Appointment
          </h2>

          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Select a date:
            </label>
            <div className="bg-blue-50 rounded-lg border border-blue-200 shadow-sm p-4">
              <Calendar onChange={handleDateChange} value={selectedDate} className="w-full" />
            </div>
          </div>

          {selectedDate && !confirmed && !selectedSlot && (
            <SlotSelector
              date={selectedDate}
              slots={availableSlots}
              onSelect={setSelectedSlot}
            />
          )}

          {selectedDate && selectedSlot && !confirmed && (
            <AppointmentForm
              date={selectedDate}
              time={selectedSlot}
              onConfirm={setConfirmed}
              onCancel={() => setSelectedSlot(null)}
            />
          )}

          {confirmed && <ConfirmationMessage details={confirmed} />}
        </div>
      </div>
    </div>
  );
}