import { useEffect, useState } from 'react'
import API from '../api/axios'
import ProjectCard from '../components/ProjectCard'

const Project = () => {
	const [projects, setProjects] = useState([])
	const [loading, setLoading] = useState(true)
	const [filter, setFilter] = useState('all')

	useEffect(() => {
		API.get('/project')
			.then(res => setProjects(res.data))
			.catch(err => console.error(err))
			.finally(() => setLoading(false))
	}, [])

	const filteredProjects =
		filter === 'all' ? projects : projects.filter(p => p.tech?.includes(filter))

	return (
		<>
			{/* HERO */}
			<section className='page hero-small'>
				<h1>Projects</h1>
				<p className='subtitle'>Some things I’ve built</p>
			</section>

			{/* FILTER */}
			<section className='page-content project-filters'>
				<button
					className={filter === 'all' ? 'active' : ''}
					onClick={() => setFilter('all')}
				>
					All
				</button>
				<button
					className={filter === 'React' ? 'active' : ''}
					onClick={() => setFilter('React')}
				>
					React
				</button>
				<button
					className={filter === 'Node' ? 'active' : ''}
					onClick={() => setFilter('Node')}
				>
					Backend
				</button>
				<button
					className={filter === 'Fullstack' ? 'active' : ''}
					onClick={() => setFilter('Fullstack')}
				>
					Full Stack
				</button>
			</section>

			{/* PROJECT GRID */}
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
