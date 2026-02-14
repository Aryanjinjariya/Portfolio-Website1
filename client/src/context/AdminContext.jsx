import { createContext, useState } from 'react'

export const AdminContext = createContext()

const AdminProvider = ({ children }) => {
	const [admin, setAdmin] = useState(!!localStorage.getItem('token'))

	const login = token => {
		localStorage.setItem('token', token)
		setAdmin(true)
	}

	const logout = () => {
		localStorage.removeItem('token')
		setAdmin(false)
	}

	return (
		<AdminContext.Provider value={{ admin, login, logout }}>
			{children}
		</AdminContext.Provider>
	)
}

export default AdminProvider
