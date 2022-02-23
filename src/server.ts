import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

import indexRoutes from './routes/indexroutes';
import propertyRoutes from './routes/propertyroutes';
import bookenRoutes from './routes/bookenroutes';
import waitlistRoutes from './routes/waitlistrouter';
import badgeRoutes from './routes/badgeroutes';


import approvalRequestRoutes from './routes/approvalrequestrouter';

import compression from 'compression';
import cors from 'cors'; 
import * as dotenv from 'dotenv';
import "reflect-metadata";

import { createConnection } from 'typeorm';
import { Property } from "./entity/Property";
import { PropertyImage } from './entity/PropertyImage';
import {RoomType} from './entity/RoomType';
import { Booken } from './entity/Booken';
import { Waitlist } from "./entity/Waitlist";
import { ApprovalRequest } from "./entity/ApprovalRequest";
import { Badge } from './entity/Badge';
import roomTyperoutes from './routes/roomTyperoutes';
import locationroutes from './routes/locationrouter';
import userroutes from './routes/userroutes';
import { User } from './entity/User';
import { Location } from './entity/Location';


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

        createConnection({
            type: "postgres",
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [
                Property,
                Booken,
                Waitlist,
                ApprovalRequest,
                Badge,
                PropertyImage,
                RoomType,
                User,
                Location
            ],
            synchronize: true,
            logging: false,
            extra:  process.env.NODE_ENV == "production" ? { 
                 ssl : {
                     rejectUnauthorized: false
                }
           } : {}
        })
        .then(connection => 
        {
            console.log("Connection to database is being stablished " + connection.name);
        })
        .catch(error => console.log(error));

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
        this.app.use('/api/waitlist', waitlistRoutes);
        this.app.use('/api/approvalrequest', approvalRequestRoutes);
        this.app.use('/api/badge', badgeRoutes);
        this.app.use('/api/roomType', roomTyperoutes);
        this.app.use('/api/location', locationroutes);
        this.app.use('/api/user', userroutes);
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