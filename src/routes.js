const express = require('express');
const { getCountries, insertCountry } = require('./controllers/countries');

const rotas = express();

rotas.get('/countries', getCountries);
rotas.post('/country', insertCountry);

module.exports = rotas;