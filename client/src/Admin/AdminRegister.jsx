import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

const AdminRegister = () => {
	const [isRegister, setIsRegister] = useState(false)
	const [fullname, setFullname] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const navigate = useNavigate()

	const submit = async e => {
		e.preventDefault()

		try {
			let res

			if (isRegister) {
				res = await API.post('/register-admin', {
					fullname,
					email,
					password
				})
			} else {
				res = await API.post('/login-admin', {
					email,
					password
				})
			}

			login(res.data.token)
			navigate('/admin-dashboard')
		} catch (err) {
			alert(err.response?.data?.msg || 'Something went wrong')
		}
	}

	return (
		<div className='auth-wrapper'>
			<form onSubmit={submit} className='auth-card'>
				<h2>{isRegister ? 'Admin Register' : 'Admin Login'}</h2>

				{isRegister && (
					<div className='form-group'>
						<label>Full Name</label>
						<input
							type='text'
							placeholder='Enter full name'
							value={fullname}
							onChange={e => setFullname(e.target.value)}
							required
						/>
					</div>
				)}

				<div className='form-group'>
					<label>Email</label>
					<input
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
				</div>

				<div className='form-group'>
					<label>Password</label>
					<input
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
					/>
				</div>

				<button type='submit' className='btn-auth'>
					{isRegister ? 'Register' : 'Login'}
				</button>

				<p className='auth-toggle' onClick={() => setIsRegister(!isRegister)}>
					{isRegister
						? 'Already have an account? Login'
						: 'New admin? Register'}
				</p>
			</form>
		</div>
	)
}

export default AdminRegister
