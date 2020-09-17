const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();
const photos = [
  {
    description: 'fall picture',
    name: 'Zara',
    date: '09/8/2020',
    link: '/images/zara.png'
  },
  {
    description: 'fall picture',
    name: 'Luna',
    date: '09/10/2020',
    link: '/images/zara.png'
  },
  {
    description: 'bath picture',
    name: 'Luna',
    date: '09/11/2020',
    link: '/images/zara.png'
  },
  {
    description: 'fall picture',
    name: 'Zara',
    date: '09/22/2020',
    link: '/images/zara.png'
  },
  {
    description: 'bath picture',
    name: 'Zara',
    date: '09/22/2020',
    link: '/images/zara.png'
  }];
// const sql = require('mssql');
// const debug = require('debug')('app:galleryRoutes');

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'zazaBabyApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const response = await db.collection('photos').insertMany(photos);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }

        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;
