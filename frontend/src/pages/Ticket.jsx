import { useEffect } from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BackButton } from '../components/BackButton'
import Spinner from '../components/Spinner'
import { getTicket } from '../features/tickets/ticketSlice'

const getStatusText = (status) => {
  switch (status) {
    case 0:
      return 'Open'
    case 1:
      return 'In Progress'
    case 2:
      return 'Closed'
    default:
      return 'Unknown'
  }
}
Modal.setAppElement('#root')

function Ticket() {
  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.tickets
  )
  const { user } = useSelector((state) => state.auth) // Get user from state

  const { id: ticketId } = useParams() // Ensure ticketId is correctly retrieved
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (ticketId) {
      dispatch(getTicket(ticketId))
    }
  }, [isError, message, ticketId, dispatch])


  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Something went wrong</h3>
  }

  const getBackButtonUrl = () => {
    if (user.role === 'admin') return '/tickets'
    if (user.role === 'agent') return '/ticketsAgent'
    return '/ticketsUser'
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url={getBackButtonUrl()} />
        <h2>
          Ticket Name: {ticket.name}
          <span className={`status status-${ticket.status}`}>
            {getStatusText(ticket.status)}
          </span>{' '}
        </h2>
        <h3>
          Date submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
        </h3>
        <h3>Ticket ID: {ticket._id}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of issue</h3>
          <p>{ticket.content}</p>
        </div>
      </header>
    </div>
  )
}

export default Ticket
