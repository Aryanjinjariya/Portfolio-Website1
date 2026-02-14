import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../api/axios'

const AdminViewMessage = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const [message, setMessage] = useState(null)
	const [reply, setReply] = useState('')
	const [sending, setSending] = useState(false)
	const [loading, setLoading] = useState(true)

	// ================= FETCH MESSAGE =================
	useEffect(() => {
		const fetchMessage = async () => {
			try {
				const token = localStorage.getItem('token')

				const res = await API.get(`/contact/view/${id}`, {
					headers: {
						'x-auth-token': token
					}
				})

				setMessage(res.data)
			} catch (err) {
				console.log(err.response?.data || err.message)

				if (err.response?.status === 401) {
					alert('Session expired. Please login again.')
					navigate('/admin-login')
				}
			} finally {
				setLoading(false)
			}
		}

		fetchMessage()
	}, [id, navigate])

	if (loading) return <div className='admin-loading'>Loading...</div>

	if (!message) return <div className='admin-loading'>Message not found</div>

	return (
		<div className='admin-container'>
			<button className='back-btn' onClick={() => navigate(-1)}>
				⬅ Back
			</button>

			<div className='preview-card'>
				<h2>📩 Message Details</h2>

				<p>
					<strong>Name:</strong> {message.name}
				</p>
				<p>
					<strong>Email:</strong> {message.email}
				</p>
				<p>
					<strong>Subject:</strong> {message.subject || '—'}
				</p>
				<p>
					<strong>Status:</strong> {message.status || '—'}
				</p>

				<div style={{ marginTop: '15px' }}>
					<strong>Message:</strong>
					<p style={{ marginTop: '5px' }}>{message.message}</p>
				</div>

				<hr style={{ margin: '20px 0' }} />
			</div>
		</div>
	)
}

export default AdminViewMessage
