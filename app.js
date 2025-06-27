const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const userRoutes = require('./routes/userRoutes');
const kycRoutes = require('./routes/kycRoutes');
require('dotenv').config();

app.use(express.json());
app.use(cookieParser()); 
app.use('/', userRoutes);
app.use('/kyc', kycRoutes);

module.exports = app;
