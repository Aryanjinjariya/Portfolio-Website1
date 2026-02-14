import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import a1 from '../assets/a1 (1).jpeg'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
	const [open, setOpen] = useState(false)

	return (
		<nav className='navbar'>
			<div className='nav-container'>
				<h2 className='logo'>
					<img src={a1} alt='logo' />
					<span></span>
				</h2>

				<div className={`nav-links ${open ? 'open' : ''}`}>
					<ThemeToggle />
					<NavLink to='/' onClick={() => setOpen(false)}>
						Home
					</NavLink>
					<NavLink to='/about' onClick={() => setOpen(false)}>
						About
					</NavLink>
					<NavLink to='/skills' onClick={() => setOpen(false)}>
						Skills
					</NavLink>
					<NavLink to='/projects' onClick={() => setOpen(false)}>
						Projects
					</NavLink>
					<NavLink to='/education' onClick={() => setOpen(false)}>
						Education
					</NavLink>
					<NavLink to='/service' onClick={() => setOpen(false)}>
						Services
					</NavLink>
					<NavLink to='/contact' className='btn' onClick={() => setOpen(false)}>
						Contact
					</NavLink>
				</div>

				<div className='menu-toggle' onClick={() => setOpen(!open)}>
					<span />
					<span />
					<span />
				</div>
			</div>
		</nav>
	)
}

export default Navbar
