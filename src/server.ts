import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

import indexRoutes from './routes/indexroutes';
import propertyRoutes from './routes/propertyroutes';
import bookenRoutes from './routes/bookenroutes';

import compression from 'compression';
import cors from 'cors'; 

import * as dotenv from 'dotenv';

//TODO : Read dinamycally

import "reflect-metadata";
import { createConnection } from 'typeorm';
import { Property } from "./entity/Property";
import { Booken } from './entity/Booken';

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
        dotenv.config();

        var sslActive : boolean = false;

        if(process.env.NODE_ENV == "production")
        {
            sslActive = true;
        }

        createConnection({
            type: "postgres",
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [
                Property,
                Booken
            ],
            synchronize: true,
            logging: false,
            extra: {
                rejectUnauthorized: false
           }
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
        this.app.use('/api/property', propertyRoutes);
        this.app.use('/api/booken', bookenRoutes); 
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