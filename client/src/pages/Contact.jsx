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
			setForm({ name: '', subject: '', email: '', message: '' })
		} catch (err) {
			alert('Failed to send message')
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<section className='page hero-small'>
				<h1>Contact Me</h1>
				<p className='subtitle'>Let’s talk about your project or idea</p>
			</section>

			<section className='page-content contact-layout'>
				{/* LEFT INFO */}
				<div className='contact-info'>
					<h2>Get in touch</h2>
					<p>
						I’m always open to discussing new projects, creative ideas or
						opportunities to be part of your vision.
					</p>

					<ul>
						<li>
							<strong>Email:</strong> aryan13.aj@gmail.com
						</li>
						<li>
							<strong>Location:</strong> Gujarat, India
						</li>
						<li>
							<strong>Availability:</strong> Mon to Sat, 9am - 6pm IST
						</li>
					</ul>
				</div>

				{/* RIGHT FORM */}
				<form onSubmit={submit} className='glass contact-form'>
					<input
						type='text'
						placeholder='Your Name'
						value={form.name}
						onChange={e => setForm({ ...form, name: e.target.value })}
						required
					/>

					<input
						type='text'
						placeholder='Subject'
						value={form.subject}
						onChange={e => setForm({ ...form, subject: e.target.value })}
						required
					/>

					<input
						type='email'
						placeholder='Your Email'
						value={form.email}
						onChange={e => setForm({ ...form, email: e.target.value })}
						required
					/>

					<textarea
						placeholder='Your Message'
						rows='5'
						value={form.message}
						onChange={e => setForm({ ...form, message: e.target.value })}
						required
					/>

					<button disabled={loading}>
						{loading ? 'Sending...' : 'Send Message'}
					</button>

					{success && <p className='success'>{success}</p>}
				</form>
			</section>
		</>
	)
}

export default Contact
