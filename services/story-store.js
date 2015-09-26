module.exports = (db) => {

  const COLLECTION = "test";

  return {

    all: function (callback) {
      db.collection(COLLECTION).find({}).toArray((err, docs) => {
        callback(docs);
      });
    },

    insert: function (data, callback) {
      db.collection(COLLECTION).insertMany([data], (err, result) => {
        if (err) callback(err, null);
        else callback(null, result.ops[0])
      });
    }
  }
};