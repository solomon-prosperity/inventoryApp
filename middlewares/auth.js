const jwt = require('jsonwebtoken')

const authenticateUser = (req , res , next) => {
const token = req.cookies.auth_token;
if (!token) return res.status(401).send(`access Denied, you need to login first`)

try {
 const verified = jwt.verify(token , process.env.JWT_SECRET)
 req.user = verified;
 next()
} catch (err) {
    res.status(400).send('Invalid token')
}

}

// Note: on successful verification, const verified returns the user ID which is the payload and passes it to req.user

module.exports = authenticateUser