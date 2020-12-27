const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());

const apiRoutes = require('./routes/api');
app.use(cors());

const mongoose = require('mongoose');
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const port = 5001;

app.listen(port, () => console.log(`Server running on ${port}`));