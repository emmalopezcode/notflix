
var express = require('express');
var app = express();
const request = require('request');
const router = express.Router()
const bodyParser = require('body-parser');

// Import in the sql libraries
const { sql, poolPromise } = require('./DB/dbPool')

//const routes = require( "./routes" );

// Set up the server
// process.env.PORT is related to deploying on AWS
var server = app.listen(process.env.PORT || 5000, listen);
module.exports = server;
path = require('path');

//app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// Inject your routes in here
app.get('/', async (req, res) => {

    try {
        const pool = await poolPromise;
        const result = await pool.request().query('select * from Notflix.Customer');
        console.log(result);

        res.render('public/index', {users:result.recordset})

    }
    catch (e){
        console.log(e);
        res.send(e.message);
    }
});

app.post('/', async (req, res) => {

    try {
      //  sql.map.register(String, sql.VarChar)

        const pool = await poolPromise;
        const result = await pool.request()
        .query(`EXEC Notflix.findUserForLogin ${req.body.username}, ${req.body.password};`);  

        // console.log(result.recordset[0]['']);

        if(result.recordset[0]['']){
            res.render('public/index', {badLogin:true});

        }else {
            const movies = await pool.request()
            .query(`select * from Notflix.Movies;`);  
    
            res.render('public/browse', {movies:movies.recordset});
        }

    }
    catch (e){
        console.log(e);
        res.send(e.message);
    }
});


// End routes

// Set the folder for public items
publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir))
app.set('views', __dirname);
app.use(express.urlencoded({ extended: true }))

// This callback just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://' + host + ':' + port);
}
