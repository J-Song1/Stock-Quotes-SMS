// Imports and configurations 
const http = require('http');
const express = require('express')
const twilio = require('twilio')
const bodyParser = require('body-parser')
require('dotenv').config()

const responseHandler = require('./responseHandler')
const { initializeMongo, User } = require('./database')

// Setting up app with middleware
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
const MessagingResponse = twilio.twiml.MessagingResponse;

app.post('/sms', async (req, res) => {
  const body = req.body.Body
  const phoneNumber = req.body.From

  console.log(`Message from ${phoneNumber}`)
  const responseMessage = await responseHandler(body.trim(), phoneNumber)

  const twiml = new MessagingResponse();
  twiml.message(`${responseMessage}\n${phoneNumber}`);

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
})

const PORT = process.env.PORT || 1337
initializeMongo(() => {
  http.createServer(app).listen(PORT, () => {
    console.log(`Started server on PORT ${PORT}`)
  })
})

/*
;(async () => {
  console.log(await responseHandler('HELP'))
})()
*/
