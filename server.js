
var express = require('express');
var app = express();
const request = require('request');
const router = express.Router()
const bodyParser = require('body-parser');
const sanitizer = require('sanitizer');

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

    res.render('public/index')

});

app.get('/customer/:id', async (req, res) => {
    try {

        const inputVal = sanitizer.sanitize(req.params.id);

        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, inputVal)
            .query('EXEC Notflix.GetCustomerById @id;');

        //console.table(result.recordset);
        res.render('public/customer', { customer: result.recordset[0] });

    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
})

app.get('/movies/:id', async (req, res) => {
    try {

        const inputVal = sanitizer.sanitize(req.params.id);

        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, inputVal)
            .query('EXEC Notflix.GetMovieById @id;');

        //console.table(result.recordset);
        res.render('public/movie', { movie: result.recordset[0] });

    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
})
app.get('/movies/:id/playback', async (req, res) => {
    try {
        const pool = await poolPromise;

        const movie = await pool.request()
            .query('select * from Notflix.Movies where id = '+req.params.id);

        console.log(movie);

        res.render('public/playback', { movie: movie.recordset[0] });


        
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
})

app.post('/customer/:id', async (req, res) => {
    console.log('hello');
    const id = sanitizer.sanitize(req.params.id);
    var body = req.body;

    //make sure to sanitize all of these

    const infoStr = `${id}, '${body.street}', '${body.city}', ${body.state},` +
        ` '${body.firstName}', '${body.lastName}', '${body.email}'`;

    try {


        const pool = await poolPromise;
        const result = await pool.request()
            .query(`EXEC Notflix.updateCustomerInfo ${infoStr};`);

        res.render('public/customer', { customer: result.recordset[0] });

    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
})

app.post('/byTitle', async (req, res) => {
    try {
        const pool = await poolPromise;
        const movies = await pool.request()
            .input('input_param', sql.NVarChar, '%' + req.body.txtSearch + '%')
            .query('EXEC Notflix.searchMoviesByTitle @input_param;');

        const genres = await pool.request()
            .query('select * from Notflix.Genres');
        //console.table(result.recordset);
        res.render('public/browse', {
            search: true,
            movies: movies.recordset,
            genres: genres.recordset
        });

    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});



app.get('/byGenre', async (req, res) => {

    try {

        const pool = await poolPromise;
        const user = await pool.request()
            .query(`EXEC Notflix.findUserForLogin emmalopez, test123;`);

        const genres = await pool.request()
            .query('select * from Notflix.Genres');




        var queryString = `select Notflix.Movies.*
        from Notflix.Movies, Notflix.MovieGenres, Notflix.Genres
        where (Notflix.Movies.id = Notflix.MovieGenres.MovieId and 
               Notflix.MovieGenres.GenreId = Notflix.Genres.id
               and Notflix.Genres.id in (4));`;

        const movies = await pool.request()
            .query(queryString);

        res.render('public/browse', {
            movies: movies.recordset,
            user: user.recordset[0],
            genres: genres.recordset
        });

    }
    catch (e) {
        console.log(e);
        res.send(e.message);
    }
});

//GRANT EXECUTE ON OBJECT::dbo.GetCustomerById TO WebUser;

app.post('/', async (req, res) => {

    try {
        //  sql.map.register(String, sql.VarChar)

        const pool = await poolPromise;
        const user = await pool.request()
            .query(`EXEC Notflix.findUserForLogin emmalopez, test123;`);

        // console.log(result.recordset[0]['']);


        const genres = await pool.request()
            .query('select * from Notflix.Genres');

        const movies = await pool.request()
            .query(`select * from Notflix.Movies;`);
        // console.log(user.recordset);

        res.render('public/browse', {
            movies: movies.recordset,
            user: user.recordset[0],
            genres: genres.recordset
        });

    }
    catch (e) {
        console.log(e);
        res.send(e.message);
    }
});

app.get('/browse', async (req, res) => {

    try {
        //  sql.map.register(String, sql.VarChar)

        const pool = await poolPromise;
        const user = await pool.request()
            .query(`EXEC Notflix.findUserForLogin emmalopez, test123;`);

        // console.log(result.recordset[0]['']);


        const genres = await pool.request()
            .query('select * from Notflix.Genres');

        const movies = await pool.request()
            .query(`select * from Notflix.Movies;`);
        // console.log(user.recordset);

        res.render('public/browse', {
            movies: movies.recordset,
            user: user.recordset[0],
            genres: genres.recordset
        });

    }
    catch (e) {
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
