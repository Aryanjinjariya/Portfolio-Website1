import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

const AddProject = () => {
	const navigate = useNavigate()

	const [data, setData] = useState({
		title: '',
		description: '',
		category: '',
		techStack: '',
		githubLink: '',
		liveLink: '',
		image: null
	})

	const [preview, setPreview] = useState(null)
	const token = localStorage.getItem('token')

	const handleImage = e => {
		const file = e.target.files[0]
		if (!file) return

		setData({ ...data, image: file })
		setPreview(URL.createObjectURL(file))
	}

	const submit = async e => {
		e.preventDefault()

		if (!token) {
			alert('Please login again')
			return navigate('/admin-login')
		}

		try {
			const fd = new FormData()
			Object.keys(data).forEach(key => fd.append(key, data[key]))

			await API.post('/project', fd, {
				headers: { 'x-auth-token': token }
			})

			alert('Project Added Successfully 🚀')
			navigate('/admin-project')
		} catch (err) {
			alert(err.response?.data?.msg || 'Upload Failed')
		}
	}

	const Input = ({ label, ...props }) => (
		<div className='relative'>
			<input
				{...props}
				className='w-full bg-gray-900 border border-gray-800 px-4 pt-5 pb-2 rounded-lg text-white focus:border-indigo-500 outline-none'
			/>
			<label className='absolute top-1 left-4 text-xs text-gray-400'>
				{label}
			</label>
		</div>
	)

	return (
		<div className='min-h-screen bg-gray-950 text-white flex items-center justify-center p-6'>
			<div className='w-full max-w-3xl bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl'>
				{/* HEADER */}
				<div className='mb-6'>
					<button
						onClick={() => navigate(-1)}
						className='text-gray-400 hover:text-white mb-4'
					>
						← Back
					</button>

					<h2 className='text-2xl font-bold'>Add New Project</h2>
					<p className='text-gray-400 text-sm'>
						Create and publish your portfolio project
					</p>
				</div>

				{/* FORM */}
				<form onSubmit={submit} className='space-y-4'>
					<Input
						label='Project Title'
						value={data.title}
						onChange={e => setData({ ...data, title: e.target.value })}
						required
					/>

					<div className='relative'>
						<textarea
							rows='4'
							value={data.description}
							onChange={e => setData({ ...data, description: e.target.value })}
							className='w-full bg-gray-900 border border-gray-800 px-4 pt-5 pb-2 rounded-lg text-white focus:border-indigo-500 outline-none'
						/>
						<label className='absolute top-1 left-4 text-xs text-gray-400'>
							Description
						</label>
					</div>

					{/* CATEGORY */}
					<div className='relative'>
						<select
							value={data.category}
							onChange={e => setData({ ...data, category: e.target.value })}
							className='w-full bg-gray-900 border border-gray-800 px-4 py-3 rounded-lg text-white focus:border-indigo-500 outline-none'
						>
							<option value=''>Select Category</option>
							<option>Frontend</option>
							<option>Backend</option>
							<option>FullStack</option>
							<option>Mobile</option>
							<option>UI/UX</option>
						</select>
					</div>

					<Input
						label='Tech Stack'
						value={data.techStack}
						onChange={e => setData({ ...data, techStack: e.target.value })}
						required
					/>

					<Input
						label='GitHub Link'
						value={data.githubLink}
						onChange={e => setData({ ...data, githubLink: e.target.value })}
					/>

					<Input
						label='Live Link'
						value={data.liveLink}
						onChange={e => setData({ ...data, liveLink: e.target.value })}
					/>

					{/* IMAGE UPLOAD */}
					<div>
						<label className='block text-sm text-gray-400 mb-2'>
							Upload Image
						</label>

						<input
							type='file'
							accept='image/*'
							onChange={handleImage}
							className='w-full text-gray-400'
							required
						/>

						{preview && (
							<img
								src={preview}
								className='mt-4 w-full h-52 object-cover rounded-lg border border-gray-800'
							/>
						)}
					</div>

					{/* BUTTONS */}
					<div className='flex gap-4 pt-4'>
						<button
							type='button'
							onClick={() => navigate('/admin-project')}
							className='w-full py-2 border border-gray-700 rounded-lg hover:bg-gray-800'
						>
							Cancel
						</button>

						<button
							type='submit'
							className='w-full py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700'
						>
							Submit Project
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default AddProject
