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
		<div className='admin-edit-wrapper'>
			<div className='edit-card'>
				<div className='edit-header'>
					<button className='back-btn' onClick={() => navigate(-1)}>
						← Back
					</button>
					<h2>Edit Project</h2>
				</div>

				<form className='admin-form' onSubmit={handleSubmit}>
					<div className='form-group'>
						<label>Project Title</label>
						<input
							name='title'
							value={form.title}
							onChange={handleChange}
							required
						/>
					</div>

					<div className='form-group'>
						<label>Description</label>
						<textarea
							name='description'
							value={form.description}
							onChange={handleChange}
							rows='4'
							required
						/>
					</div>

					<div className='form-group'>
						<label>Tech Stack</label>
						<input
							name='techStack'
							value={form.techStack}
							onChange={handleChange}
						/>
					</div>

					<div className='form-group'>
						<label>GitHub Link</label>
						<input
							name='githubLink'
							value={form.githubLink}
							onChange={handleChange}
						/>
					</div>

					<button className='update-btn' type='submit'>
						{loading ? 'Updating...' : 'Update Project'}
					</button>
				</form>
			</div>
		</div>
	)
}

export default AdminEditProject
