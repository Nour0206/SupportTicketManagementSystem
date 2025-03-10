import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from '../components/BackButton';
import Spinner from '../components/Spinner';
import TicketItem from '../components/TicketItem';
import { getAgentTickets, reset } from '../features/tickets/ticketSlice';

// Helper function to get the status text from the status number
function Tickets() {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  )
  const dispatch = useDispatch()
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getAgentTickets())
  }, [dispatch])
  const mytickets = tickets.filter((ticket) => (ticket.status === 0 || ticket.status === 1));
  const filteredTickets = mytickets.filter(mytickets => 
    filter === 'all' || mytickets.status === Number(filter)
  )

  if (isLoading) {
    return <Spinner />
  }


  return (
    <>
      <div className="filter-container">
        <BackButton url="/" />
        <div>
          <label htmlFor="status-filter" style={{ paddingRight: '10px' }}>Filter by status:</label>
          <select
            id="status-filter"
            className="status-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="0">Open</option>
            <option value="1">In Progress</option>
          </select>
        </div>
      </div>
      <h1>My Assigned Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Ticket Name</div>
          <div>Status</div>
          <div>Change status</div>
        </div>
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <div key={ticket._id} className="ticket-item">
              <TicketItem ticket={ticket} bool={true} />
            </div>
          ))
        ) : (
          <p>No tickets found</p>
        )}
      </div>
    </>
  );
}

export default Tickets;
