## RxChart Web Client

Web client that tracks client's medicine intake. Currently, used at a homeless shelter,
but can be used by any organization within the [LICENSE agreement](LICENSE.txt).

This should be used in conjunction with [RxChart Back-End Service](https://github.com/RyanNerd/rxchart-app)

### Quick Launch
Run the [RxChart Back-End Service](https://github.com/RyanNerd/rxchart-app) PHP service:
See the .env-example to connect to a database. Use the RxChart.sql to create the backend database.
You will need to insert at least one user manually into the User table. In the base directory of the backend project
directory, run:

`php -S localhost:8082 -t public`

In the base directory where RxChart Web Client (this project) is located run:

`npm start`

This will start a web page: `http://localhost:3000`
