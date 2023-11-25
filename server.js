const express = require("express");
const applyMiddleware = require("./src/middlewares/applyMiddleware");
require("dotenv").config();
const app = express();
const connectDB = require("./src/db/connectDB");

const port = process.env.PORT || 5000;

// require routes
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const articleRoutes = require('./src/routes/articleRoutes');


// middleware
applyMiddleware(app);


// use routes
app.use(authRoutes);
app.use(userRoutes);
app.use(articleRoutes)









app.get("/", (req, res) => {
    res.send("Server is running....");
});

// handling all (get,post,update,delete.....) unhandled routes
app.all("*", (req, res, next) => {
    const error = new Error(`Can't find [${req.originalUrl}] route on this server`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,

    });
})

const main = async () => {
    await connectDB();

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

}

main()