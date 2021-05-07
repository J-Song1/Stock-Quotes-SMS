const axios = require('axios')
const cheerio = require('cheerio')

const INDEXES = {
  DOW_JONES: {
    name: 'Dow Jones Industrial Average',
    url: 'https://ca.finance.yahoo.com/quote/%5EDJI'
  },
  SP_500: {
    name: 'S&P 500',
    url: 'https://ca.finance.yahoo.com/quote/%5EGSPC'
  },
  SP_TSX: {
    name: 'S&P/TSX Composite',
    url: 'https://ca.finance.yahoo.com/quote/%5EGSPTSE'
  },
  NASDAQ: {
    name: 'NASDAQ Composite',
    url: 'https://ca.finance.yahoo.com/quote/%5EIXIC'
  }
}

const getQuote = async (page) => {
  let data = null
  await axios.get(page.url)
    .then((response) => {
      const $ = cheerio.load(response.data)
      const selectors = $('[data-reactid="32"]')
      const price = $(selectors[2]).text()
      const change = $(selectors[1]).text()

      data = {
        name: page.name,
        price,
        change
      }
    })
    .catch((error) => {
      console.error(error)
    })
  
  return data
}

function formatData({ name, price, change }) {
  let message = ''
  message += `${name}\n`
  message += `Price: ${price}\n`
  message += `Change: ${change}\n\n` 
  return message
}

async function getIndexes() {
  let indexes = []
  for (const key in INDEXES) {
    indexes.push(await getQuote(INDEXES[key]))
  }

  let message = ''
  indexes.forEach((index, _) => {
    message += formatData(index)
  })

  return message
}

async function getIndex(indexName) {
  let data = null
  switch (indexName) {
    case 'DowJones':
      data = await getQuote(INDEXES.DOW_JONES)
      break

    case 'S&P500':
      data = await getQuote(INDEXES.SP_500)
      break

    case 'S&P/TSX':
      data = await getQuote(INDEXES.SP_TSX)
      break

    case 'NASDAQ':
      data = await getQuote(INDEXES.NASDAQ)
      break
  }

  if (data) {
    return formatData(data)
  }

  let message = ''
  message += 'Error: Invalid Index\n'
  message += 'Valid Indexes: \"DowJones\", \"S&P500\", \"S&P/TSX\", "NASDAQ\"'
  return message
}

module.exports = {
  getIndexes,
  getIndex
}