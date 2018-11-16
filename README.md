# movie-api
NodeJS Express &amp; MongoDB Movie API


Sample Node Techs.

Route | HTTP Verb | POST body | Description
api/movies | GET | Empty | List all movies
api/movies/:movie_id | GET | Empty | Movie detail page
api/movies | POST | {title:'foo',category:'bar'} | added movie
api/movies/:movie_id | PUT | {title:'foo',category:'bar'}  | change movie