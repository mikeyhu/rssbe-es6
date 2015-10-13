module.exports = (db) => {

  const COLLECTION_NAME = "test";

  var collection = db.collection(COLLECTION_NAME);

  var transform = function (story) {
    story.state = "new";
    return story;
  };

  return {

    collection: collection,

    all: function (callback) {
      collection.find({}).toArray((err, docs) => {
        callback(docs);
      });
    },

    insert: function (data, callback) {
      collection.findOne({_id: data._id}, (err, result) => {
        if (result) {
          callback(null, false);
        } else {
          console.log(data.title);
          collection.insert(transform(data), (err, result) => {
            if (err) callback(err, null);
            else callback(null, true);
          });
        }
      });
    },

    latest: function (callback) {
      collection
        .find({})
        .sort({datePublished: -1})
        .limit(50)
        .toArray((err, docs) => {
          callback(docs);
        });
    },

    latestNew: function (callback) {
      collection
        .find({state:"new"})
        .sort({datePublished: -1})
        .limit(50)
        .toArray((err, docs) => {
          callback(docs);
        });
    }
  }
};