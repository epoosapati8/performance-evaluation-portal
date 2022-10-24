/* eslint-disable no-unused-vars */
/* eslint-disable no-tabs */
import * as express from 'express';
import Locals from './locals';
import Http from '../middlewares/http';
import Views from '../middlewares/views';
import Routes from './routes';
class Express {
  public express: express.Application;
  static express: any;
  /**
   * Create the express object
   * Initializes the express server
   */
  constructor() {
    this.express = express();
    this.mountMiddlewares();
    this.mountDotEnv();
    this.mountRoutes();
  }
  private mountDotEnv(): void {
    this.express = Locals.init(this.express);
  }
  private mountMiddlewares(): void {
    this.express = Http.init(this.express);
    this.express = Views.init(this.express);
  }
  /**
   * Mounts all the defined routes
   */
  private mountRoutes(): void {
    this.express = Routes.mountApi(this.express);
  }

  /**
   * Starts the express server
   */
  public init(): any {
    const { port, url } = Locals.config();
    // Start the server on the specified port
    this.express.listen(port, () => {
      return console.log(`Server :: Running @ '${url}`);
    });
  }
}
/** Export the express module */
export default new Express();
