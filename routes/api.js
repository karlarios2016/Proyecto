var express = require('express');
//var path = require('path');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
var md5 = require('md5');
var multer = require('multer');
var regexpt = /^((image)|(video))\/\w*$/i;
//var fs = require('fs');
var upload = multer({dest:"public/img/",
                     limits:{
                         fileSize: (1024 * 1024 * 10)
                     },
                     fileFilter: function(req, file, cb){
                         if(regexpt.test(file.mimetype)){
                             cb(null, true);
                         }else{
                             cb(null, false);
                         }
                     }
                 });


router.post('/register', function(req,res){
        if(req.body.reg_pwd == req.body.reg_pwd_cnf){
            var newUser={
                user : req.body.reg_user,
                name : req.body.reg_name,
                created: Date.now(),
                password:"",
                failedTries : 0,
                lastlogin: 0,
                lastChangePassword:0,
                oldPasswords:[]
            };
            var saltedPassword = "";
            if(newUser.created % 2 === 0){
                saltedPassword = newUser.user.substring(0,3) + req.body.reg_pwd;
            }else{
                saltedPassword = req.body.reg_pwd + newUser.user.substring(0,3);
            }
            newUser.password = md5(saltedPassword);
            users.insertOne(newUser, function(err, result){
                if(err){
                    res.status(403).json({"error":err});
                }else{
                    res.status(200).json({"ok":true});
                }
            });
        }else{
            res.status(403).json({"error":"No validado"});
        }
