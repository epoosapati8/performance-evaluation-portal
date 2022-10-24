import { Schema, model } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
const designationSchema = new Schema(
  {
    designation: {
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
    }
  },
  { timestamps: true }
);
export default model('Designation', designationSchema);
