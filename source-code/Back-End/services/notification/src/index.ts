import express,{Application} from 'express'
import mainRoutes from './routes/mainRoutes'
import { config } from 'dotenv'
const app:Application = express()
config()
app.use(express.json())
mainRoutes(app)

const port:number = Number(process.env.PORT) || 4000
app.listen(port,()=>{
    console.log(`conncted on port ${port} this is som3a`)
})
