const {Router} = require('express');
const router = Router();
const fetch = require('node-fetch');
const redisClient = require('../redis_conection');

router.get('/', async (req, response) => {
    const url = 'https://api.darksky.net/forecast/dc9b428aa5370bc0c4038ee2ed2b879c';

    await redisClient.mget(['key1', 'key2', 'key3','key4', 'key5', 'key6'], async function (err, res) {
        var cities = [];
        for (var i = 0; i < res.length; i++) {
            var randon = Math.random()*1;
            if (randon < 0.1) {
                var date = new Date();
                var timestamp = date.getTime();
                var errorMessage = 'How unfortunate! The API Request Failed';
                redisClient.hset('api.errors', timestamp, errorMessage);
            }
            
            var data =  await fetch(url+'/'+res[i]);
            data = await data.json();

            if( data['code'] == 403 ) { //verificar que no tenga mas permisos por día
                var date = new Date();
                var timestamp = date.getTime();
                redisClient.hset('api.errors', timestamp, data['error']);
            } else {
                cities.push(data);
            }
            
        }

        // redisClient.hgetall('api.errors', function(err, keys) {
        //     console.log(keys);
        // });
        
       return response.json(cities);
    });

});



module.exports = router;