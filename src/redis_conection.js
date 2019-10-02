const redis = require('redis');


//creamos un cliente
var redisClient = redis.createClient();
redisClient.on('connect', function() {
    console.log('Conectado a Redis Server');
});


module.exports = redisClient;