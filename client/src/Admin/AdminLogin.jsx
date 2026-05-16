import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

const AdminLogin = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)

	const navigate = useNavigate()

	const submit = async e => {
		e.preventDefault()
		setLoading(true)

		try {
			const res = await API.post('/login-admin', {
				email,
				password
			})

			localStorage.setItem('token', res.data.token)
			navigate('/admin-dashboard')
		} catch (err) {
			console.log(err)
			alert('Invalid Credentials')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-zinc-950 px-4'>
			{/* CARD */}
			<form
				onSubmit={submit}
				className='w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl backdrop-blur'
			>
				{/* TITLE */}
				<h2 className='text-2xl font-bold text-white text-center mb-6'>
					Admin Login
				</h2>

				{/* EMAIL */}
				<div className='mb-4'>
					<label className='text-sm text-gray-300'>Email</label>
					<input
						type='email'
						placeholder='Enter your email'
						onChange={e => setEmail(e.target.value)}
						required
						className='w-full mt-1 p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500'
					/>
				</div>

				{/* PASSWORD */}
				<div className='mb-6'>
					<label className='text-sm text-gray-300'>Password</label>
					<input
						type='password'
						placeholder='Enter your password'
						onChange={e => setPassword(e.target.value)}
						required
						className='w-full mt-1 p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500'
					/>
				</div>

				{/* BUTTON */}
				<button
					type='submit'
					disabled={loading}
					className='w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white font-medium'
				>
					{loading ? 'Logging in...' : 'Login'}
				</button>
			</form>
		</div>
	)
}

export default AdminLogin
