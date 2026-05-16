import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import About from './About'
import Contact from './Contact'
import Education from './Education'
import Project from './Project'
import Service from './Service'
import Skills from './Skills'

const sectionVariant = {
	hidden: { opacity: 0, y: 60 },
	visible: { opacity: 1, y: 0 }
}

const Home = () => {
	return (
		<div className='bg-white dark:bg-[#0b0f19] text-gray-900 dark:text-white'>
			{/* ================= HERO ================= */}
			<section className='min-h-screen flex items-center justify-center px-6'>
				<motion.div
					className='max-w-3xl text-center space-y-6'
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<p className='text-indigo-500 font-medium'>Hello, I'm</p>

					<h1 className='text-4xl md:text-6xl font-bold leading-tight'>
						Aryan <span className='text-indigo-500'>Jinjariya</span>
					</h1>

					<h2 className='text-xl md:text-2xl text-gray-500'>
						MERN Stack Developer
					</h2>

					<p className='text-gray-500 max-w-xl mx-auto'>
						I build scalable full-stack applications using React, Node.js,
						Express, and MongoDB with focus on performance and clean UI.
					</p>

					<div className='flex gap-4 justify-center pt-4'>
						<Link to='/projects' className='btn primary'>
							View Projects
						</Link>
						<Link to='/contact' className='btn outline'>
							Contact Me
						</Link>
					</div>
				</motion.div>
			</section>

			{/* ================= ABOUT ================= */}
			<motion.section
				className='max-w-6xl mx-auto px-6 py-20'
				variants={sectionVariant}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
			>
				<About />
			</motion.section>

			{/* ================= SKILLS ================= */}
			<motion.section
				className='max-w-6xl mx-auto px-6 py-20'
				variants={sectionVariant}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true }}
			>
				<Skills />
			</motion.section>

			{/* ================= PROJECTS ================= */}
			<motion.section
				className='max-w-6xl mx-auto px-6 py-20'
				variants={sectionVariant}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true }}
			>
				<Project />
			</motion.section>

			{/* ================= SERVICES ================= */}
			<motion.section
				className='max-w-6xl mx-auto px-6 py-20'
				variants={sectionVariant}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true }}
			>
				<Service />
			</motion.section>

			{/* ================= EDUCATION ================= */}
			<motion.section
				className='max-w-6xl mx-auto px-6 py-20'
				variants={sectionVariant}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true }}
			>
				<Education />
			</motion.section>

			{/* ================= CONTACT ================= */}
			<motion.section
				className='max-w-6xl mx-auto px-6 py-20'
				variants={sectionVariant}
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true }}
			>
				<Contact />
			</motion.section>
		</div>
	)
}

export default Home
