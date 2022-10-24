import { Schema, model } from 'mongoose';
const projectSchema = new Schema(
  {
    projectId: {
      type: String,
      unique: true,
      required: true
    },
    projectName: {
      type: String,
      required: true
    },
    managerId: {
      type: Schema.Types.ObjectId,
      ref: 'employees',
      required: true
    },
    hrId: {
      type: Schema.Types.ObjectId,
      ref: 'employees',
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
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
export default model('projects', projectSchema);
