import { useEffect, useState } from 'react'

const ThemeToggle = () => {
	const [light, setLight] = useState(
		() => localStorage.getItem('theme') === 'light'
	)

	useEffect(() => {
		document.body.classList.toggle('light', light)
		localStorage.setItem('theme', light ? 'light' : 'dark')
	}, [light])

	return (
		<button
			className='theme-toggle'
			onClick={() => setLight(prev => !prev)}
			aria-label='Toggle theme'
		>
			{light ? '🌙' : '☀️'}
		</button>
	)
}

export default ThemeToggle
