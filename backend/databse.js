const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://praveen1619:7732038@mycluster.1g30k.mongodb.net/?';

const connectToMongo = async () => {
    await mongoose.connect(mongoURI);
    // console.log('Connected');
}

module.exports = connectToMongo;