const mongoose = require('mongoose');

const db = process.env.MONGO_URI;

const connectDB = () => {
    mongoose.connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
        console.log(err.message);
        process.exit(1);
    });
};

module.exports = connectDB;