"use client";

import { useState } from "react";

export default function DashboardPatient() {
  const [user] = useState({ name: "John Doe" });
  const [doctor] = useState({ name: "Dr. Smith" });

  // Example data for summary
  const lastAppointment = "2025-06-10";
  const medicinesDuration = "30 days left";
  const patientProgress = 65; // percent

  // Reminders and clinical notes state
  const [reminders, setReminders] = useState([
    "Take blood pressure medication",
    "Schedule follow-up visit",
  ]);
  const [clinicalNotes, setClinicalNotes] = useState([
    "Patient showing good recovery.",
    "Monitor blood sugar levels weekly.",
  ]);

  const menuItems = [
    { key: "Dashboard", icon: "🏠" },
    { key: "Appointments", icon: "📅" },
    { key: "Prescriptions", icon: "💊" },
    { key: "Health Records", icon: "📁" },
    { key: "Settings", icon: "⚙️" },
  ];

  const [activeSection, setActiveSection] = useState("Dashboard");

  const handleLogout = () => {
    alert("Logout clicked!");
    // Your logout logic here
  };

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
      <aside className="w-64 bg-gradient-to-b from-blue-300 to-blue-500 rounded-xl shadow-lg p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-blue-900 mb-10 select-none">Patient Panel</h2>
        <ul className="space-y-4 text-blue-900">
          {menuItems.map(({ key, icon }) => {
            const isActive = activeSection === key;
            return (
              <li
                key={key}
                onClick={() => setActiveSection(key)}
                className={`px-3 py-2 rounded-md cursor-pointer select-none transition-colors duration-200 ${
                  isActive
                    ? "bg-gray-300 text-gray-900 font-semibold"
                    : "hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                {icon} {key}
              </li>
            );
          })}

          {/* Logout button */}
          <li
            onClick={handleLogout}
            className="px-3 py-2 rounded-md cursor-pointer select-none text-blue-900 hover:bg-gray-200 hover:text-gray-900 font-semibold transition-colors duration-200"
          >
            🔒 Logout
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-800 select-none">
            Welcome, {user.name}
          </h1>
          <div className="flex items-center space-x-6">
            <p className="text-xl font-semibold text-blue-900 select-none">
              Treated by: {doctor.name}
            </p>
            <div className="rounded-full bg-blue-100 w-10 h-10 flex items-center justify-center text-blue-700 font-bold select-none">
              {user.name
                .split(" ")
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
              <h3 className="text-lg font-semibold text-blue-900 mb-1">🗓️ Appointments</h3>
              <p className="text-sm text-gray-700">No upcoming appointments.</p>
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

          {/* Prescriptions */}
          <div className="bg-white p-6 rounded-xl shadow border border-green-200 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-green-900 mb-1">💊 Prescriptions</h3>
              <p className="text-sm text-gray-700">2 active prescriptions.</p>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition-colors duration-200"
                onClick={() => alert("View Prescriptions clicked")}
              >
                View Prescriptions
              </button>
              <button
                className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 font-semibold py-2 rounded-md transition-colors duration-200"
                onClick={() => alert("Add Prescription clicked")}
              >
                Add Prescription
              </button>
            </div>
          </div>

          {/* Health Summary */}
          <div className="bg-white p-6 rounded-xl shadow border border-yellow-200 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-yellow-900 mb-1">📊 Health Summary</h3>
              <p className="text-sm text-gray-700">Vitals updated 3 days ago.</p>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded-md transition-colors duration-200"
                onClick={() => alert("View Health Summary clicked")}
              >
                View Details
              </button>
              <button
                className="flex-1 border border-yellow-600 text-yellow-600 hover:bg-yellow-50 font-semibold py-2 rounded-md transition-colors duration-200"
                onClick={() => alert("Add Health Data clicked")}
              >
                Add Data
              </button>
            </div>
          </div>
        </div>

        {/* Placeholder Chart Section */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-300 text-center mb-8">
          <p className="text-gray-500">[Vitals or Chart Section Placeholder]</p>
        </div>

        {/* Patient Summary Section */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-300 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Patient Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="font-semibold text-gray-700">Treated By:</p>
              <p className="text-gray-900">{doctor.name}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Last Appointment:</p>
              <p className="text-gray-900">{lastAppointment}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Medicines Duration:</p>
              <p className="text-gray-900">{medicinesDuration}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700 mb-1">Patient Progress:</p>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-blue-600 h-4 rounded-full"
                  style={{ width: `${patientProgress}%` }}
                ></div>
              </div>
              <p className="text-gray-700 mt-1">{patientProgress}% completed</p>
            </div>
          </div>
        </div>

        {/* Reminders & Clinical Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </main>
    </div>
  );
}
