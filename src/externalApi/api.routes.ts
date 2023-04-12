import express from "express";


import { getHumidity } from "./api.controller";


export const apiRouter = express.Router();


apiRouter.get("/humidity", getHumidity)