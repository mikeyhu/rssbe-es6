var assert = require('chai').assert;
var storyStore = require('../services/story-store');

describe('The Story Store Service', function () {

  describe('insert method', function () {

    it('should return an extra _id', function (done) {
      //given
      var story = {
        title: "this is a title"
      };

      var mock = {
        collection: function () {
          return {
            insertMany: function (data, callback) {
              var result = data[0];
              result._id = "_123";
              callback(null, {ops: [result]});
            }
          };
        }
      };

      //when
      storyStore(mock).insert(story, function (err, result) {

        //then
        assert.isNull(err);
        assert.isNotNull(result);
        assert.equal(result.title, story.title);
        assert.equal(result._id, "_123");
        done();
      });
    });

  });
});
