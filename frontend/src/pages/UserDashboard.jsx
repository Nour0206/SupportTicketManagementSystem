import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSelector } from 'react-redux';
import { BackButton } from '../components/BackButton';
const UserDashboard = () => {
  const [statusCounts, setStatusCounts] = useState({ inProgress: 0, closed: 0 });
  const [totalTickets, setTotalTickets] = useState(0);
  const userId = useSelector((state) => state.auth.user.userId )
  useEffect(() => {
    const fetchStatusCounts = async () => {
      try {
        const response = await axios.get(`/tickets/dashboard/user/${userId}`);
        setStatusCounts(response.data.statusCounts);
        setTotalTickets(response.data.statusCounts.inProgress + response.data.statusCounts.closed);
      } catch (error) {
        console.error('Error fetching status counts:', error);
      }
    };

    fetchStatusCounts();
  }, [userId]);

  const inProgressPercentage = totalTickets ? (statusCounts.inProgress / totalTickets) * 100 : 0;
  const closedPercentage = totalTickets ? (statusCounts.closed / totalTickets) * 100 : 0;

  return (
    <div>
      <BackButton url="/" />
      <h1>User Dashboard</h1>
      <br></br>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div style={{ width: '150px', height: '150px', textAlign: 'center' }}>
          <CircularProgressbar value={inProgressPercentage} text={`${Math.round(inProgressPercentage)}%`} />
          <p style={{ fontSize: '18px', fontWeight: 'bold', textShadow: '1px 1px 2px #000', marginTop: '20px', color: 'lightblue', border: '1px solid black', backgroundColor:'black' }}>In Progress</p>
        </div>
        <div style={{ width: '150px', height: '150px', textAlign: 'center' }}>
          <CircularProgressbar value={closedPercentage} text={`${Math.round(closedPercentage)}%`} />
          <p style={{ fontSize: '18px', fontWeight: 'bold', textShadow: '1px 1px 2px #000', marginTop: '20px', color: 'lightblue', border: '1px solid black', backgroundColor:'black' }}>Closed</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
