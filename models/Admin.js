const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
	fullname: String,
	email: String,
	password: String
})

module.exports = mongoose.model('Admin', AdminSchema)
