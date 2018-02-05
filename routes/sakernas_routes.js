var ObjectID = require('mongodb').ObjectID;

// routes/sakernas_routes.js
module.exports = function(app, db) {
  // RANDOM
  app.get('/pemutakhiran', (req, res) => {
    // const note = db.collection('pemutakhiran').find({}).toArray(function(err, result) {
    // const note = db.collection('master_kab').find({"kode_prov" : {$regex : ".*00.*"}}, {_id: 0, kode_prov: 1, kode_kab: 1, nama_kab: 1}).toArray(function(err, result) {
    const note = db.collection('master_kab').find({"kode_prov" : "00"}, {_id: 0, kode_prov: 1, kode_kab: 1, nama_kab: 1}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
      //db.close();
    });
  });

  app.get('/notes', (req, res) => {
    const note = db.collection('notes').find({}).toArray(function(err, result) {
    // const note = db.collection('notes').findOne({}, {_id: 0, text: 1, title: 1}, function(err, result) {
      if (err) throw err;
      res.json(result);
      //db.close();
    });
  });

  // CREATE
  app.post('/notes', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').insert(note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        // Create note
        console.log(result.ops[0]);
        res.send(result.ops[0]);
      }
    });
  });

  // READ
  app.get('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  // UPDATE
  app.put('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('notes').update(details, note, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error occurred'});
      } else {
        res.send(note);
      }
    });
  });

  // DELETE
  app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').remove(details, (err, item) => {
      if (err) {
        res.send({'error': 'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      }
    });
  });
  //*/
};
