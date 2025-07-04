"use client";

interface Props {
  mostAttendedEvent: string;
  highestEngagementOrg: string;
  averageFeedbackScore: string;
}

export default function EventEngagementMetrics({
  mostAttendedEvent,
  highestEngagementOrg,
  averageFeedbackScore,
}: Props) {
  return (
    <div className="border rounded-lg p-4 w-full max-w-full bg-white shadow-sm mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold text-muted-foreground">
          Event Engagement Metrics
        </h2>
        <button
          className="text-sm text-green-700 hover:underline cursor-pointer"
          onClick={() => console.log("Clicked")}
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-muted p-4 rounded border bg-gray-200">
          <p className="text-xs text-muted-foreground">Most Attended Event</p>
          <p className="text-lg font-semibold text-gray-900">
            {mostAttendedEvent}
          </p>
        </div>

        <div className="bg-muted p-4 rounded border bg-gray-200">
          <p className="text-xs text-muted-foreground">
            Highest Engagement Org
          </p>
          <p className="text-lg font-semibold text-gray-900">
            {highestEngagementOrg}
          </p>
        </div>

        <div className="bg-muted p-4 rounded border bg-gray-200">
          <p className="text-xs text-muted-foreground">Avg. Feedback Score</p>
          <p className="text-lg font-semibold text-gray-900">
            {averageFeedbackScore} / 5
          </p>
        </div>
      </div>
    </div>
  );
}
