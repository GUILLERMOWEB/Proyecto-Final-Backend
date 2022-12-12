
const {Pinturas} = require("../models/factoryPicture")
const { validationResult } = require("express-validator")
const axios = require("axios")


const index = (req, res) => {
    res.status(200).send('Fabrica de Pinturas para el Hogar y Automóvil')
}

const consultaAxios = async(req, res) =>{
    try {
        const respuesta = await axios.get('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY')
        res.status(200).json({data: respuesta.data, status: respuesta.status})
    } catch (error) {
        res.status(500).json({error: 'Error al obtener tu producto desde la API'})
    }
}


const vistaUnicaDeProductos = async (req, res) => {

    const item = await Pinturas.findById(req.params.id)
    res.status(200).json({ item })
}


const crearProducto = async (req, res) => {
    try {
        const err = validationResult(req)
        if (err.isEmpty()) {
            const item = new Pinturas(req.body)
            await item.save()
            res.status(201).json({ item })
        } else {
            res.status(501).json({ err })
        }

    } catch (error) {
        res.status(501).json({ error })
    }
}

const editarProducto = async (req, res) => {
    try {
        const err = validationResult(req)
        if (err.isEmpty()) {
            await Pinturas.findByIdAndUpdate(req.params.id, req.body)
            res.status(201).json({ msg: "Se actualizó el producto" })
        } else {
            res.status(501).json({ err })
        }
    } catch (error) {
        res.status(501).json({ error })
    }
}

const eliminarProducto = async (req, res) => {
    const item = await Pinturas.findByIdAndDelete(req.params.id)
    res.status(201).json({ msg: "El Siguiente producto fue eliminado: ", item })

}


const verProducto = async (req, res) => {

    const items = await Pinturas.find()
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
const logout = (req, res)=>{
    res.clearCookie("personaEnSession")
    req.session.destroy()
    res.json({msg: "Se Cerro la Session"})
}


module.exports = {index,consultaAxios,verProducto,crearProducto,vistaUnicaDeProductos,editarProducto,eliminarProducto,crearSession,verCookie,eliminarCookie,verSession,cerrarSession,logout}