const Skills = () => {
	const frontend = ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind']
	const backend = ['Node.js', 'Express', 'MongoDB', 'JWT', 'REST API']
	const tools = ['Git', 'GitHub', 'Postman', 'Vercel', 'Render']

	const SkillSection = ({ title, items }) => (
		<div className='mb-10'>
			<h2 className='text-2xl font-bold mb-4 text-white'>{title}</h2>

			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4'>
				{items.map((skill, i) => (
					<div
						key={i}
						className='bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-center text-gray-300 hover:text-white hover:border-indigo-500 hover:scale-105 transition'
					>
						{skill}
					</div>
				))}
			</div>
		</div>
	)

	return (
		<section className='min-h-screen bg-gray-950 text-white px-6 py-16'>
			{/* HERO */}
			<div className='text-center mb-12'>
				<h1 className='text-4xl font-bold'>My Skills</h1>
				<p className='text-gray-400 mt-2'>Technologies I work with</p>
			</div>

			{/* SKILLS */}
			<div className='max-w-6xl mx-auto'>
				<SkillSection title='Frontend' items={frontend} />
				<SkillSection title='Backend' items={backend} />
				<SkillSection title='Tools' items={tools} />
			</div>
		</section>
	)
}

export default Skills
