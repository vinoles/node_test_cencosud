const redis = require('redis');


//creamos un cliente redis
var redisClient = redis.createClient();
redisClient.on('connect', function() {
    console.log('Conectado a Redis');
});


module.exports = redisClient;