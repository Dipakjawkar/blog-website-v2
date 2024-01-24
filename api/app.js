const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')

require('./database/connect')
require('dotenv').config();

const app = express()
const PORT = process.env.PORT
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api/v1/user',require('./routes/userRoutes'))
app.use('/api/v1/blog',require('./routes/blogRoutes'))

app.listen(PORT, () => {
    console.log(`Server is Started ! ${PORT}`)
})
