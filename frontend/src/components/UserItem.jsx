import { FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteUser } from '../features/auth/authSlice';

function UserItem({ user, onDelete }) {
  const dispatch = useDispatch()
  const userId = user._id; // Ensure the correct property is used

  // Handle user deletion
  const handleDelete = () => {
    if (userId) {
      dispatch(deleteUser(userId)).then(() => {
        if (onDelete) {
          onDelete(userId, user.name)
          toast.success(`User ${user.name} deleted successfully`);
        }
      })
    } else {
      console.error('User ID is undefined')
    }
  }

  return (
    <div className='user'>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>{user.role}</div>
      <div className='user-actions'>
        <button onClick={handleDelete} className='btn btn-reverse btn-sm'>
          <FaTrash /> Delete User
        </button>
      </div>
    </div>
  )
}

export default UserItem