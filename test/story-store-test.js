var assert = require('chai').assert;
var storyStore = require('../services/story-store');

describe('The Story Store Service', function () {

  var collection = {};
  var mock = {
    collection: function () {
      return collection;
    }
  };

  describe('insert method', function () {

    it('should return an extra _id', function (done) {
      //given
      var story = {
        _id: "123",
        title: "this is a title"
      };

      collection.insert = function (data, callback) {
        var result = data;
        result._id = "123";
        callback(null, {ops: [result]});
      };

      collection.findOne = function (data, callback) {
        callback(null, null);
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

      collection.insert = function (data, callback) {
        var result = data;
        result._id = "123";
        callback(null, {ops: [result]});
      };
      collection.findOne = function (data, callback) {
        callback(null, story);
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

  it('should add a state to a story', function (done) {
    //given
    var story = {
      _id: "123",
      title: "this is a title"
    };

    collection.insert = function (data, callback) {
      var result = data;
      result._id = "123";
      assert.equal(result.state, "new");
      callback(null, {ops: [result]});
    };

    collection.findOne = function (data, callback) {
      callback(null, null);
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

  describe('latest method', function () {
    it('should return a limit of 50 items', function (done) {
      //given
      collection.find = function () {
        return {
          sort: function () {
            return {
              limit: function (amount) {
                assert.equal(50, amount);
                var items = [];
                for (i = 0; i < 50; i++) {
                  items.push({id: i});
                }
                return {
                  toArray: function (callback) {
                    callback(null, items);
                  }
                }
              }
            }
          }
        }
      };

      //when
      storyStore(mock).latest(function (result) {
        //then
        assert.equal(50, result.length);
        done();
      });
    });
  });
});
