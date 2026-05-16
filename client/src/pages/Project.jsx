import { useEffect, useState } from 'react'
import API from '../api/axios'
import ProjectCard from '../components/ProjectCard'

const Project = () => {
	const [projects, setProjects] = useState([])
	const [loading, setLoading] = useState(true)

	// CATEGORY FILTER
	const [filter, setFilter] = useState('All')

	// FETCH PROJECTS
	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const res = await API.get('/project')

				console.log('PROJECTS:', res.data)

				setProjects(res.data)
			} catch (err) {
				console.log(err)
			} finally {
				setLoading(false)
			}
		}

		fetchProjects()
	}, [])

	// FILTER PROJECTS
	const filteredProjects =
		filter === 'All'
			? projects
			: projects.filter(project => project.category === filter)

	return (
		<>
			{/* HERO */}
			<section className='page hero-small'>
				<h1>Projects</h1>

				<p className='subtitle'>Some things I’ve built</p>
			</section>

			{/* FILTER BUTTONS */}
			<section className='page-content project-filters'>
				<button
					className={filter === 'All' ? 'active' : ''}
					onClick={() => setFilter('All')}
				>
					All
				</button>

				<button
					className={filter === 'Frontend' ? 'active' : ''}
					onClick={() => setFilter('Frontend')}
				>
					Frontend
				</button>

				<button
					className={filter === 'Backend' ? 'active' : ''}
					onClick={() => setFilter('Backend')}
				>
					Backend
				</button>

				<button
					className={filter === 'FullStack' ? 'active' : ''}
					onClick={() => setFilter('FullStack')}
				>
					FullStack
				</button>

				<button
					className={filter === 'Mobile' ? 'active' : ''}
					onClick={() => setFilter('Mobile')}
				>
					Mobile
				</button>

				<button
					className={filter === 'UI/UX' ? 'active' : ''}
					onClick={() => setFilter('UI/UX')}
				>
					UI/UX
				</button>
			</section>

			{/* PROJECTS */}
			<section className='page-content'>
				{loading && <p className='center'>Loading projects...</p>}

				{!loading && filteredProjects.length === 0 && (
					<p className='center'>No projects found.</p>
				)}

				<div className='project-grid'>
					{filteredProjects.map(project => (
						<ProjectCard key={project._id} project={project} />
					))}
				</div>
			</section>
		</>
	)
}

export default Project
