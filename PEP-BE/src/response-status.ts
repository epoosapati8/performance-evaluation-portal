import { Response } from 'express';
const SUCCESS = 200;
const NO_CONTENT = 204;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT = 409;
const UNPROCESSABLE_ENTITY = 422;
const TOO_MANY_REQUESTS = 429;
const INTERNAL_SERVER_ERROR = 500;
const CREATED = 201;
const DELETE = 202;
class ResponseStatus {
  success(res: Response, data: string) {
    res.status(SUCCESS).send({
      status: 'SUCCESS',
      data
    });
  }
  created(res: Response, data: string) {
    res.status(CREATED).send({
      status: 'CREATED',
      data
    });
  }
  deleted(res: Response, data: string) {
    res.status(DELETE).send({
      status: 'DELETED',
      data
    });
  }
  error(res: Response, code?: any, message?: string, description?: string) {
    res.status(INTERNAL_SERVER_ERROR).send({
      status: 'ERROR',
      data: {
        error: {
          code,
          message,
          description
        }
      }
    });
  }
  unprocessableEntity(res: Response, code?: string, message?: string, description?: string) {
    res.status(UNPROCESSABLE_ENTITY).send({
      status: 'FAILURE',
      data: {
        error: {
          code,
          message,
          description
        }
      }
    });
  }
  badRequest(res: Response, code?: string, message?: string, description?: string) {
    res.status(BAD_REQUEST).send({
      status: 'FAILURE',
      data: {
        error: {
          code,
          message,
          description
        }
      }
    });
  }
  unauthorized(res: Response, code?: string, message?: string, description?: string) {
    res.status(UNAUTHORIZED).send({
      status: 'FAILURE',
      data: {
        error: {
          code,
          message,
          description
        }
      }
    });
  }
  conflict(res: Response, code?: string, message?: string, description?: string) {
    res.status(CONFLICT).send({
      status: 'FAILURE',
      data: {
        error: {
          code,
          message,
          description
        }
      }
    });
  }
  noContent(res: Response) {
    res.status(NO_CONTENT).send({});
  }
  notFound(res: Response, code?: string, message?: string, description?: string) {
    res.status(NOT_FOUND).send({
      status: 'FAILURE',
      data: {
        error: {
          code,
          message,
          description
        }
      }
    });
  }
  forbidden(res: Response, code?: string, message?: string, description?: string) {
    res.status(FORBIDDEN).send({
      status: 'FAILURE',
      data: {
        error: {
          code,
          message,
          description
        }
      }
    });
  }
  tooManyRequests(res: Response, code?: string, message?: string, description?: string) {
    res.status(TOO_MANY_REQUESTS).send({
      status: 'FAILURE',
      data: {
        error: {
          code,
          message,
          description
        }
      }
    });
  }
  failure(res: Response, code?: string, message?: string, description?: string) {
    res.status(NOT_FOUND).send({
      status: 'FAILURE',
      data: {
        error: {
          code,
          message,
          description
        }
      }
    });
  }
}
export default new ResponseStatus();
