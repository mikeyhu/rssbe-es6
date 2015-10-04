module.exports = (db) => {

  const COLLECTION = "test";

  return {

    all: function (callback) {
      db.collection(COLLECTION).find({}).toArray((err, docs) => {
        callback(docs);
      });
    },

    insert: function (data, callback) {
      db.collection(COLLECTION).findOne({_id:data._id}, (err, result) => {
        if(result) {
          callback(null, false);
        } else {
          db.collection(COLLECTION).insert(data, (err, result) => {
            if (err) callback(err, null);
            else callback(null, true);
          });
        }
      });
    }
  }
};