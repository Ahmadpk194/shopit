const express = require('express')
const router = express.Router();


const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteReview, getAdminProducts } = require('../controllers/productController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

// router.get('/products', getProducts);

router.route('/products').get( getProducts)

router.route('/admin/products').get(isAuthenticatedUser, getAdminProducts)

router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct)

router.route('/admin/product/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct);

router.route('/admin/product/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct)

// Reviews
router.route('/review').put(isAuthenticatedUser, createProductReview)

router.route('/reviews').get( getProductReviews)

router.route('/reviews').delete(isAuthenticatedUser, deleteReview)

module.exports = router;