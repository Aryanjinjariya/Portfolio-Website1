import Resume from '../assets/Aryan_Jinjariya_Resume.pdf'

const About = () => {
	return (
		<div className='pt-24 px-4'>
			{/* HERO */}
			<section className='text-center max-w-3xl mx-auto'>
				<h1 className='text-4xl md:text-5xl font-bold'>About Me</h1>
				<p className='text-zinc-400 mt-3'>Full Stack Developer • MERN Stack</p>
			</section>

			{/* MAIN SECTION */}
			<section className='max-w-6xl mx-auto mt-16 grid md:grid-cols-3 gap-8'>
				{/* LEFT */}
				<div className='md:col-span-2 space-y-6'>
					<h2 className='text-2xl font-semibold'>Who I Am</h2>

					<p className='text-zinc-300 leading-relaxed'>
						Hi, I’m{' '}
						<span className='text-indigo-400 font-semibold'>
							Aryan Jinjariya
						</span>
						, a passionate Full Stack Developer who enjoys building scalable,
						high-performance web applications with clean architecture and modern
						UI.
					</p>

					<p className='text-zinc-300 leading-relaxed'>
						I love turning ideas into real products, solving complex problems,
						and continuously improving my skills through real-world projects and
						freelance work.
					</p>

					{/* STATS */}
					<div className='grid grid-cols-3 gap-4 mt-6'>
						<div className='bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center'>
							<h3 className='text-2xl font-bold text-indigo-400'>20+</h3>
							<p className='text-sm text-zinc-400'>Projects</p>
						</div>

						<div className='bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center'>
							<h3 className='text-2xl font-bold text-indigo-400'>MERN</h3>
							<p className='text-sm text-zinc-400'>Stack</p>
						</div>

						<div className='bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center'>
							<h3 className='text-2xl font-bold text-indigo-400'>100%</h3>
							<p className='text-sm text-zinc-400'>Commitment</p>
						</div>
					</div>

					{/* RESUME BUTTON */}
					<div className='flex gap-4 mt-6'>
						<a
							href={Resume}
							target='_blank'
							className='px-5 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition'
						>
							View Resume
						</a>

						<a
							href={Resume}
							download
							className='px-5 py-2 border border-zinc-700 rounded-lg hover:bg-zinc-800 transition'
						>
							Download
						</a>
					</div>
				</div>

				{/* RIGHT CARD */}
				<div className='bg-zinc-900 border border-zinc-800 rounded-2xl p-6 h-fit'>
					<h3 className='text-lg font-semibold mb-4'>Quick Info</h3>

					<ul className='space-y-3 text-sm text-zinc-300'>
						<li>
							<span className='text-zinc-500'>Name:</span> Aryan Jinjariya
						</li>

						<li>
							<span className='text-zinc-500'>Role:</span> Full Stack Developer
						</li>

						<li>
							<span className='text-zinc-500'>Experience:</span> Freelance
						</li>

						<li>
							<span className='text-zinc-500'>Stack:</span> MERN
						</li>

						<li>
							<span className='text-zinc-500'>Location:</span> Gujarat, India
						</li>
					</ul>
				</div>
			</section>

			{/* VALUES */}
			<section className='max-w-6xl mx-auto mt-20 grid md:grid-cols-3 gap-6'>
				<div className='p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-indigo-600 transition'>
					<h4 className='font-semibold text-lg'>Clean Code</h4>
					<p className='text-sm text-zinc-400 mt-2'>
						Readable, maintainable, and scalable architecture.
					</p>
				</div>

				<div className='p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-indigo-600 transition'>
					<h4 className='font-semibold text-lg'>User Experience</h4>
					<p className='text-sm text-zinc-400 mt-2'>
						Smooth UI with performance-focused design.
					</p>
				</div>

				<div className='p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-indigo-600 transition'>
					<h4 className='font-semibold text-lg'>Continuous Learning</h4>
					<p className='text-sm text-zinc-400 mt-2'>
						Always improving with modern tech stacks.
					</p>
				</div>
			</section>
		</div>
	)
}

export default About
