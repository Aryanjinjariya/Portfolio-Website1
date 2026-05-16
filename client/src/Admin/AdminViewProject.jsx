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

				console.log(res.data)

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
				{/* IMAGE */}
				<img
					src={`${BASE_URL}${project.image}`}
					alt={project.title}
					className='preview-image'
				/>

				{/* TITLE */}
				<h2>{project.title}</h2>

				{/* CATEGORY */}
				<p>
					<strong>Category:</strong> {project.category || '--'}
				</p>

				{/* DESCRIPTION */}
				<p>
					<strong>Description:</strong>
				</p>

				<p>{project.description}</p>

				{/* TECH STACK */}
				<p>
					<strong>Tech Stack:</strong> {project.techstack || '--'}
				</p>

				{/* LIVE LINK */}
				<p>
					<strong>Live Link:</strong>{' '}
					{project.livelink ? (
						<a href={project.livelink} target='_blank' rel='noreferrer'>
							{project.livelink}
						</a>
					) : (
						'--'
					)}
				</p>

				{/* GITHUB */}
				<p>
					<strong>GitHub:</strong>{' '}
					{project.githublink ? (
						<a href={project.githublink} target='_blank' rel='noreferrer'>
							{project.githublink}
						</a>
					) : (
						'--'
					)}
				</p>

				{/* CREATED DATE */}
				<p>
					<strong>Created At:</strong>{' '}
					{new Date(project.createdAt).toLocaleString()}
				</p>
			</div>
		</div>
	)
}

export default AdminViewProject
