$("#page3").on("pagecreate",page3_onload);
//$("#page2").on("pagecreate", page2_onload);
$("#page5").on("pagecreate",page5_onload);


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
