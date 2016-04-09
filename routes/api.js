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

//-------------------------------------------Nuevo Usuario
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

//------------------------------------------------Login
/*router.post('/login', function(req,res){
        var useremail = req.body.lgn_user,
            password = req.body.lgn_pwd;

        usuarios.findOne({user:useremail},{fields:{_id:1,nombreCompleto:1,password:1,fechaIngreso:1}}, function(err, doc){
            if(err){
                res.status(401).json({"error":"Log In Failed"});
            }else{
                if(doc){
                    var saltedPassword="";

                    if(doc.fechaIngreso%2 ===0){
                        saltedPassword = doc.user.substring(1,5) + password;
                    }else{
                        saltedPassword = password + doc.fechaIngreso.substring(1,5);
                    }
                    if(doc.password === md5(saltedPassword)){
                        req.session.user = doc.user;
                        doc.password = "";
                        req.session.userDoc = doc;
                        users.updateOne({"_id":doc._id} );
                        res.status(200).json({"ok":true});
                    }else{
                        req.session.user = "";
                        req.session.userDoc = {};
                        users.updateOne({"_id":doc._id});
                        res.status(401).json({"error":"Log In Failed"});
                    }
                }else{
                    res.status(401).json({"error":"Log In Failed"});
                }
            }
        }
    });

//--------------------------------------------------------------logout
router.get('/logout', function(req, res){
       req.session.clear();
       res.status(200).json({"ok":true});
   });
*/

//---------------------------------------------upload
router.post("/upload",
             upload.single('imagen'),
             function(req,res){
                     if(req.file){
                         var query = {/*_id: new ObjectID(req.body.backlogid)*/};
                         usuario.updateOne(
                             query,
                             {"$push":{"design":("img/" + req.file.filename)}},
                             {w:1},
                             function(err,result){
                                 if(err){
                                     res.status(500).json({"error":err});
                                 }else{
                                     res.status(200).json({"path":("img/"+req.file.filename)});
                                 }
                             }
                         );
                     }else{
                         res.status(500).json({"error":"Filesize or Type Error"});
                     }
             });

return router;
};
