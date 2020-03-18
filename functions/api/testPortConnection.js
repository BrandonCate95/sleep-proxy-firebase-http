const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

var net = require('net')

/**
 * Will test whether can create tcp connection to host:port
 * @param {number} port -- port on host you want to attempt tcp connection to 
 * @param {string} host -- host you want to attempt tcp connection to
 * @returns {boolean} -- true if connection success, false if connection failed / errored
 */
function testPortConnection(port, host) {
    return new Promise( (resolve, reject) => {
        var client = net.createConnection(port, host)

        client.on("connect", (e) => {
            client.destroy()
            resolve(true)
        })

        client.on("error", (e) => {
            client.destroy()
            resolve(false) 
        })

        const TIMEOUT = 20000 // 20 seconds
        setTimeout(() => {
            resolve(false)
        }, TIMEOUT); 
    })
}

var testPortConnectionServer = express()

testPortConnectionServer.use(cors({ orgin: true }))
testPortConnectionServer.use(bodyParser.urlencoded({ extended: false }))

testPortConnectionServer.post('*', async (request, response) => {

    console.info(`testing tcp connection at ${request.body.host}:${request.body.port}`)

    var testResult = await testPortConnection(request.body.port, request.body.host)

    response.json({
        "connection": testResult,
        "host": request.body.host,
        "port": request.body.port
    })

})

module.exports = {
    testPortConnectionServer
}