const express = require("express");
const cors = require('cors');
const { CLIENT_LOCAL, CLIENT } = require("../config/defaultClientUrl");
require('dotenv').config();

const applyMiddleware = (app) => {
    app.use(cors({
        origin: [CLIENT_LOCAL, CLIENT],
        credentials: true,
        optionSuccessStatus: 200
    }));
    app.use(express.json());
}

module.exports = applyMiddleware;