import { motion } from 'framer-motion'

import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import About from './About'
import Contact from './Contact'
import Education from './Education'
import Project from './Project'
import Service from './Service'
import Skills from './Skills'
const fadeUp = {
	hidden: { opacity: 0, y: 50 },
	visible: { opacity: 1, y: 0 }
}

const Home = () => {
	return (
		<>
			{/* 🔥 HERO */}
			<section className='hero'>
				<motion.div
					className='hero-content'
					initial='hidden'
					animate='visible'
					variants={fadeUp}
					transition={{ duration: 0.8 }}
				>
					<h1>
						Hi, I’m <span>Aryan Jinjariya</span>
					</h1>
					<h2> MERN Stack Developer</h2>
					<p>
						MERN Stack Developer experienced in building scalable full-stack
						applications with React, Node.js, Express, and MongoDB. Focused on
						clean code, secure APIs, and modern responsive UI design.
					</p>

					<div className='hero-actions'>
						<Link to='/projects' className='btn primary'>
							Projects
						</Link>
						<Link to='/contact' className='btn outline'>
							Contact
						</Link>
					</div>
				</motion.div>
			</section>

			{/* 🔥 SECTIONS */}
			<motion.section id='about' {...motionProps}>
				<About />
			</motion.section>

			<motion.section id='skills' {...motionProps}>
				<Skills />
			</motion.section>

			<motion.section id='projects' {...motionProps}>
				<Project />
			</motion.section>

			<motion.section id='services' {...motionProps}>
				<Service />
			</motion.section>

			<motion.section id='education' {...motionProps}>
				<Education />
			</motion.section>

			<motion.section id='contact' {...motionProps}>
				<Contact />
			</motion.section>
			<div style={{ marginTop: '50px' }}>
				<Footer />
			</div>
		</>
	)
}

const motionProps = {
	initial: { opacity: 0, y: 40 },
	whileInView: { opacity: 1, y: 0 },
	transition: { duration: 0.6 },
	viewport: { once: true }
}

export default Home
