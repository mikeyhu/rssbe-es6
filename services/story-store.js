module.exports = (db) => {

  const COLLECTION = "test";

  return {

    all: function (callback) {
      db.collection(COLLECTION).find({}).toArray((err, docs) => {
        callback(docs);
      });
    },

    insert: function (data, callback) {
      db.collection(COLLECTION).findOne({_id: data._id}, (err, result) => {
        if (result) {
          callback(null, false);
        } else {
          console.log(data.title);
          db.collection(COLLECTION).insert(data, (err, result) => {
            if (err) callback(err, null);
            else callback(null, true);
          });
        }
      });
    },

    latest: function (callback) {
      db.collection(COLLECTION)
        .find({})
        .sort({datePublished: -1})
        .limit(50)
        .toArray((err, docs) => {
          callback(docs);
        });
    }
  }
};