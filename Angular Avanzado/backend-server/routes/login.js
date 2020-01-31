'use strict';

//Requires
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Usuario = require('../models/usuario');
var SEED = require('../config/config').SEED;

var app = express();

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