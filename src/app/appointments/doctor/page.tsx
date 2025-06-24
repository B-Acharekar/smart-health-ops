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
  medications?: string[];
  diseases?: string[];
  pastReports?: string[];
};

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctorAvailable, setDoctorAvailable] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Appointment | null>(null);

  useEffect(() => {
    setAppointments([
      {
        id: 2,
        date: "ASAP",
        time: "ASAP",
        completed: false,
        patientName: "Bhushan Acharekar",
        type: "Emergency",
        notes: "Severe chest pain reported",
        medications: ["Aspirin", "Nitroglycerin"],
        diseases: ["Hypertension"],
        pastReports: ["ECG_Report_2024.pdf", "Blood_Test_2023.pdf"],
      },
      {
        id: 1,
        date: "2025-07-24",
        time: "10:00 AM",
        completed: false,
        patientName: "John Doe",
        type: "Regular",
        notes: "Routine check-up",
        medications: ["Metformin"],
        diseases: ["Diabetes"],
        pastReports: ["HbA1c_Report_2024.pdf"],
      },
      {
        id: 3,
        date: "2025-07-25",
        time: "02:30 PM",
        completed: true,
        patientName: "Alice Smith",
        type: "Regular",
      },
      {
        id: 4,
        date: "2025-07-26",
        time: "09:00 AM",
        completed: false,
        patientName: "Michael Brown",
        type: "Regular",
      },
      {
        id: 5,
        date: "2025-07-27",
        time: "11:15 AM",
        completed: false,
        patientName: "Emily Clark",
        type: "Regular",
      },
      {
        id: 6,
        date: "2025-07-28",
        time: "01:00 PM",
        completed: false,
        patientName: "David Wilson",
        type: "Regular",
      },
      {
        id: 7,
        date: "2025-07-29",
        time: "03:45 PM",
        completed: false,
        patientName: "Sophia Lee",
        type: "Regular",
      },
      {
        id: 8,
        date: "2025-07-30",
        time: "10:30 AM",
        completed: false,
        patientName: "James Taylor",
        type: "Regular",
      },
      {
        id: 9,
        date: "2025-07-31",
        time: "02:00 PM",
        completed: false,
        patientName: "Olivia Martinez",
        type: "Regular",
      },
      {
        id: 10,
        date: "2025-08-01",
        time: "09:45 AM",
        completed: false,
        patientName: "Daniel Anderson",
        type: "Regular",
      },
    ]);
  }, []);

  const markCompleted = (id: number) => {
    setAppointments((prev) =>
      prev.map((appt) => (appt.id === id ? { ...appt, completed: true } : appt))
    );
  };

  const openModal = (appt: Appointment) => {
    setModalData(appt);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  const notifyStaff = (patientName: string) => {
    alert(`Notification sent to staff to bring patient details for ${patientName}.`);
  };

  const callStaffAssistance = () => {
    alert("Staff has been called for assistance.");
  };

  const emergencyAppointments = appointments.filter((a) => a.type === "Emergency");
  const regularAppointments = appointments
    .filter((a) => a.type === "Regular")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <Sidebar />

      <main className="flex-1 p-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-6 text-blue-900">Appointments</h1>

        <div className="mb-8 flex items-center gap-4">
          <label htmlFor="availability-toggle" className="text-lg font-semibold">
            Doctor Availability:
          </label>
          <button
            id="availability-toggle"
            onClick={() => setDoctorAvailable((prev) => !prev)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              doctorAvailable ? "bg-green-600 text-white" : "bg-red-500 text-white"
            }`}
          >
            {doctorAvailable ? "Available" : "Not Available"}
          </button>

          <button
            onClick={callStaffAssistance}
            className="ml-auto bg-indigo-600 text-white px-4 py-2 rounded font-semibold hover:bg-indigo-700 transition"
            title="Call staff for assistance"
          >
            Call Staff
          </button>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-red-700">🚨 Emergency Appointments</h2>
          {emergencyAppointments.length === 0 ? (
            <p className="text-gray-600">No emergency appointments at the moment.</p>
          ) : (
            <div className="space-y-4 max-h-[200px] overflow-y-auto">
              {emergencyAppointments.map((appt) => (
                <div
                  key={appt.id}
                  className="bg-red-50 border border-red-400 rounded-lg shadow p-5 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-xl text-red-800">{appt.patientName}</p>
                    <p className="text-sm text-red-600 mt-1 italic">{appt.notes}</p>
                  </div>

                  <div className="flex gap-3 items-center">
                    <button
                      disabled={!doctorAvailable}
                      onClick={() => openModal(appt)}
                      className={`px-4 py-2 rounded font-semibold transition ${
                        doctorAvailable
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Appoint
                    </button>
                    {appt.completed && (
                      <span className="text-green-700 font-semibold">✅ Completed</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-900">📅 Scheduled Appointments</h2>
          {regularAppointments.length === 0 ? (
            <p className="text-gray-600">No scheduled appointments.</p>
          ) : (
            <div className="rounded-lg border border-gray-300 bg-white shadow-sm max-h-[360px] overflow-y-auto overflow-x-auto">
              <table className="w-full table-auto min-w-[600px] border-collapse">
                <thead className="bg-blue-100 sticky top-0 z-10">
                  <tr className="text-left text-gray-700">
                    <th className="py-3 px-6">Date</th>
                    <th className="py-3 px-6">Time</th>
                    <th className="py-3 px-6">Patient Name</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {regularAppointments.map((appt) => (
                    <tr
                      key={appt.id}
                      className={`border-t ${
                        appt.completed ? "bg-green-50 text-green-800" : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="py-3 px-6">{new Date(appt.date).toLocaleDateString()}</td>
                      <td className="py-3 px-6">{appt.time}</td>
                      <td className="py-3 px-6">{appt.patientName}</td>
                      <td className="py-3 px-6 text-center font-semibold">
                        {appt.completed ? "Completed ✅" : "Pending"}
                      </td>
                      <td className="py-3 px-6 text-center flex justify-center gap-3">
                        {!appt.completed && (
                          <button
                            onClick={() => markCompleted(appt.id)}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                            title="Mark as completed"
                          >
                            ✓
                          </button>
                        )}
                        <button
                          onClick={() => notifyStaff(appt.patientName)}
                          className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition"
                          title="Request Details - Notify Staff"
                        >
                          Request Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {modalOpen && modalData && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-lg max-w-lg w-full p-6 shadow-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
                aria-label="Close modal"
              >
                ×
              </button>

              <h3 className="text-2xl font-bold mb-4 text-blue-900">
                Patient History - {modalData.patientName}
              </h3>

              <div className="space-y-3 text-gray-800">
                <p>
                  <span className="font-semibold">Appointment Type:</span> {modalData.type}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {modalData.date === "ASAP"
                    ? "Emergency - ASAP"
                    : new Date(modalData.date).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Time:</span> {modalData.time}
                </p>
                {modalData.notes && (
                  <p>
                    <span className="font-semibold">Symptoms / Notes:</span> {modalData.notes}
                  </p>
                )}
                {modalData.medications && modalData.medications.length > 0 && (
                  <div>
                    <span className="font-semibold">Medications:</span>
                    <ul className="list-disc list-inside ml-4">
                      {modalData.medications.map((med, i) => (
                        <li key={i}>{med}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {modalData.diseases && modalData.diseases.length > 0 && (
                  <div>
                    <span className="font-semibold">Known Diseases:</span>
                    <ul className="list-disc list-inside ml-4">
                      {modalData.diseases.map((dis, i) => (
                        <li key={i}>{dis}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {modalData.pastReports && modalData.pastReports.length > 0 && (
                  <div>
                    <span className="font-semibold">Past Reports:</span>
                    <ul className="list-disc list-inside ml-4">
                      {modalData.pastReports.map((rep, i) => (
                        <li key={i}>
                          <a
                            href="#"
                            className="text-blue-600 hover:underline"
                            onClick={(e) => e.preventDefault()}
                          >
                            {rep}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
