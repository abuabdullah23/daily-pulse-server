const express = require("express");
const cors = require('cors');
require('dotenv').config();

const applyMiddleware = (app) => {
    app.use(cors({
        origin: '*',
        credentials: true,
        optionSuccessStatus: 200
    }));
    app.use(express.json());
}

module.exports = applyMiddleware;