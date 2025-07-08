import React from "react";
import { Input } from "@/app/components/ui/general/input/input";
import { Button } from "@/app/components/ui/general/button";
import SearchBar from "@/app/components/ui/student-view-ui/search-bar";
import { useState } from "react";

interface MemberCard {
  firstname: string;
  lastname: string;
  course: string;
  yearlvl: string;
  studentid: string;
}

interface CreateOrgAdminComponentsProps {
  orgName: string;
  onOrgNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onCreate: () => void;
  students?: MemberCard[];
  assignedStudentId: string | null;
  setAssignedStudentId: (id: string | null) => void;
}

export default function CreateOrgAdminComponents({
  orgName,
  onOrgNameChange,
  onCancel,
  onCreate,
  students = [],
  assignedStudentId,
  setAssignedStudentId,
}: CreateOrgAdminComponentsProps) {
  const [search, setSearch] = useState("");
  const filteredCards = students.filter(
    (card) =>
      card.firstname.toLowerCase().includes(search.toLowerCase()) ||
      card.lastname.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-[1089px] mx-auto mt-8">
      {/* Header Card styled like Campus Analytics */}
      <div className="w-full mb-6 bg-white p-6 border rounded-[10px] shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">
          Create New Organization
        </h1>
      </div>
      {/* Form Card */}
      <div className="w-full bg-white rounded-xl shadow-md p-8 border rounded-[10px] min-h-[600px]">
        <h2 className="text-2xl font-bold mb-6">Create New Organization</h2>
        <div className="mb-6">
          <label className="block font-semibold mb-1">Organization Name</label>
          <Input
            placeholder="Enter organization name"
            value={orgName}
            onChange={onOrgNameChange}
          />
        </div>
        {/* Scrollable Member Cards Card */}
        <div className="mb-6">
          <div className="bg-gray-50 border rounded-lg p-4 max-h-[350px] min-h-[200px] overflow-y-auto">
            <div className="font-semibold mb-2">Assign as President</div>
            <div className="mb-2">
              <Input
                placeholder="Search by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                rightIcon={
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                }
              />
            </div>
            {filteredCards.length === 0 ? (
              <div className="text-gray-400 text-sm">No members yet.</div>
            ) : (
              <div className="space-y-2">
                {filteredCards.map((card) => {
                  const isAssigned = assignedStudentId === card.studentid;
                  return (
                    <div
                      key={card.studentid}
                      className="bg-white border rounded-md p-3 flex flex-row items-center shadow-sm justify-between"
                    >
                      <div className="flex flex-col">
                        <div className="font-medium">
                          {card.firstname} {card.lastname}
                        </div>
                        <div className="text-xs text-gray-600">
                          Course: {card.course}
                        </div>
                        <div className="text-xs text-gray-600">
                          Year Level: {card.yearlvl}
                        </div>
                      </div>
                      <Button
                        variant={isAssigned ? "outline" : "default"}
                        className={
                          isAssigned
                            ? "bg-green-500 hover:bg-green-600 text-white border-green-500"
                            : ""
                        }
                        type="button"
                        onClick={() => {
                          if (isAssigned) {
                            setAssignedStudentId(null);
                            console.log(
                              `Unassigned: ${card.firstname} ${card.lastname}`
                            );
                          } else {
                            setAssignedStudentId(card.studentid);
                            console.log(
                              `Assign: ${card.firstname} ${card.lastname}`
                            );
                          }
                        }}
                      >
                        {isAssigned ? "Assigned" : "Assign"}
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button variant="default" onClick={onCreate} type="button">
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}
