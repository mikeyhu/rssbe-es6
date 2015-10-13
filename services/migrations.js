var mongo = require('mongodb');
var debug = require('debug')('migrations');
var storyStore = require('./story-store.js');


var migrations = [
  (db, callback) => {
    debug("001 - add 'state' to all stories without a 'state'");
    storyStore(db).collection.update(
      {"state": null},
      {"$set": {"state": "new"}},
      {
        upsert: false,
        multi: true
      },
      callback
    );
  }
];

var migrate = function (db, m, callback) {
  if (m.length <= 0) callback();
  else {
    var fun = m.shift();
    fun(db, function (err, result) {
      if (err) debug(err);
      migrate(db, m, callback);
    });
  }
};

module.exports = function (mongoUri, callback) {
  var mongoClient = require('mongodb').MongoClient;
  debug('starting migrations');
  mongoClient.connect(mongoUri, function (err, db) {
    migrate(db, migrations, ()=> {
      debug('finished migrations');
      db.close();
      callback();
    });
  });

};