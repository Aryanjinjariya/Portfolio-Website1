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

			// ✅ FIXED
			localStorage.setItem('token', res.data.token)

			navigate('/admin-dashboard')
		} catch (err) {
			alert(err.response?.data?.msg || 'Something went wrong')
		}
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-zinc-950 text-white'>
			<div className='w-full max-w-md bg-zinc-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl'>
				<h2 className='text-2xl font-bold text-center mb-6'>
					{isRegister ? 'Admin Register' : 'Admin Login'}
				</h2>

				<form onSubmit={submit} className='space-y-4'>
					{isRegister && (
						<input
							className='w-full bg-zinc-950 border border-white/10 p-3 rounded-xl'
							type='text'
							placeholder='Full Name'
							value={fullname}
							onChange={e => setFullname(e.target.value)}
							required
						/>
					)}

					<input
						className='w-full bg-zinc-950 border border-white/10 p-3 rounded-xl'
						type='email'
						placeholder='Email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>

					<input
						className='w-full bg-zinc-950 border border-white/10 p-3 rounded-xl'
						type='password'
						placeholder='Password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
					/>

					<button
						type='submit'
						className='w-full bg-linear-to-r from-indigo-500 to-purple-600 py-3 rounded-xl font-semibold hover:scale-105 transition'
					>
						{isRegister ? 'Register' : 'Login'}
					</button>
				</form>

				<p
					onClick={() => setIsRegister(!isRegister)}
					className='text-center text-sm mt-4 text-gray-400 cursor-pointer hover:text-indigo-400'
				>
					{isRegister
						? 'Already have an account? Login'
						: 'New admin? Register'}
				</p>
			</div>
		</div>
	)
}

export default AdminRegister
