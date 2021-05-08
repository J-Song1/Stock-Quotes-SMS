const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const userSchema = new Schema({
  phoneNumber: {
    type: String,
    required: true
  },
  positions: Array
})

const User = mongoose.model('User', userSchema)

// Initiating MongoDB Atlas connection
function initializeMongo(callback = null) {
  const username = 'username1234'
  const password = 'password78917891'
  const mongoURI = `mongodb+srv://${username}:${password}@cluster0.rp2c3.mongodb.net/sms?retryWrites=true&w=majority`
  const mongoConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

  mongoose.connect(mongoURI, mongoConfig)
    .then((result) => {
      console.log('Connected to MongoDB')

      if (callback) callback()
    })
    .catch((error) => {
      console.error(error)
    })
}


module.exports = {
  initializeMongo,
  User
}