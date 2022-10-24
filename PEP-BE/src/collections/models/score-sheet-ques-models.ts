import { Schema, model } from 'mongoose';
const scoreSheetQuesSchema = new Schema(
  {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    year: {
      type: String,
      required: true
    },
    quarter: {
      type: String,
      enum: ['Q1', 'Q2', 'Q3', 'Q4'],
      required: true
    },
    questions: {
      type: Array,
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
  { timestamps: true, strict: false }
);
scoreSheetQuesSchema.index({ year: 1, quarter: 1 }, { unique: true });
export default model('scoresheetques', scoreSheetQuesSchema);
