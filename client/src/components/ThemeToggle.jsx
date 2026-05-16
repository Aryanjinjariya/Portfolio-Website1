import { useEffect, useState } from 'react'

const ThemeToggle = () => {
	const [light, setLight] = useState(
		() => localStorage.getItem('theme') === 'light'
	)

	useEffect(() => {
		if (light) {
			document.documentElement.classList.add('light')
		} else {
			document.documentElement.classList.remove('light')
		}

		localStorage.setItem('theme', light ? 'light' : 'dark')
	}, [light])

	return (
		<button
			onClick={() => setLight(!light)}
			className='px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700'
		>
			{light ? '🌙 Dark' : '☀️ Light'}
		</button>
	)
}

export default ThemeToggle
