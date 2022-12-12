

const express = require("express")
const router = express.Router()
const controller = require("../controllers/controller")
const authSession = require("../middlewares/authSession")
const authJWT = require("../middlewares/authJWT")
const { validarId } = require("../middlewares/validarId")
const {index,consultaAxios,verProducto,crearProducto,editarProducto, vistaUnicaDeProductos, eliminarProducto,crearSession,verCookie,eliminarCookie,verSession,cerrarSession,logout} = require("../controllers/indexController")
const auth = require("../middlewares/auth")
const { check } = require("express-validator")
const { validateId } = require("../middlewares/validateId")


// Metod GET
router.get('/', index)
router.get('/ver',verProducto)
router.get('/ver/:id', validarId, vistaUnicaDeProductos)
router.get('/crearsession', crearSession)
router.get('/versession',auth,verSession)
router.get('/cerrarsession', cerrarSession)
router.get('/vercookie', verCookie)
router.get('/eliminarcookie', eliminarCookie)
router.get('/asteroides',consultaAxios)

router.get("/allUsers",authSession,authJWT,controller.allUsers);
/* VER UNO */
router.get("/user/:id",authSession,authJWT,validateId,controller.user);

/* LOGOUT */
router.get("/logout", authSession, authJWT, controller.logout);

/* LOGS */
router.get("/logs", authSession, authJWT, controller.allLogs);

/* LOGS */
router.get("/log/:id", authSession, authJWT, controller.userLogs);


//Metodo POST
router.post('/crear', [
    check("fabricante").not().isEmpty().withMessage("El campo fabricante es requerido").isLength({ min: 2, max: 10 }).withMessage("El campo debe tener mas de 2 letras y menos de 10"),
    check("nombreComercial").not().isEmpty().withMessage("El campo Npmbre Comercial es requerido"),
    check("tipoDePintura").not().isEmpty().withMessage("El campo Tipo de Pintura es requerido"),
    check("cantidadDeLitros").not().isEmpty().withMessage("El campo cantidad de Litros es requerido"),
    check("color").not().isEmpty().withMessage("El campo Color es requerido"),
], crearProducto)

router.post("/newUser",[
      check("name").not().isEmpty().withMessage("Debes ingresar un nombre"),
      check("email")
        .not()
        .isEmpty()
        .withMessage("Debes ingresar un email")
        .isEmail()
        .withMessage("Debes ingresar un formato de email válido"),
      check("password")
        .not()
        .isEmpty()
        .withMessage("Debes ingresar una contraseña")
        .isLength({ min: 8, max: 15 })
        .withMessage("La contraseña debe contener entre 8 a 15 caracteres."),
    ],
    controller.newUser
  );
  /* LOGIN */
  router.post(
      "/login",
      [
        check("email")
          .not()
          .isEmpty()
          .withMessage("Debes ingresar un email")
          .isEmail()
          .withMessage("Debes ingresar un formato de email válido"),
        check("password")
          .not()
          .isEmpty()
          .withMessage("Debes ingresar una contraseña"),
      ],
      controller.login
    );
  

// Metodo PUT

router.put('/editar/:id', validarId, [
    check("fabricante").not().isEmpty().withMessage("El campo fabricante es requerido").isLength({ min: 2, max: 10 }).withMessage("El campo debe tener mas de 2 letras y menos de 10"),
    check("nombreComercial").not().isEmpty().withMessage("El campo Npmbre Comercial es requerido"),
    check("tipoDePintura").not().isEmpty().withMessage("El campo Tipo de Pintura es requerido"),
    check("cantidadDeLitros").not().isEmpty().withMessage("El campo cantidad de Litros es requerido"),
    check("color").not().isEmpty().withMessage("El campo Color es requerido"),
  
], editarProducto)

router.put("/editPassword/:id",authSession,authJWT,validateId,[check("password").not().isEmpty().withMessage("El campo esta vacio").isLength({ min: 8, max: 15 }).withMessage("La contraseña debe contener entre 8 a 15 letras."),
],controller.editPassword)


//Metodo DELETE

router.delete('/eliminar/:id', validarId, eliminarProducto)
router.delete('/logout',logout)
router.delete("/deleteUser/:id",authSession,authJWT,validateId,controller.deleteUser)


module.exports = router  


