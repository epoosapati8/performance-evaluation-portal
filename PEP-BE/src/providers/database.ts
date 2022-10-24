import * as mongoose from 'mongoose';
import Locals from './locals';

class Database {
  // Initialize your database pool
  static init: any;
  init() {
    const dsn = Locals.config().mongooseUrl;
    const options = { useNewUrlParser: true };
    var Promise = require('bluebird');
    Promise.promisifyAll(require('mongoose'));
    mongoose.connect(dsn, options, (error) => {
      if (error) {
        console.log(error);
        throw error;
      } else {
        console.info('connected to mongo server at: ' + dsn);
      }
    });
  }
}
export default new Database();
