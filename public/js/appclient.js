$("#page3").on("pagecreate",page3_onload);
//$("#page2").on("pagecreate", page2_onload);
$("#page5").on("pagecreate",page5_onload);
$("#page6").on("pagecreate",page6_onload);
//$("#page8").on("pagecreate",page7_onload);


function page3_onload(e){
  $("#btnNewUser").on("click", function(e){
  //  e.preventDefault();
//    e.stopPropagation();

    var query={};
    $("form").find("input").each(function(i,obj){
      var ip = $(obj);
      if(ip.attr("name")==="txtNombre"){
        query.txtNombre = ip.val();
      }
      if(ip.attr("name")==="txtEmail"){
        query.txtEmail = ip.val();
      }
      if(ip.attr("name")==="txtPswd"){
        query.txtPswd = ip.val();
      }
      if(ip.attr("name")==="txtTelef"){
        query.txtTelef = ip.val();
      }
      if(ip.attr("name")==="txtDireccion"){
        query.txtDireccion = ip.val();
      }
    });
    $.post(
      "/api/newuser",
      query,
      function(data,successtst,xhr){
        console.log(data);
      },
      "json"
    );
  });
}


function page5_onload(e){
  $("#btnUpload").on("click", function(e) {

  var query={};
  $("form").find("input").each(function(i,obj){

    var ip= $(obj);
    if(ip.attr("name")==="txtConsNombre"){
      query.txtConsNombre = ip.val();
    }
    if(ip.attr("name")==="txtConsCorreo"){
      query.txtConsCorreo = ip.val();
    }
    if(ip.attr("name")==="imagen"){
      query.imagen = ip.val();
    }
  });
 $("form").find("textarea").each(function(i,obj){
    var ip= $(obj);
    if(ip.attr("name")==="Caja"){
      query.Caja = ip.val();
    }
  });
  $.post(
    "/api/consulta",
    query,
    function(data,successtst,xhr){
      console.log(data);
    },
    "json"
  );
  });
}

var _pedidos = [];
var _selectedPedidoIdtId = "";
function page6_onload(e){
   cargarDocumentos();
  onListItem();
}

function onListItem(){
  $("#ListView").on("click","a",
 function(e){
   //e.preventDefault();
   //e.stopPropagation();
   var idClicked = $(this).data("id");
   _selectedPedidoId = idClicked;
   getSelectedPedido();
 }
);
}


  function cargarDocumentos(){
    $.get(
      '/api/obtenerconsulta',
      {},
      function(data,successtxt,xhr){
        console.log(data);
        var htmlstr = "";
        _pedidos = data;
        data.map(function(doc, index){
          htmlstr += '<li><a data-id="'+ doc._id +'" href="#page8">' + doc.correo + "</a></li>";
        });
        var lst = $("#ListView");
        lst.html(htmlstr);
        lst.listview("refresh");
        //console.log(data);
      },
      'json'
    );
  }

  function getSelectedPedido(){
    _pedidos.map(
      function(Consulta,index){
        if(Consulta._id === _selectedPedidoId){
          var htmlstr = "";
          htmlstr += "<div class ='box'> ";
          htmlstr += "<p>" + Consulta.nombreCompleto + "</p>";
          htmlstr += "<p>" + Consulta.correo+ "</p>";
          htmlstr += "<p>" + Consulta.Consulta+ "</p>";
          htmlstr += " '/div>" ;
          $("#page8").html(htmlstr);
        }
      }
    );
    _selectedPedidoId;
  }
/*function page2_onload(e){
  $("#btnLgnIn").find("input").each(Function(i,obj){
    console.log("entro aqui");
    var ip = $(obj);
    if(ip.attr("name")==="lgn_user"){
      query.lgn_user = ip.val();
    }
    if(ip.attr("name")==="lgn_pwd"){
      query.lgn_pwd = ip.val();
    }
    });
    $.post(
      "api/login",
      query,
      function (data,successtxt,xhr){
        console.log(data);
      },
      "json"
    );
  }*/
