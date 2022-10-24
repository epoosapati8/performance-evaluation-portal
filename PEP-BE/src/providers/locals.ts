import * as path from 'path';
import * as dotenv from 'dotenv';
import { Application } from 'express';
class Locals {
  /*
   * Makes env configs available for your app
   * throughout the app's runtime
   */
  public static config(): any {
    dotenv.config({ path: path.join(__dirname, '../../.env') });
    const url = process.env.APP_URL || `http://localhost:${process.env.PORT}`;
    const port = process.env.PORT || 8000;
    const appSecret = process.env.APP_SECRET || 'This is your responsibility!';
    const refreshSecret = process.env.REFRESH_SECRET || 'This is your responsibility!!';
    const mongooseUrl = process.env.MONGOOSE_URL;
    const host = process.env.HOST || 'localhost';
    const name = process.env.APP_NAME;
    const year = new Date().getFullYear();
    const copyright = `Copyright ${year} ${name} | All Rights Reserved`;
    const company = process.env.COMPANY_NAME;
    const description = process.env.APP_DESCRIPTION;
    const isCORSEnabled = process.env.CORS_ENABLED || true;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '30m';
    const refreshExpiresIn = process.env.REFRESH_EXPIRES_IN || '1d';
    const apiPrefix = process.env.API_PREFIX || 'api';
    const logDays = process.env.LOG_DAYS || 10;
    const gClientId = process.env.GOOGLE_CLIENT_ID;
    return {
      appSecret,
      refreshSecret,
      apiPrefix,
      company,
      copyright,
      description,
      isCORSEnabled,
      jwtExpiresIn,
      refreshExpiresIn,
      logDays,
      mongooseUrl,
      name,
      port,
      url,
      host,
      gClientId
    };
  }
  /**
   * Injects your config to the app's locals
   */
  public static init(_express: Application): Application {
    _express.locals.app = this.config();
    return _express;
  }
}
export default Locals;
