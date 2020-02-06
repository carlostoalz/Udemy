'use strict';

//Requires
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Usuario = require('../models/usuario');
var SEED = require('../config/config').SEED;

// Google
var CLIENT_ID = require('../config/config').CLIENT_ID;
var { OAuth2Client } = require('google-auth-library');
var client = new OAuth2Client(CLIENT_ID);

var app = express();

// ============================================
// Autenticación Google
// ============================================
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    // const userid = payload['sub'];
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    };
}

app.post('/google', async(req, res) => {

    var token = req.body.token;

    var googleUser = await verify(token)
        .catch(err => {
            return res.status(403).json({
                ok: false,
                mensaje: 'Token no válido',
                errors: err
            });
        });

    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (usuarioDB) {

            if (!usuarioDB.google) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Debe usar su autenticación normal'
                });
            } else {

                var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 });

                res.status(200).json({
                    ok: true,
                    usuario: usuarioDB,
                    token: token,
                    id: usuarioDB['_id']
                });
            }

        } else {

            //El usuario no existe hay que crearlo
            var usuario = new Usuario();
            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.password = ':)';

            usuario.save((err, usuarioDB) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al guardar usuario',
                        errors: err
                    });
                }

                var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 });

                res.status(200).json({
                    ok: true,
                    usuario: usuarioDB,
                    token: token,
                    id: ususarioDB['_id']
                });

            });
        }

    });
});

// ============================================
// Autenticación normal
// ============================================
app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({
            email: body['email']
        },
        (err, ususarioDB) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar usuario',
                    errors: err
                });
            }

            if (!ususarioDB) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Credenciales incorrectas - email',
                    errors: { message: 'Credenciales incorrectas - email' }
                });
            }

            if (!bcrypt.compareSync(body['password'], ususarioDB['password'])) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Credenciales incorrectas - password',
                    errors: { message: 'Credenciales incorrectas - password' }
                });
            }

            // Crear un token!!!
            ususarioDB['password'] = ':)';
            var token = jwt.sign({ usuario: ususarioDB }, SEED, { expiresIn: 14400 });

            res.status(200).json({
                ok: true,
                usuario: ususarioDB,
                token: token,
                id: ususarioDB['_id']
            });
        }
    );
});


module.exports = app;