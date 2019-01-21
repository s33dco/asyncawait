const axios           = require('axios');

const getExchangeRate =  async (from, to) => {
  try {
    const response = await axios.get(`https://free.currencyconverterapi.com/api/v6/convert?q=${from}_${to}`) // return promise
    const rate = response.data.results[`${from}_${to}`].val;

    if (rate) {                   // this catches the error if no rate
      return rate                 // convertCurrencyAlt('notcurrencycode', "EUR", 100) would give undefined error withouththis block
    } else {
      throw new Error();
    }
  } catch (e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}`)
  }
};

const getCountries    =  async (currencyCode) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
    return response.data.map((country) => country.name);
  } catch (e) {
    throw new Error(`Unable to get countries that use ${currencyCode}`)
  }
};

// USD CAD 23
//
// 23 usd is worth 28 cad. you spend these in the following countries....

// getExchangeRate('GBP', 'EUR').then((rate) => {
//   console.log(rate);
// }).catch((e) => {
//   console.log(e.message);
// });
//
// getCountries('EUR').then((countries) => {
//   console.log(countries);
// }).catch((e) => {
//   console.log(e.message);
// });

const convertCurrency = (from, to, amount) => {
  let countries;
  return getCountries(to).then((tempCountries) => {
    countries = tempCountries;
    return getExchangeRate(from, to);
  }).then((rate) => {
    const exchangeAmount = amount * rate;
    return `${amount} ${from} is worth ${exchangeAmount} ${to}.\n${to} can be used in the following countries: ${countries.join(', ')}`;
  });
}

const convertCurrencyAlt = async (from, to, amount) => {
  const countries = await getCountries(to);
  const rate = await getExchangeRate(from, to);
  const exchangeAmount = amount * rate;
  return `${amount} ${from} is worth ${exchangeAmount} ${to}.\n${to} can be used in the following countries: ${countries.join(', ')}`;
};

//
// convertCurrency('GBP', "EUR", 100).then((summary) => {
//   console.log(summary);
// }).catch((e) => {
//   console.log(e.message);
// });
//


convertCurrencyAlt('USD', "EUR", 100).then((summary) => {
  console.log(summary);
}).catch((e) => {
  console.log(e.message);
});
