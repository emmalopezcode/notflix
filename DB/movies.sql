insert into Notflix.Movies(title, director, lengthInMinutes, dateReleased, synopsis, rating, imagePath, playback)
   values('Lincoln', 'Steven Spielberg', 150, convert(date, '11/16/2012', 101),
                       'As the American Civil War continues to rage, the 16th American president struggles with continuing carnage on the battlefield as he fights with many inside his own cabinet on the decision to emancipate the slaves.',
                        7.3, 'lincoln.jpg', '');

exec Notflix.addGenre 'Biographical', 'Lincoln';
exec Notflix.addGenre 'Drama', 'Lincoln';


