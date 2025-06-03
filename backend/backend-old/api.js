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





    app.post('/Wiki/New/upload', upload, (req, res) => {
      const file = req.files.file;
      if (!file) return res.sendStatus(400);
      var status = [`http://localhost:5001/images/${file[0].filename}`];
      if (file.length > 1) {
        for (let i = 1; i < file.length; i++) {
          status.push(`http://localhost:5001/images/${file[i].filename}`);
        }
      }
      res.status(200).send(status);
    });

    app.get("/images/:image_id", async (req, res) => {
      try {
        //looks in the uploads folder for the image
        res.sendFile(`${__dirname}/uploads/${req.params.image_id}`);
      } catch (err) {
        res.status(500).json({ error: "Unexpected Error Occured!" });
      }
    });

    app.get("/products", async (req, res) => {
      try {
        let items;
        const page = parseInt(req.query.p) || 0;
        const search = req.query.search || "";

        if (search) {
          items = await products
            .find({ $text: { $search: search } })
            .skip(page * PRODUCT_LIMIT)
            .limit(PRODUCT_LIMIT)
            .toArray();
        } else {
          items = await products
            .find({})
            .skip(page * PRODUCT_LIMIT)
            .limit(PRODUCT_LIMIT)
            .toArray();
        }

        res.json(items);
      } catch (err) {
        res.status(500).json({ error: "Unexpected Error Occured!" });
      }
    });

    app.put("/tickets", async (req, res) => {
      try {
        const ticketData = req.body;
        if (!ticketData)
          return res.status(400).json({ error: "No ticket data provided" });

        const currentTicket = await tickets.findOne({
          ticket: ticketData.ticket,
        });
        if (!currentTicket)
          return res.status(404).json({ error: "Ticket not found!" });

        ticketData._id = currentTicket._id;
        const result = await tickets.replaceOne(
          { ticket: ticketData.ticket },
          ticketData
        );
        if (result.modifiedCount === 0) {
          return res.status(405).json({ error: "Ticket not updated!" });
        }

        res.json({ message: "Ticket replaced successfully!" });
      } catch (err) {
        res
          .status(500)
          .json({ error: `Unexpected Error Occured: ${err.message}` });
      }
    });

    app.post("/tickets", async (req, res) => {
      try {
        const ticketData = req.body;
        if (!ticketData)
          return res.status(400).json({ error: "No ticket data provided" });

        const lastTicket = await tickets
          .find()
          .sort({ ticket: -1 })
          .limit(1)
          .toArray();
        const index = lastTicket.length ? lastTicket[0].ticket : 0;

        ticketData.ticket = index + 1;
        const result = await tickets.insertOne(ticketData);

        res.status(201).json(await tickets.findOne({ _id: result.insertedId }));
      } catch (err) {
        res
          .status(500)
          .json({ error: `Unexpected Error Occured: ${err.message}` });
      }
    });

    app.get("/tickets", async (req, res) => {
      try {
        let items;
        const search = req.query.search || "";
        const sort = req.query.sort ? JSON.parse(req.query.sort) : {};
        const page = parseInt(req.query.p) || 0;

        const query = search ? { $text: { $search: search } } : {};

        items = await tickets
          .find(query)
          .sort(sort)
          .skip(page * 50)
          .limit(50)
          .toArray();

        res.json(items);
      } catch (err) {
        res.status(500).json({ error: "Unexpected Error Occured!" });
      }
    });

    app.delete("/tickets/:ticket_id", async (req, res) => {
      try {
        const ticketId = parseInt(req.params.ticket_id);
        const result = await tickets.deleteOne({ ticket: ticketId });
        if (result.deletedCount === 0) {
          return res.status(404).json({ error: "Ticket not found!" });
        }
        res.json({ message: "Ticket deleted successfully!" });
      } catch (err) {
        res
          .status(500)
          .json({ error: `Unexpected Error Occured: ${err.message}` });
      }
    });

    app.get("/configuration", async (req, res) => {
      try {
        let items;
        const search = req.query.search
          ? { $or: [{ Name: { $regex: new RegExp(req.query.search, 'i') } }, { PartitionKey: { $regex: new RegExp(req.query.search, 'i') } }] }
          : {};
        console.log(search)
        console.log(req.query.search)
        const sort = req.query.sort ? JSON.parse(req.query.sort) : {};
        const page = parseInt(req.query.p) || 0;

        items = await facilities
          .find(search)
          .sort(sort)
          .skip(page * 50)
          .limit(50)
          .toArray();
        console.log(items.length)
        res.json(items);
      } catch (err) {
        res.status(500).json({ error: "Unexpected Error Occured!" });
      }
    });

    app.get("/configuration/:facility_id", async (req, res) => {
      try {
        const facilityId = req.params.facility_id;
        const groups = await Group.find({ PartitionKey: facilityId }).toArray();
        const facility = await facilities
          .find({ PartitionKey: facilityId })
          .limit(1)
          .toArray();
        const locations = await Location.find({
          PartitionKey: facilityId,
        }).toArray();
        const meds = await MEDs.find({ PartitionKey: facilityId }).toArray();
        const monitors = await Monitor.find({
          PartitionKey: facilityId,
        }).toArray();
        const rooms = await Room.find({ PartitionKey: facilityId }).toArray();
        const configAlerts = await ConfigAlert.find({
          PartitionKey: facilityId,
        }).toArray();
        const configCMS = await ConfigCMS.find({
          PartitionKey: facilityId,
        }).toArray();
        const configMED = await ConfigMED.find({
          PartitionKey: facilityId,
        }).toArray();
        const cms = await CMSs.find({ PartitionKey: facilityId }).toArray();

        res.json({
          facility,
          groups,
          locations,
          meds,
          monitors,
          rooms,
          configAlerts,
          configCMS,
          configMED,
          cms,
        });
      } catch (err) {
        res.status(500).json({ error: "Unexpected Error Occured!" });
      }
    });

    app.post("/configuration/facility/:facility_id", async (req, res) => {
      try {
        const facilityId = req.params.facility_id;
        const facilityData = req.body;
        if (!facilityData)
          return res.status(400).json({ error: "No facility data provided" });

        const currentFacility = await facilities.findOne({
          PartitionKey: facilityId,
        });
        if (!currentFacility)
          return res.status(404).json({ error: "Facility not found!" });

        facilityData._id = currentFacility._id;
        const result = await facilities.replaceOne(
          { PartitionKey: facilityId },
          facilityData
        );
        if (result.modifiedCount === 0) {
          return res.status(405).json({ error: "Facility not updated!" });
        }

        res.json({ message: "Facility replaced successfully!" });
      } catch (err) {
        res
          .status(500)
          .json({ error: `Unexpected Error Occured: ${err.message}` });
      }
    });

    app.post("/configuration/group/:group_id", async (req, res) => {
      try {
        const groupId = req.params.group_id;
        const groupData = req.body;
        if (!groupData)
          return res.status(400).json({ error: "No group data provided" });

        const currentGroup = await Group.findOne({
          PartitionKey: groupId,
        });
        if (!currentGroup)
          return res.status(404).json({ error: "Group not found!" });

        groupData._id = currentGroup._id;
        const result = await Group.replaceOne(
          { PartitionKey: groupId },
          groupData
        );
        if (result.modifiedCount === 0) {
          return res.status(405).json({ error: "Group not updated!" });
        }

        res.json({ message: "Group replaced successfully!" });
      } catch (err) {
        res
          .status(500)
          .json({ error: `Unexpected Error Occured: ${err.message}` });
      }
    });

    app.post("/configuration/location/:location_id", async (req, res) => {
      try {
        const locationId = req.params.location_id;
        const locationData = req.body;
        if (!locationData)
          return res.status(400).json({ error: "No location data provided" });

        const currentLocation = await Location.findOne({
          PartitionKey: locationId,
        });
        if (!currentLocation)
          return res.status(404).json({ error: "Location not found!" });

        locationData._id = currentLocation._id;
        const result = await Location.replaceOne(
          { PartitionKey: locationId },
          locationData
        );
        if (result.modifiedCount === 0) {
          return res.status(405).json({ error: "Location not updated!" });
        }

        res.json({ message: "Location replaced successfully!" });
      } catch (err) {
        res
          .status(500)
          .json({ error: `Unexpected Error Occured: ${err.message}` });
      }
    });

    app.post("/configuration/med/:med_id", async (req, res) => {
      try {
        const medId = req.params.med_id;
        const medData = req.body;
        if (!medData)
          return res.status(400).json({ error: "No med data provided" });

        const currentMed = await MEDs.findOne({
          PartitionKey: medId,
        });
        if (!currentMed)
          return res.status(404).json({ error: "Med not found!" });

        medData._id = currentMed._id;
        const result = await MEDs.replaceOne({ PartitionKey: medId }, medData);
        if (result.modifiedCount === 0) {
          return res.status(405).json({ error: "Med not updated!" });
        }

        res.json({ message: "Med replaced successfully!" });
      } catch (err) {
        res
          .status(500)
          .json({ error: `Unexpected Error Occured: ${err.message}` });
      }
    });

    app.post("/configuration/monitor/:monitor_id", async (req, res) => {
      try {
        const monitorId = req.params.monitor_id;
        const monitorData = req.body;
        if (!monitorData)
          return res.status(400).json({ error: "No monitor data provided" });

        const currentMonitor = await Monitor.findOne({
          PartitionKey: monitorId,
        });
        if (!currentMonitor)
          return res.status(404).json({ error: "Monitor not found!" });

        monitorData._id = currentMonitor._id;
        const result = await Monitor.replaceOne(
          { PartitionKey: monitorId },
          monitorData
        );
        if (result.modifiedCount === 0) {
          return res.status(405).json({ error: "Monitor not updated!" });
        }

        res.json({ message: "Monitor replaced successfully!" });
      } catch (err) {
        res
          .status(500)
          .json({ error: `Unexpected Error Occured: ${err.message}` });
      }
    });

    app.post("/configuration/room/:room_id", async (req, res) => {
      try {
        const roomId = req.params.room_id;
        const roomData = req.body;
        if (!roomData)
          return res.status(400).json({ error: "No room data provided" });

        const currentRoom = await Room.findOne({
          PartitionKey: roomId,
        });
        if (!currentRoom)
          return res.status(404).json({ error: "Room not found!" });

        roomData._id = currentRoom._id;
        const result = await Room.replaceOne(
          { PartitionKey: roomId },
          roomData
        );
        if (result.modifiedCount === 0) {
          return res.status(405).json({ error: "Room not updated!" });
        }

        res.json({ message: "Room replaced successfully!" });
      } catch (err) {
        res
          .status(500)
          .json({ error: `Unexpected Error Occured: ${err.message}` });
      }
    });

    app.post("/configuration/configAlert", async (req, res) => {
      try {
        const configAlertId = req.query.configAlert_id;
        const configAlertData = req.body;
        if (configAlertData == null || configAlertId.length == 0)
          return res
            .status(400)
            .json({ error: "No configAlert data provided" });

        const currentConfigAlert = await ConfigAlert.findOne({
          PartitionKey: configAlertId,
        });
        if (!currentConfigAlert)
          return res.status(404).json({ error: "ConfigAlert not found!" });

        configAlertData._id = currentConfigAlert._id;
        const result = await ConfigAlert.replaceOne(
          { PartitionKey: configAlertId },
          configAlertData
        );
        if (result.modifiedCount === 0) {
          return res.status(405).json({ error: "ConfigAlert not updated!" });
        }

        res.json({ message: "ConfigAlert replaced successfully!" });
      } catch (err) {
        res
          .status(500)
          .json({ error: `Unexpected Error Occured: ${err.message}` });
      }
    });

    app.post("/configuration/configCMS/:configCMS_id", async (req, res) => {
      try {
        const configCMSId = req.params.configCMS_id;
        const configCMSData = req.body;
        if (!configCMSData)
          return res.status(400).json({ error: "No configCMS data provided" });

        const currentConfigCMS = await ConfigCMS.findOne({
          PartitionKey: configCMSId,
        });
        if (!currentConfigCMS)
          return res.status(404).json({ error: "ConfigCMS not found!" });

        configCMSData._id = currentConfigCMS._id;
        const result = await ConfigCMS.replaceOne(
          { PartitionKey: configCMSId },
          configCMSData
        );
        if (result.modifiedCount === 0) {
          return res.status(405).json({ error: "ConfigCMS not updated!" });
        }

        res.json({ message: "ConfigCMS replaced successfully!" });
      } catch (err) {
        res
          .status(500)
          .json({ error: `Unexpected Error Occured: ${err.message}` });
      }
    });

    app.post("/configuration/configMED/:configMED_id", async (req, res) => {
      try {
        const configMEDId = req.params.configMED_id;
        const configMEDData = req.body;
        if (!configMEDData)
          return res.status(400).json({ error: "No configMED data provided" });

        const currentConfigMED = await ConfigMED.findOne({
          PartitionKey: configMEDId,
        });
        if (!currentConfigMED)
          return res.status(404).json({ error: "ConfigMED not found!" });

        configMEDData._id = currentConfigMED._id;
        const result = await ConfigMED.replaceOne(
          { PartitionKey: configMEDId },
          configMEDData
        );
        if (result.modifiedCount === 0) {
          return res.status(405).json({ error: "ConfigMED not updated!" });
        }

        res.json({ message: "ConfigMED replaced successfully!" });
      } catch (err) {
        res
          .status(500)
          .json({ error: `Unexpected Error Occured: ${err.message}` });
      }
    });

    app.post("/configuration/cms/:cms_id", async (req, res) => {
      try {
        const cmsId = req.params.cms_id;
        const cmsData = req.body;
        if (!cmsData)
          return res.status(400).json({ error: "No cms data provided" });

        const currentCMS = await CMSs.findOne({
          PartitionKey: cmsId,
        });
        if (!currentCMS)
          return res.status(404).json({ error: "CMS not found!" });

        cmsData._id = currentCMS._id;
        const result = await CMSs.replaceOne({ PartitionKey: cmsId }, cmsData);
        if (result.modifiedCount === 0) {
          return res.status(405).json({ error: "CMS not updated!" });
        }

        res.json({ message: "CMS replaced successfully!" });
      } catch (err) {
        res
          .status(500)
          .json({ error: `Unexpected Error Occured: ${err.message}` });
      }
    });

    app.get("/configuration/facility/:facility_id", async (req, res) => {
      try {
        const facilityId = req.params.facility_id;
        const facility = await facilities.findOne({
          PartitionKey: facilityId,
        });
        res.json(facility);
      } catch (err) {
        res.status(500).json({ error: "Unexpected Error Occured!" });
      }
    });

    app.get("/manifest", async (req, res) => {
      try {
        let items;
        const search = req.query.search
          ? { Name: { $regex: req.query.search, $options: "i" } }
          : {};
        const sort = req.query.sort ? JSON.parse(req.query.sort) : {};
        const page = parseInt(req.query.p) || 0;

        items = await manifest
          .find(search)
          .sort(sort)
          .skip(page * 50)
          .limit(50)
          .toArray();

        res.json(items);
      } catch (err) {
        res.status(500).json({ error: "Unexpected Error Occured!" });
      }
    });

    app.get("/manifest/assembly", async (req, res) => {
      try {
        let items;
        let search = { status: "Assembly" };
        const sort = req.query.sort ? JSON.parse(req.query.sort) : {};
        const page = parseInt(req.query.p) || 0;

        if (req.query.search) {
          search.Name = { $regex: req.query.search, $options: "i" };
        }

        items = await manifest
          .find(search)
          .sort(sort)
          .skip(page * 50)
          .limit(50)
          .toArray();

        res.json(items);
      } catch (err) {
        res.status(500).json({ error: "Unexpected Error Occured!" });
      }
    });

    app.get("/manifest/active", async (req, res) => {
      try {
        let items;
        let search = { status: "Active" };
        const sort = req.query.sort ? JSON.parse(req.query.sort) : {};
        const page = parseInt(req.query.p) || 0;

        if (req.query.search) {
          search.Name = { $regex: req.query.search, $options: "i" };
        }

        items = await manifest
          .find(search)
          .sort(sort)
          .skip(page * 50)
          .limit(50)
          .toArray();

        res.json(items);
      } catch (err) {
        res.status(500).json({ error: "Unexpected Error Occured!" });
      }
    });

    app.get("/manifest/prospect", async (req, res) => {
      try {
        let items;
        let search = { status: "Pending" };
        const sort = req.query.sort ? JSON.parse(req.query.sort) : {};
        const page = parseInt(req.query.p) || 0;

        if (req.query.search) {
          search = {
            $and: [
              { status: "Prospect" },
              { Name: { $regex: req.query.search, $options: "i" } },
            ],
          };
        }

        items = await manifest
          .find(search)
          .sort(sort)
          .skip(page * 50)
          .limit(50)
          .toArray();

        res.json(items);
      } catch (err) {
        res.status(500).json({ error: "Unexpected Error Occured!" });
      }
    });

    app.get("/manifest/:manifest_id", async (req, res) => {
      try {
        const manifestId = req.params.manifest_id;
        const item = await manifest.findOne({ _id: new ObjectId(manifestId) });
        res.json(item);
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Unexpected Error Occured!" });
      }
    });

    app.post("/manifest", async (req, res) => {
      try {
        const manifestData = req.body;
        if (!manifestData)
          return res.status(400).json({ error: "No manifest data provided" });

        const result = await manifest.insertOne(manifestData);
        res
          .status(201)
          .json(await manifest.findOne({ _id: result.insertedId }));
      } catch (err) {
        res
          .status(500)
          .json({ error: `Unexpected Error Occured: ${err.message}` });
      }
    });

    app.post("/manifest/:manifest_id", async (req, res) => {
      try {
        const manifestId = req.params.manifest_id;
        const manifestData = req.body;
        if (!manifestData)
          return res.status(400).json({ error: "No manifest data provided" });

        const currentManifest = await manifest.findOne({
          _id: new ObjectId(manifestId),
        });
        if (!currentManifest)
          return res.status(404).json({ error: "Manifest not found!" });

        manifestData._id = currentManifest._id;
        const result = await manifest.replaceOne(
          { _id: new ObjectId(manifestId) },
          manifestData
        );
        if (result.modifiedCount === 0) {
          return res.status(405).json({ error: "Manifest not updated!" });
        }

        res.json({ message: "Manifest replaced successfully!" });
      } catch (err) {
        console.log(err);
        res
          .status(500)
          .json({ error: `Unexpected Error Occured: ${err.message}` });
      }
    });

    app.get("/wiki", async (req, res) => {
      try {
        let items;
        const search = req.query.search
          ? { $text: { $search: req.query.search } }
          : {};
        const sort = req.query.sort ? JSON.parse(req.query.sort) : {};
        const page = parseInt(req.query.p) || 0;

        items = await productWiki
          .find(search)
          .sort(sort)
          .skip(page * PRODUCT_LIMIT)
          .limit(PRODUCT_LIMIT)
          .toArray();

        res.json(items);
      } catch (err) {
        res.status(500).json({ error: "Unexpected Error Occured!" });
      }
    });

    app.get("/wiki/:product_id", async (req, res) => {
      try {
        const productId = req.params.product_id;
        const item = await productWiki.findOne({
          _id: new ObjectId(productId),
        });
        res.json(item);
      } catch (err) {
        res.status(500).json({ error: "Unexpected Error Occured!" });
      }
    });

    app.post("/wiki", async (req, res) => {
      try {
        const productData = req.body;
        if (!productData)
          return res.status(400).json({ error: "No product data provided" });

        const result = await productWiki.insertOne(productData);
        res
          .status(201)
          .json(await productWiki.findOne({ _id: result.insertedId }));
      } catch (err) {
        res
          .status(500)
          .json({ error: `Unexpected Error Occured: ${err.message}` });
      }
    });

    app.post("/login", async (req, res) => {
      try {
        const { username, password } = req.body;
        const user = await users.findOne({ username });

        if (!user || !TokenManager.hashPassword(password) === user.password) {
          return res.status(401).json({ error: "Invalid credentials!" });
        }

        const token = TokenManager.generateToken(user.username);
        res.json({ token });
      } catch (err) {
        res
          .status(500)
          .json({ error: `Unexpected Error Occured: ${err.message}` });
      }
    });

    app.post("/register", async (req, res) => {
      try {
        const { username, password } = req.body;
        const user = await users.findOne({ username });

        console.log(username);
        console.log(password);

        if (user) {
          return res.status(401).json({ error: "User already exists!" });
        }

        const token = TokenManager.generateUser(username, password);
        console.log(username);
        console.log(password);
        console.log(token);
        res.json({ token });
      } catch (err) {
        console.log(err);
        res
          .status(500)
          .json({ error: `Unexpected Error Occured: ${err.message}` });
      }
    });

    app.listen(5001, () => {
      console.log("Server is running on port 5001");
    });
  })
  .catch(console.error);
