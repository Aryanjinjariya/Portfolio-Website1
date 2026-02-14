import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

const AdminDashboard = () => {
	const navigate = useNavigate()
	const [projects, setProjects] = useState([])
	const [messages, setMessages] = useState([])
	const [loading, setLoading] = useState(true)

	const token = localStorage.getItem('token')

	useEffect(() => {
		if (!token) {
			navigate('/admin-login')
			return
		}

		fetchData()
	}, [token])

	const fetchData = async () => {
		try {
			const projectRes = await API.get('/project')
			const messageRes = await API.get('/contact', {
				headers: { 'x-auth-token': token }
			})

			const projectData = projectRes.data
			const messageData = messageRes.data

			setProjects(
				Array.isArray(projectData)
					? projectData
					: projectData.projects || projectData.data || []
			)

			setMessages(
				Array.isArray(messageData)
					? messageData
					: messageData.messages || messageData.data || []
			)

			setLoading(false)
		} catch (err) {
			console.log('Dashboard error:', err)
			setLoading(false)
		}
	}

	const logout = () => {
		localStorage.removeItem('token')
		navigate('/admin-login')
	}

	if (loading) {
		return <div className='admin-loading'>Loading Dashboard...</div>
	}

	return (
		<div className='admin-wrapper'>
			{/* Sidebar */}
			<div className='admin-sidebar'>
				<div>
					<h2 className='logo'>Admin Panel</h2>

					<ul className='sidebar-links'>
						<li onClick={() => navigate('/admin-dashboard')}>📊 Dashboard</li>

						<li onClick={() => navigate('/admin-project')}>📁 Projects</li>

						<li onClick={() => navigate('/admin-messages')}>📩 Messages</li>
					</ul>
				</div>

				<button onClick={logout} className='logout-btn'>
					Logout
				</button>
			</div>

			{/* Main Content */}
			<div className='admin-main'>
				<h1 className='dashboard-title'>Dashboard Overview</h1>

				{/* Stats */}
				<div className='admin-stats'>
					<div className='card stat-card'>
						<h3>Total Projects</h3>
						<p>{projects.length}</p>
					</div>

					<div className='card stat-card'>
						<h3>Total Messages</h3>
						<p>{messages.length}</p>
					</div>
				</div>

				{/* Projects */}
				<div className='admin-section'>
					<h2
						onClick={() => navigate('/admin-project')}
						style={{ cursor: 'pointer' }}
					>
						Recent Projects
					</h2>
					{projects.length === 0 ? (
						<p className='empty'>No projects found</p>
					) : (
						<ul>
							{projects.slice(0, 5).map(project => (
								<li key={project._id}>
									<span>{project.title}</span>
								</li>
							))}
						</ul>
					)}
				</div>

				{/* Messages */}
				<div className='admin-section'>
					<h2
						onClick={() => navigate('/admin-messages')}
						style={{ cursor: 'pointer' }}
					>
						Recent Messages
					</h2>

					{messages.length === 0 ? (
						<p className='empty'>No messages found</p>
					) : (
						<ul>
							{messages.slice(0, 5).map(msg => (
								<li key={msg._id}>
									<div>
										<strong>{msg.name}</strong>
										<p className='email'>{msg.email}</p>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	)
}

export default AdminDashboard
