const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');
const estimateDuration = require('../utils/duration');

exports.addVehicle = async (req, res) => {
  try {
    const { name, capacityKg, tyres } = req.body;
    if (!name || !capacityKg || !tyres)
      return res.status(400).json({ message: 'All fields required' });

    const vehicle = await Vehicle.create({ name, capacityKg, tyres });
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getAvailableVehicles = async (req, res) => {
  try {
    const { capacityRequired, fromPincode, toPincode, startTime } = req.query;

    // Validate required fields
    if (!capacityRequired || !fromPincode || !toPincode || !startTime) {
      return res.status(400).json({ message: 'All query parameters are required' });
    }

    const start = new Date(startTime);
    if (isNaN(start.getTime())) {
      return res.status(400).json({ message: 'Invalid startTime format' });
    }

    const estimatedRideDurationHours = estimateDuration(fromPincode, toPincode);
    const end = new Date(start);
    end.setHours(start.getHours() + estimatedRideDurationHours);

    const candidates = await Vehicle.find({ capacityKg: { $gte: capacityRequired } });
    const availableVehicles = [];

    for (let vehicle of candidates) {
      const conflict = await Booking.findOne({
        vehicleId: vehicle._id,
        startTime: { $lt: end },
        endTime: { $gt: start },
      });

      if (!conflict) {
        availableVehicles.push({
          ...vehicle.toObject(),
          estimatedRideDurationHours,
        });
      }
    }

    return res.status(200).json(availableVehicles);
  } catch (err) {
    console.error('Error in getAvailableVehicles:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
