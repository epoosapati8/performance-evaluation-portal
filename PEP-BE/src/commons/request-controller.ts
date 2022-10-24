import request from 'request';
import HTTPStatusError from './http-status-error';

const RequestController = {
  get: (url: any, headers = {}) => {
    return new Promise((resolve, reject) => {
      request.get(
        { url, headers, json: true },
        (
          error: any,
          response: { statusCode: number; body: { data: unknown } },
          body: { message: any }
        ) => {
          if (error) {
            return reject(error);
          }
          if (response.statusCode !== 200) {
            const message = body && body.message ? body.message : '';
            return reject(new HTTPStatusError(response.statusCode, message));
          }
          return resolve(response.body.data);
        }
      );
    });
  }
};

module.exports = RequestController;
