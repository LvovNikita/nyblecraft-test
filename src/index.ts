import { createServer } from 'node:http'

import dotenv from 'dotenv'
import express, { Express } from 'express'
import passport from 'passport'

import apiRouter from './routes/apiRouter'
import authRouter from './routes/authRouter'
import errorHandler from './middleware/errorHandler'
import sessionMiddleware from './config/session'
import db from './config/db'

dotenv.config()

const app: Express = express()

require('./config/passport')

app.use(sessionMiddleware)
app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api', apiRouter)
app.use('/auth', authRouter)
app.use(errorHandler)

const httpServer = createServer(app)

db
    .$connect()
    .then(() => {
        console.log('Connected to db')
        const PORT = process.env.PORT ? +process.env.PORT : 3000
        httpServer.listen(PORT, () => {
            console.log(`Server is running on http://127.0.0.1:${PORT}`)
        })
    })
    .catch(err => {
        console.log(err)
    })

process.on('uncaughtException', async err => {
    console.log(err)
    await db.$disconnect()
    process.exit(1)
})
