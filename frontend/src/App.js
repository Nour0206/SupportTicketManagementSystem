import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import AgentDashboard from './pages/AgentDashboard'; // New component for agent dashboard
import AssignedTickets from './pages/AssignedTickets'; // New component for assigned tickets
import AssignTicket from './pages/AssignTicket'
import Dashboard from './pages/Dashboard.jsx'; // New component for dashboard
import EmailVerified from './pages/emailVerified.jsx'
import Home from './pages/Home'
import Login from './pages/Login'
import ManageUsers from './pages/ManageUsers'; // New component for managing users
import NewTicket from './pages/NewTicket'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword.jsx'
import ResetPasswordConfirm from './pages/ResetPasswordConfirm'
import Ticket from './pages/Ticket'
import Tickets from './pages/Tickets'
import TicketsAgent from './pages/ticketsAgent'
import TicketsUser from './pages/TicketsUser'
import UpdateStatus from './pages/UpdateStatus'
import UserDashboard from './pages/UserDashboard'; // New component for user dashboard
import VerifyEmail from './pages/VerifyEmail'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/verify-email' element={<VerifyEmail />} />
            <Route path='auth/verify/:userId' element={<EmailVerified />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/reset-password/:token' element={<ResetPasswordConfirm />} />
            {/* Private Routes */}
            <Route path='/new-ticket' element={<PrivateRoute />}>
              <Route path='/new-ticket' element={<NewTicket />} />
            </Route>
            <Route path='/tickets' element={<PrivateRoute />}>
              <Route path='/tickets' element={<Tickets />} />
            </Route>
            <Route path='/ticketsUser' element={<PrivateRoute />}>
              <Route path='/ticketsUser' element={<TicketsUser />} />
            </Route>
            <Route path='/ticketsAgent' element={<PrivateRoute />}>
              <Route path='/ticketsAgent' element={<TicketsAgent />} />
            </Route>
            <Route path='/ticket/:id' element={<PrivateRoute />}>
              <Route path='/ticket/:id' element={<Ticket />} />
            </Route>
            {/* New Routes for Agents and Admins */}
            <Route path='/assigned-tickets' element={<PrivateRoute />}>
              <Route path='/assigned-tickets' element={<AssignedTickets />} />
            </Route>
            <Route path='/assign-ticket/:ticketId' element={<PrivateRoute />}>
              <Route path='/assign-ticket/:ticketId' element={<AssignTicket />} />
             </Route>
             <Route path='/updatestatus/:ticketId' element={<PrivateRoute />}>
              <Route path='/updatestatus/:ticketId' element={<UpdateStatus />} />
            </Route>
              <Route path='/users' element={<PrivateRoute />}>
              <Route path='/users' element={<ManageUsers />} />
            </Route>
            {/* New Routes for Dashboards */}
            <Route path='/dashboard' element={<PrivateRoute />}>
              <Route path='/dashboard' element={<Dashboard />} />
            </Route>
            <Route path='/dashboard/agent' element={<PrivateRoute />}>
              <Route path='/dashboard/agent' element={<AgentDashboard />} />
            </Route>
            <Route path='/dashboard/user' element={<PrivateRoute />}>
              <Route path='/dashboard/user' element={<UserDashboard />} />
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}
export default App