import { useState } from 'react'
import API from '../api/axios'

const Contact = () => {
	const [form, setForm] = useState({
		name: '',
		subject: '',
		email: '',
		message: ''
	})

	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState('')

	const submit = async e => {
		e.preventDefault()
		setLoading(true)
		setSuccess('')

		try {
			await API.post('/contact', form)
			setSuccess('Message sent successfully ✅')

			setForm({
				name: '',
				subject: '',
				email: '',
				message: ''
			})
		} catch (err) {
			setSuccess('Something went wrong ❌')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='pt-24 px-4'>
			{/* HERO */}
			<section className='text-center max-w-3xl mx-auto'>
				<h1 className='text-4xl md:text-5xl font-bold'>Contact Me</h1>
				<p className='text-zinc-400 mt-3'>
					Let’s talk about your project or idea
				</p>
			</section>

			{/* CONTENT */}
			<section className='max-w-6xl mx-auto mt-16 grid md:grid-cols-2 gap-10'>
				{/* LEFT INFO */}
				<div className='space-y-6'>
					<h2 className='text-2xl font-semibold'>Get in touch</h2>

					<p className='text-zinc-400 leading-relaxed'>
						I’m always open to discussing new projects, creative ideas or
						opportunities to be part of your vision.
					</p>

					<div className='bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4'>
						<div>
							<p className='text-sm text-zinc-500'>Email</p>
							<p className='text-white'>aryan13.aj@gmail.com</p>
						</div>

						<div>
							<p className='text-sm text-zinc-500'>Location</p>
							<p className='text-white'>Gujarat, India</p>
						</div>

						<div>
							<p className='text-sm text-zinc-500'>Availability</p>
							<p className='text-white'>Mon - Sat | 9 AM - 6 PM IST</p>
						</div>
					</div>
				</div>

				{/* FORM */}
				<form
					onSubmit={submit}
					className='bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4'
				>
					<input
						type='text'
						placeholder='Your Name'
						value={form.name}
						onChange={e => setForm({ ...form, name: e.target.value })}
						className='w-full p-3 rounded-lg bg-zinc-950 border border-zinc-800 outline-none focus:border-indigo-600'
						required
					/>

					<input
						type='text'
						placeholder='Subject'
						value={form.subject}
						onChange={e => setForm({ ...form, subject: e.target.value })}
						className='w-full p-3 rounded-lg bg-zinc-950 border border-zinc-800 outline-none focus:border-indigo-600'
						required
					/>

					<input
						type='email'
						placeholder='Your Email'
						value={form.email}
						onChange={e => setForm({ ...form, email: e.target.value })}
						className='w-full p-3 rounded-lg bg-zinc-950 border border-zinc-800 outline-none focus:border-indigo-600'
						required
					/>

					<textarea
						placeholder='Your Message'
						rows='5'
						value={form.message}
						onChange={e => setForm({ ...form, message: e.target.value })}
						className='w-full p-3 rounded-lg bg-zinc-950 border border-zinc-800 outline-none focus:border-indigo-600'
						required
					/>

					<button
						disabled={loading}
						className='w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition font-medium disabled:opacity-50'
					>
						{loading ? 'Sending...' : 'Send Message'}
					</button>

					{success && (
						<p className='text-sm text-center text-green-400'>{success}</p>
					)}
				</form>
			</section>
		</div>
	)
}

export default Contact
