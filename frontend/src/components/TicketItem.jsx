import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const getStatusText = (status) => {
  switch (status) {
    case 0:
      return 'Open';
    case 1:
      return 'In Progress';
    case 2:
      return 'Closed';
    default:
      return 'Unknown';
  }
};

function TicketItem({ ticket, bool = false }) {
  const { user } = useSelector((state) => state.auth);
  

  return (
    <div className='ticket'>
      <div>{new Date(ticket.createdAt).toLocaleString('en-US')}</div>
      <div>{ticket.name}</div>
      <div className={`status status-${ticket.status}`}>{getStatusText(ticket.status)}</div>
      {user.role === 'admin' && (
        <>
          {ticket.status === 0 && !ticket.assignedTo ? (
            <Link to={`/assign-ticket/${ticket._id}`} className='btn btn btn-sm'>Assign Ticket</Link>
          ) : (
            <div>{ticket.assignedTo ? ticket.assignedTo.name : 'Unassigned'}</div>
          )}
        </>
      )}
      {user.role === 'agent' && bool && (
        <Link to={`/updatestatus/${ticket._id}`} className='btn btn btn-sm'>Change Status</Link>
      )}
      <Link to={`/ticket/${ticket._id}`} className='btn btn-reverse btn-sm'>
        View
      </Link>
    </div>
  );
}

export default TicketItem;
