"use client";
import Sidebar from "@/components/sidebar/sidebar";
import { useState, useEffect } from "react";
import {
  FiUser,
  FiEdit2,
  FiGlobe,
  FiInfo,
  FiCheckCircle,
  FiLifeBuoy,
  FiMail,
  FiPhone,
} from "react-icons/fi";

type MembershipType = "Silver" | "Golden" | "Diamond";

const membershipPlans = [
  {
    name: "Silver Membership",
    duration: "3 Months",
    price: "₹349",
    benefits: [
      "Access to basic health records",
      "Monthly health tips",
      "Standard support",
    ],
  },
  {
    name: "Golden Membership",
    duration: "6 Months",
    price: "₹579",
    benefits: [
      "Includes Silver benefits",
      "Priority appointment booking",
      "Discount on medicines",
    ],
  },
  {
    name: "Diamond Membership",
    duration: "12 Months",
    price: "₹999",
    benefits: [
      "Includes Golden benefits",
      "24/7 Doctor chat support",
      "Personal health coach",
      "Free annual health checkup",
    ],
  },
];

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function formatDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function SettingsPage() {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: "John",
    role: "Patient",
    mobile: "+91 9876543210",
    photoUrl: "",
    membership: "Diamond" as MembershipType,
    lastRenewalDate: new Date("2024-05-15"),
  });
  const [selectedMembership, setSelectedMembership] = useState<MembershipType>("Diamond");

  useEffect(() => {
    if (userData.name.toLowerCase() !== "john") {
      setUserData((prev) => ({ ...prev, membership: "Silver" }));
      setSelectedMembership("Silver");
    } else {
      setUserData((prev) => ({ ...prev, membership: "Diamond" }));
      setSelectedMembership("Diamond");
    }
  }, [userData.name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const currentPlan = membershipPlans.find(
    (plan) => plan.name.split(" ")[0] === userData.membership
  );

  const expiryDate = currentPlan
    ? addMonths(userData.lastRenewalDate, parseInt(currentPlan.duration))
    : null;

  const handleMembershipAction = (plan: MembershipType) => {
    alert(`You chose to buy/renew the ${plan} membership.`);
    // Here you can add actual buy/renew logic later
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
    <Sidebar/>
    <main className="ml-64 overflow-y-auto flex-1 bg-white text-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-14">
        <section className="bg-white rounded-xl shadow-md p-8 flex items-center gap-8">
          <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            {userData.photoUrl ? (
              <img
                src={userData.photoUrl}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <FiUser className="text-gray-500 text-7xl" />
            )}
          </div>
          <div className="flex-1">
            {editMode ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 mb-4 text-2xl font-semibold"
                  placeholder="Name"
                />
                <input
                  type="text"
                  name="mobile"
                  value={userData.mobile}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 mb-4 text-lg"
                  placeholder="Mobile Number"
                />
                <input
                  type="text"
                  name="photoUrl"
                  value={userData.photoUrl}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 mb-4"
                  placeholder="Photo URL"
                />
                <p className="text-lg text-gray-600">
                  Role: <span className="font-semibold">{userData.role}</span>
                </p>
              </>
            ) : (
              <>
                <h1 className="text-4xl font-bold">{userData.name}</h1>
                <p className="text-xl text-gray-600 mb-2">Role: {userData.role}</p>
                <p className="text-lg text-gray-600">Mobile: {userData.mobile}</p>
              </>
            )}
          </div>
          <button
            onClick={() => setEditMode(!editMode)}
            className="ml-auto bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg flex items-center gap-3 text-lg font-semibold"
            aria-label={editMode ? "Save Profile" : "Edit Profile"}
          >
            <FiEdit2 className="text-2xl" />
            {editMode ? "Save" : "Edit"}
          </button>
        </section>

        <section className="bg-white rounded-xl shadow-md p-10">
          <h2 className="text-3xl font-bold mb-6">Membership Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {membershipPlans.map(({ name, duration, price }) => {
              const planKey = name.split(" ")[0] as MembershipType;
              const isActive = userData.membership === planKey;
              const isSelected = selectedMembership === planKey;

              const lastRenewal = isActive ? userData.lastRenewalDate : null;
              const planDuration = membershipPlans.find(p => p.name.split(" ")[0] === planKey)?.duration || "0 Months";
              const monthsNum = parseInt(planDuration);
              const expiry = lastRenewal ? addMonths(lastRenewal, monthsNum) : null;

              return (
                <div
                  key={name}
                  onClick={() => setSelectedMembership(planKey)}
                  className={`rounded-xl p-6 flex flex-col justify-between shadow-lg cursor-pointer select-none transition-transform duration-200
                  ${
                    isSelected
                      ? "scale-[1.04] shadow-2xl border-4 border-indigo-500"
                      : "hover:scale-[1.02] border border-gray-300"
                  }
                  ${
                    isActive
                      ? "bg-gradient-to-br from-blue-600 to-purple-700 text-white"
                      : "bg-white text-gray-900"
                  }`}
                >
                  <div>
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                      {name}{" "}
                      {isActive && (
                        <FiCheckCircle className={`text-white text-xl`} />
                      )}
                    </h3>
                    <p className={`${isActive ? "text-blue-200" : "text-gray-700"} mb-1`}>
                      Duration: {duration}
                    </p>
                    <p className={`${isActive ? "text-white" : "text-gray-900"} font-semibold mb-1`}>
                      Price: {price}
                    </p>
                    {isActive && lastRenewal && expiry && (
                      <p className="text-sm italic mt-2">
                        {`Last Renewal: ${formatDate(lastRenewal)} | Expires: ${formatDate(expiry)}`}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMembershipAction(planKey);
                    }}
                    className={`mt-4 py-2 rounded-lg font-semibold w-full
                      ${
                        isActive
                          ? "bg-white text-purple-700 hover:bg-purple-100"
                          : "bg-purple-600 text-white hover:bg-purple-700"
                      } transition-colors duration-200`}
                  >
                    {isActive ? "Renew Membership" : "Buy Membership"}
                  </button>
                </div>
              );
            })}
          </div>

          {selectedMembership && (
            <div
              className={`mt-10 rounded-xl p-8 shadow-lg text-white
              ${
                selectedMembership === "Silver"
                  ? "bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600"
                  : selectedMembership === "Golden"
                  ? "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-gray-900"
                  : "bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800"
              }
              `}
            >
              <h3 className="text-2xl font-bold mb-4">
                {selectedMembership} Membership Benefits
              </h3>
              <ul className="list-disc list-inside space-y-2 text-lg">
                {membershipPlans
                  .find((plan) => plan.name.split(" ")[0] === selectedMembership)
                  ?.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
              </ul>
            </div>
          )}
        </section>

        <section className="bg-white rounded-xl shadow-md p-10">
          <div className="flex items-center gap-5 mb-5">
            <FiGlobe className="text-4xl text-gray-600" />
            <h2 className="text-3xl font-bold">Language</h2>
          </div>
          <select className="w-full border border-gray-300 rounded-lg p-4 text-lg text-gray-900">
            <option>English</option>
            <option>Marathi</option>
          </select>
        </section>

        <section className="bg-white rounded-xl shadow-md p-10">
          <div className="flex items-center gap-5 mb-5">
            <FiLifeBuoy className="text-4xl text-gray-600" />
            <h2 className="text-3xl font-bold">Support</h2>
          </div>

          <div className="max-w-4xl text-gray-700 space-y-4 mb-6">
            <p>
              <strong>Frequently Asked Questions:</strong>
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>How do I reset my password?</li>
              <li>How can I upgrade my membership?</li>
              <li>Where can I find my health records?</li>
            </ul>
          </div>

          <div className="max-w-4xl space-y-3">
            <p className="font-semibold text-lg">Contact Us:</p>
            <p className="flex items-center gap-3">
              <FiMail className="text-blue-600" />
              <a
                href="mailto:support@smarthealthops.com"
                className="text-blue-700 hover:underline"
              >
                support@smarthealthops.com
              </a>
            </p>
            <p className="flex items-center gap-3">
              <FiPhone className="text-blue-600" />
              <a
                href="tel:+919876543210"
                className="text-blue-700 hover:underline"
              >
                +91 98765 43210
              </a>
            </p>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-md p-10">
          <div className="flex items-center gap-5 mb-5">
            <FiInfo className="text-4xl text-gray-600" />
            <h2 className="text-3xl font-bold">About Us</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed max-w-4xl mb-6">
            Smart Health Ops is a platform designed to streamline healthcare
            operations, improve communication, and enhance patient-doctor
            collaboration. Our goal is to provide a seamless digital health
            experience for everyone.
          </p>
          <hr className="border-gray-300" />
          <p className="mt-6 text-gray-600 italic font-semibold text-right max-w-4xl">
            Design &amp; Build by <span className="font-bold">Bhushan</span>, <span className="font-bold">Kalpesh</span> and team
          </p>
        </section>
      </div>
    </main>
    </div>
  );
}
