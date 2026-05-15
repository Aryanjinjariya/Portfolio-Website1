import { useNavigate } from 'react-router-dom'
import noImage from '../assets/no-image.png'

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
					e.target.src = noImage
				}}
			/>

			<h3>{project.title}</h3>

			<p>{project.description}</p>
		</div>
	)
}

export default ProjectCard
