

-- insert into Notflix.Customer (username, password)
--     values('emmalopez', 'test123');

-- set dateformat DMY;

-- insert into Notflix.Movies(title, director, lengthInMinutes, dateReleased, synopsis, rating)
--    values('Love Actually', 'Richard Curtis', 135, convert(date, '11/14/2003', 101),
--                        'Follows the lives of eight very different couples in dealing with their love lives in various loosely interrelated tales all set during a frantic month before Christmas in London, England.',
--                         7.6);

-- insert into Notflix.MovieGenres (MovieId, GenreId)
--     values(
-- 		(select id from Notflix.Movies where title = 'Love Actually'),
-- 		(select id from Notflix.Genres where name = 'Romantic Comedy')
--         );



-- insert into Notflix.Genres(name)
--     values('Romantic Comedy');

-- select * from Notflix.Genres;

-- insert into Notflix.MovieGenres(MovieId, GenreId)
--     values(3, 3);


-- alter table Notflix.Movies
-- add dateReleased date;

-- update Notflix.Customer 
-- set email = 'emma.lopez@principia.edu',
-- street = 'a new one'
-- where id = 1;

-- select * from Notflix.Customer;

select * from Notflix.Movies where id = 3;

-- select * from Notflix.Genres;

-- declare @totalGenres int = (select count(*) from Notflix.MovieGenres where MovieId = 3);
-- declare @index int = 0;

-- while @index < @count
--  begin

declare @testid int;

declare mycursor CURSOR
    local static read_only forward_only
FOR
   select GenreId from Notflix.MovieGenres;

open mycursor
fetch next from mycursor into @testid
while @@FETCH_STATUS = 0

begin 

    select * from Notflix.Genres where id = @testid
    fetch next from mycursor into @testid

END

close mycursor

DEALLOCATE mycursor


--//////////////////////////////////////////////
-- these are the stored procedures


-- exec Notflix.insertMovie1Genre 'Love Actually', 'Richard Curtis', 135, '11/14/2003',
--                        'Follows the lives of eight very different couples in dealing with their love lives in various loosely interrelated tales all set during a frantic month before Christmas in London, England.',
--                         7.6, 'Romantic Comedy';


-- EXEC Notflix.findUserForLogin 'emmalopez', 'test123';

-- exec Notflix.updateCustomerInfo
--     1, '29182 Ridgeview Dr', 'Laguna Niguel',
--     'NM', 'Emma', 'Lopez', 'emma.lopez@principia.edu';

-- EXEC Notflix.GetMovieById 1;

-- EXEC Notflix.updateCustomerInfo 
--     1, '29182 Ridgeview Dr', 'Laguna Niguel',
--      NM, Emma, Lopez, emma.lopez@principia.edu;