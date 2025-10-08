import { Router } from "express";
import webpush from 'web-push'
const router = Router()


router.get('/',(req,res)=>{
    res.send('hello from push')
})
router.post('/', (req, res) => {
    // Get subscription object from the client
    const subscription = req.body;

    // Create payload
    const payload = JSON.stringify({ title: 'Test Push Notification' });

    // Send push notification
    try{
        webpush.sendNotification(subscription, payload)
        res.status(201).json({ message: 'Push Notification Sent' })
    }catch(ex){
        console.error(ex,"push error")
    }
    // webpush.sendNotification(subscription, payload).catch(err => console.error(err));

    
});

export default router