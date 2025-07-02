"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar/sidebar";

export default function DashboardStaff() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [clinic] = useState({ name: "Sunrise Medical Clinic" });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found.");
      return;
    }

    fetch("/api/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => setUser({ name: data.name }))
      .catch((err) => {
        console.error("Error fetching user:", err);
      });
  }, []);

  // Example data
  const nextAppointment = "2025-06-22, 10:30 AM";
  const patientsCount = 25;
  const pendingPrescriptions = 4;
  const doctorProgress = 80; // %

  // Alerts example
  const patientAlerts = [
    { id: 1, patient: "John Doe", alert: "High blood pressure" },
    { id: 2, patient: "Jane Smith", alert: "Allergy alert" },
  ];

  // Reminders & notes state
  const [reminders, setReminders] = useState([
    "Review lab results for patient ID #23",
    "Follow up with patient Jane Smith",
  ]);
  const [clinicalNotes, setClinicalNotes] = useState([
    "Patient John Doe responded well to treatment.",
    "Schedule MRI for patient Mike Johnson.",
  ]);


  // Add new reminder
  const addReminder = () => {
    const newReminder = prompt("Enter new reminder:");
    if (newReminder && newReminder.trim() !== "") {
      setReminders((prev) => [...prev, newReminder.trim()]);
    }
  };

  // Remove reminder by index
  const removeReminder = (index: number) => {
    setReminders((prev) => prev.filter((_, i) => i !== index));
  };

  // Add new clinical note
  const addClinicalNote = () => {
    const newNote = prompt("Enter new clinical note:");
    if (newNote && newNote.trim() !== "") {
      setClinicalNotes((prev) => [...prev, newNote.trim()]);
    }
  };

  // Remove clinical note by index
  const removeClinicalNote = (index: number) => {
    setClinicalNotes((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-6 overflow-y-auto">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800 select-none">
            {user ? `Welcome, ${user.name}` : "Loading..."}
          </h1>
          <div className="flex items-center space-x-6">
            <p className="text-xl font-semibold text-blue-900 select-none">
              Clinic: {clinic.name}
            </p>
            <div className="rounded-full bg-blue-100 w-10 h-10 flex items-center justify-center text-blue-700 font-bold select-none">
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Appointments */}
          <div className="bg-white p-6 rounded-xl shadow border border-blue-200 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-1">
                🗓️ Upcoming Appointments
              </h3>
              <p className="text-sm text-gray-700">Next: {nextAppointment}</p>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors duration-200"
                onClick={() => alert("View Appointments clicked")}
              >
                View Appointments
              </button>
              <button
                className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 rounded-md transition-colors duration-200"
                onClick={() => alert("Add Appointment clicked")}
              >
                Add Appointment
              </button>
            </div>
          </div>

          {/* Patients */}
          <div className="bg-white p-6 rounded-xl shadow border border-green-200 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-green-900 mb-1">👥 Patients</h3>
              <p className="text-sm text-gray-700">{patientsCount} active patients</p>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-colors duration-200"
                onClick={() => alert("View Patients clicked")}
              >
                View Patients
              </button>
              <button
                className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 font-semibold py-2 rounded-md transition-colors duration-200"
                onClick={() => alert("Add Patient clicked")}
              >
                Add Patient
              </button>
            </div>
          </div>

          {/* Prescriptions */}
          <div className="bg-white p-6 rounded-xl shadow border border-yellow-200 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-yellow-900 mb-1">💊 Prescriptions</h3>
              <p className="text-sm text-gray-700">{pendingPrescriptions} pending prescriptions</p>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded-md transition-colors duration-200"
                onClick={() => alert("View Prescriptions clicked")}
              >
                View Prescriptions
              </button>
              <button
                className="flex-1 border border-yellow-600 text-yellow-600 hover:bg-yellow-50 font-semibold py-2 rounded-md transition-colors duration-200"
                onClick={() => alert("Add Prescription clicked")}
              >
                Add Prescription
              </button>
            </div>
          </div>
        </div>

        {/* Patient Health Alerts */}
        <div className="bg-white p-6 rounded-xl shadow border border-red-300 mb-8">
          <h3 className="text-lg font-semibold text-red-700 mb-3">🚨 Patient Health Alerts</h3>
          {patientAlerts.length === 0 ? (
            <p className="text-gray-700 italic">No alerts</p>
          ) : (
            <ul className="space-y-2 max-h-48 overflow-y-auto text-red-800">
              {patientAlerts.map(({ id, patient, alert }) => (
                <li
                  key={id}
                  className="bg-red-100 rounded-md p-2 text-sm select-none"
                  title={`${patient}: ${alert}`}
                >
                  <strong>{patient}</strong>: {alert}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Reminders & Clinical Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Reminders */}
          <div className="bg-white p-6 rounded-xl shadow border border-purple-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-purple-900 select-none">⏰ Reminders</h3>
              <button
                onClick={addReminder}
                className="text-purple-700 font-bold text-xl px-2 rounded hover:bg-purple-100 transition-colors"
                aria-label="Add Reminder"
              >
                +
              </button>
            </div>
            {reminders.length === 0 ? (
              <p className="text-gray-700 italic">No reminders</p>
            ) : (
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {reminders.map((reminder, i) => (
                  <li key={i} className="flex justify-between items-center">
                    <span>{reminder}</span>
                    <button
                      onClick={() => removeReminder(i)}
                      className="text-red-500 font-bold ml-4 hover:text-red-700"
                      aria-label={`Remove reminder ${reminder}`}
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Clinical Notes */}
          <div className="bg-white p-6 rounded-xl shadow border border-indigo-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-indigo-900 select-none">📝 Clinical Notes</h3>
              <button
                onClick={addClinicalNote}
                className="text-indigo-700 font-bold text-xl px-2 rounded hover:bg-indigo-100 transition-colors"
                aria-label="Add Clinical Note"
              >
                +
              </button>
            </div>
            {clinicalNotes.length === 0 ? (
              <p className="text-gray-700 italic">No notes</p>
            ) : (
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {clinicalNotes.map((note, i) => (
                  <li key={i} className="flex justify-between items-center">
                    <span>{note}</span>
                    <button
                      onClick={() => removeClinicalNote(i)}
                      className="text-red-500 font-bold ml-4 hover:text-red-700"
                      aria-label={`Remove clinical note ${note}`}
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Doctor Summary Section */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-300">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Doctor Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="font-semibold text-gray-700">Clinic:</p>
              <p className="text-gray-900">{clinic.name}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Next Appointment:</p>
              <p className="text-gray-900">{nextAppointment}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Patients Count:</p>
              <p className="text-gray-900">{patientsCount}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700 mb-1">Goal Progress:</p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full"
                  style={{ width: `${doctorProgress}%` }}
                ></div>
              </div>
              <p className="text-gray-700 mt-1">{doctorProgress}% completed</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

