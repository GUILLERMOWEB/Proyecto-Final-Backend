
const { Pinturas} = require("../models/factoryPicture")
const validarId = async (req, res, next) => {
    try {
        const item = await Pinturas.findById(req.params.id)
        if (item !== null) {
            next()
        } else {
            res.status(500).json({ msg: "El ID es incorrecto" })
        }
    } catch (error) {
        res.status(500).json({ error })
    }


}
module.exports = { validarId }