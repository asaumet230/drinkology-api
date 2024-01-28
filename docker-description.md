# Drinkology Server:

This is a versatile **Server**, dedicated to providing a wide array of cocktail recipes and appetizer ideas. Ideal for mixology enthusiasts and professionals alike, this server offers quick and reliable access to both classic and contemporary recipes, along with appetizer pairings. Perfect for exploring new mixtures and flavors, this server is an essential tool for enhancing your culinary and entertaining experiences.

This Docker image depends on two other images which are mongo:6.0 and mongo-express:1.0.0-alpha.4. 

## Install

Before using the image, you should create a `.env` file located in the same folder where you will create the `docker-compose.yaml` file, and configure it with values as shown in the following table.

### Environment variables

| Enviroment Variable | Value | Description |
| --- | --- | --- |
PORT             | 8080                   | Port where the app runs  |
SECRET_JWT_SEED  | Custom Sign JWT             | JSON Web 
DB_CNN  | mongodb://username:password@localhost:27017            | Mongo database connection path
EMAIL_USER | test@gmail.com | Google mail to send notifications  |
EMAIL_PASSWORD | **** | Google email Password   |
EMAIL_COMMENTS_NOTIFICATION | test2@gmail.com | Email where you receive the notifications, recommended that it is not the same as the one sent  |
APP_VERSION | 1.0.1 | App version   |
STAGE       | prod  | Diferent Stages of App "prod, dev, test etc..." |
MONGO_DB_NAME     | drinkology-database  | Data Base Name      |
MONGO_USERNAME     | userName  | Default user data base name                 |
MONGO_PASSWORD | Custom Password Value     | Custom Data Base Password       |
MONGO_DB_CNN | `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_DB_NAME}:27017`     | Mongo database connection string  |
EXPRESS_CONTAINER_NAME | mongo-express     | Express container name |

Once you have created the file `.env` and edited the environment variables, you should proceed to create the `docker-compose.yml` file as shown below.

### docker-compose.yml configuration

Below is how the docker-compose.yml file should be configured. In the app section where you specify the image `image:asaumet230/drinkology-server:tagname`, you must edit and select which image tagname you want to use.

```
version: '3'

services:

  db:
    image: mongo:6.0
    container_name: ${MONGO_DB_NAME}
    volumes:
      - drinkology-vol:/data/db
    ports:
      - 27017:27017
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_USERNAME}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASSWORD}
    command: ['--auth']

  mongo-express:
    depends_on:
      - db
    container_name: ${EXPRESS_CONTAINER_NAME}
    image: mongo-express:1.0.0-alpha.4
    ports:
      - 8081:8081
    restart: always
    environment:
      ME_CONFIG_BASICAUTH_USERNAME: ${MONGO_USERNAME}
      ME_CONFIG_BASICAUTH_PASSWORD: ${MONGO_PASSWORD}
      ME_CONFIG_MONGODB_ENABLE_ADMIN: true 
      ME_CONFIG_MONGODB_ADMINUSERNAME: ${MONGO_USERNAME}
      ME_CONFIG_MONGODB_ADMINPASSWORD: ${MONGO_PASSWORD}
      ME_CONFIG_MONGODB_SERVER: ${MONGO_DB_NAME}
  
  app:
    depends_on:
      - db

    image: asaumet230/drinkology-server:tagname
    volumes:
      - .:/app/
      - /app/node_modules

    container_name: drinkology-server
    ports:
     - ${PORT}:${PORT}
    restart: always
    environment:
      PORT: ${PORT}
      SECRET_JWT_SEED: ${SECRET_JWT_SEED}
      MONGO_DB_CNN: ${MONGO_DB_CNN}
      EMAIL_USER: ${EMAIL_USER}
      EMAIL_PASSWORD: ${EMAIL_PASSWORD}
      EMAIL_COMMENTS_NOTIFICATION: ${EMAIL_COMMENTS_NOTIFICATION}

volumes:
  drinkology-vol:
    external: false

```

You can also go to the repository where we show you how to be configured the docker-compose.yml, the following link will take you to the repository where you can see an example.

[docker-compose.yml](https://github.com/asaumet230/drinkology-api/blob/main/docker-compose.prod.yml)


## Usage

After having configured the environment variables and created the docker-compose.yml file, execute the command in the terminal located within the application's path:

```
docker-compose up -d 
```

- The -d, means **detached**

After completing these steps, you will find the server running at the path:

`http://localhost:${PORT}/api/`

Where ***PORT*** is the value you have assigned to this environment variable. If you access this path, you will see a screen displaying an *Access Denied* message, indicating that the server is functioning correctly.

### Populate the database with test information:

Before using this server, you should Make a request to the following endpoint: 

`http://localhost:${PORT}/api/seed` 

Which will add seed data to the server and allow you to use it without encountering errors.

Afterward, you can access the server's documentation at the following path: 

`http://localhost:${PORT}/api/doc`

Then you finish **Happy Coding!** :smile::clap::computer: