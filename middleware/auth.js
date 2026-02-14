const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
	const token = req.header('x-auth-token')

	// No token
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' })
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123')

		req.admin = decoded.admin
		next()
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid' })
	}
}
