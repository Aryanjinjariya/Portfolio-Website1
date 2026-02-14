import { useEffect, useMemo, useState } from 'react'
import { FaEye, FaReply, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

const AdminMessages = () => {
	const token = localStorage.getItem('token')
	const navigate = useNavigate()

	const [messages, setMessages] = useState([])
	const [searchInput, setSearchInput] = useState('')
	const [search, setSearch] = useState('')
	const [sortType, setSortType] = useState('newest')
	const [loading, setLoading] = useState(true)

	/* ================= FETCH MESSAGES ================= */
	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const res = await API.get('/contact', {
					headers: { 'x-auth-token': token }
				})
				setMessages(res.data || [])
			} catch (err) {
				console.log(err.response?.data || err.message)
			} finally {
				setLoading(false)
			}
		}

		fetchMessages()
	}, [])

	/* ================= SEARCH ================= */
	const handleSearch = () => {
		setSearch(searchInput)
	}

	/* ================= FILTER + SORT ================= */
	const filteredMessages = useMemo(() => {
		let filtered = [...messages]

		if (search.trim()) {
			filtered = filtered.filter(m =>
				`${m.name} ${m.email}`.toLowerCase().includes(search.toLowerCase())
			)
		}

		switch (sortType) {
			case 'atoz':
				filtered.sort((a, b) => a.name.localeCompare(b.name))
				break
			case 'ztoa':
				filtered.sort((a, b) => b.name.localeCompare(a.name))
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
	}, [messages, search, sortType])

	/* ================= DELETE ================= */
	const deleteMessage = async id => {
		if (!window.confirm('Delete this message?')) return

		try {
			await API.delete(`/contact/${id}`, {
				headers: { 'x-auth-token': token }
			})

			setMessages(prev => prev.filter(m => m._id !== id))
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

			<div className='admin-header'>
				<h2>Message Management</h2>
			</div>

			{/* SEARCH + SORT */}
			<div className='filter-section'>
				<div className='search-box'>
					<input
						type='text'
						placeholder='Search by name or email...'
						value={searchInput}
						onChange={e => setSearchInput(e.target.value)}
					/>
					<button onClick={handleSearch}>Search</button>
				</div>

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
					<div>Name</div>
					<div>Email</div>
					<div>Date</div>
					<div>Time</div>
					<div>Status</div>
					<div>Action</div>
				</div>

				{filteredMessages.length === 0 ? (
					<div className='empty-1'>No messages found</div>
				) : (
					filteredMessages.map(msg => {
						const dateObj = msg.createdAt ? new Date(msg.createdAt) : null

						return (
							<div key={msg._id} className='table-row'>
								<div>{msg.name}</div>

								<div>{msg.email}</div>

								<div>{dateObj ? dateObj.toLocaleDateString() : '--'}</div>

								<div>{dateObj ? dateObj.toLocaleTimeString() : '--'}</div>

								<div>
									<span
										className={
											msg.replied ? 'status replied' : 'status pending'
										}
									>
										{msg.replied ? 'Replied' : 'Pending'}
									</span>
								</div>

								<div className='action-buttons'>
									<button
										className='icon-btn view'
										title='View'
										onClick={() => navigate(`/view-message/${msg._id}`)}
									>
										<FaEye />
									</button>

									<button
										className='icon-btn reply'
										title='Reply'
										onClick={() => navigate(`/reply-message/${msg._id}`)}
									>
										<FaReply />
									</button>

									<button
										className='icon-btn delete'
										title='Delete'
										onClick={() => deleteMessage(msg._id)}
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

export default AdminMessages
