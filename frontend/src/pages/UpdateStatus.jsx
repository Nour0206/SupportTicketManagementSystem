import axios from 'axios';
import React ,{ useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BackButton } from '../components/BackButton';

function UpdateStatus() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [ticket, setTicket] = useState(null);
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`/tickets/${ticketId}`);
        setTicket(response.data);
        setStatus(response.data.status);
      } catch (error) {
        console.error('Error fetching ticket:', error);
      }
    };
    fetchTicket();
  }, [ticketId]);

  const handleSubmit = async () => {
    try {
      console.log('Submitting status:', status);
      await axios.patch(`/tickets/${ticketId}/status`, { status : status });
      navigate(`/assigned-tickets`);}
    catch (error) {
        console.error('Error updating ticket status:', error);
    }
  };

  if (!ticket) return <div>Loading...</div>;

  return (
    <div className="update-status-page">
      <BackButton url="/assigned-tickets" />
      <div className="update-status-container">
        <h2>Update Status for Ticket: {ticket.name}</h2>
        <div className="form-group-table">
          <div className="form-group-row">
            <div className="form-group-cell">
              <input
                type="radio"
                id="in-progress"
                value="1"
                checked={status === 1}
                onChange={() => setStatus(1)}
              />
              <label htmlFor="in-progress" style={{ marginLeft: '10px' }}>In Progress</label>
            </div>
          </div>
          <div className="form-group-row">
            <div className="form-group-cell">
              <input
                type="radio"
                id="closed"
                value="2"
                checked={status === 2}
                onChange={() => setStatus(2)}
              />
              <label htmlFor="closed" style={{ marginLeft: '10px' }}>Closed</label>
            </div>
          </div>
        </div>
        <button onClick={handleSubmit} className="update-button">Update</button>
      </div>
    </div>
  );
}

export default UpdateStatus;
