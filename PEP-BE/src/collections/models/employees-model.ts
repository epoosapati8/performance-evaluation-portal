import { Schema, model } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      enum: ['employee', 'reportingManager', 'hr', 'hrManager', 'ceo'],
      required: true
    },
    yearOfJoining: {
      type: String,
      required: true
    },
    empId: {
      type: String,
      required: true
    },
    designation: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
employeeSchema.plugin(uniqueValidator, { message: 'is already taken.' });
export default model('employees', employeeSchema);
