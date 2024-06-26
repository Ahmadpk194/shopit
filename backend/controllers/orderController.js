const Order = require('../models/order');
const Product = require('../models/product')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

// Create a new order       =>     /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    return res.status(200).json({
        success: true,
        order
    })
})



// Get single order         =>   /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async(req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user','name email')

    if(!order){
        return next(new ErrorHandler('No order found with this ID',404))
    }

    return res.status(200).json({
        success: true,
        order
    })

})


// Get Logged in user orders        =>   /api/v1/orders/me
exports.myOrders = catchAsyncErrors(async(req, res, next) => {
    const orders = await Order.find({user: req.user._id})

    return res.status(200).json({
        success: true,
        orders
    })

})


// Get all orders  - Admin        =>   /api/v1/admin/orders
exports.allOrders = catchAsyncErrors(async(req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });

    return res.status(200).json({
        success: true,
        totalAmount,
        orders
    })

})


// Update/Process orders  -  Admin    =>   /api/v1/admin/orders/:id
exports.updateOrder = catchAsyncErrors(async(req, res, next) => {
    const order = await Order.findById(req.params.id)
    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler('You have already delivered this order',404))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status;    // status from body
    order.deliveredAt = Date.now()

    await order.save()

    return res.status(200).json({
        success: true,
    })

})

async function updateStock(id, quantity){
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;

    await product.save()
}


// Delete order     =>   /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async(req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler('No order found with this id',404));
    }

    await order.deleteOne();

    res.status(200).json({
        success: true
    })
})