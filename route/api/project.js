const express = require('express')
const Project = require('../../models/Project')
const multer = require('multer')
const auth = require('../../middleware/auth')

const router = express.Router()

// Image Upload Config
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
// ADD PROJECT (ADMIN)
// ===========================
router.post('/', auth, upload.single('image'), async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ msg: 'Image is required' })
		}

		const project = new Project({
			title: req.body.title,
			description: req.body.description,
			image: req.file.filename ? `/upload/${req.file.filename}` : '',
			techStack: req.body.techStack,
			githubLink: req.body.githubLink
		})

		await project.save()
		res.json(project)
	} catch (err) {
		console.error(err)
		res.status(500).send('Server Error')
	}
})

/* ==============================
   VIEW PROJECT (SEPARATE ROUTE)
============================== */
router.get('/view/:id', async (req, res) => {
	try {
		const project = await Project.findById(req.params.id)

		if (!project) {
			return res.status(404).json({ msg: 'Project not found' })
		}

		res.json(project)
	} catch (err) {
		console.error(err)
		res.status(500).json({ msg: 'Server error' })
	}
})

// ===========================
// GET ALL PROJECTS (PUBLIC)
// ===========================
router.get('/', async (req, res) => {
	try {
		const projects = await Project.find()
		res.json(projects)
	} catch (err) {
		res.status(500).send('Server Error')
	}
})
router.put('/edit/:id', auth, async (req, res) => {
	try {
		const { title, description, category, image, githubLink, liveLink } =
			req.body

		const project = await Project.findById(req.params.id)

		if (!project) {
			return res.status(404).json({ msg: 'Project not found' })
		}

		// Update fields only if provided
		project.title = title ?? project.title
		project.description = description ?? project.description
		project.category = category ?? project.category
		project.image = image ?? project.image
		project.githubLink = githubLink ?? project.githubLink

		await project.save()

		res.json({ msg: 'Project updated successfully', project })
	} catch (err) {
		console.log(err)
		res.status(500).send('Server Error')
	}
})
// ===========================
// DELETE PROJECT (ADMIN)
// ===========================
router.delete('/:id', auth, async (req, res) => {
	try {
		await Project.findByIdAndDelete(req.params.id)
		res.json('Project Deleted')
	} catch (err) {
		res.status(500).send('Server Error')
	}
})

module.exports = router
