import Sidebar from "@/components/sidebar/sidebar";

export default function PrescriptionPatient() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <main className="ml-64 overflow-y-auto flex-1 p-10 max-w-5xl mx-auto">
                Add presciption here
            </main>
        </div>
    )
}
