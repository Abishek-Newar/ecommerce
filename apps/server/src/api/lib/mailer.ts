import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { env } from '../../infrastructure/env';

dotenv.config();

interface EmailOptions {
  email: any;
  OTP: any;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.MAILER_EMAIL,
    pass: env.MAILER_PASS,
  },
});

export async function sendEmail({ email, OTP }: EmailOptions): Promise<void> {
  try {

    const mailConfig = {
      from: env.MAILER_EMAIL,
      to: email,
      subject: 'PASSWORD RECOVERY',
      html: `<p>Give permission to change your BluOrn account password.
             Do not share the OTP with anyone.</p> 
            <p>Hello, ${email} your OTP valid for 10 minutes</p> 
            <p>Your OTP: ${OTP}</p>`,
    };

    const info = await transporter.sendMail(mailConfig);
    console.log('OTP sent:', info);
  } catch (error) {
    console.error('Error sending mail:', error);
    throw new Error('Failed to send OTP');
  }
}
