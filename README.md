## BDD workflow

Development of a referential API using NodeJS and Express generator for demonstrating behavior-oriented development (BDD testing).

It consists of a CRUD of `movies` objects (in their `titles` and `year` fields), route protection using middleware, and persistence using a non-relational database.

## BDD

It is a practice focused on behavior-driven development.

In short, it benefits development in:

- Focus on what is important for the web application.
- Unlike TDD, the goal of BDD is Given => When => Then.
- Seek to simulate scenarios, explaining the following:

- Given such
- When a scenario does something
- Something happens.

## Taxonomy

POST: /movie 201
create a movie.

GET: /movie 200
get all movies.

GET: /movie/:id 200
get a single movie.

PUT /movie/:id 200
modify a movie.

DELETE /movie/:id 400
delete a movie.

POST /user 201
create a user.

GET /user/:id 200
get a user.

PUT /user/:id 200
updates the user

DELETE /user/:id 400
deletes a user

POST /auth 201
token for user

## Dependencies

- express -> Minimalist NodeJS web framework.
- mongoose -> ORM for non-relational databases.
- mocha -> Framework for simple automated testing and scenario generation.
- Chai as Promises -> generate expectations in promises.
- SuperTest -> generate HTTP requests to the application.
  
## Usage

  - npm start (web server)
  - npm test (BDD tests)

## Credits
[David Lares S](https://davidlares.com)

## License
[MIT](https://opensource.org/licenses/MIT)
