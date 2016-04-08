var express = require('express');
//var path = require('path');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var md5 = require('md5');
var multer = require('multer');
var regexpt = /^((image)|(video))\/\w*$/i;
var Usuarios = require('../models/usuarios.models.js');
//var fs = require('fs');
var upload = multer({
  dest: "public/img/",
  limits: {
    fileSize: (1024 * 1024 * 10)
  },
  fileFilter: function(req, file, cb) {
    if (regexpt.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

module.exports = function(db) {

var usuariosModel = new Usuarios(db);
router.post('/newuser', function(req, res, next) {
  var newUser = {
    "Cname": req.body.txtNombre,
    "email": req.body.txtEmail,
    "password": req.body.txtPswd,
    "phone": req.body.txtTelef,
    "addr": req.body.txtDireccion
  };
  usuariosModel.nuevoUsuario(newUser,
    function(err, id) {
      if (err) {
        res.status(500).json({
          "error": "No se pudo Guardar Usuario"
        });
      } else {
        //req.session.userid= id;
        res.status(200).json(id);
      }

    }
  );
});
return router;
};
