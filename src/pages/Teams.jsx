

import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [assignData, setAssignData] = useState({ teamId: "", employeeId: "" });
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    try {
      const t = await api.get("/teams");
      setTeams(t.data);
      const e = await api.get("/employees");
      setEmployees(e.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const createTeam = async () => {
    try {
      await api.post("/teams", form);
      setForm({ name: "", description: "" });
      load();
    } catch (e) {
      console.error(e);
      alert("Team creation failed");
    }
  };

  const startEdit = (team) => {
    setEditingId(team.id);
    setForm({ name: team.name, description: team.description || "" });
  };

  const updateTeam = async () => {
    try {
      await api.put(`/teams/${editingId}`, form);
      setEditingId(null);
      setForm({ name: "", description: "" });
      load();
    } catch (e) {
      console.error(e);
      alert("Update failed");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", description: "" });
  };

  const deleteTeam = async (id) => {
    if (!window.confirm("Delete this team?")) return;
    try {
      await api.delete(`/teams/${id}`);
      load();
    } catch (e) {
      console.error(e);
    }
  };

  const assignEmployee = async () => {
    if (!assignData.teamId || !assignData.employeeId)
      return alert("Select both fields");

    try {
      await api.post(`/teams/${assignData.teamId}/assign`, {
        employeeId: assignData.employeeId,
      });
      setAssignData({ teamId: "", employeeId: "" });
      load();
    } catch (e) {
      console.error(e);
      alert("Assign failed");
    }
  };

  const unassignEmployee = async (teamId, empId) => {
    try {
      await api.post(`/teams/${teamId}/unassign`, { employeeId: empId });
      load();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-[#007E6E]">Teams</h1>
      
      <div className="bg-[#D7C097] p-4 sm:p-6 md:p-8 rounded-xl shadow-md mb-6">
        <h2 className="mb-4 text-[#007E6E] font-semibold text-lg sm:text-xl">
          {editingId ? "Edit Team" : "Create Team"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            placeholder="Team Name"
            className="w-full p-2 sm:p-3 rounded border border-[#007E6E] focus:ring-2 focus:ring-[#73AF6F] outline-none text-sm sm:text-base"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="w-full p-2 sm:p-3 rounded border border-[#007E6E] focus:ring-2 focus:ring-[#73AF6F] outline-none text-sm sm:text-base"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {editingId ? (
          <div className="mt-3 flex flex-col sm:flex-row gap-3">
            <button
              onClick={updateTeam}
              className="w-full sm:w-auto px-4 py-2 bg-[#73AF6F] hover:bg-[#007E6E] text-[#E7DEAF] rounded shadow transition-colors"
            >
              Update
            </button>
            <button
              onClick={cancelEdit}
              className="w-full sm:w-auto px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded shadow"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={createTeam}
            className="mt-3 w-full sm:w-auto px-4 py-2 bg-[#73AF6F] hover:bg-[#007E6E] text-[#E7DEAF] rounded shadow transition-colors"
          >
            Create
          </button>
        )}
      </div>

      <div className="bg-[#D7C097] p-4 sm:p-6 md:p-8 rounded-xl shadow-md mb-6">
        <h2 className="mb-4 text-[#007E6E] font-semibold text-lg sm:text-xl">Assign Employee</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <select
            value={assignData.teamId}
            onChange={(e) =>
              setAssignData({ ...assignData, teamId: e.target.value })
            }
            className="w-full p-2 sm:p-3 rounded border border-[#007E6E] focus:ring-2 focus:ring-[#73AF6F] outline-none text-sm sm:text-base"
          >
            <option value="">Select Team</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <select
            value={assignData.employeeId}
            onChange={(e) =>
              setAssignData({ ...assignData, employeeId: e.target.value })
            }
            className="w-full p-2 sm:p-3 rounded border border-[#007E6E] focus:ring-2 focus:ring-[#73AF6F] outline-none text-sm sm:text-base"
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.first_name} {emp.last_name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={assignEmployee}
          className="mt-3 w-full sm:w-auto px-4 py-2 bg-[#73AF6F] hover:bg-[#007E6E] text-[#E7DEAF] rounded shadow transition-colors"
        >
          Assign
        </button>
      </div>

      <div className="bg-[#D7C097] p-4 sm:p-6 md:p-8 rounded-xl shadow-md overflow-x-auto">
        <h2 className="mb-4 text-[#007E6E] font-semibold text-lg sm:text-xl">Team List</h2>

        <table className="w-full text-[#007E6E] text-sm sm:text-base">
          <thead>
            <tr className="border-b border-[#007E6E]">
              <th className="py-2 text-left">Name</th>
              <th className="py-2 text-left">Description</th>
              <th className="py-2 text-left">Members</th>
              <th className="py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr
                key={team.id}
                className="border-b border-[#007E6E] hover:bg-[#73AF6F]/20 transition-colors"
              >
                <td className="py-2">{team.name}</td>
                <td className="py-2">{team.description || "—"}</td>
                <td className="py-2 flex flex-wrap gap-1">
                  {team.members.map((m) => (
                    <span
                      key={m.id}
                      className="px-2 py-1 bg-[#E7DEAF] rounded text-[#007E6E] text-xs sm:text-sm"
                    >
                      {m.first_name} {m.last_name}
                    </span>
                  ))}
                </td>
                <td className="py-2 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => startEdit(team)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTeam(team.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
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
