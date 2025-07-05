import AnalyticsCombined from "@/app/components/ui/general/analytics-components/analytics";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen px-4 py-6 bg-gray-50">
      {/* Header Card */}
      <div className="w-full max-w-[1089px] mx-auto mb-6 bg-white p-6 border rounded-[10px] shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800">Analytics Page</h1>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[1089px] mx-auto bg-white border rounded-[10px] shadow-sm p-6">
        <AnalyticsCombined />
      </div>
    </div>
  );
}
