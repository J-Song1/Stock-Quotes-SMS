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
  SP_TXS: {
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


async function getIndexes() {
  let indexes = []
  for (const key in INDEXES) {
    indexes.push(await getQuote(INDEXES[key]))
  }

  console.log(indexes)
  return indexes
}


const getDowJonesQuote = async () => {
  let res = await getQuote(PAGES.DOW_JONES)
  res.name = PAGES.DOW_JONES.name
  console.log(res)
  return res
}

getIndexes()

module.exports = {
  getIndexes,
  getDowJonesQuote
}