'use strict'

import { checkUpdateAnimal } from '../utils/validator.js'
import Animal from './animal.model.js'

export const testA = (req, res)=>{
    console.log('test is running')
    return res.send({message: 'test is running'})
}

export const registerAnimal = async(req, res)=>{
    try{
        let data = req.body
        let animal = new Animal(data)
        await animal.save()
        return res.send({message: `Registered successfully ${animal.nameAnimal}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering animal', err: err})
    }
}

export const updateAnimal = async(req, res) =>{
    try {
        let { id } = req.params
        let data = req.body
        let update = checkUpdateAnimal(data, id)
        if(!update) return res.status(400).send({message: 'Have submited some data that cannot be update'})
        let updateAnimal = await Animal.findOneAndUpdate(
    {_id: id},
    data
    )
    if(!updateAnimal) return res.status(401).send({message: 'animal not found'})
    return res.send({message: 'Update Animal', updateAnimal})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error updating acoount'})
    }
}