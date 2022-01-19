import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

import indexRoutes from './routes/indexroutes';
import propertyRoutes from './routes/propertyroutes';

import mongoose, { ConnectOptions, Schema, model } from 'mongoose';
import compression from 'compression';
import cors from 'cors'; 

//TODO : Read dinamycally
import locationsFileData from './locations.json';
import Location from './models/Location';

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
        const mongouri = 'mongodb://localhost:27017/database';

        mongoose.connect(process.env.MONGODB_URL || mongouri, {} as ConnectOptions)
        .then(db => console.log('MongoDatabase is Connected to ', db.connection.host))
        .catch(err => console.error(err));

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
        const locations = await Location.findOne();

        if(!locations)
        {
            //load from file
            console.log("Initialing locations data");
            locationsFileData.map((location: any) => 
            {
                console.log(location);
                const newLocation = new Location(
                { 
                    name : location['name']
                    ,geo : location['geo'] 
                });

                newLocation.save();
            });

            console.log("Done.");
        }
    }

    routes()
    {
        this.app.use(indexRoutes);
        this.app.use('/api/property', propertyRoutes);
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