const express = require('express');
const cors = require('cors');

const vehicleRoutes = require('./routes/vehicleRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);

module.exports = app;
