import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from '../config/db.js';

import Skill from '../models/Skill.js';
import Project from '../models/Project.js';
import Experience from '../models/Experience.js';
import Admin from '../models/Admin.js';
import Message from '../models/Message.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Skill.deleteMany();
    await Project.deleteMany();
    await Experience.deleteMany();
    await Admin.deleteMany();
    await Message.deleteMany();

    console.log('Database cleared.');

    // Seed Admin
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'adminpassword123';
    
    const admin = new Admin({ username, password });
    await admin.save();
    console.log(`Admin user created: username="${username}", password="${password}"`);

    // Seed Skills
    const skills = [
      { name: 'Java', icon: '☕', percentage: 80, category: 'Languages' },
      { name: 'Python', icon: '🐍', percentage: 85, category: 'Languages' },
      { name: 'Flask', icon: '🌶️', percentage: 80, category: 'Frameworks' },
      { name: 'MongoDB', icon: '🍃', percentage: 75, category: 'Databases' },
      { name: 'HTML & CSS', icon: '🌐', percentage: 70, category: 'Frontend' },
      { name: 'JavaScript', icon: '⚡', percentage: 65, category: 'Frontend' },
      { name: 'DSA', icon: '🧠', percentage: 78, category: 'General' },
      { name: 'REST APIs', icon: '🔗', percentage: 80, category: 'General' },
      { name: 'Git & GitHub', icon: '🐙', percentage: 72, category: 'General' },
    ];
    await Skill.insertMany(skills);
    console.log('Skills seeded.');

    // Seed Projects
    const projects = [
      {
        title: 'HomeSphere',
        description: 'A full-featured real estate platform enabling users to browse, list, and manage properties with a secure, scalable backend.',
        icon: 'fas fa-home',
        github: '#',
        live: '#',
        features: [
          'JWT-based user authentication & authorization',
          'Property listing with filters & search',
          'User dashboard with saved properties',
          'RESTful API with Flask'
        ],
        techTags: ['Flask', 'MongoDB', 'Python', 'REST API', 'JWT']
      }
    ];
    await Project.insertMany(projects);
    console.log('Projects seeded.');

    // Seed Experience
    const experiences = [
      {
        title: 'Backend Developer Intern',
        company: 'Vital Skills Internship',
        period: '2024',
        duties: [
          'Developed and maintained RESTful APIs using Flask for web applications',
          'Designed and managed MongoDB database schemas and queries',
          'Implemented user authentication and authorization with JWT',
          'Collaborated with frontend team to integrate backend services',
          'Participated in code reviews and followed best practices for clean, maintainable code',
          'Debugged and resolved backend issues to improve application performance'
        ],
        order: 0
      },
      {
        title: 'Diploma in Computer Science',
        company: 'Technical Education Institute',
        period: 'Completed',
        duties: [
          'Studied core computer science concepts: data structures, algorithms, OS, DBMS',
          'Built hands-on projects in Java and Python throughout the program',
          'Developed strong foundations in object-oriented programming'
        ],
        order: 1
      }
    ];
    await Experience.insertMany(experiences);
    console.log('Experience seeded.');

    console.log('Database Seeding Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedData();
