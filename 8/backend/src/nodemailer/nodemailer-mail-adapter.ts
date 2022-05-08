import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../services/mail-service";


const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2673c0c5a69a2b",
    pass: "f04a36d5e8549e"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail ({body,subject}: SendMailData) {
    transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Hanyel Chamon <hanyel.chamon@gmail.com',
    subject: subject,
    html: body,
  })
  };
}