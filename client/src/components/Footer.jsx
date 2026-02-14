import { Link } from 'react-router-dom'

const Footer = () => {
	;<footer class='footer'>
		<div class='footer-container'>
			<div class='footer-left'>
				<h3>Aryan Jinjariya</h3>
				<p>MERN Stack Developer building modern web applications.</p>
			</div>

			<div class='footer-center'>
				<Link to='/'>Home</Link>
				<Link to='/about'>About</Link>
				<Link to='/projects'>Projects</Link>
				<Link to='/contact'>Contact</Link>
			</div>

			<div class='footer-right'>
				<Link to='https://github.com/' target='_blank'>
					GitHub
				</Link>
				<Link to='https://linkedin.com/' target='_blank'>
					LinkedIn
				</Link>
				<Link to='mailto:your@email.com'>Email</Link>
			</div>
		</div>

		<div class='footer-bottom'>
			© 2026 Aryan Jinjariya. All rights reserved.
		</div>
	</footer>
}

export default Footer
