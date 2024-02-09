import express from "express";
import { testA, registerAnimal, updateAnimal, deleteA } from "./animal.controller.js";

const api = express.Router()

api.get('/testA', testA)
api.post('/registerAnimal', registerAnimal)
api.post('/updateAnimal/:id', updateAnimal)
api.delete('/deleteA/:id', deleteA)

export default api