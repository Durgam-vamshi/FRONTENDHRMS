
import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Logs() {
  const [logs, setLogs] = useState([]);

  const load = async (params) => {
    try {
      const res = await api.get("/logs", { params });
      setLogs(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6 w-full overflow-x-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 text-[#007E6E] text-center sm:text-left">
        Activity Logs
      </h1>

      <div className="bg-[#D7C097] p-4 sm:p-6 md:p-6 rounded-xl shadow-md overflow-x-auto">
        <table className="w-full text-[#007E6E] min-w-[500px] md:min-w-full text-sm sm:text-base">
          <thead>
            <tr className="border-b border-[#007E6E]">
              <th className="py-2 text-left">Time</th>
              <th className="py-2 text-left">User</th>
              <th className="py-2 text-left">Action</th>
              <th className="py-2 text-left">Meta</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l) => (
              <tr
                key={l.id}
                className="border-b border-[#007E6E] hover:bg-[#73AF6F]/20 transition-colors"
              >
                <td className="py-2">{l.timestamp}</td>
                <td className="py-2">{l.user_id}</td>
                <td className="py-2">{l.action}</td>
                <td className="py-2">
                  <pre className="text-xs sm:text-sm whitespace-pre-wrap bg-[#E7DEAF] p-2 rounded">
                    {JSON.stringify(l.meta, null, 2)}
                  </pre>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


