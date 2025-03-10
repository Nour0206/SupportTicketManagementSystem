import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function ResetPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Use react-router-dom's useNavigate hook to navigate to other pages.
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/resetPassword', { email });
      toast.success('Check your email for the reset link');
      navigate('/login'); // Redirect to login page after successful password reset email sent.
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="reset-password">
      <h1>Reset Password</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
