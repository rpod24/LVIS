// server/middleware/errorHandler.js
module.exports = (err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Server error" });
};
