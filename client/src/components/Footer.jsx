import { Link } from 'react-router-dom'

const Footer = () => {
	return (
		<footer className='bg-gray-900 text-gray-300 mt-20'>
			{/* MAIN SECTION */}
			<div className='max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10'>
				{/* LEFT */}
				<div>
					<h3 className='text-2xl font-bold text-white'>Aryan Jinjariya</h3>

					<p className='mt-3 text-sm text-gray-400'>
						MERN Stack Developer building modern scalable web applications with
						React, Node, Express & MongoDB.
					</p>
				</div>

				{/* CENTER */}
				<div className='flex flex-col space-y-3'>
					<h4 className='text-white font-semibold mb-2'>Quick Links</h4>

					<Link className='hover:text-white transition' to='/'>
						Home
					</Link>
					<Link className='hover:text-white transition' to='/about'>
						About
					</Link>
					<Link className='hover:text-white transition' to='/projects'>
						Projects
					</Link>
					<Link className='hover:text-white transition' to='/contact'>
						Contact
					</Link>
				</div>

				{/* RIGHT */}
				<div className='flex flex-col space-y-3'>
					<h4 className='text-white font-semibold mb-2'>Connect</h4>

					<a
						href='https://github.com/'
						target='_blank'
						className='hover:text-white transition'
					>
						GitHub
					</a>

					<a
						href='https://linkedin.com/'
						target='_blank'
						className='hover:text-white transition'
					>
						LinkedIn
					</a>

					<a
						href='mailto:your@email.com'
						className='hover:text-white transition'
					>
						Email
					</a>
				</div>
			</div>

			{/* BOTTOM BAR */}
			<div className='border-t border-gray-800 py-4 text-center text-sm text-gray-500'>
				© 2026 Aryan Jinjariya. All rights reserved.
			</div>
		</footer>
	)
}

export default Footer
