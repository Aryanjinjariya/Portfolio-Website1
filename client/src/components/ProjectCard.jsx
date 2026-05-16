import { useNavigate } from 'react-router-dom'

const ProjectCard = ({ project }) => {
	const navigate = useNavigate()

	const BASE_URL = 'https://portfolio-website1-ejud.onrender.com'

	return (
		<div
			className='glass project-card'
			onClick={() => navigate(`/project/${project._id}`)}
		>
			{/* PROJECT IMAGE */}
			<img
				src={`${BASE_URL}${project.image}`}
				alt={project.title}
				onError={e => {
					e.target.src =
						'https://dummyimage.com/600x400/cccccc/000000&text=No+Image'
				}}
			/>

			{/* CATEGORY */}
			<span className='project-category'>{project.category || 'Project'}</span>

			{/* TITLE */}
			<h3>{project.title}</h3>

			{/* DESCRIPTION */}
			<p>
				{project.description?.slice(0, 120)}
				...
			</p>

			{/* TECH STACK */}
			<div className='tech-stack'>
				<strong>Tech:</strong> {project.techstack || '--'}
			</div>

			{/* LINKS */}
			<div className='project-links'>
				{project.githublink && (
					<a
						href={project.githublink}
						target='_blank'
						rel='noreferrer'
						onClick={e => e.stopPropagation()}
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
					>
						Live Demo
					</a>
				)}
			</div>
		</div>
	)
}

export default ProjectCard
