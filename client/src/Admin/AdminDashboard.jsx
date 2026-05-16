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
	}, [])

	const fetchData = async () => {
		try {
			const projectRes = await API.get('/project')
			const messageRes = await API.get('/contact', {
				headers: { 'x-auth-token': token }
			})

			setProjects(projectRes.data || [])
			setMessages(messageRes.data || [])
		} catch (err) {
			console.log(err)
		} finally {
			setLoading(false)
		}
	}

	const logout = () => {
		localStorage.removeItem('token')
		navigate('/admin-login')
	}

	if (loading) {
		return (
			<div className='h-screen flex items-center justify-center bg-gray-950 text-white'>
				Loading Dashboard...
			</div>
		)
	}

	return (
		<div className='flex min-h-screen bg-gray-950 text-white'>
			{/* SIDEBAR */}
			<aside className='w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col justify-between'>
				<div>
					<h2 className='text-xl font-bold mb-8'>
						Admin <span className='text-indigo-500'>Panel</span>
					</h2>

					<nav className='space-y-4'>
						<button
							onClick={() => navigate('/admin-dashboard')}
							className='block w-full text-left text-gray-300 hover:text-white'
						>
							📊 Dashboard
						</button>

						<button
							onClick={() => navigate('/admin-project')}
							className='block w-full text-left text-gray-300 hover:text-white'
						>
							📁 Projects
						</button>

						<button
							onClick={() => navigate('/admin-messages')}
							className='block w-full text-left text-gray-300 hover:text-white'
						>
							📩 Messages
						</button>
					</nav>
				</div>

				<button
					onClick={logout}
					className='bg-red-600 hover:bg-red-700 py-2 rounded-lg'
				>
					Logout
				</button>
			</aside>

			{/* MAIN */}
			<main className='flex-1 p-8'>
				<h1 className='text-3xl font-bold mb-6'>Dashboard Overview</h1>

				{/* STATS */}
				<div className='grid md:grid-cols-2 gap-6 mb-10'>
					<div className='bg-gray-900 border border-gray-800 rounded-xl p-6'>
						<h3 className='text-gray-400'>Total Projects</h3>
						<p className='text-3xl font-bold mt-2'>{projects.length}</p>
					</div>

					<div className='bg-gray-900 border border-gray-800 rounded-xl p-6'>
						<h3 className='text-gray-400'>Total Messages</h3>
						<p className='text-3xl font-bold mt-2'>{messages.length}</p>
					</div>
				</div>

				{/* CONTENT GRID */}
				<div className='grid md:grid-cols-2 gap-6'>
					{/* PROJECTS */}
					<div className='bg-gray-900 border border-gray-800 rounded-xl p-6'>
						<h2
							onClick={() => navigate('/admin-project')}
							className='text-xl font-semibold mb-4 cursor-pointer hover:text-indigo-400'
						>
							Recent Projects
						</h2>

						{projects.length === 0 ? (
							<p className='text-gray-400'>No projects found</p>
						) : (
							<ul className='space-y-2'>
								{projects.slice(0, 5).map(p => (
									<li
										key={p._id}
										className='bg-gray-800 p-3 rounded-lg hover:bg-gray-700'
									>
										{p.title}
									</li>
								))}
							</ul>
						)}
					</div>

					{/* MESSAGES */}
					<div className='bg-gray-900 border border-gray-800 rounded-xl p-6'>
						<h2
							onClick={() => navigate('/admin-messages')}
							className='text-xl font-semibold mb-4 cursor-pointer hover:text-indigo-400'
						>
							Recent Messages
						</h2>

						{messages.length === 0 ? (
							<p className='text-gray-400'>No messages found</p>
						) : (
							<ul className='space-y-3'>
								{messages.slice(0, 5).map(m => (
									<li key={m._id} className='bg-gray-800 p-3 rounded-lg'>
										<p className='font-semibold'>{m.name}</p>
										<p className='text-sm text-gray-400'>{m.email}</p>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			</main>
		</div>
	)
}

export default AdminDashboard
