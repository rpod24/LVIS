/**
 * server/server.js
 * --------------------------------------------------
 * • Loads environment variables (.env)
 * • Connects to MongoDB with Mongoose
 * • Registers all API routes  (facilities, manifests, assemblies)
 * • Adds CORS + JSON body-parsing
 * • Central error handler
 * --------------------------------------------------
 */

require("dotenv").config();
const requestLogger = require('./middleware/requestLogger');

const express   = require("express");
const mongoose  = require("mongoose");
const cors      = require("cors");
const morgan    = require("morgan");

const manifestRoutes     = require("./routes/manifestRoutes");
const transmitterRoutes  = require("./routes/transmitterRoutes");
const cmsRoutes          = require("./routes/cmsRoutes");
const medRoutes          = require("./routes/medRoutes");
const locationRoutes     = require("./routes/locationRoutes");
const groupRoutes     = require("./routes/groupRoutes");
const facilityRoutes     = require("./routes/facilityRoutes");
const errorHandler       = require("./middleware/errorHandler");

const app = express();
app.use(requestLogger);

/* ---------- global middleware ---------- */
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));

/* ---------- API routes ---------- */
app.use("/api/facilities",    facilityRoutes);
app.use("/api/manifests",     manifestRoutes);
app.use("/api/transmitters",  transmitterRoutes);
app.use("/api/cms",           cmsRoutes);
app.use("/api/meds",          medRoutes);
app.use("/api/locations",     locationRoutes);
app.use("/api/groups",     groupRoutes);
app.use("/api/tickets", require("./routes/ticketRoutes"));

/* ---------- health-check ---------- */
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

/* ---------- error handler ---------- */
app.use(errorHandler);

/* ---------- start ---------- */
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅  Mongo connected");

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`🚀  API ready on :${PORT}`));
  } catch (err) {
    console.error("❌  Startup error:", err);
    process.exit(1);
  }
};

start();
