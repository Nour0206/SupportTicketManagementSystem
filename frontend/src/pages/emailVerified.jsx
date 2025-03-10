import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { verifyEmail } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
function EmailVerified() {
  const { userId } = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(verifyEmail(userId))
  }, [dispatch, userId])
  const navigate = useNavigate()
  return (
    <div className="verify-email">
      <h1>Congratulations!</h1>
      <h3>Email Verified</h3>
      <p>Please log in to continue</p>
          <p></p>
          <button className='btn btn-block' onClick={() => navigate('/login')}>Go to Login</button>
    </div>
  )
}

export default EmailVerified