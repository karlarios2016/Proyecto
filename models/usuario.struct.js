module.exports = {
    usuario : function(){
        return {
            "correo":"",
            "nombreCompleto":"",
            "contrasena":"",
            "fechaIngreso":0,
            "intentosFallidos":0,
            "estado":"ACT",
            "telefono":"",
            "direccion":""
          //  "fechaCambioContrasena":0,

          //  "ultimasContrasenas":[],

          //  "proyectos":[]
        };
    },
    proyecto : function(){
        return {"codigo":"","nombre":""};
    }
};