const cors = require('cors')
var request = require('request')
var express = require('express')

/**
 * 
 * @param {string} url - the server url you want to proxy
 * @param {object} options - a list of options
 * @param {boolean} [options.cors=false] - enable or disable cors
 */
function createProxyServer(url, options) {

    var proxyServer = express()

    if( options.cors === true ){
        proxyServer.use(cors({ orgin: true }))
    }

    proxyServer.use('*', (req, res, next) => {
        console.log('Time:', Date.now())
        next()
    })
    
    proxyServer.get('*', (req, res) => {
        //modify the url in any way you want
        request(url).pipe(res)
    });

    proxyServer.post('*', (req, res) => {
        //modify the url in any way you want
        request(url).pipe(res)
    });

    proxyServer.put('*', (req, res) => {
        //modify the url in any way you want
        request(url).pipe(res)
    });

    proxyServer.delete('*', (req, res) => {
        //modify the url in any way you want
        request(url).pipe(res)
    });

    return proxyServer

}

module.exports = {
    createProxyServer
}