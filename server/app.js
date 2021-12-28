const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

const pingRouter = require('./routes/ping')
const weatherRouter = require('./routes/weather')

const app = express()
app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors())
app.use(express.static(path.join(__dirname, '..', 'client', 'build')))

app.use(logger('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    'Content-Security-Policy-Report-Only',
    "default-src 'self' data:; font-src 'self'; img-src 'self' data: https://www.metaweather.com/static/img/weather; manifest-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
  )
  next()
})

app.use('/ping', pingRouter)
app.use('/weather', weatherRouter)

app.get('*', (_req, res) => {
  res.sendFile(path.json(__dirname, '..', 'client', 'build', 'index.html'))
})

// catch 404 and forward to error handler
app.use(function(_req, _res, next) {
  next(createError(404))
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
