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

export default function PrescriptionDoctor() {
  const [patient] = useState({
    name: "Alice Johnson",
    symptoms: "Fever, Headache",
    dateIssued: "2025-07-03",
  });

  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      id: "med-001",
      name: "Paracetamol",
      identity: "Tablet",
      amount: "500mg",
      dosage: "1-0-1",
      duration: "5 days",
      notes: "After food",
    },
  ]);

  const [doctorNote, setDoctorNote] = useState("");

  const handleMedicineChange = (id: string, field: keyof Medicine, value: string) => {
    setMedicines((prev) =>
      prev.map((med) => (med.id === id ? { ...med, [field]: value } : med))
    );
  };

  const addMedicine = () => {
    const newMed: Medicine = {
      id: `med-${Date.now()}`,
      name: "",
      identity: "",
      amount: "",
      dosage: "",
      duration: "",
      notes: "",
    };
    setMedicines((prev) => [...prev, newMed]);
  };

  const deleteMedicine = (id: string) => {
    setMedicines((prev) => prev.filter((med) => med.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 overflow-y-auto flex-1 p-10 max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-wide">
          Create Prescription
        </h1>

        {/* Patient Info */}
        <section className="mb-10 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Patient Information</h2>
          <p className="text-lg font-medium text-gray-900 mb-1">
            Name: <span className="font-normal">{patient.name}</span>
          </p>
          <p className="text-lg font-medium text-gray-900 mb-1">
            Symptoms: <span className="font-normal italic">{patient.symptoms}</span>
          </p>
          <p className="text-lg font-medium text-gray-900">
            Date: <span className="font-normal">{patient.dateIssued}</span>
          </p>
        </section>

        {/* Medicines List */}
        <section className="mb-10 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Medicines</h2>
            <button
              onClick={addMedicine}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition"
            >
              + Add Medicine
            </button>
          </div>

          <div className="space-y-6">
            {medicines.map((med) => (
              <div
                key={med.id}
                className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <input
                  type="text"
                  placeholder="Medicine Name"
                  value={med.name}
                  onChange={(e) => handleMedicineChange(med.id, "name", e.target.value)}
                  className="col-span-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium"
                />
                <input
                  type="text"
                  placeholder="Identity"
                  value={med.identity}
                  onChange={(e) => handleMedicineChange(med.id, "identity", e.target.value)}
                  className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium"
                />
                <input
                  type="text"
                  placeholder="Amount"
                  value={med.amount}
                  onChange={(e) => handleMedicineChange(med.id, "amount", e.target.value)}
                  className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium"
                />
                <input
                  type="text"
                  placeholder="Dosage"
                  value={med.dosage}
                  onChange={(e) => handleMedicineChange(med.id, "dosage", e.target.value)}
                  className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium"
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={med.duration}
                  onChange={(e) => handleMedicineChange(med.id, "duration", e.target.value)}
                  className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-medium"
                />
                <button
                  onClick={() => deleteMedicine(med.id)}
                  className="text-red-600 hover:text-red-800 font-bold text-2xl self-center"
                  aria-label="Delete Medicine"
                  title="Delete Medicine"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Doctor's Note */}
        <section className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Doctor's Note</h2>
          <textarea
            rows={6}
            placeholder="Write notes or instructions here..."
            value={doctorNote}
            onChange={(e) => setDoctorNote(e.target.value)}
            className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none text-gray-900 font-medium shadow-inner"
          />
        </section>

        {/* Buttons */}
        <div className="mt-10 flex flex-col md:flex-row md:justify-between gap-4">
          <button
            type="button"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition shadow-lg"
            onClick={() => alert("Save functionality coming soon!")}
          >
            Save Prescription
          </button>

          <button
            type="button"
            onClick={() => alert("Staff notified to bring the documents!")}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition shadow-lg"
          >
            Notify Staff
          </button>
        </div>
      </main>
    </div>
  );
}
