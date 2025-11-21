


import React, { useState, useEffect } from "react";
import api from "../../services/api";

export default function EmployeeForm({ employee, onSuccess, onClose }) {
  const isEdit = Boolean(employee);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    if (isEdit) {
      setForm({
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
        phone: employee.phone
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await api.put(`/employees/${employee.id}`, form);
      } else {
        await api.post("/employees", form);
      }
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error saving employee");
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 w-full max-w-lg mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left">
        {isEdit ? "Edit Employee" : "Add New Employee"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full p-2 sm:p-3 border rounded"
          required
        />

        <input
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full p-2 sm:p-3 border rounded"
          required
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          type="email"
          className="w-full p-2 sm:p-3 border rounded"
          required
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 sm:p-3 border rounded"
          required
        />

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
          >
            {isEdit ? "Update" : "Create"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 w-full sm:w-auto"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}
