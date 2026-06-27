import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  duties: [{
    type: String,
  }],
  order: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

const Experience = mongoose.model('Experience', experienceSchema);
export default Experience;
