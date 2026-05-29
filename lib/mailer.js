import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT || 587),
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
})

export async function sendEmail(to, subject, text) {
  if (!process.env.EMAIL || !process.env.PASS) {
    throw new Error('Email credentials are not configured')
  }

  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    text,
  })
}
