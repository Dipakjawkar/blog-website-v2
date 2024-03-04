const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')


require('dotenv').config();
require('./database/connect')


const app = express()
const PORT = process.env.PORT

// For render react js in express server !
app.use(express.static(path.resolve(__dirname,'build')))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api/v1/user',require('./routes/userRoutes'))
app.use('/api/v1/blog',require('./routes/blogRoutes'))

app.listen(PORT, () => {
    console.log(`Server is Started ! ${PORT}`)
})
