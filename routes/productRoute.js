const express = require('express')
const router = express.Router();
const authenticateUser = require('../middlewares/auth')

const {
    createProduct,
    getUserProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
} = require ('../controllers/productControl')




router.post('/', authenticateUser , createProduct)
router.get('/userproducts' , authenticateUser , getUserProducts)
router.get('/:id' , authenticateUser , getSingleProduct)
router.put('/:id' , authenticateUser , updateProduct)
router.delete('/:id' , authenticateUser ,deleteProduct)

module.exports = router
