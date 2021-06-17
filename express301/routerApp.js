// We will learn about express.Router()

const express = require('express')
const app = express()
const helmet = require('helmet')
const { use } = require('./theRouter.js')
app.use(helmet())
app.use(express.urlencoded())
app.use(express.json())
app.use(express.static('public'))

// I will need to require the router file I created like below
const router = require('./theRouter.js')
// At Home Page Level "/" and everything else, I am using one router with name 'router'
app.use('/', router)
// At "/admin/*" I am using another router with name 'amdinRouter'
// app.use('/admin', adminRouter)
// At "/user/*" I am using another router with name 'userRouter'
const userRouter = require('./userRouter.js')
app.use('/user', userRouter)

// This type of creating multiple routers for different routes is used in API Development

// If you want to use only one router, you could use
// app.use('/', globalRouter)





app.listen(3000)