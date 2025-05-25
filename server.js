import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';

// ES Module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'test@example.com',
    pass: process.env.EMAIL_PASS || 'testpassword'
  }
});

// Test project data
const projects = [
  {
    id: 1,
    title: "Trading Bot Platform",
    description: "An advanced trading bot that analyses historical price data, calculates technical indicators, and generates trading signals.",
    tags: ["React", "TypeScript", "Chart.js", "Technical Analysis"],
    image: "/assets/images/bot1.png",
    video: "/assets/videos/botvideo.mp4",
    liveLink: '/trading-bot',
    githubLink: 'https://github.com/MatthewRInnes/trading-bot',
    detailsLink: '/projects/trading-bot'
  },
  {
    id: 2,
    title: "Matthew's Clothing Store",
    description: "Matthew's Clothing is a premium fashion e-commerce website specialising in high-quality clothing and accessories.",
    tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    image: "/assets/images/clothestop1.png",
    video: "/assets/videos/Matthews's clothing.mp4",
    liveLink: 'https://example.com',
    githubLink: 'https://github.com/MatthewRInnes/mattsclothes',
    detailsLink: '/projects/clothing-store'
  }
];

// API Routes
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Send email (test mode)
    const mailOptions = {
      from: process.env.EMAIL_USER || 'test@example.com',
      to: process.env.ADMIN_EMAIL || 'admin@example.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `
    };

    // In test mode, just log the email
    console.log('Test Email would be sent:', mailOptions);

    // Send auto-response
    const autoResponseOptions = {
      from: process.env.EMAIL_USER || 'test@example.com',
      to: email,
      subject: 'Thank you for contacting Matthew Innes',
      text: `
        Dear ${name},

        Thank you for reaching out! I have received your message and will get back to you as soon as possible.

        Best regards,
        Matthew Innes
      `
    };

    // In test mode, just log the auto-response
    console.log('Test Auto-Response would be sent:', autoResponseOptions);

    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 