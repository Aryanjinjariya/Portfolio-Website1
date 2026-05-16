import { useEffect, useState } from 'react'
import API from '../api/axios'
import ProjectCard from '../components/ProjectCard'

const Project = () => {
	const [projects, setProjects] = useState([])
	const [loading, setLoading] = useState(true)
	const [filter, setFilter] = useState('All')

	const categories = [
		'All',
		'Frontend',
		'Backend',
		'FullStack',
		'Mobile',
		'UI/UX'
	]

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const res = await API.get('/project')
				setProjects(res.data)
			} catch (err) {
				console.log(err)
			} finally {
				setLoading(false)
			}
		}

		fetchProjects()
	}, [])

	const filteredProjects =
		filter === 'All' ? projects : projects.filter(p => p.category === filter)

	return (
		<div className='bg-white dark:bg-[#0b0f19] text-gray-900 dark:text-white'>
			{/* HERO */}
			<section className='text-center py-20 px-6'>
				<h1 className='text-4xl font-bold'>Projects</h1>
				<p className='text-gray-500 mt-2'>
					Some things I’ve built and experimented with
				</p>
			</section>

			{/* FILTER BAR */}
			<div className='flex flex-wrap justify-center gap-3 px-6 pb-10'>
				{categories.map(cat => (
					<button
						key={cat}
						onClick={() => setFilter(cat)}
						className={`
              px-4 py-2 rounded-full text-sm transition
              ${
								filter === cat
									? 'bg-indigo-600 text-white shadow'
									: 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
							}
            `}
					>
						{cat}
					</button>
				))}
			</div>

			{/* CONTENT */}
			<section className='max-w-6xl mx-auto px-6 pb-20'>
				{loading && (
					<div className='text-center text-gray-500'>Loading projects...</div>
				)}

				{!loading && filteredProjects.length === 0 && (
					<div className='text-center text-gray-500'>No projects found</div>
				)}

				<div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{filteredProjects.map(project => (
						<ProjectCard key={project._id} project={project} />
					))}
				</div>
			</section>
		</div>
	)
}

export default Project
