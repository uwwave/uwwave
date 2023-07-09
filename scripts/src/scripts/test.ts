const CC = require('currency-converter-lt')

const fire = async () => {
    let currencyConverter = new CC({from:"USD", to:"CAD", amount:500.3})
    console.log(Math.floor(await currencyConverter.convert()))
}

fire()
