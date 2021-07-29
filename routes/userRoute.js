const express = require('express')
const router = express.Router();
const authenticateUser = require('../middlewares/auth')
const path = require('path')

const {
    signIn, 
    signUp,
    updateInfo,
    changePassword,
    deleteAccount,
    signOut
} = require ('../controllers/usersControl')

const multer = require ('multer')

const storage = multer.diskStorage({
    destination: './uploads/userImages' , 
    filename: (req , file , cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const fileFilter = (req , file , cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null , true)
    } else {
        cb(new Error(`file format must be either jpeg or png`) , false)
    }
}

const upload = multer({
    storage: storage ,
    limits: {
        fileSize: 1024 * 1024 * 5
    } ,
    fileFilter: fileFilter
})



router.post('/signup', upload.single('avatar'), signUp)
router.post('/signin' , signIn)
router.get('/signout' , authenticateUser ,signOut)
router.put('/updateinfo/:id' , authenticateUser , upload.single('avatar'),updateInfo)
router.put('/changepassword/:id' , authenticateUser ,changePassword)
router.delete('/deleteaccount/:id' , authenticateUser ,deleteAccount)

module.exports = router
