// router
const express = require('express');
const Internal = express.Router();

// const { Internal } = Router();

// auth
require('./auth.js');

// database
const { Quotes, Tarot } = require('../database/index.js');
const Sequelize = require('sequelize');

// middleware
Internal.use(express.json());
Internal.use(express.urlencoded({ extended: true }));

// *****************************
// ***** INTERNAL DB HITS ******
// *****************************

// DB
Internal.post('/quote', (req, res) => {
  const { quote } = req.body;
  console.log(quote);
  Quotes.create(quote)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('POST /api/quote', error);
      res.sendStatus(500);
    });
});

// DB
Internal.get('/all_quotes/', (req, res) => {
  Quotes.findAll()
    .then((quotesArr) => {
      console.log(quotesArr);
      res.status(200).send(quotesArr);
    }).catch((err) => {
      console.log('GET /api/quotes', err);
      res.sendStatus(500);
    });
});

// DB
Internal.get('/tarot', (req, res) => {
  Tarot.findAll({ order: Sequelize.literal('RAND()'), limit: 3 })
    .then((cards) =>
      res.status(200).send(cards)
    )
    .catch((err) => {
      console.error('Error from Tarot.findall /api/tarot server/index.js: ', err);
    });
});

module.exports = { Internal };
