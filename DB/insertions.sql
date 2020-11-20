

-- insert into Notflix.Customer (username, password)
--     values('emmalopez', 'test123');

-- insert into Notflix.Movies(title, director)
--     values('Mob City', 'The Other Guy');

-- alter table Notflix.Customer
-- add state varchar(50);

-- update Notflix.Customer 
-- set email = 'emma.lopez@principia.edu',
-- street = 'a new one'
-- where id = 1;

-- select * from Notflix.Customer;

-- EXEC Notflix.findUserForLogin 'emmalopez', 'test123';

-- exec Notflix.updateCustomerInfo
--     1, '29182 Ridgeview Dr', 'Laguna Niguel',
--     'NM', 'Emma', 'Lopez', 'emma.lopez@principia.edu';

EXEC Notflix.GetMovieById 1;
-- EXEC Notflix.updateCustomerInfo 
--     1, '29182 Ridgeview Dr', 'Laguna Niguel',
--      NM, Emma, Lopez, emma.lopez@principia.edu;