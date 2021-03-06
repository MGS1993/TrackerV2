const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
app.use(compression())
app.use(express.json());
app.use(helmet());

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);
app.use(cors());

const mongoose = require('mongoose');
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const port = 5001;

app.listen(port, () => console.log(`Server running on ${port}`));