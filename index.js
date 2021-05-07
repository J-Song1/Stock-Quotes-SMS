// Imports and configurations 
const http = require('http');
const express = require('express')
const twilio = require('twilio')
const bodyParser = require('body-parser')
require('dotenv').config()

const responseHandler = require('./responseHandler')

// Setting up app wiht middleware
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
const MessagingResponse = twilio.twiml.MessagingResponse;

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const phoneNumber = '+15392103638';

app.post('/sms', async (req, res) => {
  const body = req.body.Body
  const responseMessage = await responseHandler(body.trim())

  const twiml = new MessagingResponse();
  twiml.message(responseMessage);

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
})

const PORT = process.env.PORT || 1337
http.createServer(app).listen(PORT, () => {
  console.log(`Started server at PORT ${PORT}`)
})