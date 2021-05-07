const express = require('express')
const twilio = require('twilio')
require('dotenv').config()

const { getDowJonesQuote } = require('./yfinance')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNumber = '+15392103638';

const MessagingResponse = twilio.twiml.MessagingResponse;

const app = express()

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
})

http.createServer(app).listen(1337, () => {
  console.log('1337')
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