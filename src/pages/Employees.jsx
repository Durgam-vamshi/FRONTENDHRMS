

import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("http://localhost:5000/api/employees");
      console.log(res, "Resdata from employees")
      setEmployees(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    try {
      await api.post("/employees", form);
      setForm({ first_name: "", last_name: "", email: "", phone: "" });
      load();
    } catch (e) {
      console.error(e);
      alert(e.response?.data?.error || "Create failed");
    }
  };

  const startEdit = (emp) => {
    setEditingId(emp.id);
    setForm({
      first_name: emp.first_name,
      last_name: emp.last_name,
      email: emp.email,
      phone: emp.phone,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ first_name: "", last_name: "", email: "", phone: "" });
  };

  const update = async () => {
    try {
      await api.put(`/employees/${editingId}`, form);
      setEditingId(null);
      setForm({ first_name: "", last_name: "", email: "", phone: "" });
      load();
    } catch (e) {
      console.error(e);
      alert(e.response?.data?.error || "Update failed");
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete employee?")) return;
    try {
      await api.delete(`/employees/${id}`);
      load();
    } catch (e) {
      console.error(e);
      alert("Delete failed");
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-[#007E6E] text-center sm:text-left">Employees</h1>

      <div className="bg-[#D7C097] p-4 sm:p-6 md:p-6 rounded-xl shadow-md mb-6">
        <h2 className="mb-4 text-[#007E6E] font-semibold text-lg sm:text-xl">
          {editingId ? "Edit Employee" : "Add Employee"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
          {["first_name", "last_name", "email", "phone"].map((field) => (
            <input
              key={field}
              placeholder={field.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              className="p-2 sm:p-3 rounded border border-[#007E6E] focus:ring-2 focus:ring-[#73AF6F] outline-none text-sm sm:text-base w-full"
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          ))}
        </div>

        {editingId ? (
          <div className="mt-3 flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              onClick={update}
              className="px-4 py-2 bg-[#73AF6F] hover:bg-[#007E6E] text-[#E7DEAF] rounded shadow transition-colors text-sm sm:text-base w-full sm:w-auto"
            >
              Update
            </button>
            <button
              onClick={cancelEdit}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded shadow transition-colors text-sm sm:text-base w-full sm:w-auto"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={create}
            className="mt-3 px-4 py-2 bg-[#73AF6F] hover:bg-[#007E6E] text-[#E7DEAF] rounded shadow transition-colors text-sm sm:text-base w-full sm:w-auto"
          >
            Create
          </button>
        )}
      </div>

      <div className="bg-[#D7C097] p-4 sm:p-6 md:p-6 rounded-xl shadow-md overflow-x-auto">
        <h2 className="mb-4 text-[#007E6E] font-semibold text-lg sm:text-xl">
          Employee List {loading && <span className="text-sm sm:text-base">Loading...</span>}
        </h2>

        <table className="w-full text-[#007E6E] text-sm sm:text-base min-w-[500px] md:min-w-full">
          <thead>
            <tr className="border-b border-[#007E6E]">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Email</th>
              <th className="text-left py-2">Phone</th>
              <th className="text-left py-2">Teams</th>
              <th className="py-2"></th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-b border-[#007E6E] hover:bg-[#73AF6F]/20 transition-colors">
                <td className="py-2">{emp.first_name} {emp.last_name}</td>
                <td className="py-2">{emp.email}</td>
                <td className="py-2">{emp.phone}</td>
                <td className="py-2 flex flex-wrap gap-1">
                  {emp.teams?.map((t) => (
                    <span
                      key={t.team_id}
                      className="px-2 py-1 bg-[#E7DEAF] rounded text-[#007E6E] text-xs sm:text-sm"
                    >
                      {t.team_name}
                    </span>
                  ))}
                </td>
                <td className="py-2 flex flex-col sm:flex-row gap-1 sm:gap-3">
                  <button
                    onClick={() => startEdit(emp)}
                    className="text-blue-600 hover:text-blue-800 transition-colors text-xs sm:text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(emp.id)}
                    className="text-red-600 hover:text-red-800 transition-colors text-xs sm:text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
