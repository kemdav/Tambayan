"use client";
import { useState } from "react";

// Minimal StudentCard component with menu
function StudentCard({ student }: { student: { name: string; email: string; course: string; year: string } }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="border rounded-lg p-4 shadow-sm mb-4 bg-white relative">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold text-lg">{student.name}</div>
          <div className="text-gray-600 text-sm">{student.email}</div>
          <div className="text-gray-500 text-sm">{student.course} &middot; Year {student.year}</div>
        </div>
        <div className="relative">
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Open menu"
          >
            <span className="text-xl">&#8942;</span>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
              <button
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => {
                  setMenuOpen(false);
                  alert(`Reset password for ${student.name} to default.`);
                }}
              >
                Reset Password to Default
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Mock student data
const mockStudents = [
  { name: "Alice Johnson", email: "alice@school.edu", course: "BS Computer Science", year: "3" },
  { name: "Bob Smith", email: "bob@school.edu", course: "BS Mathematics", year: "2" },
  { name: "Carol Lee", email: "carol@school.edu", course: "BS Physics", year: "4" },
  { name: "Carol Lee", email: "carol@school.edu", course: "BS Physics", year: "4" },
  { name: "Carol Lee", email: "carol@school.edu", course: "BS Physics", year: "4" },
  { name: "Carol Lee", email: "carol@school.edu", course: "BS Physics", year: "4" },
  { name: "Carol Lee", email: "carol@school.edu", course: "BS Physics", year: "4" },
  { name: "Carol Lee", email: "carol@school.edu", course: "BS Physics", year: "4" },
  { name: "Carol Lee", email: "carol@school.edu", course: "BS Physics", year: "4" },
  { name: "Carol Lee", email: "carol@school.edu", course: "BS Physics", year: "4" },
  { name: "Carol Lee", email: "carol@school.edu", course: "BS Physics", year: "4" },
  { name: "Carol Lee", email: "carol@school.edu", course: "BS Physics", year: "4" },
  { name: "Carol Lee", email: "carol@school.edu", course: "BS Physics", year: "4" },
  { name: "Carol Lee", email: "carol@school.edu", course: "BS Physics", year: "4" },
];

export default function AdminStudentsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const studentsPerPage = 10;

  const filteredStudents = mockStudents.filter(
    s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (page - 1) * studentsPerPage,
    page * studentsPerPage
  );

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-50">
      <div className="w-full max-w-[1089px] mx-auto mb-6 bg-white p-6 border rounded-[10px] shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800">
          Students
        </h1>
      </div>
      <div className="w-full max-w-[1089px] mx-auto bg-white border rounded-[10px] shadow-sm p-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="mb-6 w-full p-2 border rounded focus:outline-none focus:ring"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPage(1); // Reset to first page on search
          }}
        />
        {paginatedStudents.length === 0 ? (
          <div className="text-gray-500">No students found.</div>
        ) : (
          paginatedStudents.map((student, idx) => <StudentCard key={idx + (page-1)*studentsPerPage} student={student} />)
        )}
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={handlePrev}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="mx-2">Page {page} of {totalPages}</span>
          <button
            className="px-3 py-1 border rounded disabled:opacity-50"
            onClick={handleNext}
            disabled={page === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
} 