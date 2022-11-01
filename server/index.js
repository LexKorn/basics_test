const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');

const router = require('./routes/index');

require('colors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json({extended: true})); 
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

const start = async() => {
    try {
        await mongoose.connect(process.env.MongoUri).then(console.log('Connect to MongoDB successfull!'.bgMagenta));
        app.listen(PORT, () => console.log(`Server has started on port ${PORT}`.bgCyan));
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

start();