## RxChart Web Client

Web client that tracks resident's medicine use.
This should be used in conjunction with [RxChart Back-End Service](https://github.com/RyanNerd/rxchart-app)

### Quick Launch
Run the [RxChart Back-End Service](https://github.com/RyanNerd/rxchart-app) PHP service:

`php -S localhost:8082 -t public`

In the base directory where RxChart Web Client is located run:

`yarn start`

This will start a web page: `http://localhost:3000`

You will then be prompted to login with a user name and password.
The username and password is set on RxChart Back-End in the `.env` file.
