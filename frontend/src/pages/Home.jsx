import { AiFillTags, AiOutlineDashboard, AiOutlineQuestionCircle, AiOutlineTool, AiOutlineUser } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Home() {
  const { user } = useSelector((state) => state.auth) // Get the logged-in user from Redux store
  return (
    <>
      {/* Display welcome message if user is not logged in */}
      {!user && (
        <section className='heading'>
          <h1>Welcome to Ticketing System</h1>
          <p>Please log in to continue</p>
          <p></p>

        </section>
      )}

      {/* Display role-specific options if user is logged in */}
      {user && (
        <>
          <section className='heading'>
            <h1>What do you need help with?</h1>
            <p>Please choose an option below</p>
          </section>

          {/* Options for Normal Users */}
          {user.role === 'user' && (
            <>
              <Link to='/new-ticket' className='btn btn-reverse btn-block'>
                <AiOutlineQuestionCircle /> Create New Ticket
              </Link>
              <Link to='/ticketsUser' className='btn btn-block'>
                <AiFillTags /> View My Tickets
              </Link>
              <Link to='/dashboard/user' className='btn btn-block'>
                <AiOutlineDashboard /> User Dashboard
              </Link>
            </>
          )}

          {/* Options for Agents */}
          {user.role === 'agent' && (
            <>
              <Link to='/ticketsAgent' className='btn btn-reverse btn-block'>
                <AiFillTags /> View All Tickets
              </Link>
              <Link to='/assigned-tickets' className='btn btn-block'>
                <AiOutlineTool /> View Assigned Tickets
              </Link>
              <Link to='/dashboard/agent' className='btn btn-block'>
                <AiOutlineDashboard /> Agent Dashboard
              </Link>
            </>
          )}

          {/* Options for Admins */}
          {user.role === 'admin' && (
            <>
              <Link to='/tickets' className='btn btn-reverse btn-block'>
                <AiFillTags /> View All Tickets
              </Link>
              <Link to='/users' className='btn btn-block'>
                <AiOutlineUser /> Manage Users
              </Link>
              <Link to='/dashboard' className='btn btn-block'>
                <AiOutlineDashboard /> Admin Dashboard
              </Link>
            </>
          )}
        </>
      )}
    </>
  )
}

export default Home