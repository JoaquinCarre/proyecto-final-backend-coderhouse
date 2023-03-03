import nodemailer from 'nodemailer';
import { logger } from '../logs/logger.js';

const nodemailerPass = process.env.NODEMAILER_PASS;

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'joa.carre21@gmail.com',
        pass: nodemailerPass
    }
});

export async function sendMail(subject, body, target) {
    const mailOptions = {
        from: 'Servidor Node.js',
        to: target,
        subject,
        html: body
    }
    try {
        await transporter.sendMail(mailOptions)
    } catch (err) {
        logger.error(`${err.message}`);
        const customError = new Error('Ups! Algo ha salido mal');
        next(customError);
    }
}