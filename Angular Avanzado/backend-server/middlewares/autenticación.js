//Requires 
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

// ============================================
// Verificar Token
// ============================================
exports.verificaToken = (req, res, next) => {

    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token no valido',
                errors: err
            });
        }

        req.usuario = decoded.usuario;

        next();
    });
};

// ============================================
// Verificar ADMIN_ROLE
// ============================================
exports.verificaADMIN_ROLE = (req, res, next) => {

    var usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: 'Token no valido - No es administrador',
            errors: { message: 'No es administrador, no puedes ejecutar esta acción' }
        });
    }
};

// ============================================
// Verificar ADMIN_ROLE o MismoUsario
// ============================================
exports.verificaADMIN_ROLE_o_MismoUsario = (req, res, next) => {

    var usuario = req.usuario;
    var id = req.params.id;

    if (usuario.role === 'ADMIN_ROLE' || usuario._id === id) {
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: 'Token no valido - No es administrador ni es el mismo usuario',
            errors: { message: 'No es administrador, no puedes ejecutar esta acción' }
        });
    }
};