import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsCapsule } from "react-icons/bs";
import { FiCalendar, FiFolder, FiHome, FiLogOut, FiSettings } from "react-icons/fi";

export default function Sidebar() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("Dashboard");

  const menuItems = [
    { key: "Dashboard", icon: <FiHome /> },
    { key: "Appointments", icon: <FiCalendar /> },
    { key: "Prescriptions", icon: <BsCapsule /> },
    { key: "Health Records", icon: <FiFolder /> },
    { key: "Settings", icon: <FiSettings /> },
  ];

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      router.push("/");
    }
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-300 to-blue-500 shadow-lg p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-blue-900 mb-10 select-none">Logo here</h2>
      <ul className="space-y-4 text-blue-900 flex-1">
        {menuItems.map(({ key, icon }) => {
          const isActive = activeSection === key;
          return (
            <li
              key={key}
              onClick={() => setActiveSection(key)}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition-colors duration-200
                ${isActive
                  ? "bg-white/60 text-black font-semibold shadow-sm"
                  : "text-blue-900 hover:bg-white/30 hover:text-black"}
              `}
            >
              <span className="text-xl">{icon}</span>
              <span className="text-sm">{key}</span>
            </li>
          );
        })}
      </ul>

      <li
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer text-blue-900 hover:bg-white/30 hover:text-black transition-colors duration-200 font-semibold mt-4"
      >
        <FiLogOut className="text-xl" />
        <span className="text-sm">Logout</span>
      </li>
    </aside>
  );
}
