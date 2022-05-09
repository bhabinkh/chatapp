require('dotenv').config()
require('express-async-errors')
const express = require('express')
const bcrypt = require('bcryptjs')

const connectDB = require('./db/db_connection')
const { NotFoundError } = require('./errors/error')
const app = express()
const port = 3000
const errorHandler = require('./middleware/error_handler')
const pageNotFound = require('./middleware/page_not_found')
const auth = require('./routes/auth')
const task = require('./routes/task')


app.get('/', (req, res) => {
    res.send('Hello Express')
})

app.use(express.json())
app.use(auth)
app.use(task)
// app.use(task)

app.use(pageNotFound)
app.use(errorHandler)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening in port: ${port}.... `)
        })
    } catch (err) {
        console.log(`Error in connecting mongodb....`)
    }
}

start()