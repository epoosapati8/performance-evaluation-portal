import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as uuid from 'uuid';
import Locals from '../providers/locals';
import { Application } from 'express';
import * as swaggerUi from 'swagger-ui-express';
var swaggerDocument = require('../../swagger.json');

class Http {
  static mount(_express: any): any {
    throw new Error('Method not implemented.');
  }
  public static init(_express: Application): Application {
    _express.use(
      bodyParser.urlencoded({
        extended: true
      })
    );
    _express.use(bodyParser.json());
    if (Locals.config().isCORSEnabled) {
      _express.use(cors());
    }
    _express.use((req, res, next) => {
      next();
    });
    const options = {
      swaggerOptions: {
        defaultModelsExpandDepth: -1
      }
    };
    _express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
    _express.use((request, response, next) => {
      let requestId: any = '';
      if (request.header('requestId')) {
        requestId = request.header('requestId');
      } else {
        requestId = uuid.v4();
      }
      response.setHeader('requestId', requestId);
      next();
    });
    return _express;
  }
}
export default Http;
