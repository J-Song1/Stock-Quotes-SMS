// Imports and configurations 
const http = require('http');
const express = require('express')
const twilio = require('twilio')
require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = '+15392103638';

//
const app = express()
const MessagingResponse = twilio.twiml.MessagingResponse;

app.post('/sms', (req, res) => {
  const message = req.body

  const twiml = new MessagingResponse();

  console.log(`Body: ${message}`)
  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
})

app.get('/', (req, res) => {
  res.json({
    test: 'This is a test'
  })
})

const PORT = process.env.PORT || 1337
http.createServer(app).listen(PORT, () => {
  console.log(PORT)
})



//const client = require('twilio')(accountSid, authToken)

/*
client.messages
  .create({
    body: 'Hi There!',
    from: phoneNumber,
    to: '+16475280321'
  })
  .then(message => {
    console.log(message)
  })
*/