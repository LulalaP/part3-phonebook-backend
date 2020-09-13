require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const Person = require('./models/person')

app.use(cors())

app.use(express.json())

app.use(bodyParser.json())

app.use(express.static('build'))

morgan.token('body', function (req) {
    return JSON.stringify(req.body)
  })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
      if (person) {
      response.json(person)
      } else {
        response.status(404).end()
      }

    })
    .catch(error => next(error))
  })

app.get('/info', (request, response) => {
    Person.countDocuments({ }, function (err, count) {
      response.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>
      `)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
    console.log(`Delete ${request.params.id}`)

    Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
  })

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    if (!body.name) {
      return response.status(400).json({ 
        error: 'person missing' 
      })
    }
    const person = new Person({
      name: body.name,
      number: body.number
    })
    person.save().then(savedPerson => {
      console.log(`added ${body.name} ${body.number} to phonebook`)
      console.log(`id: ${person.id}`)
      response.json(savedPerson.toJSON())
    })
    .catch(error => next(error))
  })

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number
  }
  console.log(`personname: ${body.name}`)
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})