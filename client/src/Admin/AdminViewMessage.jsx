import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../api/axios'

const AdminViewMessage = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const [message, setMessage] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchMessage = async () => {
			try {
				const token = localStorage.getItem('token')

				const res = await API.get(`/contact/view/${id}`, {
					headers: { 'x-auth-token': token }
				})

				setMessage(res.data)
			} catch (err) {
				console.log(err?.response?.data || err.message)

				if (err?.response?.status === 401) {
					alert('Session expired. Please login again.')
					navigate('/admin-login')
				}
			} finally {
				setLoading(false)
			}
		}

		fetchMessage()
	}, [id, navigate])

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center text-gray-400'>
				Loading...
			</div>
		)
	}

	if (!message) {
		return (
			<div className='min-h-screen flex items-center justify-center text-red-400'>
				Message not found
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-zinc-950 text-white p-6'>
			{/* BACK BUTTON */}
			<button
				onClick={() => navigate(-1)}
				className='mb-6 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition'
			>
				⬅ Back
			</button>

			{/* CARD */}
			<div className='max-w-3xl mx-auto bg-zinc-900/60 border border-white/10 rounded-2xl p-6 shadow-xl'>
				<h2 className='text-2xl font-bold mb-6'>📩 Message Details</h2>

				{/* INFO GRID */}
				<div className='grid md:grid-cols-2 gap-4 mb-6'>
					<div className='bg-zinc-800/50 p-4 rounded-xl'>
						<p className='text-gray-400 text-sm'>Name</p>
						<p className='font-semibold'>{message.name}</p>
					</div>

					<div className='bg-zinc-800/50 p-4 rounded-xl'>
						<p className='text-gray-400 text-sm'>Email</p>
						<p className='font-semibold'>{message.email}</p>
					</div>

					<div className='bg-zinc-800/50 p-4 rounded-xl'>
						<p className='text-gray-400 text-sm'>Subject</p>
						<p className='font-semibold'>{message.subject || '—'}</p>
					</div>

					<div className='bg-zinc-800/50 p-4 rounded-xl'>
						<p className='text-gray-400 text-sm'>Status</p>
						<p
							className={`font-semibold ${
								message.status === 'replied'
									? 'text-green-400'
									: 'text-yellow-400'
							}`}
						>
							{message.status || 'pending'}
						</p>
					</div>
				</div>

				{/* MESSAGE BOX */}
				<div className='bg-zinc-800/40 p-5 rounded-xl border border-white/10'>
					<p className='text-gray-400 text-sm mb-2'>Message</p>
					<p className='leading-relaxed'>{message.message}</p>
				</div>
			</div>
		</div>
	)
}

export default AdminViewMessage
