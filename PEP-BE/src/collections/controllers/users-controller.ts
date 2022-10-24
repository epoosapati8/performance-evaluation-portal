import UserService from '../services/users-service';
import ResponseStatus from '../../response-status';
import Controller from '../../commons/controller';
import { Request, Response, NextFunction } from 'express';

class UsersController extends Controller {
  constructor() {
    super();
  }
  /**
      @function createUser
      @param { object } req
      @param { object } res
      @param { object } next
      Function creates a user
    */
  public static async createUser(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['Users']
    /*    #swagger.parameters['obj'] = { 
                in: 'body',
                description: "Add a User",
                schema: { $ref: "#/definitions/AddUser" }
        } */
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    const { body } = req;
    try {
      const result: any = await UserService.createUser(body);
      /* #swagger.responses[201] = { 
                    description: 'User successfully created.',
                    schema: { $ref: "#/definitions/PostUserResponse" } 
        } */
      return ResponseStatus.created(res, result);
    } catch (error) {
      next(error);
    }
  }
  /**
    @function getUserById
    @param { object } req
    @param { object } res
    @param { object } next
    Function returns a user by Id.
  */
  public static async getUserById(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['Users']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    const {
      params: { userId }
    } = req;
    try {
      const result: any = await UserService.getUsersById(userId);
      /* #swagger.responses[200] = { 
                    description: 'User successfully obtained.',
                    schema: { $ref: "#/definitions/UserGetResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      next(error);
    }
  }
  /**
    @function getAllUsers
    @param { object } req
    @param { object } res
    Function returns all the users.
  */
  public static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['Users']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    try {
      const result: any = await UserService.getAllUsers();
      /* #swagger.responses[200] = { 
                    description: 'All users successfully obtained.',
                    schema: { $ref: "#/definitions/UserGetAllResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      next(error);
    }
  }
  /**
    @function updateUser
    @param { object } req
    @param { object } res
    Function updates a user
  */
  public static async updateUser(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['Users']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    const {
      body,
      params: { userId }
    } = req;
    try {
      const result: any = await UserService.updateUser(userId, body);
      /* #swagger.responses[200] = { 
                    description: 'User successfully updated.',
                    schema: { $ref: "#/definitions/UserUpdateResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      next(error);
    }
  }
  /**
    @function deleteUser
    @param { object } req
    @param { object } res
    Function deletes a user by id.
  */
  public static async deleteUser(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['Users']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    const {
      params: { userId }
    } = req;
    try {
      const result: any = await UserService.deleteUser(userId);
      /* #swagger.responses[202] = { 
                    description: 'User successfully deleted.',
                    schema: { $ref: "#/definitions/UserDeleteResponse" } 
        } */
      return ResponseStatus.deleted(res, result);
    } catch (error) {
      next(error);
    }
  }
  /**
      @function authenticateUser
      @param { object } req
      @param { object } res
      @param { object } next
      Function verifies the user
    */
  public static async authenticateUser(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['Authentication']
    const { body } = req;
    /*    #swagger.parameters['obj'] = { 
                in: 'body',
                description: "Enter Credentials",
                schema: { $ref: "#/definitions/Credentials" }
        } */
    try {
      const result: any = await UserService.authenticateUser(body);
      /* #swagger.responses[200] = { 
                    description: 'User successfully Authenticated.',
                    schema: { $ref: "#/definitions/AuthenticationResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      return ResponseStatus.unauthorized(res);
    }
  }
  /**
      @function googleAuthenticateUser
      @param { object } req
      @param { object } res
      @param { object } next
      Function verifies the user using google OAuth
    */
  public static async googleAuthenticateUser(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['Authentication']
    const { body } = req;
    try {
      const result: any = await UserService.googleAuthenticateUser(body);
      /* #swagger.responses[200] = { 
                    description: 'User successfully Authenticated.',
                    schema: { $ref: "#/definitions/AuthenticationResponse" } 
        } */
      return ResponseStatus.success(res, result);
    } catch (error) {
      return ResponseStatus.unauthorized(res);
    }
  }
  /**
      @function getNewToken
      @param { object } req
      @param { object } res
      @param { object } next
      Function create a new access token using refresh token
    */
  public static async getNewToken(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['Users']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    const {
      params: { user }
    } = req;
    try {
      const result: any = await UserService.getNewToken(user);
      /* #swagger.responses[201] = { 
                    description: 'New Token Obtained.',
                    schema: { $ref: "#/definitions/AccessTokenResponse" } 
        } */
      return ResponseStatus.created(res, result);
    } catch (error) {
      return ResponseStatus.unauthorized(res);
    }
  }
  /**
      @function changePassword
      @param { object } req
      @param { object } res
      @param { object } next
      Function changes the password.
    */
  public static async changePassword(req: Request, res: Response, next: NextFunction) {
    // #swagger.tags=['Users']
    /*  #swagger.parameters['authorization'] = {
                in: 'header',
                type: "string",
                description: "Bearer <token>"
        } */
    const {
      params: { tokenEmail },
      body
    } = req;
    try {
      const result: any = await UserService.changePassword(tokenEmail, body);
      /* #swagger.responses[201] = { 
                    description: 'Password successfully changed.',
                    schema: { $ref: "#/definitions/ChangePasswordResponse" } 
        } */
      return ResponseStatus.created(res, result);
    } catch (error) {
      return ResponseStatus.unauthorized(res);
    }
  }
}

export default UsersController;
