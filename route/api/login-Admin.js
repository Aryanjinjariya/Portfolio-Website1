const express = require('express')
const Admin = require('../../models/Admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = express.Router()
// Admin Login
router.post('/', async (req, res) => {
	const { email, password } = req.body

	try {
		// Check admin exists
		let admin = await Admin.findOne({ email })

		if (!admin) {
			return res.status(400).json({ msg: 'Invalid Credentials' })
		}

		// Compare password
		const isMatch = await bcrypt.compare(password, admin.password)

		if (!isMatch) {
			return res.status(400).json({ msg: 'Invalid Credentials' })
		}

		// JWT payload
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
		res.status(500).send('Server Error')
	}
})

module.exports = router
