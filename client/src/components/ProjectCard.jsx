import { useNavigate } from 'react-router-dom'

const ProjectCard = ({ project }) => {
	const navigate = useNavigate()

	const BASE_URL = 'https://portfolio-website1-ejud.onrender.com'

	return (
		<div
			onClick={() => navigate(`/project/${project._id}`)}
			className='bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer
                 hover:shadow-2xl hover:scale-[1.02] transition duration-300'
		>
			{/* IMAGE */}
			<div className='h-48 overflow-hidden'>
				<img
					src={`${BASE_URL}${project.image}`}
					alt={project.title}
					className='w-full h-full object-cover hover:scale-110 transition duration-500'
					onError={e => {
						e.target.src =
							'https://dummyimage.com/600x400/cccccc/000000&text=No+Image'
					}}
				/>
			</div>

			{/* CONTENT */}
			<div className='p-5'>
				{/* CATEGORY */}
				<span className='text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full'>
					{project.category || 'Project'}
				</span>

				{/* TITLE */}
				<h3 className='text-lg font-bold mt-3 text-gray-800'>
					{project.title}
				</h3>

				{/* DESCRIPTION */}
				<p className='text-sm text-gray-600 mt-2'>
					{project.description?.slice(0, 120)}...
				</p>

				{/* TECH STACK */}
				<div className='mt-3 text-sm text-gray-700'>
					<span className='font-semibold'>Tech:</span>{' '}
					{project.techstack || '--'}
				</div>

				{/* LINKS */}
				<div className='mt-4 flex gap-3'>
					{project.githublink && (
						<a
							href={project.githublink}
							target='_blank'
							rel='noreferrer'
							onClick={e => e.stopPropagation()}
							className='text-sm px-3 py-1 border rounded-xl hover:bg-gray-100 transition'
						>
							GitHub
						</a>
					)}

					{project.livelink && (
						<a
							href={project.livelink}
							target='_blank'
							rel='noreferrer'
							onClick={e => e.stopPropagation()}
							className='text-sm px-3 py-1 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition'
						>
							Live Demo
						</a>
					)}
				</div>
			</div>
		</div>
	)
}

export default ProjectCard
