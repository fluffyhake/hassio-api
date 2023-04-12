import express, { Express, Request, Response} from "express";
import dotenv from "dotenv";
import https from "https";
import { apiRouter } from "./externalApi/api.routes";


dotenv.config()



const app: Express = express()


const port: String = process.env.PORT || "8443"

// app.get('/hassio', (req: Request, res: Response) => { 
//     res.send('TESTING')
// })

app.use("/hassio/", apiRouter)

app.get('/', (req: Request, res: Response) => {
    res.send('Wrong Endpoint')
})

app.listen(port, () => {
    console.log(`Server is currently running at http://localhost:${port}`)

})

