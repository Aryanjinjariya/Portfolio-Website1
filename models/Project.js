const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema(
	{
		title: String,
		description: String,
		image: String,
		category: {
			type: String,
			enum: ['Frontend', 'Backend', 'FullStack', 'UI/UX'],
			default: 'FullStack'
		},
		techstack: String,
		githublink: String,
		livelink: String
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Project', ProjectSchema)
