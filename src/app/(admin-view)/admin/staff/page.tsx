"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAdminUser } from "../AdminUserContext";

// Minimal StaffCard component with menu
function StaffCard({ staff }: { staff: any }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="border rounded-lg p-4 shadow-sm mb-4 bg-white relative">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold text-lg">{staff.name}</div>
          <div className="text-gray-600 text-sm">{staff.email}</div>
          <div className="text-gray-500 text-sm">{staff.role}</div>
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
                  alert(`Reset password for ${staff.name} to default.`);
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

export default function AdminStaffPage() {
  const { user, loading: userLoading } = useAdminUser();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: "", email: "", role: "TSG" });
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const staffPerPage = 10;

  // Fetch staff from Supabase for this university
  useEffect(() => {
    if (!user || userLoading) return;
    const fetchStaff = async () => {
      setLoading(true);
      const supabase = createClient();
      const universityid = user.user_metadata?.universityid;
      if (!universityid) return setLoading(false);
      const { data, error } = await supabase.from("staff").select().eq("universityid", universityid);
      if (!error && data) {
        setStaff(data.map((s: any) => ({
          name: s.name || s.email || "(No Name)",
          email: s.email,
          role: s.position || "TSG",
        })));
      }
      setLoading(false);
    };
    fetchStaff();
  }, [user, userLoading]);

  // Add staff to Supabase for this university
  const handleAddStaff = async () => {
    if (!newStaff.name || !newStaff.email || !user?.user_metadata?.universityid) return;
    setLoading(true);
    const supabase = createClient();
    const universityid = user.user_metadata.universityid;
    // 1. Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: newStaff.email,
      password: "123456",
      options: {
        data: {
          name: newStaff.name,
          universityid,
          role: newStaff.role,
        },
      },
    });
    if (authError) {
      setLoading(false);
      alert("Failed to create staff in Auth: " + authError.message);
      return;
    }
    // 2. Insert into staff table
    const { error } = await supabase.from("staff").insert({
      name: newStaff.name,
      email: newStaff.email,
      position: newStaff.role,
      universityid,
      // Optionally add more fields if needed
    });
    setShowAddModal(false);
    setNewStaff({ name: "", email: "", role: "TSG" });
    // Refresh staff list
    const { data } = await supabase.from("staff").select().eq("universityid", universityid);
    if (data) {
      setStaff(data.map((s: any) => ({
        name: s.name || s.email || "(No Name)",
        email: s.email,
        role: s.position || "TSG",
      })));
    }
    setLoading(false);
  };

  const filteredStaff = staff.filter(
    s =>
      (s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.email || "").toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredStaff.length / staffPerPage);
  const paginatedStaff = filteredStaff.slice(
    (page - 1) * staffPerPage,
    page * staffPerPage
  );

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  if (userLoading) return <div className="text-gray-500">Loading...</div>;
  if (!user?.user_metadata?.universityid) return <div className="text-red-500">You do not have access to view staff.</div>;

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-50 relative">
      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
              onClick={() => setShowAddModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">Add Staff</h2>
            <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleAddStaff(); }}>
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={newStaff.name}
                  onChange={e => setNewStaff(s => ({ ...s, name: e.target.value }))}
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded"
                  value={newStaff.email}
                  onChange={e => setNewStaff(s => ({ ...s, email: e.target.value }))}
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Position</label>
                <select
                  className="w-full px-3 py-2 border rounded"
                  value={newStaff.role}
                  onChange={e => setNewStaff(s => ({ ...s, role: e.target.value }))}
                >
                  <option value="TSG">TSG</option>
                </select>
              </div>
              <button
                type="submit"
                className="mt-4 bg-action-moss-green text-white font-bold py-2 rounded hover:bg-action-forest-green transition"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Staff"}
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="w-full max-w-[1089px] mx-auto mb-6 bg-white p-6 border rounded-[10px] shadow-sm flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Staff</h1>
        <button
          className="bg-action-moss-green text-white font-bold px-5 py-2 rounded hover:bg-action-forest-green transition"
          onClick={() => setShowAddModal(true)}
        >
          + Add Staff
        </button>
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
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : paginatedStaff.length === 0 ? (
          <div className="text-gray-500">No staff found.</div>
        ) : (
          paginatedStaff.map((staff, idx) => <StaffCard key={staff.email} staff={staff} />)
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