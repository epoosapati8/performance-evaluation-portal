import { Schema, model } from 'mongoose';
const projectsEmpSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'projects',
      required: true
    },
    empId: {
      type: Schema.Types.ObjectId,
      ref: 'employees',
      required: true
    },
    year: {
      type: String,
      required: true
    },
    quarter: {
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
export default model('projectsEmp', projectsEmpSchema);
