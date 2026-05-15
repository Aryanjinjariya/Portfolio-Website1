import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../api/axios'

const ProjectDetails = () => {
	const { id } = useParams()

	const [project, setProject] = useState(null)

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

	if (!project) return <h2>Loading...</h2>

	return (
		<div className='project-details'>
			<img
				src={`https://portfolio-website1-ejud.onrender.com${project.image}`}
				alt={project.title}
				className='details-image'
			/>

			<h1>{project.title}</h1>

			<p>{project.description}</p>

			<h3>{project.techStack}</h3>

			<div className='project-links'>
				{project.githubLink && (
					<a
						href={project.githubLink}
						target='_blank'
						rel='noreferrer'
						className='github-btn'
					>
						View Github
					</a>
				)}

				{project.liveLink && (
					<a
						href={project.liveLink}
						target='_blank'
						rel='noreferrer'
						className='live-btn'
					>
						Live Demo
					</a>
				)}
			</div>
		</div>
	)
}

export default ProjectDetails
