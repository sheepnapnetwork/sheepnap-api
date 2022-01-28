import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

import indexRoutes from './routes/indexroutes';
import propertyRoutes from './routes/propertyroutes';

import compression from 'compression';
import cors from 'cors'; 

//TODO : Read dinamycally
import locationsFileData from './locations.json';
import Location from './models/Location';

import "reflect-metadata";
import { createConnection } from 'typeorm';
import { Property } from "./entity/Property";

class Server
{
    public app:express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config()
    {

        createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "postgres",
            database: "sheepnapdb",
            entities: [
                Property
            ],
            synchronize: true,
            logging: false
        }).then(connection => 
        {
            console.log("Connection to database is being stablished " + connection.name);   
        }).catch(error => console.log(error));

        this.initializedata();

        this.app.set('port', process.env.PORT || 3000);
        //middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        //this.app.use(express.urlencoded({ extended : false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    async initializedata()
    {
        //TODO : Locations by default
    }

    routes()
    {
        this.app.use(indexRoutes);
        this.app.use('/api/stay', propertyRoutes);
        this.app.use('/api/booken', propertyRoutes);
        this.app.use('/api/badge', propertyRoutes);
        this.app.use('/api/airdrop', propertyRoutes);   
        this.app.use('/api/landing', propertyRoutes);   
    }

    start()
    {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();