const axios           = require('axios');

const getExchangeRate =  (from, to) => {
  return axios.get(`https://free.currencyconverterapi.com/api/v6/convert?q=${from}_${to}`) // return promise
  .then((response) => {
    return response.data.results[`${from}_${to}`].val;                                     // return value
  });
}

const getCountries = (currencyCode) => {
  return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
  .then((response) => {
    return response.data.map((country) => country.name);
  });
}

// USD CAD 23

// 23 usd is worth 28 cad. you spend these in the following countries....

getExchangeRate('GBP', 'EUR').then((rate) => {
  console.log(rate);
}).catch((e) => {
  console.log(e.message);
});

getCountries('EUR').then((countries) => {
  console.log(countries);
}).catch((e) => {
  console.log(e.message);
});
