import { useEffect, useMemo, useState } from 'react'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

const AdminProjects = () => {
	const navigate = useNavigate()
	const token = localStorage.getItem('token')

	const [projects, setProjects] = useState([])
	const [searchInput, setSearchInput] = useState('')
	const [search, setSearch] = useState('')
	const [sortType, setSortType] = useState('newest')
	const [loading, setLoading] = useState(true)

	/* ================= FETCH PROJECTS ================= */
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

	/* ================= SEARCH ================= */
	const handleSearch = () => {
		setSearch(searchInput)
	}

	/* ================= FILTER + SORT ================= */
	const filteredProjects = useMemo(() => {
		let filtered = [...projects]

		// Search
		if (search.trim()) {
			filtered = filtered.filter(p =>
				p.title?.toLowerCase().includes(search.toLowerCase())
			)
		}

		// Sort
		switch (sortType) {
			case 'atoz':
				filtered.sort((a, b) => a.title.localeCompare(b.title))
				break
			case 'ztoa':
				filtered.sort((a, b) => b.title.localeCompare(a.title))
				break
			case 'oldest':
				filtered.sort(
					(a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
				)
				break
			default:
				filtered.sort(
					(a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
				)
		}

		return filtered
	}, [projects, search, sortType])

	/* ================= DELETE ================= */
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

	if (loading) return <div className='admin-loading'>Loading...</div>

	return (
		<div className='admin-container'>
			<button className='back-btn' onClick={() => navigate(-1)}>
				⬅ Back
			</button>

			{/* HEADER */}
			<div className='admin-header'>
				<h2>Project Management</h2>
			</div>

			{/* SEARCH + SORT */}
			<div className='filter-section'>
				<div className='search-box'>
					<input
						type='text'
						placeholder='Search project...'
						value={searchInput}
						onChange={e => setSearchInput(e.target.value)}
					/>
					<button onClick={handleSearch}>Search</button>
				</div>

				<button className='add-btn' onClick={() => navigate('/add-project')}>
					+ Add Project
				</button>

				<select
					className='sort-select'
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
			<div className='project-table'>
				<div className='table-head'>
					<div>Title</div>
					<div>Tech Stack</div>
					<div>Date</div>
					<div>Time</div>
					<div>Action</div>
				</div>

				{filteredProjects.length === 0 ? (
					<div className='empty'>No projects found</div>
				) : (
					filteredProjects.map(project => {
						const dateObj = project.createdAt
							? new Date(project.createdAt)
							: null

						return (
							<div key={project._id} className='table-row'>
								<div>{project.title}</div>

								<div>{project.techStack?.join(', ') || '--'}</div>

								<div>{dateObj ? dateObj.toLocaleDateString() : '--'}</div>

								<div>{dateObj ? dateObj.toLocaleTimeString() : '--'}</div>

								<div className='action-buttons'>
									<button
										className='icon-btn view'
										title='View'
										onClick={() => navigate(`/view-project/${project._id}`)}
									>
										<FaEye />
									</button>

									<button
										className='icon-btn edit'
										title='Edit'
										onClick={() => navigate(`/edit-project/${project._id}`)}
									>
										<FaEdit />
									</button>

									<button
										className='icon-btn delete'
										title='Delete'
										onClick={() => deleteProject(project._id)}
									>
										<FaTrash />
									</button>
								</div>
							</div>
						)
					})
				)}
			</div>
		</div>
	)
}

export default AdminProjects
