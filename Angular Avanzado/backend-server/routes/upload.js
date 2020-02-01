'use strict';

//Requires 
var express = require('express');
const fileUpload = require('express-fileupload');
var fs = require('fs');

var Usuario = require('../models/usuario');
var Hospital = require('../models/hospital');
var Medico = require('../models/medico');

var app = express();

app.use(fileUpload());

app.put('/:tipo/:id', (req, res, next) => {

    var tipo = req.params.tipo;
    var id = req.params.id;

    // Tipos de colección 
    var tiposValidos = ['usuarios', 'hospitales', 'medicos'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo no válido',
            errors: { message: 'Los tipos válidos son ' + tiposValidos.join(', ') }
        });
    }

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No selecciono nada',
            errors: { message: 'Debe de seleccionar una imagen' }
        });
    }

    // Obtener nombre del archivo
    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Solo extensiones de imagen 
    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extensión no válida',
            errors: { message: 'Las extensiones validas son ' + extensionesValidas.join(', ') }
        });
    }

    // Nombre de archivo personalizado
    var nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extensionArchivo }`;

    //Mover el archivo del temporal a un path
    var path = `./uploads/${ tipo }/${ nombreArchivo }`;

    archivo.mv(path, err => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error moviendo archivo',
                errors: err
            });
        }

        subirPorTipo(tipo, id, nombreArchivo, res);
    });
});

function subirPorTipo(tipo, id, nombreArchivo, res) {

    switch (tipo) {
        case 'usuarios':

            Usuario.findById(id, (err, usuario) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error consultando usuario',
                        errors: err
                    });
                }

                var pathViejo = `./uploads/${ tipo }/${ usuario.img }`;

                //si existe, elimina la imagen anterior
                fs.exists(pathViejo, exists => {
                    if (exists) {
                        fs.unlink(pathViejo, (err) => {});
                    }
                });

                usuario.img = nombreArchivo

                usuario.save((err, usuarioActualizado) => {

                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            mensaje: 'Error actualizando usuario',
                            errors: err
                        });
                    }

                    usuarioActualizado.password = ':)';

                    return res.status(200).json({
                        ok: true,
                        mensaje: 'Imagen de usuario actualizada',
                        usuario: usuarioActualizado
                    });

                });

            });

            break;
        case 'hospitales':

            Hospital.findById(id, (err, hospital) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error consultando hospital',
                        errors: err
                    });
                }

                var pathViejo = `./uploads/${ tipo }/${ hospital.img }`;

                //si existe, elimina la imagen anterior
                fs.exists(pathViejo, exists => {
                    if (exists) {
                        fs.unlink(pathViejo, (err) => {});
                    }
                });

                hospital.img = nombreArchivo

                hospital.save((err, hospitalActualizado) => {

                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            mensaje: 'Error actualizando hospital',
                            errors: err
                        });
                    }

                    return res.status(200).json({
                        ok: true,
                        mensaje: 'Imagen de hospital actualizada',
                        hospital: hospitalActualizado
                    });

                });

            });

            break;
        case 'medicos':

            Medico.findById(id, (err, medico) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error consultando medico',
                        errors: err
                    });
                }

                var pathViejo = `./uploads/${ tipo }/${ medico.img }`;

                //si existe, elimina la imagen anterior
                fs.exists(pathViejo, exists => {
                    if (exists) {
                        fs.unlink(pathViejo, (err) => {});
                    }
                });

                medico.img = nombreArchivo

                medico.save((err, medicoActualizado) => {

                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            mensaje: 'Error actualizando medico',
                            errors: err
                        });
                    }

                    return res.status(200).json({
                        ok: true,
                        mensaje: 'Imagen de medico actualizada',
                        medico: medicoActualizado
                    });

                });

            });

            break;
    }
}

module.exports = app;