const cors = require('cors')
const express = require('express')

const corsServer = express()

corsServer.use(cors({ orgin: true }))

corsServer.get('*', (requrest, response) => {
    response.send(process.env)
})

corsServer.post('*', (requrest, response) => {
    response.send(process.env)
})

corsServer.put('*', (requrest, response) => {
    response.send(process.env)
})

corsServer.delete('*', (requrest, response) => {
    response.send(process.env)
})

module.exports = {
    corsServer
}