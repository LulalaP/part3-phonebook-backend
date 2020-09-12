const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url, typeof(url))

mongoose.connect(url || 'mongodb://localhost:3001', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
  
module.exports = mongoose.model('Person', personSchema)