import { Link } from 'react-router-dom'
const Service = () => {
	return (
		<>
			{/* HERO */}
			<section className='page hero-small'>
				<h1>Services</h1>
				<p className='subtitle'>How I help businesses & startups</p>
			</section>

			{/* SERVICES */}
			<section className='page-content services-page'>
				<div className='service-card'>
					<div className='service-icon'>💻</div>
					<h3>Frontend Development</h3>
					<p>
						Modern, fast, and responsive interfaces using React and clean UI
						principles.
					</p>
					<ul>
						<li>Responsive Design</li>
						<li>Reusable Components</li>
						<li>UX Optimization</li>
					</ul>
				</div>

				<div className='service-card'>
					<div className='service-icon'>⚙️</div>
					<h3>Backend Development</h3>
					<p>
						Scalable and secure APIs built with Node.js, Express, and MongoDB.
					</p>
					<ul>
						<li>REST APIs</li>
						<li>JWT Authentication</li>
						<li>Database Design</li>
					</ul>
				</div>

				<div className='service-card'>
					<div className='service-icon'>🚀</div>
					<h3>Full Stack Applications</h3>
					<p>
						End-to-end applications from idea to deployment and maintenance.
					</p>
					<ul>
						<li>MERN Stack</li>
						<li>Deployment</li>
						<li>Performance Optimization</li>
					</ul>
				</div>

				<div className='service-card'>
					<div className='service-icon'>🔗</div>
					<h3>API Integration</h3>
					<p>
						Third-party API integration with secure data handling and
						validation.
					</p>
					<ul>
						<li>Payment Gateways</li>
						<li>External Services</li>
						<li>Error Handling</li>
					</ul>
				</div>
			</section>

			{/* CTA */}
			<section className='page-content service-cta'>
				<h2>Have a project in mind?</h2>
				<p>Let’s build something amazing together.</p>
				<Link to='/contact' className='cta-btn'>
					Contact Me
				</Link>
			</section>
		</>
	)
}

export default Service
