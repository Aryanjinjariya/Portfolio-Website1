import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

const AddProject = () => {
	const navigate = useNavigate()

	const [data, setData] = useState({
		title: '',
		description: '',
		techStack: '',
		githubLink: '',
		image: null
	})

	const [preview, setPreview] = useState(null)
	const token = localStorage.getItem('token')

	const submit = async e => {
		e.preventDefault()

		try {
			const fd = new FormData()
			Object.entries(data).forEach(([k, v]) => fd.append(k, v))

			await API.post('/project', fd, {
				headers: {
					'x-auth-token': token,
					'Content-Type': 'multipart/form-data'
				}
			})

			navigate('/admin-project')
		} catch (err) {
			console.log('Add project error:', err)
		}
	}

	const handleImage = e => {
		const file = e.target.files[0]
		setData({ ...data, image: file })

		if (file) {
			setPreview(URL.createObjectURL(file))
		}
	}

	return (
		<div className='add-project-container'>
			<button onClick={() => navigate(-1)}>⬅ Back</button>
			<div className='add-project-card'>
				<div className='card-header'>
					<h2>📁 Add New Project</h2>
					<p>Create and upload a new portfolio project</p>
				</div>

				<form onSubmit={submit} className='add-project-form'>
					<div className='input-group'>
						<input
							type='text'
							required
							onChange={e => setData({ ...data, title: e.target.value })}
						/>
						<label>Project Title</label>
					</div>

					<div className='input-group'>
						<textarea
							rows='4'
							required
							onChange={e => setData({ ...data, description: e.target.value })}
						/>
						<label>Description</label>
					</div>
					<div className='input-group'>
						<input
							type='text'
							required
							onChange={e => setData({ ...data, techStack: e.target.value })}
						/>
						<label>Tech Stack (comma separated)</label>
					</div>

					<div className='input-group'>
						<input
							type='text'
							onChange={e => setData({ ...data, githubLink: e.target.value })}
						/>
						<label>GitHub Link (optional)</label>
					</div>
					<div className='upload-section'>
						<label className='upload-label'>Upload Image</label>

						<input
							type='file'
							accept='image/*'
							onChange={handleImage}
							required
						/>

						{preview && (
							<img src={preview} alt='Preview' className='image-preview' />
						)}
					</div>

					<div className='button-group'>
						<button
							type='button'
							className='btn-secondary'
							onClick={() => navigate('/admin-project')}
						>
							Cancel
						</button>

						<button type='submit' className='btn-primary'>
							Submit Project
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddProject
