const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const fs = require('fs')
require('dotenv').config()

const app = express()

// Connect Database
connectDB()

// Create upload folder if not exists
if (!fs.existsSync('./upload')) {
	fs.mkdirSync('./upload')
}

// Middleware
app.use(express.json())

app.use(
	cors({
		origin: [
			'https://portfolio-website1-zeta-eight.vercel.app',
			'http://localhost:5173'
		],
		credentials: true
	})
)

// Static Upload Folder
app.use('/upload', express.static('upload'))

// Routes
app.use('/api/register-admin', require('./route/api/register-Admin'))
app.use('/api/login-admin', require('./route/api/login-Admin'))
app.use('/api/contact', require('./route/api/contact'))
app.use('/api/project', require('./route/api/project'))
app.use('/api/stats-admin', require('./route/api/stats-admin'))

// Test Route
app.get('/', (req, res) => {
	res.send('API is running...')
})

// Start Server
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
