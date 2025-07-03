"use client";

import Sidebar from "@/components/sidebar/sidebar";
import { useState } from "react";

type Medicine = {
  id: string;
  name: string;
  identity: string;
  amount: string;
  dosage: string;
  duration: string;
  notes?: string;
};

export default function PrescriptionPatient() {
  const [prescription] = useState({
    patientName: "Alice Johnson",
    symptoms: "Fever, Headache",
    doctorName: "Dr. John Smith",
    medicines: [
      {
        id: "med-001",
        name: "Paracetamol",
        identity: "Tablet",
        amount: "500mg",
        dosage: "1-0-1",
        duration: "5 days",
        notes: "After food",
      },
      {
        id: "med-002",
        name: "Cough Syrup",
        identity: "Syrup",
        amount: "10ml",
        dosage: "3 times/day",
        duration: "7 days",
        notes: "Before sleep",
      },
      {
        id: "med-003",
        name: "Ibuprofen",
        identity: "Tablet",
        amount: "400mg",
        dosage: "1-0-1",
        duration: "3 days",
        notes: "Avoid alcohol",
      },
    ],
    patientNote: "Feeling better after medication.",
    doctorNote: "Monitor temperature and stay hydrated.",
    dateIssued: "2025-07-03",
  });

  const [patientNote, setPatientNote] = useState(prescription.patientNote || "");
  const [doctorNote, setDoctorNote] = useState(prescription.doctorNote || "");

  const handlePatientNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPatientNote(e.target.value);
  };
  const handleDoctorNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDoctorNote(e.target.value);
  };
  const deletePatientNote = () => setPatientNote("");
  const deleteDoctorNote = () => setDoctorNote("");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="ml-64 overflow-y-auto flex-1 p-8 max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-10 text-gray-900 tracking-wide">
          My Prescription
        </h1>

        <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          {/* Header */}
          <div className="flex justify-between mb-12">
            <div>
              <p className="text-xl font-semibold text-gray-800">{prescription.patientName}</p>
              <p className="text-md italic text-gray-500 mt-1">Symptoms: {prescription.symptoms}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-semibold text-blue-600">{prescription.doctorName}</p>
              <p className="text-sm text-gray-400 mt-1">{prescription.dateIssued}</p>
            </div>
          </div>

          {/* Medicines List */}
          <div className="space-y-8 mb-12">
            {prescription.medicines.map((med) => (
              <div
                key={med.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50 p-5 rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-300 gap-8"
              >
                {/* Name and identity */}
                <div className="min-w-[220px] md:min-w-[280px] flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
                  <p className="text-2xl font-bold text-teal-600">{med.name}</p>
                  <p className="text-gray-600 font-medium">{med.identity}</p>
                </div>

                {/* Amount, Dosage, Duration */}
                <div className="flex flex-col md:flex-row md:items-center md:gap-12 text-gray-700 min-w-[320px]">
                  <p>
                    <span className="font-semibold">Amount:</span> {med.amount}
                  </p>
                  <p>
                    <span className="font-semibold">Dosage:</span> {med.dosage}
                  </p>
                  <p>
                    <span className="font-semibold">Duration:</span> {med.duration}
                  </p>
                </div>

                {/* Notes */}
                {med.notes && (
                  <p className="mt-3 md:mt-0 text-gray-500 italic max-w-xs min-w-[200px]">
                    {med.notes}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Notes Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Patient Note */}
            <div className="bg-white p-6 rounded-xl border border-gray-300 flex flex-col min-h-[220px] shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Patient's Note</h3>
                {patientNote && (
                  <button
                    onClick={deletePatientNote}
                    className="text-red-500 hover:text-red-700 font-bold text-2xl leading-none"
                    title="Delete Patient Note"
                    aria-label="Delete Patient Note"
                  >
                    &times;
                  </button>
                )}
              </div>

              <textarea
                value={patientNote}
                onChange={handlePatientNoteChange}
                rows={6}
                placeholder="Add your note here..."
                className="resize-none p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white shadow-inner"
              />

              {!patientNote && (
                <button
                  onClick={() => setPatientNote("Your note here...")}
                  className="mt-4 self-start bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
                >
                  Add Note
                </button>
              )}
            </div>

            {/* Doctor Note */}
            <div className="bg-white p-6 rounded-xl border border-gray-300 flex flex-col min-h-[220px] shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Doctor's Note</h3>
                {doctorNote && (
                  <button
                    onClick={deleteDoctorNote}
                    className="text-red-500 hover:text-red-700 font-bold text-2xl leading-none"
                    title="Delete Doctor Note"
                    aria-label="Delete Doctor Note"
                  >
                    &times;
                  </button>
                )}
              </div>

              <textarea
                value={doctorNote}
                onChange={handleDoctorNoteChange}
                rows={6}
                placeholder="No notes yet."
                className="resize-none p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 bg-white shadow-inner"
              />

              {!doctorNote && (
                <button
                  onClick={() => setDoctorNote("Doctor's note...")}
                  className="mt-4 self-start bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition"
                >
                  Add Note
                </button>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
