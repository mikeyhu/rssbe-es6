module.exports = function () {

  const DB_NAME = "rssbe";

  var getMongoUri = () => {
    var kubeHost = process.env.RSSBE_MONGO_SERVICE_HOST;
    if (kubeHost) return `mongodb://${kubeHost}:27017/${DB_NAME}`;

    var composeHost = process.env.MONGO_PORT_27017_TCP_ADDR;
    if (composeHost) return `mongodb://${composeHost}:27017/${DB_NAME}`;

    var dockerHost = process.env.DOCKER_HOST;
    if (dockerHost) return `mongodb://${dockerHost.match(/\/\/(.*):/)[1]}:27017/${DB_NAME}`;

    return `mongodb://localhost:27017/${DB_NAME}`;
  };

  return {
    mongoUri: getMongoUri()
  }

}();