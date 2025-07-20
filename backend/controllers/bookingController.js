const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');
const estimateDuration = require('../utils/duration');

exports.bookVehicle = async (req, res) => {
  try {
    const { vehicleId, fromPincode, toPincode, startTime, customerId } = req.body;

    // Validate inputs
    if (!vehicleId || !fromPincode || !toPincode || !startTime || !customerId) {
      return res.status(400).json({ message: 'All booking fields are required' });
    }

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    const start = new Date(startTime);
    if (isNaN(start.getTime())) {
      return res.status(400).json({ message: 'Invalid startTime format' });
    }

    const estimatedRideDurationHours = estimateDuration(fromPincode, toPincode);
    const end = new Date(start);
    end.setHours(start.getHours() + estimatedRideDurationHours);

    const conflict = await Booking.findOne({
      vehicleId,
      startTime: { $lt: end },
      endTime: { $gt: start },
    });

    if (conflict) {
      return res.status(409).json({ message: 'Vehicle already booked during that time' });
    }

    const booking = await Booking.create({
      vehicleId,
      fromPincode,
      toPincode,
      startTime: start,
      endTime: end,
      customerId,
    });

    return res.status(201).json(booking);
  } catch (err) {
    console.error('Error in bookVehicle:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
