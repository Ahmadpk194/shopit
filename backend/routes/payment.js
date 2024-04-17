const express = require('express')
const { processPayment, sendStripeApi } = require('../controllers/paymentController')
const router = express.Router()

const { isAuthenticatedUser } = require('../middlewares/auth')
 
router.route('/payment/process').post(isAuthenticatedUser, processPayment)
router.route('/stripeapi').get(isAuthenticatedUser, sendStripeApi)

module.exports = router;