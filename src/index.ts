import dotenv from 'dotenv'

import express from 'express'
import testController from './controllers/test.controller'

dotenv.config()

const app = express()
app.use(express.json())

app.use('/test', testController)

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
)
