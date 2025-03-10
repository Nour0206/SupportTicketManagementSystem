import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AssignTicket = () => {
  const { ticketId } = useParams(); // Ensure ticketId is correctly extracted
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState('');

  useEffect(() => {
    // Fetch the list of agents
    const fetchAgents = async () => {
      try {
        const response = await axios.get('/users/role/agent');
        setAgents(response.data);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };

    fetchAgents();
  }, []);

  const handleAssign = async () => {
    try {
      console.log('Assigning ticket to:', selectedAgent);
      console.log('Ticket ID:', ticketId); // Ensure ticketId is logged correctly
      await axios.put(`/tickets/${ticketId}/assign`, { assignedTo: selectedAgent });
      navigate('/tickets');
    } catch (error) {
      console.error('Error assigning ticket:', error);
    }
  };

  return (
    <div className="assign-ticket-container">
      <h1 className="heading">Assign Ticket</h1>
      <div className="form-group">
        <label htmlFor="agent">Select Agent:</label>
        <select
          id="agent"
          value={selectedAgent}
          onChange={(e) => setSelectedAgent(e.target.value)}
          className="form-control"
        >
          <option value="">Select an agent</option>
          {agents.map((agent) => (
            <option key={agent._id} value={agent._id}>
              {agent.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAssign} className="btn btn-primary">Assign</button>
    </div>
  );
};

export default AssignTicket;
