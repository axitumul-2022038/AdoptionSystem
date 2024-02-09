import express from "express";
import { testA, registerAnimal, updateAnimal } from "./animal.controller.js";

const api = express.Router()

api.get('/testA', testA)
api.post('/registerAnimal', registerAnimal)
api.post('/updateAnimal/:id', updateAnimal)

export default api