const express = require('express')
const router = express.Router();
const authenticateUser = require('../middlewares/auth')
const path = require('path')

const {
    createProduct,
    getUserProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require ('../controllers/productControl')

const multer = require ('multer')

const storage = multer.diskStorage({
    destination: './uploads/productImages' , 
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



router.post('/', authenticateUser , upload.single('productImage') , createProduct)
router.get('/userproducts' , authenticateUser , getUserProducts)
router.get('/:id' , authenticateUser , getSingleProduct)
router.put('/:id' , authenticateUser ,  upload.single('productImage'), updateProduct)
router.delete('/:id' , authenticateUser ,deleteProduct)

module.exports = router
