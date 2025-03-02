const express = require('express');
const {
    createTicket,
    getAllTickets,
    getTicketById,
    getTicketByName,
    updateTicket,
    deleteTicket
} = require('../controllers/ticketController');

const router = express.Router();

// Define routes
router.post('/addTicket', createTicket);
router.get('/all', getAllTickets);
router.get('/:id', getTicketById);
router.get('/name/:name', getTicketByName);
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);

module.exports = router;
