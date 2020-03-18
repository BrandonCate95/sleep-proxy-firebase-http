const functions = require('firebase-functions')

const scheduledFunction = functions.pubsub.schedule('every 5 minutes').onRun((context) => {
    console.log('This will be run every 5 minutes!');
 });

const taskRunner = functions.pubsub.schedule('* * * * *').onRun(context => {
        console.log('hello')
});

module.exports = {
    taskRunner
}