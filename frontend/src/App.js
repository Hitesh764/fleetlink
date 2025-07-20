import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AddVehicle from './components/AddVehicle';
import SearchAndBook from './components/SearchAndBook';

import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <Router>
      <div className="max-w-4xl mx-auto p-6">
      <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Navigate to="/add-vehicle" />} />
          <Route path="/add-vehicle" element={<AddVehicle />} />
          <Route path="/search-book" element={<SearchAndBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
