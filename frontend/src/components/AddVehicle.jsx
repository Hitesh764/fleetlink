import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AddVehicle() {
  const [form, setForm] = useState({ name: '', capacityKg: '', tyres: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/vehicles', form);
      toast.success('✅ Vehicle added successfully');
      setForm({ name: '', capacityKg: '', tyres: '' }); // clear form
    } catch (err) {
      toast.error(err.response?.data?.message || '❌ Something went wrong');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">🚛 Add New Vehicle</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="name"
          value={form.name}
          placeholder="Vehicle Name"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="capacityKg"
          value={form.capacityKg}
          placeholder="Capacity (KG)"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="tyres"
          value={form.tyres}
          placeholder="Number of Tyres"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          ➕ Add Vehicle
        </button>
      </form>
    </div>
  );
}
