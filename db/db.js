const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Mongo Db Connected successfully')
    } catch (error) {
        console.log('Not able to connect to database, please check connection string details in mongodb ');
    }
}

module.exports = {db}