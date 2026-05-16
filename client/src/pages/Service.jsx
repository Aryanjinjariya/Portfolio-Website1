import { Link } from 'react-router-dom'

const services = [
	{
		icon: '💻',
		title: 'Frontend Development',
		desc: 'Modern, fast, and responsive UI using React.',
		points: ['Responsive Design', 'Reusable Components', 'UX Optimization']
	},
	{
		icon: '⚙️',
		title: 'Backend Development',
		desc: 'Secure and scalable APIs using Node & MongoDB.',
		points: ['REST APIs', 'JWT Auth', 'Database Design']
	},
	{
		icon: '🚀',
		title: 'Full Stack Apps',
		desc: 'End-to-end scalable MERN applications.',
		points: ['MERN Stack', 'Deployment', 'Performance']
	},
	{
		icon: '🔗',
		title: 'API Integration',
		desc: 'Third-party APIs integration with secure handling.',
		points: ['Payment APIs', 'External Services', 'Error Handling']
	}
]

const Service = () => {
	return (
		<div className='bg-white dark:bg-[#0b0f19] text-gray-900 dark:text-white'>
			{/* HERO */}
			<section className='text-center py-20 px-6'>
				<h1 className='text-4xl font-bold'>Services</h1>
				<p className='text-gray-500 mt-2'>
					How I help startups & businesses grow
				</p>
			</section>

			{/* SERVICES GRID */}
			<section className='max-w-6xl mx-auto px-6 pb-20 grid sm:grid-cols-2 lg:grid-cols-2 gap-6'>
				{services.map((s, i) => (
					<div
						key={i}
						className='p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:scale-[1.02] transition shadow-sm'
					>
						<div className='text-3xl'>{s.icon}</div>

						<h3 className='text-xl font-semibold mt-3'>{s.title}</h3>

						<p className='text-gray-500 mt-2'>{s.desc}</p>

						<ul className='mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400'>
							{s.points.map((p, idx) => (
								<li key={idx}>• {p}</li>
							))}
						</ul>
					</div>
				))}
			</section>

			{/* CTA */}
			<section className='text-center py-16 px-6 bg-gray-100 dark:bg-gray-950'>
				<h2 className='text-3xl font-bold'>Have a project in mind?</h2>

				<p className='text-gray-500 mt-2'>
					Let’s build something amazing together
				</p>

				<Link
					to='/contact'
					className='inline-block mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition'
				>
					Contact Me
				</Link>
			</section>
		</div>
	)
}

export default Service
