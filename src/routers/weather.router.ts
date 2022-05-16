import express  from "express";
import RouteController  from "../controllers/index";

const weatherRoute = express.Router();

weatherRoute.post("/", RouteController.post)



export default weatherRoute;