import { Schema, model } from 'mongoose';
const scoreSheetAnsSchema = new Schema(
  {
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
    duration: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    feedback: {
      type: String
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
export default model('scoresheetanswers', scoreSheetAnsSchema);
