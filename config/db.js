const mongoose = require('mongoose')
const config = require('config')


const connectDB = async () => {
	try {
		await mongoose.connect(Process.env.mongoURI)

		console.log('MongoDB connected')
	} catch (err) {
		console.error(err.message)
		// Exit process with failure
		process.exit(1)
	}
}

module.exports = connectDB
