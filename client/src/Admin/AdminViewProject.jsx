import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../api/axios'

const AdminViewProject = () => {
	const { id } = useParams()
	const navigate = useNavigate()
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

	if (!project) return <div>Loading...</div>

	return (
		<div className='admin-container'>
			<button onClick={() => navigate(-1)}>⬅ Back</button>

			<div className='preview-card'>
				<h2>{project.title}</h2>

				<p>
					<strong>Description:</strong>
				</p>
				<p>{project.description}</p>

				<p>
					<strong>Tech Stack:</strong> {project.techStack}
				</p>

				<p>
					<strong>Live Link:</strong>{' '}
					<a href={project.liveLink} target='_blank' rel='noreferrer'>
						{project.liveLink}
					</a>
				</p>

				<p>
					<strong>GitHub:</strong>{' '}
					<a href={project.githubLink} target='_blank' rel='noreferrer'>
						{project.githubLink}
					</a>
				</p>

				<p>
					<strong>Created At:</strong>{' '}
					{new Date(project.createdAt).toLocaleString()}
				</p>
			</div>
		</div>
	)
}

export default AdminViewProject
