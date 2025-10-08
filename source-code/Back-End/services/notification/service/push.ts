import webpush from 'web-push'
import { config } from 'dotenv';
config()

webpush.setVapidDetails(
    'som3a:mrsom3a8@gmail.com', 
    String(process.env.PUBLIC_KEY), 
    String(process.env.PRIVATE_KEY), 
  );
