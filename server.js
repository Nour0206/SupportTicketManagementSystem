require('dotenv').config(); // Make sure to load dotenv first
// Importing Required Modules
const express = require('express');
const mongoose = require('mongoose');


const userRoutes = require('./routes/user.route')
// Setting Up Express App
const app = express();
app.use(express.json());
//Setting Up Routes
app.use('/users',userRoutes)

// MongoDB Connection with Mongoose
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.error("Error connecting to database:", err);
});

/* Setting Up Port and Listening for Requests */
const PORT = process.env.PORT || 7000; // Use PORT from environment variable or default to 9000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});