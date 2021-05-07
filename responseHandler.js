const { getIndexes, getIndex } = require('./quotes')

function getHelp() {
  let message = ''
  message += 'Stock Quotes SMS\n\n'
  message += 'Available Quotes:\n'
  message += 'GET_INDEXES - Dow Jones, S&P 500, S&P/TSX, and NASDAQ'
  message += 'GET_INDEX (Dow Jones | S&P 500 | S&P/TSX | NASDAQ) - Dow Jones, S&P 500, S&P/TSX, or NASDAQ, respectively'
}

async function responseHandler(message) {
  const tokens = message.split(' ')

  if (message == 'HELP') {
    return getHelp()
  } else if (message == 'GET_INDEXES') {
    return await getIndexes()
  } else if (tokens.length == 2 && tokens[0] == 'GET_INDEX') {
    return await getIndex(tokens[1])
  } 

  let errorMessage = 'Error: Invalid Operation\n'
  errorMessage += getHelp()
  return errorMessage
}

module.exports = responseHandler