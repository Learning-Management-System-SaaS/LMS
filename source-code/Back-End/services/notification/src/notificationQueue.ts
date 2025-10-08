
import { Queue, Worker} from "bullmq";
const queue = new Queue('Notification',{
    connection:{
        host:`localhost`,
        port:Number(process.env.PORT)
    }
})
// List of users to send Notifications to


const worker = new Worker('Notification', async (job) => {
    // Process each job here
    if(job.name === 'email'){
        // sending to email api
    }
    if(job.name === 'sms'){
        // sending to sms api
    }
    if(job.name === 'push'){
        // sending to push api
    }
}, 
);
worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed successfully`);
});

worker.on('failed', (job, err) => {
    console.log(`Job ${job?.id} failed with error: ${err.message}`);
});



export default queue