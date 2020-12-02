
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE Notflix.findUserForLogin
	
	@username as varchar(50), @password as varchar(50)
AS
BEGIN
	SET NOCOUNT ON;

	if 1 = (
	SELECT count(*) from Notflix.Customer 
	where username = @username AND password = @password
	)SELECT * from Notflix.Customer 
	where username = @username AND password = @password;
	else
		select 'no user found';
END
GO
