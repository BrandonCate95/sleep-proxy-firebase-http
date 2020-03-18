// var net = require('net')

// function testPort(port, host) {
//     return new Promise( (resolve, reject) => {
//         var client = net.createConnection(port, host)

//         client.on("connect", (e) => {
//             client.destroy()
//             resolve(true)
//         })

//         client.on("error", (e) => {
//             client.destroy()
//             reject(false) 
//         })
//     })
// }

// testPort(80, '192.83.23.01')
// .then((e) => console.log(e))
// .catch((e) => console.log(e))