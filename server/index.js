const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const routes = require('./routes/')

const app = express()
const PORT = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello!')
})

app.use('/api', routes)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))