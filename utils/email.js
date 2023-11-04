const nodemailer = require('nodemailer');
const errorUtils = require("./error.utils");
const dotenv = require('dotenv');
dotenv.config();

exports.sendEmail = async (options) => {
    try {
        // 1) Create a transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SERVICE,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // check transporter
        transporter.verify((error, success) => {
            if (error) {
                console.log(error)
            } else {
                console.log('transporter is working')
            }
        })

        // 2) Define the email options
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: options.email,
            subject: options.subject,
            text: options.message,
        };

        // 3) Actually send the email
        await transporter.sendMail(mailOptions);
    } catch (error) {
        return next(errorUtils(500, 'There was an error from mail sender!'));
    }
}