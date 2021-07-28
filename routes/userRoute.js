const express = require('express')
const router = express.Router();
const authenticateUser = require('../middlewares/auth')

const {
    signIn, 
    signUp,
    updateInfo,
    changePassword,
    deleteAccount,
    signOut
} = require ('../controllers/usersControl')




router.post('/signup', signUp)
router.post('/signin' , signIn)
router.get('/signout' , authenticateUser ,signOut)
router.put('/updateinfo/:id' , authenticateUser ,updateInfo)
router.put('/changepassword/:id' , authenticateUser ,changePassword)
router.delete('/deleteaccount/:id' , authenticateUser ,deleteAccount)

module.exports = router
