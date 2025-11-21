





import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    employees: 0,
    teams: 0,
    departments: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard/stats");
        if (res?.data) {
          setStats({
            employees: res.data.employees,
            teams: res.data.teams,
            departments: res.data.departments,
          });
        }
      } catch (error) {
        console.error(error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const card = (label, value) => (
    <div className="bg-[#D7C097] p-4 sm:p-6 md:p-6 rounded-xl shadow-md text-center transition-shadow hover:shadow-[#73AF6F]">
      <p className="text-[#007E6E] font-medium text-sm sm:text-base">{label}</p>
      <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold mt-2 text-[#007E6E]">{value}</h2>
    </div>
  );

  if (loading) {
    return (
      <div className="text-center py-10 text-[#007E6E] text-sm sm:text-base">
        Loading dashboard…
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-[#007E6E] text-center sm:text-left">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {card("Total Employees", stats.employees)}
        {card("Total Teams", stats.teams)}
        {card("Departments", stats.departments)}
      </div>
    </div>
  );
}
