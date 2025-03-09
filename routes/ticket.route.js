const express = require('express');
const {
    createTicket,
    getAllTickets,
    getTicketById,
    getTicketByName,
    updateTicketStatus,
    updateTicket,
    deleteTicket,
    filterByStatus,
    getTicketsByAgentId,
    getTicketsByUserId
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


module.exports = router;
