import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

const AddProject = () => {
	const navigate = useNavigate()

	const [data, setData] = useState({
		title: '',
		description: '',
		category: 'FullStack',
		techStack: '',
		githubLink: '',
		liveLink: '',
		image: null
	})

	const [preview, setPreview] = useState(null)

	const token = localStorage.getItem('token')

	// ================= SUBMIT =================
	const submit = async e => {
		e.preventDefault()

		try {
			// CHECK TOKEN
			if (!token) {
				alert('Please login again')

				return navigate('/admin-login')
			}

			const fd = new FormData()

			fd.append('title', data.title)
			fd.append('description', data.description)
			fd.append('category', data.category)
			fd.append('techStack', data.techStack)
			fd.append('githubLink', data.githubLink)
			fd.append('liveLink', data.liveLink)
			fd.append('image', data.image)

			console.log('FORM DATA:')

			for (let pair of fd.entries()) {
				console.log(pair[0], pair[1])
			}

			const res = await API.post('/project', fd, {
				headers: {
					'x-auth-token': token
				}
			})

			console.log('SUCCESS:', res.data)

			alert('Project Added Successfully')

			navigate('/admin-project')
		} catch (err) {
			console.log('FULL ERROR:', err)

			console.log('ERROR DATA:', err.response?.data)

			alert(err.response?.data?.msg || 'Project Upload Failed')
		}
	}

	// ================= IMAGE =================
	const handleImage = e => {
		const file = e.target.files[0]

		if (!file) return

		setData(prev => ({
			...prev,
			image: file
		}))

		setPreview(URL.createObjectURL(file))
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
					{/* TITLE */}
					<div className='input-group'>
						<input
							type='text'
							value={data.title}
							required
							onChange={e =>
								setData({
									...data,
									title: e.target.value
								})
							}
						/>

						<label>Project Title</label>
					</div>

					{/* DESCRIPTION */}
					<div className='input-group'>
						<textarea
							rows='4'
							value={data.description}
							required
							onChange={e =>
								setData({
									...data,
									description: e.target.value
								})
							}
						/>

						<label>Description</label>
					</div>

					{/* CATEGORY */}
					<div className='input-group'>
						<select
							value={data.category}
							onChange={e =>
								setData({
									...data,
									category: e.target.value
								})
							}
						>
							<option value='Frontend'>Frontend</option>

							<option value='Backend'>Backend</option>

							<option value='FullStack'>FullStack</option>

							<option value='Mobile'>Mobile</option>

							<option value='UI/UX'>UI/UX</option>
						</select>
					</div>

					{/* TECH STACK */}
					<div className='input-group'>
						<input
							type='text'
							value={data.techStack}
							required
							onChange={e =>
								setData({
									...data,
									techStack: e.target.value
								})
							}
						/>

						<label>Tech Stack</label>
					</div>

					{/* GITHUB */}
					<div className='input-group'>
						<input
							type='text'
							value={data.githubLink}
							onChange={e =>
								setData({
									...data,
									githubLink: e.target.value
								})
							}
						/>

						<label>GitHub Link</label>
					</div>

					{/* LIVE LINK */}
					<div className='input-group'>
						<input
							type='text'
							value={data.liveLink}
							onChange={e =>
								setData({
									...data,
									liveLink: e.target.value
								})
							}
						/>

						<label>Live Demo Link</label>
					</div>

					{/* IMAGE */}
					<div className='upload-section'>
						<label className='upload-label'>Upload Image</label>

						<input
							type='file'
							accept='image/*'
							required
							onChange={handleImage}
						/>

						{preview && (
							<img src={preview} alt='Preview' className='image-preview' />
						)}
					</div>

					{/* BUTTONS */}
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
