import { Request, Response, NextFunction } from "express";
import { IncomingHttpHeaders } from 'http';
import { fetchHumidity } from "./api.service";
import dns from 'node:dns'




export const getHumidity = async (req: Request, res: Response, next: NextFunction) => {
    // TODO Move this check out to middleware in the router, not inside the controller
    console.log("In the fc")
    if(req.headers['x-forwarded-for']){
        const clientIP: String | String[] = req.headers['x-forwarded-for']
        try { 
            const dnsIP: string[] = await new Promise<string[]>((resolve, reject) =>
                dns.resolve4("hehe.no", (err, addresses) => {
                    if(err){
                        reject(err)
                    }else{
                    resolve(addresses)
                    }
                })
            )
            if (clientIP ===  dnsIP[0] || clientIP === "127.0.0.1"){
                // We usually cannot trust the headers of a client.
                // Knowing this app will be behind a load-balancer that wil authorize and remove this header, then append the right header based on the tcp-information, its fine.

                console.log("Right header :)")
                console.log(dnsIP)
                return res.status(200).json(fetchHumidity)

            }else{
                return res.status(403).send("Wrong Client-IP! Bad client 👿")
            }
        }
        catch (err){
            return res.status(503).send("Server overloaded, please wait")
            console.log("Error in DNS resolution")
        }
    }else{
        return res.status(403).send("Unauthorized")
    }





}