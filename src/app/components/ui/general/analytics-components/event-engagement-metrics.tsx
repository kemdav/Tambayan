"use client";

interface Props {
  avgComments: string;
  avgLikes: string;
  avgRegistrations: string;
}

export default function EventEngagementMetrics({
  avgComments,
  avgLikes,
  avgRegistrations,
}: Props) {
  return (
    <div className="border rounded-lg p-4 w-full max-w-full bg-white shadow-sm mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold text-muted-foreground">
          Event Engagement Metrics
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-muted p-4 rounded border bg-gray-200">
          <p className="text-xs text-muted-foreground">Avg. Comments</p>
          <p className="text-lg font-semibold text-gray-900">{avgComments}</p>
        </div>

        <div className="bg-muted p-4 rounded border bg-gray-200">
          <p className="text-xs text-muted-foreground">Avg. Likes</p>
          <p className="text-lg font-semibold text-gray-900">{avgLikes}</p>
        </div>

        <div className="bg-muted p-4 rounded border bg-gray-200">
          <p className="text-xs text-muted-foreground">Avg. Registrations</p>
          <p className="text-lg font-semibold text-gray-900">
            {avgRegistrations}
          </p>
        </div>
      </div>
    </div>
  );
}
