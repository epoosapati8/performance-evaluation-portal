import DAL_ERROR from '../../commons/dal-error';
import UserService from '../services/users-service';
import UserModel from '../models/users-model';
import * as bcrypt from 'bcrypt';
import { MongooseUpdateQuery, Document, ObjectId } from 'mongoose';
var mongoose = require('mongoose');
class Users {
  /**
    @function createUser
    @param { object } payload
    Function adds a User
  */
  public static async createUser(payload: any) {
    try {
      const result = await UserService.createPayload(payload);
      return result.save();
    } catch (error) {
      throw new DAL_ERROR(422, 'Unprocessable Entity');
    }
  }
  /**
    @function getUsersById
    @param { object } userId
    Function returns user's data by userId
  */
  public static async getUsersById(userId: any) {
    try {
      return await UserModel.findOne({ _id: userId, isDeleted: false, isActive: true }).populate(
        'details'
      );
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }

  /**
    @function getEmailById
    @param { object } userId
    Function returns email id by userId
  */
  public static async getEmailById(userId: any) {
    try {
      const result: any = await UserModel.findOne({
        details: userId,
        isDeleted: false,
        isActive: true
      });
      return result.email;
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }

  /**
    @function getAllUsers 
    Function to find all users.
  */
  public static async getAllUsers() {
    try {
      return await UserModel.find({ isDeleted: false, isActive: true });
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
  /**
    @function updateUser
    @param { object } userId
    @param { object } payload
    Function updates a user
  */
  public static async updateUser(
    userId: any,
    payload: MongooseUpdateQuery<Pick<Document, '_id'>>,
    saltRounds: any
  ) {
    try {
      const user: any = await UserModel.findByIdAndUpdate(userId, payload)
        .populate('details')
        .setOptions({
          new: true,
          overwrite: true
        });
      user.updatedAt = new Date();
      user.password = await bcrypt.hash(payload.password, saltRounds);
      return user.save();
    } catch (error) {
      throw new DAL_ERROR(422, 'Unprocessable entity');
    }
  }
  /**
    @function deleteUser
    @param { object } userId
    Function deletes a user
  */
  public static async deleteUser(userId: any) {
    try {
      const user: any = await UserModel.findById({ _id: userId });
      user.isDeleted = true;
      user.save();
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
  /**
    @function authenticateUser
    @param { object } payload
    Function verifies a User
  */
  public static async authenticateUser(payload: any) {
    try {
      const user: any = await UserModel.findOne({ email: payload.email.toLowerCase() }).populate(
        'details'
      );
      if (user === null) {
        throw new Error();
      }
      const match = await bcrypt.compare(payload.password, user.password);
      if (match) {
        return user;
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new DAL_ERROR(401, 'Unauthorized');
    }
  }
  /**
    @function getUserByEmail
    @param { object } email
    Function returns user's data by email
  */
  public static async getUserByEmail(email: any) {
    try {
      return await UserModel.findOne({ email, isDeleted: false, isActive: true }).populate(
        'details'
      );
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
  /**
    @function changePassword
    @param { object } email
    @param { object } newPassword
    Function changes the password.
  */
  public static async changePassword(email: any, payload: any, saltRounds) {
    try {
      const user: any = await this.getUserByEmail(email);
      if (user !== undefined) {
        const match = await bcrypt.compare(payload.oldPassword, user.password);
        if (match) {
          const newPassword = await bcrypt.hash(payload.newPassword, saltRounds);
          user.updatedAt = new Date();
          user.password = newPassword;
          return user.save();
        } else {
          throw new Error();
        }
      } else {
        throw new Error();
      }
    } catch (error) {
      throw new DAL_ERROR(401, 'Unauthorised');
    }
  }
  public static async getEmailByUserId(id: any) {
    try {
      const _id: any = mongoose.Types.ObjectId(id);
      const payload: any = await UserModel.findOne({
        details: _id
      });
      return payload.email;
    } catch (error) {
      throw new DAL_ERROR(400, 'Bad Request');
    }
  }
}
export default Users;
