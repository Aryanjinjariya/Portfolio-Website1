import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../api/axios'

const AdminEditProject = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const token = localStorage.getItem('token')

	const [form, setForm] = useState({
		title: '',
		description: '',
		techStack: '',
		githubLink: ''
	})

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchProject = async () => {
			try {
				const res = await API.get(`/project/${id}`)
				setForm(res.data)
			} catch (err) {
				console.log(err)
			}
		}

		fetchProject()
	}, [id])

	const handleChange = e => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		setLoading(true)

		try {
			await API.put(`/project/edit/${id}`, form, {
				headers: { 'x-auth-token': token }
			})

			alert('Project updated successfully')
			navigate('/admin-project')
		} catch (err) {
			console.log(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-zinc-950 px-4'>
			{/* CARD */}
			<div className='w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl shadow-xl p-6'>
				{/* HEADER */}
				<div className='flex items-center justify-between mb-6'>
					<button
						onClick={() => navigate(-1)}
						className='text-sm text-gray-300 hover:text-white transition'
					>
						← Back
					</button>

					<h2 className='text-xl font-bold text-white'>Edit Project</h2>
				</div>

				{/* FORM */}
				<form onSubmit={handleSubmit} className='space-y-5'>
					{/* TITLE */}
					<div>
						<label className='text-sm text-gray-300'>Project Title</label>
						<input
							name='title'
							value={form.title}
							onChange={handleChange}
							required
							className='w-full mt-1 p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500'
						/>
					</div>

					{/* DESCRIPTION */}
					<div>
						<label className='text-sm text-gray-300'>Description</label>
						<textarea
							name='description'
							value={form.description}
							onChange={handleChange}
							rows='4'
							required
							className='w-full mt-1 p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500'
						/>
					</div>

					{/* TECH STACK */}
					<div>
						<label className='text-sm text-gray-300'>Tech Stack</label>
						<input
							name='techStack'
							value={form.techStack}
							onChange={handleChange}
							className='w-full mt-1 p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500'
						/>
					</div>

					{/* GITHUB */}
					<div>
						<label className='text-sm text-gray-300'>GitHub Link</label>
						<input
							name='githubLink'
							value={form.githubLink}
							onChange={handleChange}
							className='w-full mt-1 p-3 rounded-lg bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500'
						/>
					</div>

					{/* BUTTON */}
					<button
						type='submit'
						disabled={loading}
						className='w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium text-white'
					>
						{loading ? 'Updating...' : 'Update Project'}
					</button>
				</form>
			</div>
		</div>
	)
}

export default AdminEditProject
