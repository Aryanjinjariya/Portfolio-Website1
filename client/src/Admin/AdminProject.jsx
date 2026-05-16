import { useEffect, useMemo, useState } from 'react'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

const AdminProject = () => {
	const navigate = useNavigate()
	const token = localStorage.getItem('token')

	const [projects, setProjects] = useState([])
	const [searchInput, setSearchInput] = useState('')
	const [search, setSearch] = useState('')
	const [sortType, setSortType] = useState('newest')
	const [loading, setLoading] = useState(true)

	const BASE_URL = 'https://portfolio-website1-ejud.onrender.com'

	// FETCH
	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const res = await API.get('/project')
				setProjects(res.data.projects || res.data || [])
			} catch (err) {
				console.log(err)
			} finally {
				setLoading(false)
			}
		}
		fetchProjects()
	}, [])

	const filteredProjects = useMemo(() => {
		let data = [...projects]

		if (search.trim()) {
			data = data.filter(p =>
				p.title?.toLowerCase().includes(search.toLowerCase())
			)
		}

		switch (sortType) {
			case 'atoz':
				data.sort((a, b) => a.title.localeCompare(b.title))
				break
			case 'ztoa':
				data.sort((a, b) => b.title.localeCompare(a.title))
				break
			case 'oldest':
				data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
				break
			default:
				data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
		}

		return data
	}, [projects, search, sortType])

	const deleteProject = async id => {
		if (!window.confirm('Delete this project?')) return

		try {
			await API.delete(`/project/${id}`, {
				headers: { 'x-auth-token': token }
			})

			setProjects(prev => prev.filter(p => p._id !== id))
		} catch (err) {
			console.log(err)
		}
	}

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-zinc-950 text-white'>
				Loading...
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-zinc-950 text-white p-6'>
			{/* HEADER */}
			<div className='flex items-center justify-between mb-6'>
				<h1 className='text-2xl font-bold'>Project Management</h1>

				<button
					onClick={() => navigate('/add-project')}
					className='px-4 py-2 rounded-xl bg-linear-to-r from-indigo-500 to-purple-600 hover:scale-105 transition'
				>
					+ Add Project
				</button>
			</div>

			{/* FILTER BAR */}
			<div className='flex flex-col md:flex-row gap-3 mb-6'>
				<input
					className='flex-1 bg-zinc-900 border border-white/10 px-4 py-2 rounded-xl'
					placeholder='Search project...'
					value={searchInput}
					onChange={e => setSearchInput(e.target.value)}
				/>

				<button
					onClick={() => setSearch(searchInput)}
					className='px-4 py-2 bg-indigo-600 rounded-xl'
				>
					Search
				</button>

				<select
					className='bg-zinc-900 border border-white/10 px-4 py-2 rounded-xl'
					value={sortType}
					onChange={e => setSortType(e.target.value)}
				>
					<option value='newest'>Newest</option>
					<option value='oldest'>Oldest</option>
					<option value='atoz'>A → Z</option>
					<option value='ztoa'>Z → A</option>
				</select>
			</div>

			{/* TABLE */}
			<div className='overflow-x-auto bg-zinc-900/60 border border-white/10 rounded-2xl'>
				<table className='w-full text-left'>
					<thead className='bg-zinc-800/60'>
						<tr className='text-gray-300'>
							<th className='p-3'>Image</th>
							<th>Title</th>
							<th>Category</th>
							<th>Tech</th>
							<th>Date</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody>
						{filteredProjects.length === 0 ? (
							<tr>
								<td colSpan='6' className='text-center p-6 text-gray-400'>
									No projects found
								</td>
							</tr>
						) : (
							filteredProjects.map(project => {
								const date = project.createdAt
									? new Date(project.createdAt).toLocaleDateString()
									: '--'

								return (
									<tr
										key={project._id}
										className='border-t border-white/10 hover:bg-white/5 transition'
									>
										<td className='p-3'>
											<img
												src={`${BASE_URL}${project.image}`}
												className='w-14 h-14 object-cover rounded-lg'
											/>
										</td>

										<td>{project.title}</td>
										<td>{project.category}</td>
										<td>{project.techstack}</td>
										<td>{date}</td>

										<td className='flex gap-3 p-3'>
											<button
												onClick={() => navigate(`/view-project/${project._id}`)}
												className='text-blue-400'
											>
												<FaEye />
											</button>

											<button
												onClick={() => navigate(`/edit-project/${project._id}`)}
												className='text-yellow-400'
											>
												<FaEdit />
											</button>

											<button
												onClick={() => deleteProject(project._id)}
												className='text-red-500'
											>
												<FaTrash />
											</button>
										</td>
									</tr>
								)
							})
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default AdminProject
