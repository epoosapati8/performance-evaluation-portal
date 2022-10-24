import { Schema, model } from 'mongoose';
const perfEvalAnsSchema = new Schema(
  {
    email: {
      type: String
    },
    empId: {
      type: String,
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
    answers: {
      type: Array,
      required: true
    },
    projectName: {
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
export default model('perfevalanswers', perfEvalAnsSchema);
