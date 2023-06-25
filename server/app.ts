import createError from 'http-errors'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import helmet from 'helmet'

import pingRouter from './routes/ping'
import weatherRouter from './routes/weather'

const app = express()
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
)
app.use(cors())
app.use(express.static(path.join(__dirname, '..', 'client', 'build')))

app.use(logger('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Content-Security-Policy-Report-Only',
    "default-src 'self' data:; font-src 'self'; img-src 'self' data: https://www.metaweather.com/static/img/weather; manifest-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
  )
  next()
})

app.use('/ping', pingRouter)
app.use('/weather', weatherRouter)

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
})

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  next(createError(404))
})

export default app
