const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const bodyParser = require("body-parser");
const multer = require('multer');
const jwt = require("jsonwebtoken");
const TokenManager = require("./utils/token_manager");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));// limit: '50mb' is used to prevent the error: "request entity too large"
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 1000000 }));

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, 'uploads')
  },
  filename: (req, file, callBack) => {
    callBack(null, `${file.originalname}`)
  }
})
let upload = multer({ dest: 'uploads/' }).fields([{ name: 'file', maxCount: 20 }]) // Max 20 files, abirtrary number

const mongoUrl = "mongodb://localhost:27017/";

const client = new MongoClient(mongoUrl);

client
  .connect()
  .then(() => {
    const inventory = client.db("inventory");
    const products = inventory.collection("products");

    const sensitivedb = client.db("sensitive_data");
    const users = sensitivedb.collection("users");

    const supportdb = client.db("support");
    const tickets = supportdb.collection("tickets");

    const configs = client.db("configs");
    const CMSs = configs.collection("CMS");
    const facilities = configs.collection("Facility");
    const Group = configs.collection("Group");
    const Location = configs.collection("Location");
    const MEDs = configs.collection("MED");
    const Monitor = configs.collection("Monitor");
    const Room = configs.collection("Room");
    const ConfigAlert = configs.collection("ConfigAlert");
    const ConfigCMS = configs.collection("ConfigCMS");
    const ConfigMED = configs.collection("ConfigMED");

    const manifestDB = client.db("manifest");
    const manifest = manifestDB.collection("manifest");

    const wiki = client.db("wiki");
    const productWiki = wiki.collection("products");

    const CUSTOMER_LIMIT = 25;
    const USER_LIMIT = 50;
    const PRODUCT_LIMIT = 50;

    const authenticate = (requiredRole) => {
      return (req, res, next) => {
        const token = req.headers["authorization"];
        if (!token) return res.status(401).json({ error: "Token is missing!" });

        jwt.verify(
          token.split(" ")[1],
          TokenManager.SERVER_SECRET_KEY,
          (err, payload) => {
            if (err) {
              if (err.name === "TokenExpiredError") {
                return res.status(401).json({ error: "Token has expired!" });
              } else {
                return res.status(401).json({ error: "Invalid token!" });
              }
            }

            if (payload.permission < requiredRole) {
              return res.status(403).json({ error: "Access forbidden!" });
            }

            req.user = payload;
            next();
          }
        );
      };
    };





    // app.get("/images/:image_id", async (req, res) => {
    // app.get("/products", async (req, res) => {
    // app.put("/tickets", async (req, res) => {
    // app.post("/tickets", async (req, res) => {
    // app.get("/tickets", async (req, res) => {
    // app.delete("/tickets/:ticket_id", async (req, res) => {
    // app.get("/configuration", async (req, res) => {
    // app.get("/configuration/:facility_id", async (req, res) => {
        
    
    app.post("/configuration/facility", async (req, res) => {
    });


    // app.post("/configuration/facility/:facility_id", async (req, res) => {
    // app.post("/configuration/group/:group_id", async (req, res) => {
    // app.post("/configuration/location/:location_id", async (req, res) => {
    // app.post("/configuration/med/:med_id", async (req, res) => {
    // app.post("/configuration/monitor/:monitor_id", async (req, res) => {
    // app.post("/configuration/room/:room_id", async (req, res) => {
    // app.post("/configuration/configAlert", async (req, res) => {
    // app.post("/configuration/configCMS/:configCMS_id", async (req, res) => {
    // app.post("/configuration/configMED/:configMED_id", async (req, res) => {
    // app.post("/configuration/cms/:cms_id", async (req, res) => {
    // app.get("/configuration/facility/:facility_id", async (req, res) => {
    
    // app.get("/manifest", async (req, res) => {
    // app.get("/manifest/assembly", async (req, res) => {
    // app.get("/manifest/active", async (req, res) => {
    // app.get("/manifest/prospect", async (req, res) => {
    // app.get("/manifest/:manifest_id", async (req, res) => {
    // app.post("/manifest", async (req, res) => {
    // app.post("/manifest/:manifest_id", async (req, res) => {
    // app.get("/wiki", async (req, res) => {
    // app.get("/wiki/:product_id", async (req, res) => {
    // // app.post("/wiki", async (req, res) => {
    // app.post('/Wiki/New/upload', upload, (req, res) => {
    // app.post("/login", async (req, res) => {
    // app.post("/register", async (req, res) => {

    app.listen(5001, () => {
      console.log("Server is running on port 5001");
    });
  })
  .catch(console.error);
