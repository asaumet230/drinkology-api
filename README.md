# Drinkology Server:

This is a versatile **Server**, dedicated to providing a wide array of cocktail recipes and appetizer ideas. Ideal for mixology enthusiasts and professionals alike, this server offers quick and reliable access to both classic and contemporary recipes, along with appetizer pairings. Perfect for exploring new mixtures and flavors, this server is an essential tool for enhancing your culinary and entertaining experiences.

This repository features a Docker Hub image ready for use in the event that you do not need to edit the server functionalities. If this is the case, please visit the following link:

[Docker Image](https://hub.docker.com/repository/docker/asaumet230/drinkology-server/general)

Otherwise, if you perform a `git clone` or a `Fork` of the repository because you need to edit or change certain functionality, follow the steps below to set up the project.

## Install

The first thing you need to do is to clone or `Fork` the repository.

```
git clone https://github.com/asaumet230/drinkology-api.git

cd drinkology-api

npm install 
```

Once the dependencies are installed, you need to edit the ***.env.template*** file, rename it to ***.env***, and enter each of the environment variables to ensure the server functions correctly. As shown below.

# Environment variables

| Enviroment Variable | Value | Description |
| --- | --- | --- |
PORT             | 8080                   | Port where the app runs  |
SECRET_JWT_SEED  | Custom Sign JWT             | JSON Web 
DB_CNN  | mongodb://username:password@localhost:27017            | Mongo database connection path
EMAIL_USER | test@gmail.com | Google mail to send notifications  |
EMAIL_PASSWORD | **** | Google email Password   |
EMAIL_COMMENTS_NOTIFICATION | test2@gmail.com | Email where you receive the notifications, recommended that it is not the same as the one sent  |
APP_VERSION | 1.0.1 | App version   |
STAGE       | prod  | Diferent Stages of App "prod, dev, test etc...", we find this in the docker compose file `docker-compose.yml` |
MONGO_DB_NAME     | drinkology-database  | Data Base Name, we find this in the docker compose file `docker-compose.yml`                  |
MONGO_USERNAME     | userName  | Default user data base name, we find this in the docker compose file `docker-compose.yml`                  |
MONGO_PASSWORD | Custom Password Value     | Custom Data Base Password,  we find this in the docker compose file `docker-compose.yml`       |
MONGO_DB_CNN | `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_DB_NAME}:27017`     | Mongo database connection string,  we find this in the docker compose file `docker-compose.yml`       |
EXPRESS_CONTAINER_NAME | mongo-express     | Express container name,  we find this in the docker compose file `docker-compose.yml`       |


## Usage

After entering the environment variables, there are two ways to start the server, the first is by using the local image specified in the `docker-compose.yml` file, or the second is through ***npm***.

### Using Dockerfile 'Local Image or Hub Image':

In the first option, which involves using Docker images, there are two paths to follow. The first path is to rename the file ***docker-compose.dev.yml*** to ***docker-compose.yml*** or replace the contents of ***docker-compose.yml*** with those of ***docker-compose.dev.yml***, by doing this, you will use the local image configured in the `Dockerfile`. The second path is to use the image hosted on Docker Hub. To do this, you follow the same procedure we just mentioned, but with the ***docker-compose.prod.yml*** file. If you want more information about the image hosted on Docker Hub, please follow the link provided [Docker Image](https://hub.docker.com/repository/docker/asaumet230/drinkology-server/general). 
Afterwards, you can execute the following commands. If you are already inside the App directory, you can skip the "cd 'App path'" command:

```
cd drinkology-api

docker-compose up -d 
```

- The -d, means **detached**

### Using npm:

The second option, which involves using npm, is ideal if you need to modify any server functionality. To do this, first execute the following commands in the terminal located within the application's path. If you are already inside the App directory, you can skip the "cd 'App path'":

```
cd drinkology-api

docker-compose up -d 
```

It's very important for this option that you do not modify anything that is already coded in the ***docker-compose.yml*** file, nor should you replace it with what's contained in the ***docker-compose.dev.yml*** or ***docker-compose.prod.yml*** files. Then, you proceed to execute the following commands:

1. docker file .yaml.
2. In the terminal, go to the folder that contains the project and run the following command:

```
npm run tsc-dev

npm run dev
```

These commands will create the `dist` folder. The first command starts the TypeScript transpiler and copies the files from the 'public' folder, transpiling all the content from the root `src` folder to the `dist` folder. The second command runs nodemon to start the server and automatically restart it when you make changes. There is also the `npm start` command, which runs Node.js, but it won't allow you to see real-time changes since it's intended for production. You would need to turn the server off and on again to see the changes.


After completing these steps, you will find the server running at the path:

`http://localhost:${PORT}/api/`

Where ***PORT*** is the value you have assigned to this environment variable. If you access this path, you will see a screen displaying an *Access Denied* message, indicating that the server is functioning correctly.

### Populate the database with test information:

Before using this server, you should Make a request to the following endpoint: 

`http://localhost:${PORT}/api/seed` 

Which will add seed data to the server and allow you to use it without encountering errors.



Afterward, you can access the server's documentation at the following path: 

`http://localhost:${PORT}/api/doc`.

### Edit the design and information on the server documentation pages

To edit those pages follow these steps, in the terminal Navigate to the directory where your application is located and run the following commands:

```
cd drinkology-api

npm run tailwind
```

The first command is used to change to the directory where your application is located, and the second one starts the Tailwind CSS compiler. After running these commands, you can edit or modify the design of all the **.html** files located in the public folder of the repository using Tailwind CSS, CSS, or HTML.

Once you have finished editing or changing the design, you should run the following command in the terminal. If you already have it running, you can stop it and then start it again. Please note that to see the changes in real-time, you may need to use plugins like Live Server if you are using Visual Studio Code or a similar feature in your code editor.

```
npm run tsc-dev
```

Then you finish **Happy Coding!** :smile::clap::computer: