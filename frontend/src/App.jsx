import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AssignTicket from './pages/AssignTicket';
// ...existing code...

function App() {
  return (
    <Router>
      <Routes>
        {/* Ensure the route includes the ticketId parameter */}
        <Route path="/tickets/:ticketId/assign" element={<AssignTicket />} />
        {/* ...existing routes... */}
      </Routes>
    </Router>
  );
}

export default App;