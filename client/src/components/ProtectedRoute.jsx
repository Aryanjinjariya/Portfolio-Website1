import { Navigate } from 'react-router-dom'

const Protectedroute = ({ children }) => {
	const admin = localStorage.getItem('token')
	return admin ? children : <Navigate to='/admin-login' />
}

export default Protectedroute
