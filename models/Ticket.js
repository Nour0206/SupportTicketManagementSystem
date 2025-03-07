const mongoose = require('mongoose');
const moment = require('moment-timezone');

const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        default: () => moment().tz("Africa/Tunis").toDate(),
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: Number,
        default: 0,
        enum: [0, 1, 2],// 0 = Open, 1 = In Progress, 2 = Closed
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null } // Assign to an agent
}, { timestamps: true });

module.exports = mongoose.model('Ticket', TicketSchema);
