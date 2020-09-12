const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
   console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
//   `mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`
  `mongodb+srv://fullstack:${password}@cluster0.bbj9d.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

const Person = mongoose.model('Person', personSchema)

const generateId = () => {
    return Math.floor(Math.random() * 1000000)
  }



if ( process.argv.length === 3 ) {
    console.log('Phonebook:')
    Person.find({}).then(result => {
        result.forEach(person => {
            personSchema.set('toJSON', {
                transform: (document, returnedObject) => {
                    returnedObject.id = returnedObject._id.toString()
                    delete returnedObject._id
                    delete returnedObject.__v
                }
                })
        console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}
if( process.argv.length > 3 ){
    const person = new Person({
        id: generateId(),
        name: process.argv[3],
        number: process.argv[4],
      })
      
    person.save().then(result => {
        console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
}