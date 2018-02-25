const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const Friend = require('../data/model');

// Middleware
// ===========================================================
app.use(bodyParser.json());
const parseUrlencoded = bodyParser.urlencoded({extended: false});

// Database
// ===========================================================
const pg = require('pg');
const conString = 'postgres://lmcdpcos:ohDfcElBPBTMef3YQyT_9dLhqqdxP2ty@baasu.db.elephantsql.com:5432/lmcdpcos';
const client = new pg.Client(conString);

// Request Resonses | /API Mount
// ===========================================================

router.route('/')
.get(function(req, res){
  client.connect(function(){
    client.query(`
      SELECT * 
      FROM friends 
      LIMIT 1000
      `, function(db_err, db_res){
        res.json( db_res["rows"] );
      });
  });

})
.post(parseUrlencoded, function(req, res){
  if(!req.body.name || !req.body['scores[]']){ return res.send('Nope'); }
  let f = new Friend( req.body.name, req.body.bio, req.body.img, req.body['scores[]'] );

  client.connect(function(){
    client.query(`
      INSERT INTO friends (name, bio, img, approved, scores, matchScore, opinionScore) 
      VALUES ${f.getInsertString()}
      ;
      SELECT name, bio, img
      FROM friends
      WHERE name NOT LIKE '%${f.name}%'
      AND approved = 'true'
      ORDER BY ABS( ${f.matchScore} - matchScore)
      LIMIT 1
      `, function(db_err, db_res){
        res.json( db_res[1].rows );
      });
  });
});


// Request Resonses | /API/QUEUE Mount
// ===========================================================

router.route('/queue')
.get(function(req, res){
  client.connect(function(){
    client.query(`
      SELECT id, name, img 
      FROM friends 
      WHERE approved <> 'true'
      `, function(db_err, db_res){
        res.json( db_res["rows"] );
      });
  });

})
.put(parseUrlencoded, function(req, res){
  if(!req.body.id || req.body.approved != 'true'){ return res.send('The id must be included and the transaction must be an approval'); }

  client.connect(function(){
    client.query(`
      UPDATE friends
      SET approved = 'true'
      WHERE id = ${req.body.id}
      `, function(db_err, db_res){
        res.json( db_res || {message:'silence..'} );
      });
  });

})
.delete(parseUrlencoded, function(req, res){
  if(!req.body.id){ return res.send('What id are you trying to delete?'); }
  client.connect(function(){
    client.query(`
      DELETE FROM friends
      WHERE id = ${req.body.id}
      `, function(db_err, db_res){
        res.json( db_res || {message:'silence..'} );
      });
  });

});

// Export
// ===========================================================
module.exports = router;