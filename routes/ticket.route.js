const nodemailer = require('nodemailer');
const Ticket = require('../models/Ticket');
const User = require('../models/User'); 
const mongoose = require("mongoose");
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS // Your email password
    }
});
// Assuming you have a User model for agents
// 🎫 Create a new ticket
const createTicket = async (req, res) => {
    try {
        const { assignedTo, ...ticketData } = req.body;

        // Check if the assigned agent exists
        if (assignedTo) {
            const agent = await User.findById(assignedTo);
            if (!agent) {
                return res.status(404).json({ message: "Agent not found" });
            }
        }

        const ticket = new Ticket({
            ...ticketData,
            assignedTo: assignedTo || null,
             status: 0 // Assign the ticket to the agent if provided
        });

        await ticket.save();
        res.status(201).json({ message: "Ticket created successfully", ticket });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🎫 Get all tickets
const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find().populate('assignedTo', 'name email'); // Populate the assigned agent's name and email
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🎫 Get a ticket by ID
const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id).populate('assignedTo', 'name email');
        if (!ticket) return res.status(404).json({ message: "Ticket not found" });
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🎫 Get a ticket by name
const getTicketByName = async (req, res) => {
    try {
        const ticket = await Ticket.findOne({ name: req.params.name }).populate('assignedTo', 'name email');
        if (!ticket) return res.status(404).json({ message: "Ticket not found" });
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🎫 Update a ticket
const updateTicket = async (req, res) => {
    try {
        const { assignedTo, ...ticketData } = req.body;

        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ message: "Ticket not found" });

        // Check if the assigned agent exists before updating
        if (assignedTo) {
            const agent = await User.findById(assignedTo);
            if (!agent) {
                return res.status(404).json({ message: "Agent not found" });
            }
        }

        const updatedTicket = await Ticket.findByIdAndUpdate(
            req.params.id,
            { $set: { ...ticketData, assignedTo: assignedTo || ticket.assignedTo } }, // Update assignedTo only if provided
            { new: true }
        );

        res.status(200).json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const updateTicketStatus = async (req, res) => {
    try {
        const { status } = req.body;

        // Validate status value
        if (![0, 1, 2].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ message: "Ticket not found" });

        // Save the previous status for notification purposes
        const previousStatus = ticket.status;
        if (previousStatus >= status ) {
            return res.status(400).json({ message: "Invalid status value" });
        }
        const ticketName= ticket.name;
        // Update the status of the ticket
        ticket.status = status;
        const updatedTicket = await ticket.save();

        // Send email notification if the status has changed
        if (ticket.assignedTo) {
            const agent = await User.findById(ticket.assignedTo);
            if (agent) {
                sendStatusUpdateEmail(agent.email,ticketName, previousStatus, status);
            }
        }

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
const sendStatusUpdateEmail = (toEmail, ticketName , previousStatus, newStatus) => {
    const statusMapping = {
        0: 'Open',
        1: 'In Progress',
        2: 'Completed'
    };

    const subject = 'Ticket Status Update';
    const text = `Hey!\n\nThe status of your ticket "${ticketName}" has changed from "${statusMapping[previousStatus]}" to "${statusMapping[newStatus]}".\n\nYou can check the updated ticket status on our website for more details. If you have any questions, feel free to reach out to our support team. We are here to assist you.\n\nThank you for your patience!`;

    // Send email notification
    transporter.sendMail({
        from:'"Support Team"<no-reply@Support.com>',
        to: toEmail,
        subject: subject,
        text: text,
    }, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

// Filter tickets by status
const filterByStatus = async (req, res) => {
    try {
        console.log("Received Params:", req.params);  // Debugging step

        let { status } = req.params; // Get status from route params

        if (!status) return res.status(400).json({ message: "Status is required" });

        status = Number(status); // Convert to number
        if (isNaN(status)) return res.status(400).json({ message: "Invalid status value" });

        const tickets = await Ticket.find({ status });

        if (tickets.length === 0) return res.status(404).json({ message: "No tickets found" });

        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all tickets for a specific user
const getTicketsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const tickets = await Ticket.find({ createdBy: userId });

        if (tickets.length === 0) return res.status(404).json({ message: "No tickets found for this user" });

        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get all tickets assigned to a specific AGENT
const getTicketsByAgentId = async (req, res) => {
    try {
        const { userId } = req.params;

        const tickets = await Ticket.find({ assignedTo: userId });

        if (tickets.length === 0) return res.status(404).json({ message: "No tickets found for this agent" });

        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 🎫 Dashboard route to count each enum of the ticket status
const getTicketStatusCounts = async (req, res) => {
    try {
        const statusCounts = await Ticket.aggregate([
            { 
                $group: { 
                    _id: "$status", 
                    count: { $sum: 1 } 
                } 
            }
        ]);

        // Formatting response for better readability
        const formattedCounts = {
            open: 0,
            inProgress: 0,
            closed: 0
        };

        statusCounts.forEach(item => {
            if (item._id === 0) formattedCounts.open = item.count;
            if (item._id === 1) formattedCounts.inProgress = item.count;
            if (item._id === 2) formattedCounts.closed = item.count;
        });

        res.json({ statusCounts: formattedCounts });
    } catch (error) {
        res.status(500).json({ message: "Error counting tickets", error });
    }
};




// Export all functions
module.exports = {
    createTicket,
    getAllTickets,
    getTicketById,
    getTicketByName,
    updateTicket,
    updateTicketStatus,
    deleteTicket,
    filterByStatus,
    getTicketsByUserId,
    getTicketsByAgentId,
    getTicketsByUserId,
    getTicketStatusCounts,
    countticketsforagent,
    countticketsforuser
} = require('../controllers/ticketController');

const router = express.Router();

// Define routes
router.post('/addTicket', createTicket);
router.get('/all', getAllTickets);
router.get('/status/:status', filterByStatus);
router.get('/:id', getTicketById);
router.get('/name/:name', getTicketByName);
router.put('/:id', updateTicket);
router.patch('/:id/status', updateTicketStatus);
router.delete('/:id', deleteTicket);
router.get('/agent/:userId', getTicketsByAgentId);
router.get('/user/:userId', getTicketsByUserId);
router.get('/dashboard/all', getTicketStatusCounts);
router.get('/dashboard/agent/:userId', countticketsforagent);
router.get('/dashboard/user/:userId', countticketsforuser);

module.exports = router;
