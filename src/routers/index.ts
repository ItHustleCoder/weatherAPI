import { Router } from "express";
import weatherRoutes from "./weather.router";

const routes = Router();
routes.use(weatherRoutes);


export default routes;