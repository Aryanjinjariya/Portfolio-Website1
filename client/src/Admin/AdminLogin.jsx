import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

const AdminLogin = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const navigate = useNavigate()

	const submit = async e => {
		e.preventDefault()

		try {
			const res = await API.post('/login-admin', {
				email,
				password
			})

			// Save token
			localStorage.setItem('token', res.data.token)

			// Redirect
			navigate('/admin-dashboard')
		} catch (err) {
			console.log(err)
			alert('Invalid Credentials')
		}
	}
	return (
		<div className='admin-login-wrapper'>
			<form onSubmit={submit} className='admin-login-card'>
				<h2>Admin Login</h2>

				<div className='form-group'>
					<label>Email</label>
					<input
						type='email'
						placeholder='Enter your email'
						onChange={e => setEmail(e.target.value)}
						required
					/>
				</div>

				<div className='form-group'>
					<label>Password</label>
					<input
						type='password'
						placeholder='Enter your password'
						onChange={e => setPassword(e.target.value)}
						required
					/>
				</div>

				<button type='submit' className='btn-login'>
					Login
				</button>
			</form>
		</div>
	)
}

export default AdminLogin
