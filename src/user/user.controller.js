'use strict' //Modo estricto

import User from './user.model.js'
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'

export const test = (req, res)=>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const register = async(req, res)=>{
    try{
        //Capturar el formulario (body)
        let data = req.body
        //Encriptar la contraseña
        data.password = await encrypt(data.password)
        //Asignar el rol por defecto
        data.role = 'CLIENT'
        //Guardar la información en la BD
        let user = new User(data)
        await user.save() //Guardar en la BD
        //Responder al usuario
        return res.send({message: `Registered successfully, can be logged with username ${user.username}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering user', err: err})
    }
}

export const login = async(req, res)=>{
    try{
        //Capturar los datos (body)
        let { username, password } = req.body
        //Validar que el usuario exista
        let user = await User.findOne({username}) //buscar un solo registro
        //Verifico que la contraseña coincida
        if(user && await checkPassword(password, user.password)){
            let loggedUser = {
                username: user.username,
                name: user.name,
                role: user.role
            }
            //Respondo al usuario
            return res.send({message: `Welcome ${loggedUser.name}`, loggedUser})
        }
        return res.status(404).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error to login'})
    }
}

export const update = async(req, res) => { // Datos generales (NO PASSWORD)
    try{
        // Obtener ID del usuario a ACTUALIZAR
        let { id } = req.params
        // Obtener los datos a ACTUALIZAR
        let data = req.body
        // Validar si data trae informacion
        let update = checkUpdate(data, id)
        if(!update) return res.status(400).send({message: 'Have submited some data that cannot be update'})
        // Validar si tiene permisos (tokenizacion)
        // Actualizar (BD)
        let updateUser = await User.findOneAndUpdate(
            {_id: id},  // ObjectID <- Hexadecimales (Hora sys, Version Mongo, llave privada...)
            data // Los datos que se van a actualizar
        )
        // Validar la actualizacion
        if(!updateUser) return res.status(401).send({message: 'User not found and '})
        // Respondo al usuario  
        return res.send({message: 'Update user', updateUser})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error updating account'})
    }
}

export const deleteU = async(req, res)=>{
    try {
        //Obtener el id
        let{id} = req.params
        //Vañodar si esta logeado y si es el mismo X NO lo vemos Hoy X
        //Eliminar( deleteOne / findOneAndDelete)
        let deleteUser = await User.findOneAndDelete({_id: id})
        //verificar que se eliminó
        if(!deleteUser) return res.status(404).send({message: 'Account not found and not delete'})
        //responder
        return res.send({message: `Acount with username ${deleteUser.username} deleted successfully`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error deleting account'})
        
    }
}