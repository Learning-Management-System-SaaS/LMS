import { Router } from "express";
// import queue from "../notificationQueue";
import { sendMail } from "../../service/email"; 
import { notificationDto } from "../../interfaces/_Dtos";
const router = Router()



router.post('/',async(req,res)=>{
    const { to, subject, message} = req.body as notificationDto ;
    if (!to || !subject || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        await sendMail(to, subject, message);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error sending email' });
    }
    // await queue.add('email', { to, subject, message });
    // res.send('success');
})

export default router

// const { to, subject, message } = req.body;
