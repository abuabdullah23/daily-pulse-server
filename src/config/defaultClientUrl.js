require("dotenv").config();

const config = {
    CLIENT_LOCAL: process.env.CLIENT_LOCAL,
    CLIENT: process.env.CLIENT
}

module.exports = config;
// module.exports = Object.freeze(config);