

const express = require("express")
const router = express.Router()
const { validarId } = require("../middlewares/validarId")


const {index,verProducto,crearProducto,editarProducto, vistaUnicaDeProductos, eliminarProducto,crearSession,verCookie,eliminarCookie,verSession,cerrarSession } = require("../controller/indexController")
const auth = require("../middlewares/auth")
const { check } = require("express-validator")


// Metod GET
router.get('/', index)
router.get('/ver',verProducto)
router.get('/ver/:id', validarId, vistaUnicaDeProductos)
router.get('/crearsession', crearSession)
router.get('/versession',auth,verSession)
router.get('/cerrarsession', cerrarSession)
router.get('/vercookie', verCookie)
router.get('/eliminarcookie', eliminarCookie)

//Metodo POST
router.post('/crear', [
    check("fabricante").not().isEmpty().withMessage("El campo fabricante es requerido").isLength({ min: 2, max: 10 }).withMessage("El campo debe tener mas de 2 letras y menos de 10"),
    check("nombreComercial").not().isEmpty().withMessage("El campo Npmbre Comercial es requerido"),
    check("tipoDePintura").not().isEmpty().withMessage("El campo Tipo de Pintura es requerido"),
    check("cantidadDeLitros").not().isEmpty().withMessage("El campo cantidad de Litros es requerido"),
    check("color").not().isEmpty().withMessage("El campo Color es requerido"),
], crearProducto)

// Metodo PUT

router.put('/editar/:id', validarId, [
    check("fabricante").not().isEmpty().withMessage("El campo fabricante es requerido").isLength({ min: 2, max: 10 }).withMessage("El campo debe tener mas de 2 letras y menos de 10"),
    check("nombreComercial").not().isEmpty().withMessage("El campo Npmbre Comercial es requerido"),
    check("tipoDePintura").not().isEmpty().withMessage("El campo Tipo de Pintura es requerido"),
    check("cantidadDeLitros").not().isEmpty().withMessage("El campo cantidad de Litros es requerido"),
    check("color").not().isEmpty().withMessage("El campo Color es requerido"),
  
], editarProducto)

//Metodo DELETE

router.delete('/eliminar/:id', validarId, eliminarProducto)


module.exports = router  


