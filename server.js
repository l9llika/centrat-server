const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 3001;

// Body-parser middleware
app.use(bodyParser.json());

// CORS middleware
app.use(cors({
    origin: ['http://localhost:3000', 'https://centrat.ru'],  // Allow your front-end origins
    methods: ['GET', 'POST', 'OPTIONS'],  // Allow these methods
    allowedHeaders: ['Content-Type'],  // Allow these headers
    credentials: true,  // Include credentials (if needed)
}));

// Handle preflight (OPTIONS) requests
app.options('*', cors());  // Respond to preflight requests

// Main route to handle form submission
app.post('/submit-brief', (req, res) => {
    const formData = req.body;

    // Setup Nodemailer for sending email
    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.ru',
        port: 465,
        auth: {
            user: 'center-at-info@mail.ru',
            pass: 'BRpGeam2jHCedkgS2pQx'
        }
    });

    const mailOptions = {
        from: 'joanie8@ethereal.email',
        to: 'L9LLIKA@yandex.ru',
        subject: 'Survey Results',
        text: JSON.stringify(formData, null, 2),
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            // Return error response in JSON
            res.status(500).json({ message: 'Error sending email', error: error.toString() });
        } else {
            console.log('Email sent: ' + info.response);
            // Return success response in JSON
            res.status(200).json({ message: 'Email sent successfully', response: info.response });
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
