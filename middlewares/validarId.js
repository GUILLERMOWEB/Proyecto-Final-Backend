
const { Pharm } = require("../models/medicamentos")
const validarId = async (req, res, next) => {
    try {
        const item = await Pharm.findById(req.params.id)
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