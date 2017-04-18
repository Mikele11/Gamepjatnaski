var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('gamebook', ['gamebook']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/gamebook', function (req, res) {
  console.log('All right');

  db.gamebook.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  })
});

app.post('/gamebook', function (req, res) {
  console.log(req.body);
  db.gamebook.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/gamebook/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.gamebook.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/gamebook/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.gamebook.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/gamebook/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.gamebook.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, result: req.body.result}},//change avtomatic change
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");