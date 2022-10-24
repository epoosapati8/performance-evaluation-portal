import { Schema, model } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
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
    details: { type: Schema.Types.ObjectId, ref: 'employees', required: true }
  },
  { timestamps: true }
);
userSchema.plugin(uniqueValidator, { message: 'is already taken.' });
export default model('users', userSchema);
