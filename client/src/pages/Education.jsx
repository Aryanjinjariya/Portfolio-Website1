const Education = () => {
	return (
		<>
			{/* HERO */}
			<section className='page hero-small'>
				<h1>Education</h1>
				<p className='subtitle'>My academic journey</p>
			</section>

			<section className='page-content education-page'>
				<div className='edu-card'>
					<div className='edu-header'>
						<h3>Bachelor of Engineering (IT)</h3>
						<span>2020 – 2024</span>
					</div>

					<p className='edu-institute'>Gandhinagar Institute of Technology</p>

					<p className='edu-desc'>
						Focused on software development, data structures, databases,
						object-oriented programming, and full stack web development.
					</p>

					<div className='edu-tags'>
						<span>DSA</span>
						<span>Web Development</span>
						<span>OOP</span>
						<span>Databases</span>
						etc.
					</div>
				</div>

				<div className='edu-card'>
					<div className='edu-header'>
						<h3>Higher Secondary (Science)</h3>
						<span>2018 – 2020</span>
					</div>

					<p className='edu-institute'>Gujarat Secondary Education Board</p>

					<p className='edu-desc'>
						Built a strong foundation in mathematics, physics, chemistry, and
						english.
					</p>

					<div className='edu-tags'>
						<span>Mathematics</span>
						<span>Physics</span>
						<span>Chemistry</span>
						<span>English</span>
					</div>
				</div>
			</section>
		</>
	)
}

export default Education
