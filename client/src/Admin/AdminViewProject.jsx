import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../api/axios'

const AdminViewProject = () => {
	const { id } = useParams()
	const navigate = useNavigate()

	const [project, setProject] = useState(null)

	const BASE_URL = 'https://portfolio-website1-ejud.onrender.com'

	useEffect(() => {
		const fetchProject = async () => {
			try {
				const res = await API.get(`/project/view/${id}`)
				setProject(res.data)
			} catch (err) {
				console.log(err)
			}
		}

		fetchProject()
	}, [id])

	if (!project) {
		return (
			<div className='min-h-screen flex items-center justify-center text-gray-400'>
				Loading...
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-zinc-950 text-white p-6'>
			{/* BACK */}
			<button
				onClick={() => navigate(-1)}
				className='mb-6 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition'
			>
				⬅ Back
			</button>

			{/* CARD */}
			<div className='max-w-4xl mx-auto bg-zinc-900/60 border border-white/10 rounded-2xl shadow-xl overflow-hidden'>
				{/* IMAGE */}
				<img
					src={`${BASE_URL}${project.image}`}
					alt={project.title}
					className='w-full h-72 object-cover'
				/>

				<div className='p-6 space-y-5'>
					{/* TITLE */}
					<h2 className='text-3xl font-bold'>{project.title}</h2>

					{/* CATEGORY BADGE */}
					<span className='inline-block px-3 py-1 text-xs rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30'>
						{project.category || 'Project'}
					</span>

					{/* DESCRIPTION */}
					<div>
						<p className='text-gray-400 text-sm mb-2'>Description</p>
						<p className='leading-relaxed'>{project.description}</p>
					</div>

					{/* TECH STACK */}
					<div>
						<p className='text-gray-400 text-sm mb-1'>Tech Stack</p>
						<p className='text-white font-medium'>
							{project.techstack || '--'}
						</p>
					</div>

					{/* LINKS GRID */}
					<div className='grid md:grid-cols-2 gap-4'>
						<div className='bg-zinc-800/40 p-4 rounded-xl border border-white/10'>
							<p className='text-gray-400 text-sm'>Live Link</p>
							{project.livelink ? (
								<a
									href={project.livelink}
									target='_blank'
									rel='noreferrer'
									className='text-blue-400 hover:underline break-all'
								>
									Visit Project
								</a>
							) : (
								<p>--</p>
							)}
						</div>

						<div className='bg-zinc-800/40 p-4 rounded-xl border border-white/10'>
							<p className='text-gray-400 text-sm'>GitHub</p>
							{project.githublink ? (
								<a
									href={project.githublink}
									target='_blank'
									rel='noreferrer'
									className='text-blue-400 hover:underline break-all'
								>
									View Code
								</a>
							) : (
								<p>--</p>
							)}
						</div>
					</div>

					{/* DATE */}
					<div className='text-sm text-gray-500 pt-2 border-t border-white/10'>
						Created: {new Date(project.createdAt).toLocaleString()}
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdminViewProject
