const { getIndexes, getIndex, getTicker } = require('./quotes')

function getHelp() {
  let message = ''
  message += 'Stock Quotes SMS\n\n'
  message += 'Available Quotes:\n'
  message += 'GET-INDEXES - Dow Jones, S&P 500, S&P/TSX, and NASDAQ\n'
  message += 'GET-INDEX (DowJones | S&P500 | S&P/TSX | NASDAQ) - Dow Jones, S&P 500, S&P/TSX, or NASDAQ, respectively\n'
  message += 'GET-TICKER <ticker> - Stock with Ticker <ticker>\n'
  return message
}

async function responseHandler(message) {
  const tokens = message.split(' ')

  if (message == 'HELP') {
    return getHelp()
  } else if (message == 'GET-INDEXES') {
    return await getIndexes()
  } else if (tokens.length == 2 && tokens[0] == 'GET-INDEX') {
    return await getIndex(tokens[1])
  } else if (tokens.length == 2 && tokens[0] == 'GET-TICKER') {
    return await getTicker(tokens[1])
  }

  let errorMessage = 'Error: Invalid Operation\n'
  errorMessage += getHelp()
  return errorMessage
}

module.exports = responseHandler