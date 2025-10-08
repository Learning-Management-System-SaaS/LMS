import nodemailer from 'nodemailer'
import { config } from 'dotenv'

config()
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port:587,
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    
    
})
// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error,'hena');
  } else {
    console.log("Server is ready to take our messages",success);
  }
});

export const sendMail = async(to:string,subject:string,message:string)=>{
    try {
        const mailOptions = {
          from: process.env.EMAIL_USER, // sender address
          to: to, // list of receivers
          subject: subject, // Subject line
          html: `<b>${message}</b>`, // html body
        };
    
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
      } catch (error) {
        console.error('Error sending email:', error);
        throw error;
      }
}
