import express from 'express';
import nodemailer from 'nodemailer';
import Skill from '../models/Skill.js';
import Project from '../models/Project.js';
import Experience from '../models/Experience.js';
import Message from '../models/Message.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
router.get('/skills', async (req, res) => {
  try {
    const skills = await Skill.find({});
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a skill
// @route   POST /api/skills
// @access  Private
router.post('/skills', protect, async (req, res) => {
  const { name, icon, percentage, category } = req.body;
  try {
    const skill = new Skill({ name, icon, percentage, category });
    const createdSkill = await skill.save();
    res.status(201).json(createdSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update a skill
// @route   PUT /api/skills/:id
// @access  Private
router.put('/skills/:id', protect, async (req, res) => {
  const { name, icon, percentage, category } = req.body;
  try {
    const skill = await Skill.findById(req.params.id);
    if (skill) {
      skill.name = name ?? skill.name;
      skill.icon = icon ?? skill.icon;
      skill.percentage = percentage ?? skill.percentage;
      skill.category = category ?? skill.category;

      const updatedSkill = await skill.save();
      res.json(updatedSkill);
    } else {
      res.status(404).json({ message: 'Skill not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a skill
// @route   DELETE /api/skills/:id
// @access  Private
router.delete('/skills/:id', protect, async (req, res) => {
  try {
    const result = await Skill.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ message: 'Skill removed' });
    } else {
      res.status(404).json({ message: 'Skill not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private
router.post('/projects', protect, async (req, res) => {
  const { title, description, icon, github, live, features, techTags } = req.body;
  try {
    const project = new Project({ title, description, icon, github, live, features, techTags });
    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
router.put('/projects/:id', protect, async (req, res) => {
  const { title, description, icon, github, live, features, techTags } = req.body;
  try {
    const project = await Project.findById(req.params.id);
    if (project) {
      project.title = title ?? project.title;
      project.description = description ?? project.description;
      project.icon = icon ?? project.icon;
      project.github = github ?? project.github;
      project.live = live ?? project.live;
      project.features = features ?? project.features;
      project.techTags = techTags ?? project.techTags;

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
router.delete('/projects/:id', protect, async (req, res) => {
  try {
    const result = await Project.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get all experiences
// @route   GET /api/experience
// @access  Public
router.get('/experience', async (req, res) => {
  try {
    const experiences = await Experience.find({}).sort({ order: 1 });
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create an experience item
// @route   POST /api/experience
// @access  Private
router.post('/experience', protect, async (req, res) => {
  const { title, company, period, duties, order } = req.body;
  try {
    const exp = new Experience({ title, company, period, duties, order });
    const createdExp = await exp.save();
    res.status(201).json(createdExp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update an experience item
// @route   PUT /api/experience/:id
// @access  Private
router.put('/experience/:id', protect, async (req, res) => {
  const { title, company, period, duties, order } = req.body;
  try {
    const exp = await Experience.findById(req.params.id);
    if (exp) {
      exp.title = title ?? exp.title;
      exp.company = company ?? exp.company;
      exp.period = period ?? exp.period;
      exp.duties = duties ?? exp.duties;
      exp.order = order ?? exp.order;

      const updatedExp = await exp.save();
      res.json(updatedExp);
    } else {
      res.status(404).json({ message: 'Experience item not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete an experience item
// @route   DELETE /api/experience/:id
// @access  Private
router.delete('/experience/:id', protect, async (req, res) => {
  try {
    const result = await Experience.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ message: 'Experience removed' });
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
router.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }
  try {
    // 1. Save to MongoDB database
    const msg = new Message({ name, email, subject, message });
    const savedMsg = await msg.save();

    // 2. Forward email notification using Nodemailer if configured
    if (process.env.EMAIL_USER && process.env.EMAIL_USER !== 'your-email@gmail.com') {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST || 'smtp.gmail.com',
          port: Number(process.env.EMAIL_PORT) || 587,
          secure: process.env.EMAIL_PORT === '465',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: `"${name} via Portfolio" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_TO || 'axess293@gmail.com',
          replyTo: email,
          subject: `Portfolio Contact: ${subject || 'No Subject'}`,
          text: `You have received a new contact message on your MERN portfolio:\n\n` +
                `Name: ${name}\n` +
                `Email: ${email}\n` +
                `Subject: ${subject || 'None'}\n\n` +
                `Message:\n${message}`,
          html: `<div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">` +
                `<h2 style="color: #2563eb; margin-top: 0;">New Portfolio Contact</h2>` +
                `<p><strong>Name:</strong> ${name}</p>` +
                `<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>` +
                `<p><strong>Subject:</strong> ${subject || 'None'}</p>` +
                `<div style="margin-top: 15px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #2563eb; white-space: pre-wrap;">` +
                `${message}` +
                `</div>` +
                `</div>`
        };

        await transporter.sendMail(mailOptions);
        console.log('[MAIL] Notification email forwarded successfully.');
      } catch (mailError) {
        console.error('[MAIL] Failed to forward email notification:', mailError.message);
      }
    } else {
      console.log('[MAIL] Email forwarding skipped (Nodemailer config is empty or placeholder).');
    }

    res.status(201).json({ success: true, message: 'Message sent successfully!', data: savedMsg });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get all contact messages
// @route   GET /api/messages
// @access  Private
router.get('/messages', protect, async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private
router.delete('/messages/:id', protect, async (req, res) => {
  try {
    const result = await Message.findByIdAndDelete(req.params.id);
    if (result) {
      res.json({ message: 'Message deleted successfully' });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
