const express = require('express')
const Project = require('../../models/Project')
const Contact = require('../../models/Contact')
const auth = require('../../middleware/auth')

const router = express.Router()

// =======================
// ADMIN DASHBOARD STATS
// =======================
router.get('/', auth, async (req, res) => {
	try {
		const projectCount = await Project.countDocuments()
		const messageCount = await Contact.countDocuments()

		const latestMessages = await Contact.find().sort({ createdAt: -1 }).limit(5)

		res.json({
			projectCount,
			messageCount,
			latestMessages
		})
	} catch (err) {
		res.status(500).send('Server Error')
	}
})

module.exports = router
