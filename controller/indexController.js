
const {Pharm} = require("../models/medicamentos")
const { validationResult } = require("express-validator")

const index = (req, res) => {
    res.status(200).send('Bienvenidos a la farmacia del barrio')
}


const vistaUnicaMedicamento = async (req, res) => {

    const item = await Pharm.findById(req.params.id)
    res.status(200).json({ item })
}


const crearMedicamento = async (req, res) => {
    try {
        const err = validationResult(req)
        if (err.isEmpty()) {
            const item = new Pharm(req.body)
            await item.save()
            res.status(201).json({ item })
        } else {
            res.status(501).json({ err })
        }

    } catch (error) {
        res.status(501).json({ error })
    }
}

const editarMedicamento = async (req, res) => {
    try {
        const err = validationResult(req)
        if (err.isEmpty()) {
            await Pharm.findByIdAndUpdate(req.params.id, req.body)
            res.status(201).json({ msg: "Se actualizó el producto" })
        } else {
            res.status(501).json({ err })
        }


    } catch (error) {
        res.status(501).json({ error })
    }
}

const eliminarMedicamento = async (req, res) => {
    const item = await Pharm.findByIdAndDelete(req.params.id)
    res.status(201).json({ msg: "El Siguiente producto fue eliminado: ", item })

}


const verMedicamento = async (req, res) => {

    const items = await Pharm.find()
    res.status(200).json({ items })
}

const crearSession = (req, res) => {

    let persona = {
        nombre: "Guille",
        id: "12345",
        idioma: "Español"
    }
    res.cookie("personaEnSession",persona.id,{maxAge: 123000})//buscamos utilidad
    req.session.usuario = persona
    res.status(200).json(req.session.usuario)//buscamos unidad
}

const verCookie= (req, res)=>{
    res.json(req.cookies.personaEnSession)
}

const eliminarCookie=(req, res)=>{
    res.clearCookie("personaEnSession")
    res.json({msg: "Cookie Borrada"})
}

const verSession = (req, res) => {
    res.status(200).json(req.session)

}

const cerrarSession = (req, res) => {
    req.session.destroy()
    res.json({
        msg: "Sesion Cerrada"
    })
}



module.exports = {index,verMedicamento,crearMedicamento,vistaUnicaMedicamento,editarMedicamento,eliminarMedicamento,crearSession,verCookie,eliminarCookie,verSession,cerrarSession}