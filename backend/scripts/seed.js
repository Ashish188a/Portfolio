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
      { name: 'GitHub', icon: '🐙', percentage: 85, category: 'General' },
      { name: 'JavaScript', icon: '⚡', percentage: 80, category: 'Languages' },
      { name: 'MongoDB', icon: '🍃', percentage: 80, category: 'Databases' },
      { name: 'Python', icon: '🐍', percentage: 85, category: 'Languages' },
      { name: 'Java', icon: '☕', percentage: 80, category: 'Languages' },
      { name: 'Flask', icon: '🌶️', percentage: 80, category: 'Frameworks' },
      { name: 'HTML & CSS', icon: '🌐', percentage: 70, category: 'Frontend' },
      { name: 'DSA', icon: '🧠', percentage: 78, category: 'General' },
      { name: 'REST APIs', icon: '🔗', percentage: 80, category: 'General' },
    ];
    await Skill.insertMany(skills);
    console.log('Skills seeded.');

    // Seed Projects
    const projects = [
      {
        title: 'Real-Time Chat App Backend',
        description: 'A secure backend-driven real-time chat application with robust user authentication, user profile management, and message routing.',
        icon: 'fas fa-comments',
        github: 'https://github.com/Ashish188a/Chat_App.git',
        live: '#',
        features: [
          'JWT & Cookie-based secure user authentication',
          'Secure password hashing using bcryptjs',
          'Media/avatar uploads integration via Cloudinary',
          'Message exchange database schema with MongoDB & Mongoose',
          'Modular REST API structure with Express'
        ],
        techTags: ['Node.js', 'Express', 'MongoDB', 'Cloudinary', 'JWT']
      },
      {
        title: 'NFT Market Place DApp',
        description: 'A decentralized marketplace application (DApp) enabling users to mint, buy, and sell NFTs via smart contracts.',
        icon: 'fas fa-store',
        github: 'https://github.com/Ashish188a/NFT.git',
        live: '#',
        features: [
          'Solidity smart contract (SimpleNFT.sol) for minting and ownership',
          'Decentralized token metadata and blockchain transactions',
          'Full-stack architecture integrating frontend client to backend server',
          'Intuitive web interface for viewing and trading digital assets'
        ],
        techTags: ['Solidity', 'Web3', 'React', 'Node.js', 'Express', 'Ethereum']
      }
    ];
    await Project.insertMany(projects);
    console.log('Projects seeded.');

    // Seed Experience
    const experiences = [
      {
        title: "Bachelor's Degree, Computer Science Engineering",
        company: "Cambridge Institute of Technology Ranchi",
        period: "2022 - 2026",
        duties: [
          "Attended Cambridge University of Technology",
          "Studied advanced topics in Computer Science Engineering, Software Architecture, and System Design",
          "Designed and implemented programming projects using JavaScript, Node.js, and MongoDB",
          "Engaged in collaborative development using GitHub for version control"
        ],
        order: 0
      },
      {
        title: "Backend Developer Intern",
        company: "Vital Skills Internship",
        period: "2024",
        duties: [
          "Developed and maintained RESTful APIs using Flask for web applications",
          "Designed and managed MongoDB database schemas and queries",
          "Implemented user authentication and authorization with JWT",
          "Collaborated with frontend team to integrate backend services",
          "Participated in code reviews and followed best practices for clean, maintainable code",
          "Debugged and resolved backend issues to improve application performance"
        ],
        order: 1
      },
      {
        title: "Diploma of Education, Computer Science Engineering",
        company: "Birla Institute of Technology, Mesra",
        period: "2017 - 2021",
        duties: [
          "Studied core computer science concepts: data structures, algorithms, OS, DBMS",
          "Built hands-on coding projects in Java and Python throughout the program",
          "Developed strong foundations in object-oriented programming"
        ],
        order: 2
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
