const express = require('express')
const Project = require('../../models/Project')
const multer = require('multer')
const auth = require('../../middleware/auth')

const router = express.Router()

// ===========================
// MULTER CONFIG
// ===========================
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'upload/')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '-' + file.originalname)
	}
})

const upload = multer({ storage })

// ===========================
// ADD PROJECT
// ===========================
router.post('/', auth, upload.single('image'), async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({
				msg: 'Image is required'
			})
		}

		const project = new Project({
			title: req.body.title,
			description: req.body.description,
			techStack: req.body.techStack,
			githubLink: req.body.githubLink,
			liveLink: req.body.liveLink,
			image: `/upload/${req.file.filename}`
		})

		await project.save()

		res.json(project)
	} catch (err) {
		console.log(err)
		res.status(500).send('Server Error')
	}
})

// ===========================
// GET ALL PROJECTS
// ===========================
router.get('/', async (req, res) => {
	try {
		const projects = await Project.find().sort({
			createdAt: -1
		})

		res.json(projects)
	} catch (err) {
		console.log(err)
		res.status(500).send('Server Error')
	}
})

// ===========================
// VIEW PROJECT
// ===========================
router.get('/view/:id', async (req, res) => {
	try {
		const project = await Project.findById(req.params.id)

		if (!project) {
			return res.status(404).json({
				msg: 'Project not found'
			})
		}

		res.json(project)
	} catch (err) {
		console.log(err)
		res.status(500).send('Server Error')
	}
})

// ===========================
// EDIT PROJECT
// ===========================
router.put('/edit/:id', auth, async (req, res) => {
	try {
		const project = await Project.findById(req.params.id)

		if (!project) {
			return res.status(404).json({
				msg: 'Project not found'
			})
		}

		project.title = req.body.title || project.title

		project.description = req.body.description || project.description

		project.techStack = req.body.techStack || project.techStack

		project.githubLink = req.body.githubLink || project.githubLink

		project.liveLink = req.body.liveLink || project.liveLink

		await project.save()

		res.json(project)
	} catch (err) {
		console.log(err)
		res.status(500).send('Server Error')
	}
})

// ===========================
// DELETE PROJECT
// ===========================
router.delete('/:id', auth, async (req, res) => {
	try {
		await Project.findByIdAndDelete(req.params.id)

		res.json({
			msg: 'Project deleted'
		})
	} catch (err) {
		console.log(err)
		res.status(500).send('Server Error')
	}
})

module.exports = router
s