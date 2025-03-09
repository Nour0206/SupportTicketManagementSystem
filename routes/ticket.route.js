const express = require('express');
const {
    createTicket,
    getAllTickets,
    getTicketById,
    getTicketByName,
    updateTicketStatus,
    updateTicket,
    deleteTicket,
} = require('../controllers/ticketController');

const router = express.Router();

// Define routes
router.post('/addTicket', createTicket);
router.get('/all', getAllTickets);
router.get('/:id', getTicketById);
router.get('/name/:name', getTicketByName);
router.put('/:id', updateTicket);
router.patch('/:id/status', updateTicketStatus);
router.delete('/:id', deleteTicket);
module.exports = router;
