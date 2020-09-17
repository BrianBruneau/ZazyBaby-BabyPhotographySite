const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app.galleryRoutes');

const galleryRouter = express.Router();
const sql = require('mssql');

function router(nav) {
  galleryRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'zazaBabyApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const col = await db.collection('photos');

          const photos = await col.find().toArray();
          res.render(
            'galleryListView',
            {
              nav,
              title: 'Gallery',
              photos
            }
          );
        } catch (err) {
          debug(err.stack);
        }
        client.close();
      }());
    });
  galleryRouter.route('/:id')
    .get((req, res,) => {
      const { id } = req.params;
      const url = 'mongodb://localhost:27017';
      const dbName = 'zazaBabyApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const col = await db.collection('photos');
          const photo = await col.findOne({ _id: new ObjectID(id) });
          debug(photo);
          res.render(
            'photoView',
            {
              nav,
              title: 'Library',
              photo
            }
          );
        } catch (err) {
          debug(err.stack);
        }
      }());
    });

  return galleryRouter;
}

module.exports = router;
