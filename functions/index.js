// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions')

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin')

// Actual Server
const { corsServer } = require('./api/server')

// Create Express Proxy Server(s)
const { createProxyServer } = require('./utils/createProxyServer')

// Create Task Runner for starting and stop service / server
// const { createTaskRunner } = require('./utils/createTaskRunner')

const { testPortConnectionServer } = require('./api/testPortConnection')

admin.initializeApp()

// Initialize All Server endpoints
const BASE_URL = 'http://localhost:5000/istio-test-1-249901/us-central1' //`https://us-central1-${process.env.GCLOUD_PROJECT || process.env.GCP_PROJECT}.cloudfunctions.net`
const CORS_SERVER_URL = `${BASE_URL}/cors`

const cors = functions.https.onRequest(corsServer)

const proxyServerForCorsServer = createProxyServer(CORS_SERVER_URL, { cors: true })

const proxy = functions.https.onRequest(proxyServerForCorsServer)

const testPortConnection = functions.https.onRequest(testPortConnectionServer)

const scheduledFunction = functions.pubsub.schedule('every 5 minutes').onRun((context) => {
    console.log('This will be run every 5 minutes!');
 });

module.exports = {
    cors,
    proxy,
    scheduledFunction,
    testPortConnection
}