import { useNavigate } from 'react-router-dom'
const ProjectCard = ({ project }) => {
	const navigate = useNavigate()

	const BASE_URL = 'http://localhost:3001'

	return (
		<div
			className='glass project-card'
			onClick={() => navigate(`/project/${project._id}`)}
		>
			<img src={`${BASE_URL}${project.image}`} alt={project.title} />
			<h3>{project.title}</h3>
			<p>{project.description}</p>
		</div>
	)
}

export default ProjectCard
