const express = require('express')
const Admin = require('../../models/Admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

const router = express.Router()

// Register Admin
router.post('/', async (req, res) => {
	const { fullname, email, password } = req.body

	try {
		// Check admin exists
		let admin = await Admin.findOne({ email })

		if (admin) {
			return res.status(400).json({ msg: 'Admin already exists' })
		}

		// Create admin
		admin = new Admin({
			fullname,
			email,
			password
		})

		// Hash password
		const salt = await bcrypt.genSalt(10)
		admin.password = await bcrypt.hash(password, salt)

		await admin.save()

		// JWT Payload
		const payload = {
			admin: {
				id: admin.id
			}
		}

		jwt.sign(payload, 'secret123', { expiresIn: '1d' }, (err, token) => {
			if (err) throw err
			res.json({ token })
		})
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server error')
	}
})

module.exports = router
