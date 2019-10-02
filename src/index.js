const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan')
const cors = require('cors');
const redisClient = require('./redis_conection');

app.use(cors());

//Santiago (CL), Zurich (CH), Auckland (NZ), Sydney (AU),  Londres (UK), Georgia (USA)

const cities =  [
    "key1", "-33.4372,-70.6506", //santiago
    "key2", "47.3666687,8.5500002", // Zurich
    "key3", "-36.8485298,174.7634888", // Auckland
    "key4", "-33.8678513,151.2073212",//Sydney
    "key5", "51.5072,-0.1275", //  Londres
    "key6", "32.7504,-83.5002" // Georgia
];

redisClient.mset(cities);


//settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));// ver informacion del servidor
app.use(express.urlencoded({extended:false})); //recibir datos del formulario
app.use(express.json()); //usar formatos json

// routes
app.use('/api/cities', require('./routes/city'));

//Star server
app.listen(app.get('port'), ()=> {
    console.log('Server on port ${3000}');
})