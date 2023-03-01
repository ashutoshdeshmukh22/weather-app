const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');
const geoCode = require('./utils/geoCode');
const forCast = require('./utils/forCast');

const app = express();

// Define Paths for Express Configuration
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup Handlebars engine and View Location
app.set('view engine', 'hbs');
app.set('views', viewsPath); //setting custom views dir path
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Ashutosh Deshmukh',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us Page',
    name: 'Ashutosh Deshmukh',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Ashutosh Deshmukh',
    helpText: 'This is some help text',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide An Address To Get Weather Forcast',
    });
  }

  geoCode(req.query.address, (error, data) => {
    if (error) {
      console.log('Error', error);
      res.send({ error });
    } else {
      forCast(data.latitude, data.longitude, (error, forcastData) => {
        if (error) {
          console.log(error);
          res.send({ error });
        } else {
          res.send({
            forcast: forcastData,
            address: req.query.address,
            location: data.location,
          });
          console.log(data);
          console.log('Data', forcastData);
        }
      });
    }
  });

  // res.send({
  //   address: req.query.address,
  //   forcast: 29,
  //   location: data.location,
  // });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({ error: 'You must provide a search term' });
  }

  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'article Error',
    message: 'help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Error',
    message: '404 Error page not found',
  });
});

// app.com
// app.com/help
// app.com/about -> /about is the route

app.listen(3000, () => {
  console.log('Server Started on port 3000');
});
