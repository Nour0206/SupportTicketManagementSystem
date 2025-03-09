const express = require('express');
const {
    createTicket,
    getAllTickets,
    getTicketById,
    getTicketByName,
    updateTicketStatus,
    updateTicket,
    deleteTicket,
<<<<<<< HEAD
=======
    filterByStatus,
    getTicketsByAgentId,
    getTicketsByUserId
>>>>>>> d5476bd49a9c032a5cd35cf7859f7f8108ea9539
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
<<<<<<< HEAD
=======
router.get('/agent/:userId', getTicketsByAgentId);
router.get('/user/:userId', getTicketsByUserId);


>>>>>>> d5476bd49a9c032a5cd35cf7859f7f8108ea9539
module.exports = router;
