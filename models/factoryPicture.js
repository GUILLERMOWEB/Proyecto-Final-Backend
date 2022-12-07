const mongoose = require("mongoose")

const Schema = mongoose.Schema

const pictureSchema = new Schema({

    fabricante:{
        type: String,
        required: true
    },
    nombreComercial: {
        type: String,
        required: true

    },
    tipoDePintura: {
        type: String,
        required: true

    },
    cantidadDeLitros:{
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true

    },
 
    hogar:{
        type: Boolean,
        required: true
    },
    automovil:{
        type: Boolean,
        required: true
    }
})

const Pinturas = mongoose.model('Pinturas', pictureSchema)
module.exports = {Pinturas}