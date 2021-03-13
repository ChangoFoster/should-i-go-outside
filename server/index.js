const app = require('./app')
const http = require('http')
const { PORT } = require('./utils/consts')

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
