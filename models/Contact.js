const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema(
	{
		name: String,
		email: String,
		subject: String,
		message: String,
		reply: String,
		status: {
			type: String,
			default: 'pending',
			enum: ['pending', 'replied']
		}
	},

	{ timestamps: true }
)

module.exports = mongoose.model('Contact', ContactSchema)
