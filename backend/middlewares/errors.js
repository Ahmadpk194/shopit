const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    
    if(process.env.NODE_ENV === 'development'){
        return res.status(err.statusCode).json({
            success: false, 
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    if(process.env.NODE_ENV === 'production'){
        let error = {...err};
        error.message = err.message;

        // wrong mongoose object id error
        if(err.name === 'CastError'){
            const message = `Resourse not found. Invalid: ${err.path}`
            error = new ErrorHandler(message, 400)
        }

        // Handling Mongoose Validation Error
        if(err.name === 'ValidationError'){ 
            const message = Object.values(err.errors).map(val => val.message)
            error = new ErrorHandler(message, 404 )
        }
        
        // Handling Mongoose duplicate key errors
        if(err.code === 11000){
            const message = `Duplicate ${Object.keys(err.keyValue)} entered.`
            error = new ErrorHandler(message, 400 )
        }
        
        // Handling wrong jwt error
        if(err.name === 'jsonWebTokenError'){
            const message = `JSON web Token is invalid. Try Again!`
            error = new ErrorHandler(message, 400 )
        }

        // Handling expired jwt error
        if(err.name === 'TokenExpiredError'){
            const message = `JSON web Token is expired. Try Again!`
            error = new ErrorHandler(message, 400 )
        }

        return res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        })
    }

}