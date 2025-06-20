"use client";

export default function DashboardPatient() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-300">Patient Dashboard</h2>
      <p className="mt-2 text-gray-700 dark:text-gray-300">
        View your appointments, prescriptions, and health records.
      </p>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-blue-100 dark:bg-blue-800/30 p-4 rounded-lg">
          <h3 className="font-medium">Upcoming Appointments</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">No appointments scheduled.</p>
        </div>
        <div className="bg-green-100 dark:bg-green-800/30 p-4 rounded-lg">
          <h3 className="font-medium">Prescriptions</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">You have 2 active prescriptions.</p>
        </div>
      </div>
    </div>
  );
}
