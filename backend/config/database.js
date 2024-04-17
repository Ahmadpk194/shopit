const mongoose = require('mongoose')
// mongodb+srv://ahmad:<password>@cluster0.tbomy.mongodb.net/
// pass: ahmadMongoPassword

const connectDatabase = async () => {
    await mongoose.connect(process.env.DB_URI).then(con => {
        console.log(`MongoDB Connected with HOST: ${con.connection.host}`)
    })
}

module.exports = connectDatabase;