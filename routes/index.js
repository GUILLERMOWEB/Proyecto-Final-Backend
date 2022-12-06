

const express = require("express")
const router = express.Router()
const { validarId } = require("../middlewares/validarId")


const {index,verMedicamento,crearMedicamento,editarMedicamento, vistaUnicaMedicamento, eliminarMedicamento,crearSession,verCookie,eliminarCookie,verSession,cerrarSession } = require("../controller/indexController")
const auth = require("../middlewares/auth")
const { check } = require("express-validator")


// Metod GET
router.get('/', index)
router.get('/ver',verMedicamento )
router.get('/ver/:id', validarId, vistaUnicaMedicamento)
router.get('/crearsession', crearSession)
router.get('/versession',auth,verSession)
router.get('/cerrarsession', cerrarSession)
router.get('/vercookie', verCookie)
router.get('/eliminarcookie', eliminarCookie)

//Metodo POST
router.post('/crear', [
    check("nombreComercial").not().isEmpty().withMessage("El campo Nombre Comercial es requerido").isLength({ min: 2, max: 10 }).withMessage("El campo debe tener mas de 2 letras y menos de 10"),
    check("nombreGenerico").not().isEmpty().withMessage("El campo Npmbre Genérico es requerido"),
    check("cantidadComprimidos").not().isEmpty().withMessage("El campo Cantidad de Comprimidos es requerido"),
    check("laboratorio").not().isEmpty().withMessage("El campo Laboratorio es requerido"),
    check("obraSocial").not().isEmpty().withMessage("El campo Obra Social es requerido"),
], crearMedicamento)

// Metodo PUT

router.put('/editar/:id', validarId, [
    check("nombreComercial").not().isEmpty().withMessage("El campo Nombre Comercial es requerido").isLength({ min: 2, max: 10 }).withMessage("El campo debe tener mas de 2 letras y menos de 10"),
    check("nombreGenerico").not().isEmpty().withMessage("El campo Npmbre Genérico es requerido"),
    check("cantidadComprimidos").not().isEmpty().withMessage("El campo Cantidad de Comprimidos es requerido"),
    check("laboratorio").not().isEmpty().withMessage("El campo Laboratorio es requerido"),
    check("obraSocial").not().isEmpty().withMessage("El campo Obra Social es requerido"),
  
], editarMedicamento)

//Metodo DELETE

router.delete('/eliminar/:id', validarId, eliminarMedicamento)


module.exports = router  


