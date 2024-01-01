import express, { Express } from 'express';
import cors from 'cors';

// Routes
import { 
    homeRouter, 
    docsRouter, 
    appetizersRouter, 
    spiritRouter, 
    flavorsRouter,
    ocassionsRouter,
    cocktailsRouter,
    recipesRouter,
    usersRouter,
    rolesRouter,
    commentsRouter,
    seoRouter,
    postsRouter,
    authRouter,
    seedRouter,
 } from '../routes';

// Data Base:
import { dbConnection } from '../database';


interface PathsProps {
    home            : string;
    docs            : string;
    appetizzers     : string;
    auth            : string;
    cocktails       : string;
    comments        : string;
    flavors         : string;
    occasions       : string;
    posts           : string;
    recipes         : string;
    roles           : string;
    search          : string;
    seed            : string; 
    seo             : string;             
    spirits         : string;
    users           : string;
}

export class Server {

    private app       : Express;
    private paths     : PathsProps;
    private port      : string;
    private whiteList : string[] = [
        'http://192.168.1.9:3000', 
        'http://localhost:3000'
    ];

    constructor() {

        this.app       = express();
        this.port      = process.env.PORT || '';
        this.paths     = {
            home            : '/',
            docs            : '/docs',
            appetizzers     : '/api/appetizers',
            auth            : '/api/auth' ,
            cocktails       : '/api/cocktails',
            comments        : '/api/comments',
            flavors         : '/api/flavors',
            occasions       : '/api/occasions',
            posts           : '/api/posts',
            recipes         : '/api/recipes',
            roles           : '/api/roles',
            search          : '/api/search',
            seed            : '/api/seed',
            seo             : '/api/seo',    
            spirits         : '/api/spirits',
            users           : '/api/users',
        }

        this.connectDB();
        this.middlewares();
        this.routes();

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server runing in port: ${ this.port }`);
        });
    }


    async connectDB() {
        await dbConnection();
    }

    private middlewares() {
        this.app.use(cors({ origin: this.whiteList, optionsSuccessStatus: 200 }));
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    private routes() {
        
        this.app.use(this.paths.home,             homeRouter);
        this.app.use(this.paths.docs,             docsRouter);
        this.app.use(this.paths.appetizzers,      appetizersRouter);
        this.app.use(this.paths.spirits,          spiritRouter);
        this.app.use(this.paths.flavors,          flavorsRouter);
        this.app.use(this.paths.occasions,        ocassionsRouter);
        this.app.use(this.paths.cocktails,        cocktailsRouter);
        this.app.use(this.paths.recipes,          recipesRouter);
        this.app.use(this.paths.users,            usersRouter);
        this.app.use(this.paths.roles,            rolesRouter);
        this.app.use(this.paths.comments,         commentsRouter);
        this.app.use(this.paths.seo,              seoRouter);
        this.app.use(this.paths.posts,            postsRouter);
        this.app.use(this.paths.auth,             authRouter);
        this.app.use(this.paths.seed,             seedRouter);
        
    }

    
}

export default Server;