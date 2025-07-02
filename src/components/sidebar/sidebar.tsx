import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { BsCapsule } from "react-icons/bs";
import { FiCalendar, FiFolder, FiHome, FiLogOut, FiSettings } from "react-icons/fi";

export default function Sidebar() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("");
  const [role, setRole] = useState<"Patient" | "Doctor" | "Admin" | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const formattedRole = storedRole
      ? storedRole.charAt(0).toUpperCase() + storedRole.slice(1).toLowerCase()
      : null;

    if (
      formattedRole === "Patient" ||
      formattedRole === "Doctor" ||
      formattedRole === "Admin"
    ) {
      setRole(formattedRole);
    }
  }, []);

  const appointmentPath =
    role === "Doctor"
      ? "/appointments/doctor"
      : role === "Patient"
        ? "/appointments/patient"
        : "/appointments";

  const menuItems = [
    { key: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { key: "Appointments", icon: <FiCalendar />, path: appointmentPath },
    { key: "Prescriptions", icon: <BsCapsule />, path: "/prescriptions" },
    { key: "Health Records", icon: <FiFolder />, path: "/records" },
    { key: "Settings", icon: <FiSettings />, path: "/settings" },
    { key: "Logout", icon: <FiLogOut />, action: "logout" }, // Added logout here
  ];

  const handleNavigation = (key: string, path?: string, action?: string) => {
    setActiveSection(key);

    if (action === "logout") {
      if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("token");
        router.push("/");
      }
    } else if (path) {
      router.push(path);
    }
  };

  useEffect(() => {
    const currentPath = window.location.pathname;
    const current = menuItems.find(item => item.path === currentPath);
    if (current) {
      setActiveSection(current.key);
    }
  }, []);

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-blue-300 to-blue-500 shadow-lg p-6 fixed top-0 left-0 flex flex-col z-10">
      <h2 className="text-2xl font-bold text-blue-900 mb-10 select-none">Logo here</h2>
      <ul className="space-y-4 text-blue-900">
        {menuItems.map(({ key, icon, path, action }) => {
          const isActive = activeSection === key;
          return (
            <li
              key={key}
              onClick={() => handleNavigation(key, path, action)}
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
    </aside>
  );
}
