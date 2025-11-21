


import React, { useState, useEffect } from "react";
import api from "../../utils/api";

const TeamForm = ({ teamId, onSuccess }) => {
  const [team, setTeam] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (teamId) {
      fetchTeam();
    }
  }, [teamId]);

  const fetchTeam = async () => {
    try {
      const res = await api.get(`/teams/${teamId}`);
      setTeam({
        name: res.data.name,
        description: res.data.description || "",
      });
    } catch (err) {
      console.error("Failed to load team", err);
    }
  };

  const handleChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (teamId) {
        await api.put(`/teams/${teamId}`, team);
      } else {
        await api.post("/teams", team);
      }

      onSuccess();
    } catch (err) {
      console.error("Failed to save team", err);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-full sm:max-w-md md:max-w-lg mx-auto">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center sm:text-left">
        {teamId ? "Edit Team" : "Create New Team"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium text-sm sm:text-base">Team Name</label>
          <input
            type="text"
            name="name"
            value={team.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-sm sm:text-base">Description</label>
          <textarea
            name="description"
            value={team.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring focus:ring-blue-300 text-sm sm:text-base"
            rows="3"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-300 text-sm sm:text-base"
        >
          {loading ? "Saving..." : teamId ? "Update Team" : "Create Team"}
        </button>
      </form>
    </div>
  );
};

export default TeamForm;
