import app from './app'
import http from'http'
import { PORT } from'./utils/consts'

const server = http.createServer(app)

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})
