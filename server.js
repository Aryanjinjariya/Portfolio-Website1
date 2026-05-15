const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
require('dotenv').config()

const app = express()

// Connect Database
connectDB()

// Middleware
app.use(express.json())

// CORS Configuration
const allowedOrigins = [
	'https://portfolio-website1-zeta-eight.vercel.app',
	'https://portfolio-website1-hzdoay2yh-aryan-jinjariya-projects.vercel.app'
]

app.use(
	cors({
		origin: function (origin, callback) {
			// Allow requests with no origin (Postman/mobile apps)
			if (!origin) return callback(null, true)

			if (allowedOrigins.includes(origin)) {
				return callback(null, true)
			} else {
				return callback(new Error('Not allowed by CORS'))
			}
		},
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true
	})
)

// Handle preflight requests
app.options('*', cors())

// Static folder
app.use('/upload', express.static('upload'))

// Routes
app.use('/api/register-admin', require('./route/api/register-Admin'))
app.use('/api/login-admin', require('./route/api/login-Admin'))
app.use('/api/contact', require('./route/api/contact'))
app.use('/api/project', require('./route/api/project'))
app.use('/api/stats-admin', require('./route/api/stats-admin'))

// Test Route
app.get('/', (req, res) => {
	res.send('API is running')
})

// Server
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
