

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE Notflix.GetMoviesByGenre
	-- Add the parameters for the stored procedure here
	@genre1 as varchar(50),
	@genre2 as varchar(50),
	@genre3 as varchar(50)
AS
BEGIN
	SET NOCOUNT ON;

	select distinct Notflix.Movies.*
	from Notflix.Movies, Notflix.MovieGenres, Notflix.Genres

	where (Notflix.Movies.id = Notflix.MovieGenres.MovieId and 
		genres.id = @genre1 OR genres.id = @genre2 OR genres.id = @genre3);


END
GO
