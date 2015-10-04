var assert = require('chai').assert;
var storyStore = require('../services/story-store');

describe('The Story Store Service', function () {

  describe('insert method', function () {

    it('should return an extra _id', function (done) {
      //given
      var story = {
        _id: "123",
        title: "this is a title"
      };

      var mock = {
        collection: function () {
          return {
            insert: function (data, callback) {
              var result = data;
              result._id = "123";
              callback(null, {ops: [result]});
            },
            findOne: function (data, callback) {
              callback(null, null);
            }
          };
        }
      };

      //when
      storyStore(mock).insert(story, function (err, result) {

        //then
        assert.isNull(err);
        assert.isNotNull(result);
        assert.ok(result);
        done();
      });
    });

    it('should return not insert a document with the same id twice', function (done) {
      //given
      var story = {
        _id: "123",
        title: "this is a title"
      };

      var mock = {
        collection: function () {
          return {
            insert: function (data, callback) {
              var result = data;
              result._id = "123";
              callback(null, {ops: [result]});
            },
            findOne: function (data, callback) {
              callback(null, story);
            }
          };
        }
      };

      //when
      storyStore(mock).insert(story, function (err, result) {

        //then
        assert.isNull(err);
        assert.isNotNull(result);
        assert.notOk(result);
        done();
      });
    });
  });
});
