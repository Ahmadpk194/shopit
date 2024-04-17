const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const products = require('../data/product');

// Setting dotenv file
dotenv.config({
    path: 'backend/config/config.env'
});



const seedProducts = async () => {
    await connectDatabase();
    try{
        await Product.deleteMany();
        console.log('Products are deleted');
        await Product.insertMany(products);
        console.log('all products are added.');
        process.exit()
    }catch(error){
        console.log(error.message);
        process.exit();
    }
}

seedProducts()