require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'matthewinnes42@gmail.com',
    // Go to Google Account > Security > 2-Step Verification > App Passwords
    pass: process.env.EMAIL_PASSWORD
  }
});

// API Routes
app.get('/api/projects', (req, res) => {
  // Sample project data - 
  const projects = [
    {
      id: 1,
      title: 'Trading Bot',
      description: 'Automated trading system',
      technologies: ['Python', 'React', 'Node.js'],
      image: '/images/trading-bot.jpg'
    },
  ];
  res.json(projects);
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  
  try {
    // Email options
    const mailOptions = {
      from: 'matthewinnes42@gmail.com',
      to: 'matthewinnes42@gmail.com',
      subject: `Portfolio Contact Form: Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    // Send confirmation email to the user
    const confirmationMailOptions = {
      from: 'matthewinnes42@gmail.com',
      to: email,
      subject: 'Thank you for contacting me',
      html: `
        <h2>Thank you for your message!</h2>
        <p>Dear ${name},</p>
        <p>I have received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Matthew Innes</p>
      `
    };

    await transporter.sendMail(confirmationMailOptions);
    
    res.json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again later.' 
    });
  }
});

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 