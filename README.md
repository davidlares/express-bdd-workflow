## DavidBDD

 Desarollo de una API referencial bajo NodeJS y Express generator para la demostración de desarrollos orientados a comportamientos (test BDD).

 Consiste en un CRUD de objetos `peliculas` (en sus campos `titles` y `year`), protección de rutas bajo middlewares y una persistencia bajo una base de datos no relacional.

## BDD

 Primeramente deberás tener una aplicación creada en la plaforma de developers de FB y configurar el producto Facebook Login con sus  respectivos rutas Callbacks, tener Node.js y MongoDB instalados.

## Taxonomía

  POST: /movie 201
  crear una pelicula

  GET: /movie 200
  obtener todas las peliculas

  GET: /movie/:id 200
  obtener una sola pelicula

  PUT /movie/:id 200
  modificar una pelicula

  DELETE /movie/:id 400
  eliminar una pelicula

  POST /user 201
  crear un usuario

  GET /user/:id 200
  obtiene un usuario

  PUT /user/:id 200
  actualiza al usuario

  DELETE /user/:id 400
  elimina un usuario

  POST /auth 201
  token para usuario

## Dependencias

  - express -> Framework web minimalista de NodeJS.
  - mongoose -> ORM de bases de datos no relacionales.
  - mocha -> Framework para pruebas automizadas de forma sencilla y generar escenarios.
  - Chai as Promises -> generar espectativas en promesas.
  - SuperTest -> generar peticiones HTTP a la aplicación.

## Uso
  
  - npm start (servidor web)
  - npm test (pruebas BDD)

## Créditos
- [David E Lares S](https://twitter.com/@davidlares3)

## Licencia

[MIT](https://opensource.org/licenses/MIT)
