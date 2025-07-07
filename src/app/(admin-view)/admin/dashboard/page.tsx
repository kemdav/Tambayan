import DashboardCombined from "@/app/components/ui/general/dashboard-components/dashboard-combined";

export default function DashboardPage() {
  return (
    <div className="p-6">
      {/* Header Card */}
      <div className="w-full max-w-[1089px] mx-auto mb-6">
        <div className="border rounded-lg p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            School Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Monitor and manage school organizations, events, and analytics
          </p>
        </div>
      </div>

      <DashboardCombined />
    </div>
  );
}
