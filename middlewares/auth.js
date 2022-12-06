module.exports = (req, res, next)=>{
    if (!req.session.usuario) {
        res.json({
            msg: "No estas en sesion "
        })

    } else {
        next()
    }
}