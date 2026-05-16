const Education = () => {
	return (
		<div className='pt-24 px-4'>
			{/* HERO */}
			<section className='text-center max-w-3xl mx-auto'>
				<h1 className='text-4xl md:text-5xl font-bold'>Education</h1>
				<p className='text-zinc-400 mt-3'>My academic journey</p>
			</section>

			{/* TIMELINE */}
			<section className='max-w-4xl mx-auto mt-16 relative border-l border-zinc-800 pl-6 space-y-12'>
				{/* ITEM 1 */}
				<div className='relative'>
					{/* DOT */}
					<span className='absolute -left-2.5 top-2 w-4 h-4 bg-indigo-600 rounded-full shadow-glow'></span>

					<div className='bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-indigo-600 transition'>
						<div className='flex justify-between flex-wrap gap-2'>
							<h3 className='text-lg font-semibold'>
								Bachelor of Engineering (IT)
							</h3>
							<span className='text-sm text-zinc-400'>2020 – 2024</span>
						</div>

						<p className='text-indigo-400 mt-1'>
							Gandhinagar Institute of Technology
						</p>

						<p className='text-zinc-400 mt-3 leading-relaxed'>
							Focused on software development, data structures, databases, OOP,
							and full stack web development.
						</p>

						{/* TAGS */}
						<div className='flex flex-wrap gap-2 mt-4'>
							{['DSA', 'Web Dev', 'OOP', 'Databases'].map(tag => (
								<span
									key={tag}
									className='text-xs px-3 py-1 bg-zinc-800 rounded-full'
								>
									{tag}
								</span>
							))}
						</div>
					</div>
				</div>

				{/* ITEM 2 */}
				<div className='relative'>
					<span className='absolute -left-2.5 top-2 w-4 h-4 bg-indigo-600 rounded-full shadow-glow'></span>

					<div className='bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-indigo-600 transition'>
						<div className='flex justify-between flex-wrap gap-2'>
							<h3 className='text-lg font-semibold'>
								Higher Secondary (Science)
							</h3>
							<span className='text-sm text-zinc-400'>2018 – 2020</span>
						</div>

						<p className='text-indigo-400 mt-1'>
							Gujarat Secondary Education Board
						</p>

						<p className='text-zinc-400 mt-3 leading-relaxed'>
							Built foundation in Mathematics, Physics, Chemistry, and English.
						</p>

						<div className='flex flex-wrap gap-2 mt-4'>
							{['Maths', 'Physics', 'Chemistry', 'English'].map(tag => (
								<span
									key={tag}
									className='text-xs px-3 py-1 bg-zinc-800 rounded-full'
								>
									{tag}
								</span>
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Education
