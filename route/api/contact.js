const express = require('express')
const Contact = require('../../models/Contact')
const auth = require('../../middleware/auth')
const nodemailer = require('nodemailer')
const config = require('config')

const router = express.Router()

// ===========================
// SEND MESSAGE (PUBLIC)
// ===========================
router.post('/', async (req, res) => {
	try {
		const { name, email, subject, message } = req.body

		if (!name || !email || !message) {
			return res.status(400).json({ msg: 'All fields are required' })
		}

		const contact = new Contact({ name, email, subject, message })
		await contact.save()

		res.json('Message Sent')
	} catch (err) {
		res.status(500).send('Server Error')
	}
})

// ===========================
// GET ALL MESSAGES (ADMIN)
// ===========================
router.get('/', auth, async (req, res) => {
	try {
		const messages = await Contact.find()
		res.json(messages)
	} catch (err) {
		res.status(500).send('Server Error')
	}
})

// ===========================
// VIEW SINGLE MESSAGE (ADMIN)
// ===========================
router.get('/view/:id', auth, async (req, res) => {
	try {
		const message = await Contact.findById(req.params.id)

		if (!message) {
			return res.status(404).json({ msg: 'Message not found' })
		}

		res.json(message)
	} catch (err) {
		res.status(500).send('Server Error')
	}
})

// ===========================
// REPLY TO MESSAGE (ADMIN)
// ===========================
router.post('/reply/:id', auth, async (req, res) => {
	try {
		const { reply } = req.body

		if (!reply) {
			return res.status(400).json({ msg: 'Reply is required' })
		}

		const message = await Contact.findById(req.params.id)

		if (!message) {
			return res.status(404).json({ msg: 'Message not found' })
		}

		// Save reply
		message.reply = reply
		message.status = 'Replied'
		await message.save()

		// Create transporter
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: config.get('emailUser'),
				pass: config.get('emailPass')
			}
		})

		const mailOptions = {
			from: `"Portfolio Admin" <${config.get('emailUser')}>`,
			to: message.email,
			subject: 'Reply to Your Message',
			html: `
				<div style="font-family: Arial; padding: 20px;">
					<h3>Hello ${message.name},</h3>
					<p>${reply}</p>
					<br/>
					<p>Thank you for contacting us.</p>
				</div>
			`
		}

		await transporter.sendMail(mailOptions)

		res.json({
			success: true,
			msg: 'Reply sent and email delivered successfully'
		})
	} catch (err) {
		console.error('ERROR:', err)
		res.status(500).json({ msg: err.message })
	}
})

// ===========================
// DELETE MESSAGE (ADMIN)
// ===========================
router.delete('/:id', auth, async (req, res) => {
	try {
		const message = await Contact.findById(req.params.id)

		if (!message) {
			return res.status(404).json({ msg: 'Message not found' })
		}

		await Contact.findByIdAndDelete(req.params.id)

		res.json({ msg: 'Message deleted successfully' })
	} catch (err) {
		res.status(500).send('Server Error')
	}
})

module.exports = router
