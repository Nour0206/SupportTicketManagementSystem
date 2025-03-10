import axios from 'axios'
const API_URL = '/tickets/'

// Create new Ticket
const createTicket = async (ticketData, token) => {
  console.log(ticketData)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL+'addTicket', ticketData, config)

  return response.data
}

// Get user Ticket
const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL+'all', config)

  return response.data
}
const getUserTickets = async (token,userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL+'user/'+userId, config)

  return response.data
}
const getAgentTickets = async (token,userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL+'agent/'+userId, config)

  return response.data
}

// Get Ticket
const getTicket = async (ticketId, token) => {
  console.log("ticket id "+ticketId)
  if (!ticketId) throw new Error('Ticket ID is undefined')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + ticketId, config)
  return response.data
}
// Close Ticket
const closeTicket = async (ticketId, token) => {
  console.log(ticketId)
  if (!ticketId) throw new Error('Ticket ID is undefined')
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    API_URL + ticketId,
    { status: 'closed' },
    config
  )
  console.log('ticket response from close ticket', response)
  return response.data
}

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket,
  getUserTickets,
  getAgentTickets,
}

export default ticketService
