var consultasStruct = require('./consultas.struct.js')

var ConsultaModel = function(db){
    if(!(this instanceof ConsultaModel)){
      console.log("NO fue llamado como instancia");
      return new ConsultaModel(db);
    }
    this.consultaColl = db.collection('consultas');
};

ConsultaModel.prototype.nuevaConsulta = function(data,handler){
  console.log(data);
  var newRequest = consultasStruct.usuario();
  newRequest.nombreCompleto= data.consName;
  newRequest.fechaConsulta = Date.now();
  newRequest.correo = data.email;
  newRequest.Consulta= data.request;
  newRequest.imagen= data.image;

  this.consultaColl.insertOne(newRequest,function(err, rslt){
    if(err){
      console.log(err);
      handler(err, null);
    }else{
      handler(null, rslt.insertedId);
    }
  });
}

  ConsultaModel.prototype.getAllConsultas = function (handler){
      this.consultaColl.find({}).toArray(
        function(err, docs){
          if(err){
            console.log(err);
            handler(err, null);
          }else{
            handler(null, docs);
          }
        }
      );
    }



module.exports = ConsultaModel;
