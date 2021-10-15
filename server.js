
var express = require('express');
var app = express();
const request = require('request');
const router = express.Router()
const bodyParser = require('body-parser');
const sanitizer = require('sanitizer');

// Import in the sql libraries
const { sql, poolPromise } = require('./DB/dbPool')

// Set up the server
// process.env.PORT is related to deploying on AWS
var server = app.listen(process.env.PORT || 5000, listen);
module.exports = server;
path = require('path');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());


//title page
app.get('/', async (req, res) => {

    res.render('public/index')

});

//for browsing the main area
app.post('/', async (req, res) => {

    //gets the genres movies and users and renders them in the browse.ejs
    try {
        const pool = await poolPromise;
        const user = await pool.request()
            .query(`EXEC Notflix.findUserForLogin bwatson, password123;`);

        const genres = await pool.request()
            .query('exec Notflix.GetAllGenres;');

        const movies = await pool.request()
            .query(`exec Notflix.GetAllMovies;`);

        res.render('public/browse', {
            movies: movies.recordset,
            user: user.recordset[0],
            genres: genres.recordset
        });

    }
    catch (e) {
        res.status(500);
        res.send(e.message);

    }
});

//a duplicate of the previous because we need another place for this endpoint
app.get('/browse', async (req, res) => {

    try {
        const pool = await poolPromise;
        const user = await pool.request()
            .query(`EXEC Notflix.findUserForLogin bwatson, password123;`);

        const genres = await pool.request()
            .query('exec Notflix.GetAllGenres;');

        const movies = await pool.request()
            .query(`exec Notflix.GetAllMovies;`);

        res.render('public/browse', {
            movies: movies.recordset,
            user: user.recordset[0],
            genres: genres.recordset
        });

    }
    catch (e) {
        res.status(500);
        res.send(e.message);

    }
});

//the main area after a search query is performed
app.post('/byTitle', async (req, res) => {

    //same as browse but the query for movies is specific to the title input
    try {

        const title = sanitizer.sanitize(req.body.txtSearch);

        const pool = await poolPromise;
        const movies = await pool.request()
            .input('input_param', sql.NVarChar, '%' + title + '%')
            .query('EXEC Notflix.searchMoviesByTitle @input_param;');

        const genres = await pool.request()
            .query('exec Notflix.GetAllGenres;');

        res.render('public/browse', {
            search: true,
            movies: movies.recordset,
            genres: genres.recordset
        });

    } catch (err) {
        res.status(500);
        res.send(e.message);

    }
});

//same as other browse functionality but by specific genre
app.get('/genres/:id', async (req, res) => {

    //only difference is the query for movies is by genre
    try {

        const genreId = sanitizer.sanitize(req.params.id);
        const pool = await poolPromise;
        const user = await pool.request()
            .query(`EXEC Notflix.findUserForLogin bwatson, password123;`);

        const genres = await pool.request()
            .query('exec Notflix.GetAllGenres;');


        const movies = await pool.request()
            .input('id', sql.Int, genreId)
            .query('exec Notflix.GetMoviesByGenre @id;');

        res.render('public/browse', {
            movies: movies.recordset,
            user: user.recordset[0],
            genres: genres.recordset,
            byGenre: true
        });

    }
    catch (e) {
        res.status(500);
        res.send(e.message);
    }
});

//code for getting the specific movie info
app.get('/movies/:id', async (req, res) => {

    //gets the movie and then the specific genres of that movie
    try {

        const inputVal = sanitizer.sanitize(req.params.id);

        const pool = await poolPromise;
        const movie = await pool.request()
            .input('id', sql.Int, inputVal)
            .query('EXEC Notflix.GetMovieById @id;');

        const genres = await pool.request()
            .input('id', sql.Int, inputVal)
            .query('EXEC Notflix.GetGenresByMovie @id;');

        var genreString = "";

        //converts the raw genre data into something usable by the ui
        for (var i = 0; i < genres.recordset.length; i++) {
            (i < genres.recordset.length - 1) ?
                genreString += genres.recordset[i].name + ', ' :
                genreString += genres.recordset[i].name;
        }

        res.render('public/movie', {
            movie: movie.recordset[0],
            genres: genreString,
            dateReleased: movie.dateReleased
        });

    } catch (e) {
        res.status(500);
        res.send(e.message);

    }
})

//link from the movie page to the playback
app.get('/movies/:id/playback', async (req, res) => {

    //gets movie data again and passes the playback link into the iframe ui
    try {
        const inputVal = sanitizer.sanitize(req.params.id);
        const pool = await poolPromise;

        const movie = await pool.request()
            .input('id', sql.Int, inputVal)
            .query('EXEC Notflix.GetMovieById @id;');

        res.render('public/playback', { movie: movie.recordset[0] });


    } catch (e) {
        res.status(500);
        res.send(e.message);

    }
})


//shows page for editing customer data
app.get('/customer/:id', async (req, res) => {

    //gets customer and renders
    try {

        const inputVal = sanitizer.sanitize(req.params.id);

        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, inputVal)
            .query('EXEC Notflix.GetCustomerById @id;');

        res.render('public/customer', { customer: result.recordset[0] });

    } catch (e) {
        res.status(500);
        res.send(e.message);

    }
})

//edits the customer data
app.post('/customer/:id', async (req, res) => {
    //extensive sanitizing
    const id = sanitizer.sanitize(req.params.id);
    var body = req.body;

    const street = sanitizer.sanitize(body.street);
    const city = sanitizer.sanitize(body.city);
    const state = sanitizer.sanitize(body.state);
    const firstName = sanitizer.sanitize(body.firstName);
    const lastName = sanitizer.sanitize(body.lastName);
    const email = sanitizer.sanitize(body.email);

    const infoStr = `${id}, '${street}', '${city}', ${state},` +
        ` '${firstName}', '${lastName}', '${email}'`;

    //updates customer info
    try {

        const pool = await poolPromise;
        const result = await pool.request()
            .query(`EXEC Notflix.updateCustomerInfo ${infoStr};`);

        res.render('public/customer', { customer: result.recordset[0] });

    } catch (e) {
        res.status(500);
        res.send(e.message);

    }
})









publicDir = path.join(__dirname, 'public');
app.use(express.static(publicDir))
app.set('views', __dirname);
app.use(express.urlencoded({ extended: true }))

function listen() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port);
}
