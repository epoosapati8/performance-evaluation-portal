import { Schema, model } from 'mongoose';
const reportABugSchema = new Schema(
  {
    empId: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    page: {
      type: String,
      required: true
    },

    description: {
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
  {
    timestamps: true
  }
);
export default model('reportABug', reportABugSchema);
