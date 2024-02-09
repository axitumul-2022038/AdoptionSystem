import mongoose from "mongoose"

const animalSchema = mongoose.Schema({
    nameAnimal:{
        type: String,
        required: true
    },
    species:{
        type: String,
        required: true
    },
    weight:{
        type: String,
        required:true
    },
    size:{
        type: String,
        required: true
    },
    age:{
        type: String,
        required: true
    },
    sex:{
        type: String,
        uppercase: true,
        enum: ['MACHO','HEMBRA'],
        required: true
    }
})

export default mongoose.model('animal', animalSchema)