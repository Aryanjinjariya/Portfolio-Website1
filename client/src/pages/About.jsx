import { useState } from 'react'
import Resume from '../assets/Aryan_Jinjariya_Resume.pdf'

const About = () => {
	const [showResume, setShowResume] = useState(false)

	return (
		<>
			{/* HERO */}
			<section className='page hero-small'>
				<h1>About Me</h1>
				<p className='subtitle'>Full Stack Developer • MERN Stack</p>
			</section>

			{/* INTRO */}
			<section className='page-content about-page'>
				<div className='about-main'>
					<div className='about-text'>
						<h2>Who I Am</h2>
						<p>
							Hi, I’m <strong>Aryan Jinjariya</strong>, a passionate Full Stack
							Developer who enjoys building scalable, high-performance web
							applications with clean architecture and modern UI.
						</p>
						<p>
							I love turning ideas into real products, solving complex problems,
							and continuously improving my skills through real-world projects
							and freelance work.
						</p>

						<div className='about-highlights'>
							<div>
								<h3>20+</h3>
								<span>Projects</span>
							</div>
							<div>
								<h3>MERN</h3>
								<span>Stack</span>
							</div>
							<div>
								<h3>100%</h3>
								<span>Commitment</span>
							</div>
						</div>

						{/* RESUME BUTTON */}
						<button
							className='resume-btn'
							onClick={() => window.open(Resume, '_blank')}
						>
							View Resume
						</button>
					</div>

					<div className='about-card'>
						<h3>Quick Info</h3>
						<ul>
							<li>
								<strong>Name:</strong> Aryan Jinjariya
							</li>
							<li>
								<strong>Role:</strong> Full Stack Developer
							</li>
							<li>
								<strong>Experience:</strong> Freelance
							</li>
							<li>
								<strong>Stack:</strong> MERN
							</li>
							<li>
								<strong>Location:</strong> Gujarat, India
							</li>
						</ul>
					</div>
				</div>

				{/* VALUES */}
				<div className='about-values'>
					<div className='value-card'>
						<h4>Clean Code</h4>
						<p>Readable, maintainable, and scalable code structure.</p>
					</div>

					<div className='value-card'>
						<h4>User Experience</h4>
						<p>Intuitive UI with smooth interactions and performance.</p>
					</div>

					<div className='value-card'>
						<h4>Continuous Learning</h4>
						<p>Always upgrading skills with modern tools & practices.</p>
					</div>
				</div>
			</section>

			{/* RESUME MODAL */}
			{showResume && (
				<div className='resume-modal'>
					<div className='resume-box'>
						<button className='close-btn' onClick={() => setShowResume(false)}>
							✕
						</button>

						<iframe src='/resume.pdf' title='Resume' />
					</div>
				</div>
			)}
		</>
	)
}

export default About
