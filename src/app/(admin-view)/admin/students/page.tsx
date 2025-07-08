"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAdminUser } from "../AdminUserContext";

// Minimal StudentCard component with menu
function StudentCard({ student }: { student: any }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resetting, setResetting] = useState(false);

  async function handleResetPassword() {
    setResetting(true);
    try {
      const res = await fetch('/api/reset-student-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: student.user_id }),
      });
      const result = await res.json();
      if (result.success) {
        alert(`Password for ${student.fname} ${student.lname} has been reset to default (123456).`);
      } else {
        alert(`Failed to reset password: ${result.error || 'Unknown error'}`);
      }
    } catch (err) {
      alert('An error occurred while resetting the password.');
    } finally {
      setResetting(false);
      setMenuOpen(false);
    }
  }

  return (
    <div className="border rounded-lg p-4 shadow-sm mb-4 bg-white relative">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold text-lg">{student.fname} {student.lname}</div>
          <div className="text-gray-600 text-sm">{student.email}</div>
          <div className="text-gray-500 text-sm">{student.course} &middot; Year {student.yearlevel}</div>
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
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 disabled:opacity-50"
                onClick={handleResetPassword}
                disabled={resetting}
              >
                {resetting ? 'Resetting...' : 'Reset Password to Default'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminStudentsPage() {
  const { user, loading } = useAdminUser();
  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const studentsPerPage = 10;

  useEffect(() => {
    if (!user || loading) return;
    const supabase = createClient();
    const universityid = user.user_metadata?.universityid;
    if (!universityid) return;
    supabase
      .from("student")
      .select("*")
      .eq("universityid", universityid)
      .then(({ data, error }) => {
        if (!error) setStudents(data || []);
      });
  }, [user, loading]);

  const filteredStudents = students.filter(
    s =>
      (`${s.fname} ${s.lname}`.toLowerCase().includes(search.toLowerCase()) ||
      (s.email || "").toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (page - 1) * studentsPerPage,
    page * studentsPerPage
  );

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  if (loading) return <div className="text-gray-500">Loading...</div>;
  if (!user?.user_metadata?.universityid) return <div className="text-red-500">You do not have access to view students.</div>;

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
          paginatedStudents.map((student, idx) => <StudentCard key={student.studentid} student={student} />)
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