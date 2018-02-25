const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// Middleware
// ===========================================================
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static( path.join(__dirname, 'src/public') ));

// Routes
// ===========================================================
const api = require('./src/routes/api');
app.use('/api', api);

app.get('/', function(req, res) {
  res.sendFile( path.join(__dirname, 'src/public/home.html') );
});

app.get('/survey', function(req, res) {
  res.sendFile( path.join(__dirname, 'src/public/survey.html') );
});

app.get('/queue', function(req, res) {
  res.sendFile( path.join(__dirname, 'src/public/queue.html') );
});

app.get(/^[^(api)]|^[^(assets)]/i, function(req, res){
  res.redirect('/');
});

// Listener
// ===========================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

