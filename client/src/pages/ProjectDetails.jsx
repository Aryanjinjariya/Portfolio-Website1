import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../api/axios'

const ProjectDetails = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const [project, setProject] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchProject = async () => {
			try {
				const res = await API.get(`/project/view/${id}`)
				setProject(res.data)
			} catch (err) {
				console.log(err)
			} finally {
				setLoading(false)
			}
		}

		fetchProject()
	}, [id])

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center text-gray-500'>
				Loading project...
			</div>
		)
	}

	if (!project) {
		return (
			<div className='min-h-screen flex items-center justify-center text-red-500'>
				Project not found
			</div>
		)
	}

	const BASE_URL = 'https://portfolio-website1-ejud.onrender.com'

	return (
		<div className='bg-white dark:bg-[#0b0f19] text-gray-900 dark:text-white min-h-screen'>
			{/* BACK BUTTON */}
			<div className='max-w-5xl mx-auto px-6 pt-8'>
				<button
					onClick={() => navigate(-1)}
					className='text-sm px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:scale-105 transition'
				>
					← Back
				</button>
			</div>

			{/* CONTENT */}
			<div className='max-w-5xl mx-auto px-6 py-10 space-y-8'>
				{/* IMAGE */}
				<div className='rounded-2xl overflow-hidden shadow-lg'>
					<img
						src={`${BASE_URL}${project.image}`}
						alt={project.title}
						className='w-full h-100 object-cover'
					/>
				</div>

				{/* TITLE + CATEGORY */}
				<div>
					<span className='text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full'>
						{project.category}
					</span>

					<h1 className='text-3xl md:text-4xl font-bold mt-3'>
						{project.title}
					</h1>
				</div>

				{/* DESCRIPTION */}
				<p className='text-gray-500 leading-relaxed'>{project.description}</p>

				{/* TECH STACK */}
				<div>
					<h3 className='text-lg font-semibold mb-2'>Tech Stack</h3>
					<p className='text-gray-500'>{project.techStack}</p>
				</div>

				{/* ACTION BUTTONS */}
				<div className='flex flex-wrap gap-4 pt-4'>
					{project.githubLink && (
						<a
							href={project.githubLink}
							target='_blank'
							rel='noreferrer'
							className='px-5 py-2 rounded-xl bg-gray-900 text-white hover:opacity-90 transition'
						>
							View GitHub
						</a>
					)}

					{project.liveLink && (
						<a
							href={project.liveLink}
							target='_blank'
							rel='noreferrer'
							className='px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition'
						>
							Live Demo
						</a>
					)}
				</div>
			</div>
		</div>
	)
}

export default ProjectDetails
