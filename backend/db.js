const mongoose = require('mongoose')
const mongoURI = "mongodb://0.0.0.0:27017/jotdown"

const connectToMongo = () => {
    mongoose.connect(mongoURI, {
    },)
        .then(() => console.log("Connected to Mongo successfully"))
        .catch((err) => { console.log(err) })
}

module.exports = connectToMongo;
