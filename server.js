require('dotenv').config(); // Make sure to load dotenv first
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/user.route')
const ticketRoutes = require('./routes/ticket.route');
const AuthRoutes = require('./routes/auth.routes')

app.use(express.json());
//Setting Up Routes
app.use('/users',userRoutes)
app.use('/tickets', ticketRoutes);
app.use('/auth',AuthRoutes)


// MongoDB Connection with Mongoose
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.error("Error connecting to database:", err);
});

/* Setting Up Port and Listening for Requests */
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});