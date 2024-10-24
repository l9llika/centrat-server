const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import CORS
const nodemailer = require('nodemailer');
const app = express();
const port = 3001;

app.use(bodyParser.json());

// Use CORS middleware
app.use(cors({
    origin: ['http://localhost:3000', 'https://centrat.ru'] // Allow requests from your React app
}));

app.post('/submit-brief', (req, res) => {
    const formData = req.body;

    // Настройка Nodemailer для отправки письма
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'joanie8@ethereal.email',
            pass: 'PZXDbQVUCAQ1QRdd3R'
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
            // Возвращаем ошибку в формате JSON
            res.status(500).json({ message: 'Error sending email', error: error.toString() }); 
        } else {
            console.log('Email sent: ' + info.response);
            // Возвращаем успешный ответ в формате JSON
            res.status(200).json({ message: 'Email sent successfully', response: info.response });  
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});