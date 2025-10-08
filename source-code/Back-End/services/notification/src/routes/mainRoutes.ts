import { Application,Router } from "express";
import Email from './email';
import SMS from './sms';
import Push from './push'
import Test from './test'
const router = Router()

export default function (app:Application){
    app.use('/',Test)
    app.use('/notification/email',Email)
    app.use('/notification/sms',SMS)
    app.use('/notification/push',Push)
}