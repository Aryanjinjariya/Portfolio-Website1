const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},

		description: {
			type: String,
			required: true
		},

		image: {
			type: String
		},

		techStack: {
			type: String,
			default: ''
		},

		githubLink: {
			type: String,
			default: ''
		},

		liveLink: {
			type: String,
			default: ''
		}
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('Project', ProjectSchema)
