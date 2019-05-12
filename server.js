const express = require("express")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan');
const config = require('./config');
 
const path = require('path');

const app = express()

app.set('views', path.join(__dirname, 'apps/mustagram/api/webinf'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'apps/mustagram/res')));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({
    extended: true
}));

 

app.use(morgan('dev'));
// app.set('jwt-secret', config.secret)

const port = process.env.PORT_POPURI | 8081

var auth = require('http-auth');

var basic = auth.basic({
        realm: "Web."
    }, function (username, password, callback) { // Custom authentication method.
        callback(username === "mustapp" && password === "appmust123");
    }
);
 
// app.use('/api/', auth.connect(basic), require('./apps/notifar/api/general/routes/web'));

//WHATSAPP EXPLORE


//MUSTAGRAM //auth.connect(basic),
app.use('/popuri/api/v1.0/music', require('./popuri/api/versions/v1.0/routes/music'));
// app.use('/popuri/api/v1.0/video', require('./popuri/api/versions/v1.0/routes/video'));
// app.use('/popuri/api/',  require('./apps/mustagram/api/general/routes/web'));



app.listen(port, () => {
    console.log('Popuri Server started on: ' + process.env.NODE_ENV + " " + process.env.PORT_POPURI)
    console.log('Popuri started on: ' + port)
})


/* =======================
    CONNECT TO MONGODB SERVER
========================== */
mongoose.connect(config.mongodbUri, config.options);
mongoose.Promise = global.Promise;
const db = mongoose.connection
db.on('error', console.error)
db.once('open', () => {
    console.log('connected to mongodb server')
})