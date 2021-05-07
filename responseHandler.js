const { getIndexesQuotes } = require('./quotes')

async function getIndexes() {
  const indexes = await getIndexesQuotes()

  let message = ''
  indexes.forEach((index, _) => {
    message += `${index.name}\n`
    message += `Price: ${index.price}\n`
    message += `Change: ${index.change}\n\n`
  })

  return message
}


async function responseHandler(message) {
  if (message == 'GET_INDEXES') {
    return await getIndexes()
  }

  return 'Error: Invalid token'
}

module.exports = responseHandler