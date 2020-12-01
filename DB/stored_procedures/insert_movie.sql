alter PROCEDURE Notflix.insertMovie1Genre
	-- Add the parameters for the stored procedure here
	@title as varchar(50),
	@director  as varchar(50),
	@lengthInMinutes as int,
	@dateReleased as varchar(50),
	@synopsis  as varchar(250),
	@rating as real, 
	@Genre1 as varchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    select * from Notflix.Movies;
    select 'new';

	set dateformat dmy;

	-- if not exists (
    --     select count(*) 
    --     from Notflix.Genres 
    --     where name = @Genre1
    --     )
	-- 	begin 
    --         select 'is this running';
    --         insert into Notflix.Genres(name) values(@Genre1); 
    --     end


	insert into Notflix.Movies(title, director, lengthInMinutes, dateReleased, synopsis, rating)
    values(@title, @director, @lengthInMinutes, @dateReleased, @synopsis, @rating);

	insert into Notflix.MovieGenres (MovieId, GenreId)
    values(
		(select id from Notflix.Movies where title = @title),
		(select id from Notflix.Genres where name = @Genre1)
        );

	    select * from Notflix.Movies;

END
GO