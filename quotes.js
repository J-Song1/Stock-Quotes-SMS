const axios = require('axios')
const cheerio = require('cheerio')

const BASE_URL = 'https://ca.finance.yahoo.com/quote'
const INDEXES = {
  DOW_JONES: {
    name: 'Dow Jones Industrial Average',
    url: `${BASE_URL}/%5EDJI`
  },
  SP_500: {
    name: 'S&P 500',
    url: `${BASE_URL}/%5EGSPC`
  },
  SP_TSX: {
    name: 'S&P/TSX Composite',
    url: `${BASE_URL}/%5EGSPTSE`
  },
  NASDAQ: {
    name: 'NASDAQ Composite',
    url: `${BASE_URL}/%5EIXIC`
  }
}

const getIndexQuote = async (page) => {
  let data = null
  await axios.get(page.url)
    .then((response) => {
      const $ = cheerio.load(response.data)
      const price = $($('[data-reactid="32"]')[2]).text()
      const change = $($('[data-reactid="33"]')[3]).text()

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
    indexes.push(await getIndexQuote(INDEXES[key]))
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
      data = await getIndexQuote(INDEXES.DOW_JONES)
      break

    case 'S&P500':
      data = await getIndexQuote(INDEXES.SP_500)
      break

    case 'S&P/TSX':
      data = await getIndexQuote(INDEXES.SP_TSX)
      break

    case 'NASDAQ':
      data = await getIndexQuote(INDEXES.NASDAQ)
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

async function getTicker(ticker) {
  let data = null

  const url = `${BASE_URL}/${ticker.toUpperCase()}`
  await axios.get(url)
    .then(response => {
      const $ = cheerio.load(response.data)
      const name = $($('[data-reactid="7"]')[4]).text()
      const price = $($('[data-reactid="32"]')[2]).text()
      const change = $($('[data-reactid="33"]')[3]).text()

      // Bad Ticker 
      if (price.split(' ')[0] == 'No') return

      data = {
        name,
        price,
        change
      }
    })
    .catch(error => {
      console.log(error)
    })
  
  if (data) {
    return formatData(data)
  }

  return `Error: Invalid Ticker ${ticker}`
}

module.exports = {
  getIndexes,
  getIndex,
  getTicker
}