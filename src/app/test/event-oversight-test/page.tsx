"use client";

import AllEventOversights from "@/app/components/ui/event-oversight-components/all-event-oversights";

export default function WikiOversightTest() {
  const eventData = [
    {
      eventName: "Tech Symposium",
      organization: "Computer Science Org",
      date: "Oct 12, 2005",
      location: "Main Auditorium",
      status: "Upcoming",
      onClickView: () => console.log("View Event"),
      onClickEdit: () => console.log("Edit Event"),
    },
    {
      eventName: "Design Jam",
      organization: "Design Club",
      date: "Nov 5, 2005",
      location: "Hall B",
      status: "Completed",
      onClickView: () => console.log("View Event"),
      onClickEdit: () => console.log("Edit Event"),
    },
  ];
  const status = [
    {
      label: "Upcoming",
      bgColor: "bg-green-100",
      textColor: "text-green-800",
    },
    {
      label: "Completed",
      bgColor: "bg-gray-100",
      textColor: "text-gray-700",
    },
  ];
  const items = [
    { value: "tambayan1", label: "Tambayan1" },
    { value: "tambayan2", label: "Tambayan2" },
    { value: "tambayan3", label: "Tambayan3" },
  ];

  return (
    <div className="flex flex-col px-4 py-4 gap-4 w-full">
      <AllEventOversights
        tableData={eventData}
        statuses={status}
        options={items}
      />
      {/* Props : nameOversight, nameFilter, placeholder, options[value,label], onClickButton, tableData[eventName,organization,date,location,status,action], statuses=[label,bgColor,textColor]*/}
    </div>
  );
}
