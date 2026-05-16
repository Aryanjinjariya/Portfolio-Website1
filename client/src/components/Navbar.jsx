import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import a1 from '../assets/a1 (1).jpeg'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
	const [open, setOpen] = useState(false)

	const linkClass = ({ isActive }) =>
		isActive
			? 'text-blue-600 font-semibold'
			: 'text-gray-700 hover:text-blue-600 transition'

	return (
		<nav className='sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b'>
			<div className='max-w-6xl mx-auto px-4 flex items-center justify-between py-3'>
				{/* LOGO */}
				<div className='flex items-center gap-2'>
					<img
						src={a1}
						alt='logo'
						className='w-10 h-10 rounded-full object-cover border'
					/>
					<span className='font-bold text-lg text-gray-800'>Aryan.dev</span>
				</div>

				{/* DESKTOP LINKS */}
				<div className='hidden md:flex items-center gap-6'>
					<ThemeToggle />

					<NavLink to='/' className={linkClass}>
						Home
					</NavLink>
					<NavLink to='/about' className={linkClass}>
						About
					</NavLink>
					<NavLink to='/skills' className={linkClass}>
						Skills
					</NavLink>
					<NavLink to='/projects' className={linkClass}>
						Projects
					</NavLink>
					<NavLink to='/education' className={linkClass}>
						Education
					</NavLink>
					<NavLink to='/service' className={linkClass}>
						Services
					</NavLink>

					<NavLink
						to='/contact'
						className='bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition'
					>
						Contact
					</NavLink>
				</div>

				{/* MOBILE BUTTON */}
				<button
					onClick={() => setOpen(!open)}
					className='md:hidden flex flex-col gap-1'
				>
					<span className='w-6 h-0.5 bg-gray-800'></span>
					<span className='w-6 h-0.5 bg-gray-800'></span>
					<span className='w-6 h-0.5 bg-gray-800'></span>
				</button>
			</div>

			{/* MOBILE MENU */}
			{open && (
				<div className='md:hidden bg-white border-t px-4 py-4 flex flex-col gap-3'>
					<ThemeToggle />

					<NavLink onClick={() => setOpen(false)} to='/' className={linkClass}>
						Home
					</NavLink>

					<NavLink
						onClick={() => setOpen(false)}
						to='/about'
						className={linkClass}
					>
						About
					</NavLink>

					<NavLink
						onClick={() => setOpen(false)}
						to='/skills'
						className={linkClass}
					>
						Skills
					</NavLink>

					<NavLink
						onClick={() => setOpen(false)}
						to='/projects'
						className={linkClass}
					>
						Projects
					</NavLink>

					<NavLink
						onClick={() => setOpen(false)}
						to='/education'
						className={linkClass}
					>
						Education
					</NavLink>

					<NavLink
						onClick={() => setOpen(false)}
						to='/service'
						className={linkClass}
					>
						Services
					</NavLink>

					<NavLink
						onClick={() => setOpen(false)}
						to='/contact'
						className='bg-blue-600 text-white text-center px-4 py-2 rounded-xl'
					>
						Contact
					</NavLink>
				</div>
			)}
		</nav>
	)
}

export default Navbar
