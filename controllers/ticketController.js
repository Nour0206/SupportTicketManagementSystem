const Ticket = require('../models/ticket');

// 🎫 Create a new ticket
const createTicket = async (req, res) => {
    try {
        const ticket = new Ticket(req.body);
        await ticket.save();
        res.status(201).json({ message: "Ticket created successfully", ticket });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🎫 Get all tickets
const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🎫 Get a ticket by ID
const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ message: "Ticket not found" });
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🎫 Get a ticket by name
const getTicketByName = async (req, res) => {
    try {
        const ticket = await Ticket.findOne({ name: req.params.name });
        if (!ticket) return res.status(404).json({ message: "Ticket not found" });
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🎫 Update a ticket
const updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ message: "Ticket not found" });

        const updatedTicket = await Ticket.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // Update fields dynamically
            { new: true }
        );

        res.status(200).json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🎫 Delete a ticket
const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ message: "Ticket not found" });

        await Ticket.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Ticket deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Export all functions
module.exports = {
    createTicket,
    getAllTickets,
    getTicketById,
    getTicketByName,
    updateTicket,
    deleteTicket
};

