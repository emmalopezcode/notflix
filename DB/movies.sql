-- insert into Notflix.Movies(title, director, lengthInMinutes, dateReleased, synopsis, rating)
--    values('Love Actually', 'Richard Curtis', 135, convert(date, '11/14/2003', 101),
--                        'Follows the lives of eight very different couples in dealing with their love lives in various loosely interrelated tales all set during a frantic month before Christmas in London, England.',
--                         7.6);

-- insert into Notflix.MovieGenres (MovieId, GenreId)
--     values(
-- 		(select id from Notflix.Movies where title = 'Love Actually'),
-- 		(select id from Notflix.Genres where name = 'Romantic Comedy')
--         );

