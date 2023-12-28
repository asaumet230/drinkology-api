# Drinkology API:

Is an API service that provide information to Drinkology project in the frontend, sending data in JSON format:

## Instructions to turn on local database

For run locally the data base you need:

1. docker file .yaml.
2. In the terminal, go to the folder that contains the project and run the following command:

`docker-compose up -d`

- The -d, means **detached**

3. The path to connect to the database through mongo compas is:

- Local Mongo DB URL: `mongodb://localhost:27017/drinkology-database`

## Setting environment variables:

Rename the file **.env.template** to **.env**

## Turn on the server:

- In development mode the command is: 

`npm run dev`

- In production mode the command is:

`npm start`


## Populate the database with test information:

Make a request to the end point: `http://localhost:3000/api/seed`


