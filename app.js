const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const galleryRouter = express.Router();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

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

galleryRouter.route('/')
  .get((req, res) => {
    res.render(
      'gallery',
      {
        nav: [{ link: '/gallery', title: 'Gallery' },
          { link: '/babies', title: 'Babies' }],
        title: 'Library',
        photos
      }
    );
  });

galleryRouter.route('/single')
  .get((req, res,) => {
    res.send('hello single pic.');
  });

app.use('/gallery', galleryRouter);

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav: [{ link: '/gallery', title: 'Gallery' },
        { link: '/babies', title: 'Babies' }],
      title: 'Library'
    }
  );
});


app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
