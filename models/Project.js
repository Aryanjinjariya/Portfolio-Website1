const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema(
	{
		title: String,
		description: String,
		image: String,
		techstack: String,
		githublink: String
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Project', ProjectSchema)
