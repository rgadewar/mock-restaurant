# Mock-Restuarant
  ![License](https://img.shields.io/badge/License-MIT-blue.svg)

<p align="center">
  <img src="./public/images/cookiehero.png">
</p>

## Click the button to watch our walkthrough video on YouTube!
[![Watch the video](https://cdn-icons-png.flaticon.com/256/1384/1384060.png)](-)


  ## Table of Contents
  * [Description](#description)
  * [Requirements](#requirements)
  * [Usage](#usage)
  * [Contact-Info](#contact-info)
  * [Contributors](#contributors)
  * [Testing](#testing)
* [License](#license)

## Description
The purpose of this project was to create a mock restaurant that was functional and responsive to a user, serving as a great start for a potential business to begin advertising online order services. The project utilizes Node.js and Express.js to create a RESTful API that uses GET and POST routes for retrieving data, Express and Sequelize through MySQL for database functionality, and Handlebars.js as a template engine where our project lives. The video linked in this README.md demonstrates how our project functions when running and includes instructions on potential changes that can be made to create your own functioning restaurant business.

## Requirements
    bcrypt: ^5.1.0
    bootstrap: ^5.3.0
    connect-session-sequelize: ^7.1.7
    dotenv: ^16.3.1
    express: ^4.18.2
    express-handlebars: ^5.3.4
    express-session: ^1.17.3
    moment: ^2.29.4
    mysql2: ^3.5.2
    nodemon: ^3.0.1
    passport: ^0.6.0
    passport-local: ^1.0.0
    path: ^0.12.7
    sequelize: ^6.32.1

Click to download latest version of Insomnia:  
[![Download](https://insomnia.rest/images/insomnia-logo.svg)](https://insomnia.rest/download)
## Usage
Node, Handlebars.js, JSON, JavaScript
## Contact-Info
* Username: rgadewar (https://github.com/rgadewar/)
* Email: -
## Contributors
* Username: jakelipscomb (https://github.com/jakelipscomb/)
* Email: jlipscombtx95@gmail.com
* Username: RodolfoSL (https://github.com/RodolfoSL/)
* Email: -
* Username: khanadib21 (https://github.com/khanadib21/)
* Email: -
## Testing

To recreate this project, begin by cloning through:

    git clone https://github.com/rgadewar/mock-restaurant

To install required packages, run in terminal:

    npm i

Before running MySQL, make sure that a .env file is created with the following parameters filled out so that you can run the database:

    DB_HOST='localhost'
    DB_USER='root'
    DB_PASSWORD='*insert MySQL Password Here*'
    DB_NAME='mock_restaurant'
    SESSION_SECRET='your_session_secret'

Log into MySQL and run the command:

    source db/schema.sql;

Quit MySQL

To import client-side information, input in command line:

    node seeds/seed.js

Run application with

    npm start

Use Insomnia to run functionality tests.


## License
      This Project is using the MIT license.
