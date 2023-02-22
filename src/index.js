require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const rotas = require('./routes');

app.use(cors());
app.use(express.json());
app.use(rotas);

app.listen(3334);
