import express from 'express';
import db from '../config/db';
import { showError, showInfo } from '../utils/consoleUtil';
import ProductsRouter from '../routes/products'
import swaggerUI from 'swagger-ui-express';
import { swaggerSpec, swaggerUiOptions } from '../config/swagger';
import cors from 'cors';
import { ENV } from '../config/env';
import morgan from 'morgan'

class Server{
    public app: express.Application;
    public port: number;
    private severInstance: any;

    constructor(autoInit: boolean = true){
      this.app = express();
      this.port = 3000;
      if(autoInit){
        this.init();
      }
    }

    async init(){
      this.configure();
      this.configureRoutes();
      await this.connectDb();
    }

    async connectDb(){
      try {
        await db.authenticate();
        db.sync();
        // showInfo('[db] Connection has been established successfully.');
      } catch (error) {
        showError('[db] Unable to connect to the database:', error);
        console.log('Unable to connect to the database:');
      }
    }

    configure(){
      this.app.use(express.json());
      this.app.use(express.urlencoded({extended: false}));
      this.app.use(cors({
        origin: function(origin, callback){
          if(!origin) return callback(null, true);

          if(ENV.FRONTED_URL == origin){
            callback(null, true);
          }else{
            callback(new Error('Not allowed by CORS'));
          }
        }
      }));

      this.app.use(morgan("dev"))
    }

    configureRoutes(){
      this.app.use('/api/products', ProductsRouter);
      this.app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerSpec,swaggerUiOptions));
      this.app.get("/swagger.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
      });
      
    }

    start(callback: () => void){
      this.severInstance = this.app.listen(this.port, callback);
    }

    stop(callback: () => void){
      this.severInstance.close(callback);
    }
}


export default Server;