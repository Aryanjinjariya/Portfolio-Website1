import { useEffect, useMemo, useState } from 'react'
import { FaEye, FaReply, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

const AdminMessage = () => {
	const token = localStorage.getItem('token')
	const navigate = useNavigate()

	const [messages, setMessages] = useState([])
	const [searchInput, setSearchInput] = useState('')
	const [search, setSearch] = useState('')
	const [sortType, setSortType] = useState('newest')
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const res = await API.get('/contact', {
					headers: { 'x-auth-token': token }
				})
				setMessages(res.data || [])
			} catch (err) {
				console.log(err)
			} finally {
				setLoading(false)
			}
		}

		fetchMessages()
	}, [])

	const handleSearch = () => setSearch(searchInput)

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
				filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
				break
			default:
				filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
		}

		return filtered
	}, [messages, search, sortType])

	const deleteMessage = async id => {
		if (!confirm('Delete this message?')) return

		try {
			await API.delete(`/contact/${id}`, {
				headers: { 'x-auth-token': token }
			})

			setMessages(prev => prev.filter(m => m._id !== id))
		} catch (err) {
			console.log(err)
		}
	}

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center text-white'>
				Loading...
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-zinc-950 text-white p-6'>
			{/* HEADER */}
			<div className='flex items-center justify-between mb-6'>
				<button
					onClick={() => navigate(-1)}
					className='text-gray-300 hover:text-white transition'
				>
					← Back
				</button>

				<h2 className='text-2xl font-bold'>Message Management</h2>
			</div>

			{/* FILTER BAR */}
			<div className='flex flex-col md:flex-row gap-3 mb-6'>
				<div className='flex w-full md:w-1/2'>
					<input
						type='text'
						placeholder='Search name or email...'
						value={searchInput}
						onChange={e => setSearchInput(e.target.value)}
						className='flex-1 p-3 rounded-l-lg bg-white/5 border border-white/10 outline-none'
					/>

					<button
						onClick={handleSearch}
						className='px-4 bg-blue-600 hover:bg-blue-700 rounded-r-lg'
					>
						Search
					</button>
				</div>

				<select
					value={sortType}
					onChange={e => setSortType(e.target.value)}
					className='p-3 bg-white/5 border border-white/10 rounded-lg'
				>
					<option value='newest'>Newest</option>
					<option value='oldest'>Oldest</option>
					<option value='atoz'>A → Z</option>
					<option value='ztoa'>Z → A</option>
				</select>
			</div>

			{/* TABLE */}
			<div className='overflow-x-auto border border-white/10 rounded-xl'>
				{/* HEADER */}
				<div className='grid grid-cols-6 bg-white/5 p-3 font-semibold text-gray-300'>
					<div>Name</div>
					<div>Email</div>
					<div>Date</div>
					<div>Time</div>
					<div>Status</div>
					<div>Action</div>
				</div>

				{/* ROWS */}
				{filteredMessages.length === 0 ? (
					<div className='p-6 text-center text-gray-400'>No messages found</div>
				) : (
					filteredMessages.map(msg => {
						const date = msg.createdAt ? new Date(msg.createdAt) : null

						return (
							<div
								key={msg._id}
								className='grid grid-cols-6 p-3 border-t border-white/10 hover:bg-white/5 transition'
							>
								<div>{msg.name}</div>
								<div className='text-gray-300'>{msg.email}</div>
								<div>{date ? date.toLocaleDateString() : '--'}</div>
								<div>{date ? date.toLocaleTimeString() : '--'}</div>

								<div>
									<span
										className={`px-2 py-1 text-xs rounded ${
											msg.replied
												? 'bg-green-500/20 text-green-400'
												: 'bg-yellow-500/20 text-yellow-400'
										}`}
									>
										{msg.replied ? 'Replied' : 'Pending'}
									</span>
								</div>

								<div className='flex gap-3 text-lg'>
									<button
										onClick={() => navigate(`/view-message/${msg._id}`)}
										className='text-blue-400 hover:scale-110 transition'
									>
										<FaEye />
									</button>

									<button
										onClick={() => navigate(`/reply-message/${msg._id}`)}
										className='text-green-400 hover:scale-110 transition'
									>
										<FaReply />
									</button>

									<button
										onClick={() => deleteMessage(msg._id)}
										className='text-red-400 hover:scale-110 transition'
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

export default AdminMessage
