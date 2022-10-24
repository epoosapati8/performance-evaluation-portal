import UserDal from '../DAL/users-dal';
import UserModel from '../models/users-model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import Locals from '../../providers/locals';

const client = new OAuth2Client(Locals.config().gClientId);
const saltRounds = 10;

class UserService {
  /**
    @function createPayload
    @param { object } payload
    Function creates payload for adding a User
  */
  public static async createPayload(payload: { email: any; password: any; empId: any }) {
    const password = await bcrypt.hash(payload.password, saltRounds);
    return new UserModel({
      email: payload.email.toLowerCase(),
      details: payload.empId,
      password
    });
  }
  /**
    @function getUsersById
    @param { object } userId
    Function returns Users by id
  */
  public static async getUsersById(userId: any) {
    return UserDal.getUsersById(userId);
  }

  /**
    @function getEmailById
    @param { object } userId
    Function returns email id by user id
  */
  public static async getEmailById(userId: any) {
    return UserDal.getEmailById(userId);
  }

  /**
    @function createUser
    @param { object } body
    Function creates a new User
  */
  public static async createUser(body: any) {
    return UserDal.createUser(body);
  }
  /**
    @function getAllUsers
    Function gets all Users
  */
  public static async getAllUsers() {
    return UserDal.getAllUsers();
  }
  /**
    @function updateUser
    @param { object } userId    
    @param { object } payload
    Function updates a User
  */
  public static async updateUser(userId: any, payload: any) {
    return await UserDal.updateUser(userId, payload, saltRounds);
  }
  /**
    @function deleteUser
    @param { object } id
    Function DELETES a User by userId.
  */
  public static async deleteUser(userId: any) {
    return UserDal.deleteUser(userId);
  }
  /**
    @function authenticateUser
    @param { object } payload
    Function verifies a User
  */
  public static async authenticateUser(payload: any) {
    const user: any = await UserDal.authenticateUser(payload);

    if (user !== undefined) {
      const data = {
        email: user.email,
        role: user.details.role,
        empId: user.details.empId,
        name: user.details.name
      };
      const accessToken = await this.createToken(
        data,
        Locals.config().appSecret,
        Locals.config().jwtExpiresIn
      );
      const refreshToken = await this.createToken(
        data,
        Locals.config().refreshSecret,
        Locals.config().refreshExpiresIn
      );
      return { accessToken, refreshToken };
    } else {
      throw new Error();
    }
  }
  /**
    @function googleAuthenticateUser
    @param { object } payload
    Function verifies a User using google OAuth
  */
  public static async googleAuthenticateUser(payload: any) {
    const tokenId = payload.tokenId;
    const verifUser = client
      .verifyIdToken({
        idToken: tokenId,
        audience: Locals.config().gClientId
      })
      .then(async (response) => {
        const { email_verified, email } = response.getPayload();
        if (email_verified) {
          const user: any = await UserDal.getUserByEmail(email);
          if (user) {
            const data = {
              email: user.email,
              role: user.details.role,
              empId: user.details.empId,
              name: user.details.name
            };
            const accessToken = await this.createToken(
              data,
              Locals.config().appSecret,
              Locals.config().jwtExpiresIn
            );
            const refreshToken = await this.createToken(
              data,
              Locals.config().refreshSecret,
              Locals.config().refreshExpiresIn
            );
            return { accessToken, refreshToken };
          } else {
            throw new Error();
          }
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        throw new Error();
      });
    return verifUser;
  }
  /**
    @function getNewToken
    @param { object } payload
    Function creates a new token using refresh token
  */
  public static async getNewToken(payload: any) {
    const accessToken = await this.createToken(
      payload,
      Locals.config().appSecret,
      Locals.config().jwtExpiresIn
    );
    return { accessToken };
  }
  /**
    @function createToken
    @param { object } payload
    Function creates a new token
  */
  public static async createToken(payload: any, secret: any, time: any) {
    const token = jwt.sign(
      { email: payload.email, role: payload.role, empId: payload.empId, name: payload.name },
      secret,
      {
        expiresIn: time
      }
    );
    return token;
  }
  /**
    @function changePassword
    @param { object } payload
    Function changes the password.
  */
  public static async changePassword(email: any, payload: any) {
    return UserDal.changePassword(email, payload, saltRounds);
  }
  /**
    @function getEmailByUserId
    @param { object } id
    Function returns email by Id.
  */
  public static async getEmailByUserId(id: any) {
    return await UserDal.getEmailByUserId(id);
  }
}
export default UserService;
