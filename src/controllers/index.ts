import { logger } from "../utils/logger";
import { Response, Request } from "express";
import WeatherQuery from "../services/WeatherService";


class RouteController {
   
    async post(req: Request, res: Response) {
        try {
           let query = await WeatherQuery.index(req.body);
            if (query) {
                res.setHeader('Content-Type', 'application/json').json(query)
            } else {
                res.status(404);
                res.end("City was not founded");
            }
        } catch (e: any) {
            logger.error(e.message);
            res.end()
        }
       
    }

}


export default new RouteController();
