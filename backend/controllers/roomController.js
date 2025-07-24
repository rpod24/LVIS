const Room = require("../models/Room");

exports.addRoom = async (req, res, next) => {
  try {
    const manifest = await Manifest.findById(req.params.id);
    const newRoom  = manifest.roomList.create(req.body);
    manifest.roomList.push(newRoom);
    await manifest.save();
    res.status(201).json(newRoom);
  } catch (err) { next(err); }
};

exports.updateRoom = async (req, res, next) => {
  try{
    const filter = req.query.facility ? { facility: req.query.facility } : {};
    const rooms = await Room.find(filter);
    res.json(rooms);
  }
  catch (err) {
    next(err);
  }
}

exports.getRooms = async (req, res, next) => {
  try {
    const filter = req.query.facility ? { facility: req.query.facility } : {};
    const rooms = await Room.find(filter);
    res.json(rooms);
  } catch (err) {
    next(err);
  }
}