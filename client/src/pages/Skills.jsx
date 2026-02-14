const Skills = () => {
	return (
		<>
			<section className='page hero-small'>
				<h1>Skills</h1>
				<p className='subtitle'>Technologies I work with</p>
			</section>

			<section className='page-content'>
				<h2>Frontend</h2>
				<div className='skill-grid'>
					<span>HTML</span>
					<span>CSS</span>
					<span>JavaScript</span>
					<span>React</span>
					<span>Tailwind</span>
				</div>

				<h2>Backend</h2>
				<div className='skill-grid'>
					<span>Node.js</span>
					<span>Express</span>
					<span>MongoDB</span>
					<span>JWT</span>
					<span>REST API</span>
				</div>

				<h2>Tools</h2>
				<div className='skill-grid'>
					<span>Git</span>
					<span>GitHub</span>
					<span>Postman</span>
					<span>Vercel</span>
					<span>Render</span>
				</div>
			</section>
		</>
	)
}

export default Skills
