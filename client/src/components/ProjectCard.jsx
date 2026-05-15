import { useNavigate } from 'react-router-dom'

const ProjectCard = ({ project }) => {
	const navigate = useNavigate()

	const BASE_URL = 'https://portfolio-website1-ejud.onrender.com'

	return (
		<div
			className='glass project-card'
			onClick={() => navigate(`/project/${project._id}`)}
		>
			<img
				src={`${BASE_URL}${project.image}`}
				alt={project.title}
				onError={e => {
					e.target.src = 'https://via.placeholder.com/400x250?text=No+Image'
				}}
			/>

			<h3>{project.title}</h3>

			<p>{project.description}</p>
		</div>
	)
}

export default ProjectCard
