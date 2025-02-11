// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const { connectToMongoDB } = require('./config/mongo');
const { authenticate } = require('./middlewares/auth');

const app = express();
const port = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 1000000 }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, file.originalname)
});
const upload = multer({ storage }).fields([{ name: 'file', maxCount: 20 }]);

connectToMongoDB().then(() => {
// Routes
const productRoutes = require('./routes/products');
const ticketRoutes = require('./routes/tickets');
const configRoutes = require('./routes/configuration');
const manifestRoutes = require('./routes/manifest');
const wikiRoutes = require('./routes/wiki');
const authRoutes = require('./routes/auth');

const alertConfigRoutes = require('./routes/configuration/alertconfig');
const cmsRoutes = require('./routes/configuration/cms');
const cmsConfigRoutes = require('./routes/configuration/cmsconfig');
const facilityRoutes = require('./routes/configuration/facility');
const groupRoutes = require('./routes/configuration/group');
const locationRoutes = require('./routes/configuration/location');
const medRoutes = require('./routes/configuration/med');
const medConfigRoutes = require('./routes/configuration/medconfig');
const monitorRoutes = require('./routes/configuration/monitor');
const roomRoutes = require('./routes/configuration/room');

app.use('/products', productRoutes);

app.use('/tickets', ticketRoutes);
app.use('/configuration', configRoutes);
app.use('/configuration/configalert', alertConfigRoutes);
app.use('/configuration/cms', cmsRoutes);
app.use('/configuration/configcms', cmsConfigRoutes);
app.use('/configuration/facility', facilityRoutes);
app.use('/configuration/group', groupRoutes);
app.use('/configuration/location', locationRoutes);
app.use('/configuration/med', medRoutes);
app.use('/configuration/configmed', medConfigRoutes);
app.use('/configuration/monitor', monitorRoutes);
app.use('/configuration/room', roomRoutes);

app.use('/manifest', manifestRoutes);

app.use('/wiki', wikiRoutes);

app.use('/', authRoutes);

// File upload route
app.post('/upload', upload, (req, res) => {
  if (!req.files.file) return res.status(400).send('No files uploaded.');
  const fileUrls = req.files.file.map(file => `http://localhost:${port}/images/${file.filename}`);
  res.status(200).send(fileUrls);
});

// Serve images
app.get('/images/:imageId', (req, res) => {
  res.sendFile(`${__dirname}/uploads/${req.params.imageId}`);
});

// Connect to MongoDB and start server
}).then(() => {

  app.listen(port, () => console.log(`Server running on port ${port}`));
});