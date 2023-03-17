require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/v1');
const { errorHandler } = require('./middlewares/error');
const { MONGODB_URI, PORT } = require('./config/config');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

//parse json body
app.use(express.json());

//parse cookies
app.use(cookieParser());

//allow requests from anywhere
app.use(
    cors({
        origin: `https://kanban-sanchit.vercel.app`,
        allowedHeaders: "Set-Cookie,Origin, X-Requested-With, Content-Type, Accept,'Authorization', 'x-csrf-token'",
        credentials: true,
    })
);


app.options("*", cors());

// Reroute all API request starting with "/v1" route
app.use((req,res,next) => {
    console.log(req.url,req.body);
    next();
})

app.use("/v1", routes);

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Successfully connected to database!');
    })
    .catch(() => {
        console.log("Couldn't connect to database!");
    })

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

app.use(errorHandler);