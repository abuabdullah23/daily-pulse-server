require("dotenv").config();

const config = {
    CLIENT_LOCAL: process.env.CLIENT_LOCAL,
    CLIENT: process.env.CLIENT
}

module.exports = Object.freeze(config);