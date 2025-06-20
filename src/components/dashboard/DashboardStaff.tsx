"use client";

export default function DashboardStaff() {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-900">
      <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-300">Staff Dashboard</h2>
      <p className="mt-2 text-gray-700 dark:text-gray-300">
        Manage patients, appointments, and clinic operations.
      </p>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-purple-100 dark:bg-purple-800/30 p-4 rounded-lg">
          <h3 className="font-medium">Today’s Appointments</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">6 appointments booked.</p>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-800/30 p-4 rounded-lg">
          <h3 className="font-medium">Patients</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">42 patients registered.</p>
        </div>
        <div className="bg-red-100 dark:bg-red-800/30 p-4 rounded-lg">
          <h3 className="font-medium">Tasks</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">3 tasks pending today.</p>
        </div>
      </div>
    </div>
  );
}
