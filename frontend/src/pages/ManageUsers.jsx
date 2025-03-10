import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BackButton } from '../components/BackButton'
import Spinner from '../components/Spinner'
import UserItem from '../components/UserItem'
import { deleteUser, getUsers } from '../features/auth/authSlice'

function ManageUsers() {
  const dispatch = useDispatch()
  const { users = [], isLoading } = useSelector((state) => state.auth) // Ensure users is defined
  const [roleFilter, setRoleFilter] = useState('all')

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const handleDelete = (userId, userName) => {
    dispatch(deleteUser(userId)).then(() => {
      dispatch(getUsers())
    })
    console.log(`User ${userName} was deleted`)
  }

  const filteredUsers = users.filter(user => 
    roleFilter === 'all' || user.role === roleFilter
  )

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className="filter-container">
        <BackButton url="/" />
        <div>
        <label htmlFor="role-filter" style={{ paddingRight: '10px' }}>Filter by role:</label>
        <select
          id="role-filter"
          className="role-filter"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="admin">Admin</option>
          <option value="agent">Agent</option>
          <option value="user">User</option>
        </select>
        </div>
      </div>
      <ToastContainer />
      <h1>Manage Users</h1>
      <div className="users" style={{ paddingBottom: '20px' }}>
        <div className="user-headings">
          <div>Name</div>
          <div>Email</div>
          <div>Role</div>
          <div></div>
        </div>
        {filteredUsers?.length > 0 ? (
          filteredUsers.map((user) => (
            <UserItem key={user._id} user={user} onDelete={handleDelete} />
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </>
  )
}

export default ManageUsers