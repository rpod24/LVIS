exports.addRoom = async (req, res, next) => {
  try {
    const manifest = await Manifest.findById(req.params.id);
    const newRoom  = manifest.roomList.create(req.body); // Mongoose sub-doc helper
    manifest.roomList.push(newRoom);
    await manifest.save();
    res.status(201).json(newRoom);   // send { _id, roomNumber, … }
  } catch (err) { next(err); }
};
