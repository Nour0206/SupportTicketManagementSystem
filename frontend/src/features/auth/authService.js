import axios from 'axios'
const API_URL = '/auth/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL+ 'register', userData)
  console.log('from register', response)
  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)
  console.log('from register', response)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Logout user
const logout = () => localStorage.removeItem('user')

// Get users
const getUsers = async () => {
  const response = await axios.get("/users/all")
  return response.data
}

// Delete user
const deleteUser = async (userId) => {
  const response = await axios.delete(`/users/id/${userId}`)
  return response.data
}

// Verify email
const VerifyEmail = async (userId) => {
  console.log(userId)
  const response = await axios.get(`/auth/verify/${userId}`)
  return response.data
}

// Reset password
const resetPassword = async (email) => {
  const response = await axios.post(API_URL + 'resetPassword', { email });
  return response.data;
};

// Confirm reset password
const resetPasswordConfirm = async (token, password) => {
  const response = await axios.put(API_URL + `resetPassword/${token}`, { password });
  return response.data;
};

const authService = {
  register,
  logout,
  login,
  getUsers,
  deleteUser,
  VerifyEmail, // Add verifyEmail to authService
  resetPassword, // Add resetPassword to authService
  resetPasswordConfirm, // Add resetPasswordConfirm to authService
}

export default authService
export { resetPassword, resetPasswordConfirm, VerifyEmail }

