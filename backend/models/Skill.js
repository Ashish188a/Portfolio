import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String, // Emoji or fontawesome class
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  category: {
    type: String,
    default: 'general',
  }
}, { timestamps: true });

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;
