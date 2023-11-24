const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { CLIENT_LOCAL, CLIENT } = require('../config/defaultClientUrl');
require('dotenv').config();


const applyMiddleware = (app) => {
    app.use(cors({
        origin: [CLIENT_LOCAL, CLIENT],
        credentials: true,
    }));
    app.use(express.json());
    app.use(cookieParser());
}

module.exports = applyMiddleware;