const mongoose = require("mongoose")

const Schema = mongoose.Schema

const pharmaSchema = new Schema({

    nombreComercial: {
        type: String,
        required: true

    },
    nombreGenerico: {
        type: String,
        required: true

    },
    cantidadComprimidos:{
        type: Number,
        required: true
    },
    laboratorio:{
        type: String,
        required: true
    },
    obraSocial:{
        type: Boolean,
        required: true
    }
})

const Pharm = mongoose.model('Pharm', pharmaSchema)
module.exports = {Pharm}