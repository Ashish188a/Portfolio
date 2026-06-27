import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String, // FontAwesome icon class, e.g., 'fas fa-home'
    default: 'fas fa-code',
  },
  github: {
    type: String,
    default: '#',
  },
  live: {
    type: String,
    default: '#',
  },
  features: [{
    type: String,
  }],
  techTags: [{
    type: String,
  }]
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;
