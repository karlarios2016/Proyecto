var encargosStruct = require('./encargos.struct.js')

var EncargoModel = function(db){
    if(!(this instanceof EncargoModel)){
      console.log("NO fue llamado como instancia");
      return new EncargoModel(db);
    }
    this.encargoColl = db.collection('encargos');
};

EncargoModel.prototype.nuevoEncargo = function(data,handler){
  console.log(data);
  var newOrder = encargosStruct.usuario();
  newOrder.nombreCompleto= data.consName;
  newOrder.fechaEncargo = Date.now();
  newOrder.fechaEntrega= data.date;
  newOrder.correo = data.email;
  newOrder.encargo= data.order;
  newOrder.estado= "Pendiente";
  //newOrder.imagen= data.image;

  this.encargoColl.insertOne(newOrder,function(err, rslt){
    if(err){
      console.log(err);
      handler(err, null);
    }else{
      handler(null, rslt.insertedId);
    }
  });
}

  EncargoModel.prototype.getAllEncargos = function (handler){
      this.encargoColl.find({}).toArray(
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



module.exports = EncargoModel;
