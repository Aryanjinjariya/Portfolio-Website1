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

	if (!message) return <div className='loading'>Loading message...</div>

	return (
		<div className='reply-container'>
			<div className='reply-card'>
				<div className='reply-header'>
					<button className='back-btn' onClick={() => navigate(-1)}>
						⬅ Back
					</button>
					<h2>📩 Message Details</h2>
				</div>

				<div className='message-info'>
					<div>
						<span>Name</span>
						<p>{message.name}</p>
					</div>

					<div>
						<span>Email</span>
						<p>{message.email}</p>
					</div>

					<div>
						<span>Subject</span>
						<p>{message.subject}</p>
					</div>
				</div>

				<div className='message-box'>
					<h4>Message</h4>
					<p>{message.message}</p>
				</div>

				<div className='reply-section'>
					<h3>✍ Send Reply</h3>

					<textarea
						rows='5'
						value={reply}
						onChange={e => setReply(e.target.value)}
						placeholder='Write your reply...'
					/>

					<button className='send-btn' onClick={sendReply} disabled={loading}>
						{loading ? 'Sending...' : 'Send Reply'}
					</button>
				</div>
			</div>
		</div>
	)
}

export default AdminReplyMessage
