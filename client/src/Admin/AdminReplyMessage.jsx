import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../api/axios'

const AdminReplyMessage = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const [message, setMessage] = useState(null)
	const [reply, setReply] = useState('')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchMessage = async () => {
			try {
				const res = await API.get(`/contact/view/${id}`, {
					headers: {
						'x-auth-token': localStorage.getItem('token')
					}
				})
				setMessage(res.data)
			} catch (err) {
				console.log(err)
			}
		}

		fetchMessage()
	}, [id])

	const sendReply = async () => {
		if (!reply.trim()) return alert('Reply cannot be empty')

		try {
			setLoading(true)

			await API.post(
				`/contact/reply/${id}`,
				{ reply },
				{
					headers: {
						'x-auth-token': localStorage.getItem('token')
					}
				}
			)

			alert('Reply sent successfully')
			navigate(-1)
		} catch (err) {
			console.log(err)
			alert('Failed to send reply')
		} finally {
			setLoading(false)
		}
	}

	if (!message) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-zinc-950 text-white'>
				Loading message...
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6'>
			<div className='w-full max-w-3xl bg-zinc-900/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-xl'>
				{/* HEADER */}
				<div className='flex items-center justify-between mb-6'>
					<button
						onClick={() => navigate(-1)}
						className='px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition'
					>
						⬅ Back
					</button>

					<h2 className='text-xl font-bold'>Message Details</h2>

					<div />
				</div>

				{/* MESSAGE INFO */}
				<div className='grid md:grid-cols-3 gap-4 mb-6'>
					<div className='bg-zinc-950 border border-white/10 p-4 rounded-xl'>
						<p className='text-gray-400 text-sm'>Name</p>
						<p className='font-semibold'>{message.name}</p>
					</div>

					<div className='bg-zinc-950 border border-white/10 p-4 rounded-xl'>
						<p className='text-gray-400 text-sm'>Email</p>
						<p className='font-semibold'>{message.email}</p>
					</div>

					<div className='bg-zinc-950 border border-white/10 p-4 rounded-xl'>
						<p className='text-gray-400 text-sm'>Subject</p>
						<p className='font-semibold'>{message.subject}</p>
					</div>
				</div>

				{/* MESSAGE BOX */}
				<div className='bg-zinc-950 border border-white/10 p-4 rounded-xl mb-6'>
					<p className='text-gray-400 text-sm mb-2'>Message</p>
					<p>{message.message}</p>
				</div>

				{/* REPLY SECTION */}
				<div className='space-y-3'>
					<h3 className='text-lg font-semibold'>Send Reply</h3>

					<textarea
						className='w-full bg-zinc-950 border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none'
						rows='5'
						value={reply}
						onChange={e => setReply(e.target.value)}
						placeholder='Write your reply...'
					/>

					<button
						onClick={sendReply}
						disabled={loading}
						className='w-full bg-linear-to-r from-indigo-500 to-purple-600 py-3 rounded-xl font-semibold hover:scale-105 transition disabled:opacity-50'
					>
						{loading ? 'Sending...' : 'Send Reply'}
					</button>
				</div>
			</div>
		</div>
	)
}

export default AdminReplyMessage
