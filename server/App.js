const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

app.use(cors());

// middelware
app.use(bodyParser.json());
app.use(express.json());

//routes
const propertyRoutes = require('./routes/propertyRoutes');

app.use('/api/properties', propertyRoutes);

// database
mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
    console.log('Database connection is ready');
    //server
    app.listen(process.env.PORT, ()=> {
        console.log(`server is running https://localhost:${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log(err);
})
