const express = require("express");
const cors = require('cors');
require('dotenv').config();

const applyMiddleware = (app) => {
    app.use(cors({
        origin: '*',
        credentials: true,
        optionsSuccessStatus: 200
    }));
    app.use(express.json());
}

module.exports = applyMiddleware;