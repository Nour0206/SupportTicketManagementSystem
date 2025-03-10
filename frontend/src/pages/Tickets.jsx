import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from '../components/BackButton';
import Spinner from '../components/Spinner';
import TicketItem from '../components/TicketItem';
import { getTickets, reset } from '../features/tickets/ticketSlice';

// Helper function to get the status text from the status number
function Tickets() {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  )
  const dispatch = useDispatch()
  const [filter, setFilter] = useState('all')
  const [assignedFilter, setAssignedFilter] = useState('all')

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getTickets())
  }, [dispatch])

  const filteredTickets = tickets.filter(ticket => 
    (filter === 'all' || ticket.status === Number(filter)) &&
    (assignedFilter === 'all' || (assignedFilter === 'assigned' && ticket.assignedTo) || (assignedFilter === 'unassigned' && !ticket.assignedTo))
  )

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className="filter-container">
        <BackButton url="/" />
        <label htmlFor="status-filter">Filter by status:</label>
        <select
          id="status-filter"
          className="status-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="0">Open</option>
          <option value="1">In Progress</option>
          <option value="2">Closed</option>
        </select>
        <label htmlFor="assigned-filter">Filter by assignment:</label>
        <select
          id="assigned-filter"
          className="assigned-filter"
          value={assignedFilter}
          onChange={(e) => setAssignedFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="assigned">Assigned</option>
          <option value="unassigned">Unassigned</option>
        </select>
      </div>
      
      <h1>Tickets</h1>
      <div className="tickets" style={{ paddingBottom: '20px' }}>
        <div className="ticket-headings">
          <div>Date</div>
          <div>Ticket Name</div>
          <div>Status</div>
          <div>Assigned To</div>
          <div></div>
          <div></div>
        </div>
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <TicketItem key={ticket._id} ticket={ticket} />
          ))
        ) : (
          <p>No tickets found</p>
        )}
      </div>
    </>
  );
}

export default Tickets;
