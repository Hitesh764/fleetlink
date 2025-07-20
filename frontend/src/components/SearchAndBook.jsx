import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function SearchAndBook() {
  const [form, setForm] = useState({
    capacityRequired: '',
    fromPincode: '',
    toPincode: '',
    startTime: '',
  });
  const [vehicles, setVehicles] = useState([]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const searchVehicles = async () => {
    const params = new URLSearchParams(form).toString();
    try {
      const res = await axios.get(`http://localhost:5000/api/vehicles/available?${params}`);
      setVehicles(res.data);
      if (res.data.length === 0) {
        toast.error('❌ No vehicles available for the selected time and route');
      } else {
        toast.success('✅ Available vehicles loaded');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error while searching vehicles');
    }
  };

  const bookVehicle = async (vehicleId) => {
    try {
      await axios.post('http://localhost:5000/api/bookings', {
        vehicleId,
        ...form,
        customerId: 'demo123',
      });
      toast.success('✅ Booking successful!');
    } catch (err) {
      toast.error(err.response?.data?.message || '❌ Booking failed');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Search and Book Vehicle</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input name="capacityRequired" placeholder="Capacity Required" onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2" />
        <input name="fromPincode" placeholder="From Pincode" onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2" />
        <input name="toPincode" placeholder="To Pincode" onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2" />
        <input name="startTime" type="datetime-local" onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2" />
      </div>

      <button onClick={searchVehicles}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Search Availability</button>

      <div className="mt-6 space-y-4">
        {vehicles.map((v) => (
          <div key={v._id} className="border border-gray-200 p-4 rounded shadow-sm bg-gray-50">
            <h3 className="text-lg font-semibold">{v.name}</h3>
            <p>Capacity: {v.capacityKg}kg</p>
            <p>Tyres: {v.tyres}</p>
            <p>Duration: {v.estimatedRideDurationHours} hours</p>
            <button onClick={() => bookVehicle(v._id)}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
