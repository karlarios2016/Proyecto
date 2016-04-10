$("#page3").on("pagecreate",page3_onload);
//$("#page2").on("pagecreate", page2_onload);
$("#page5").on("pagecreate", page5_onload);

var imagen;

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
    //e.preventDefault();
    //e.stopPropagation();
  //  if (query.design) {
      console.log("entro aqui");
        var formBody = new FormData();
        $.each(imagen, function(llave, valor) {
            formBody.append("imagen", valor);
        });
        formBody.append("nombre", query.txtConsNombre);
        formBody.append("email", query.txtConsCorreo);
        formBody.append("consulta", query.Caja);
        showLoading();
        $.ajax({
            url: "api/consulta",
            type: "POST",
            data: formBody,
            cache: false,
            dataType: 'json',
            processData: false,
            contentType: false,
            success: function(data, success, xhr) {
                $("#frm_upload").get()[0].reset();
                hideLoading();
                //change_page("backlogdetail");
            },
            error: function(xhr, fail, data) {
                hideLoading();
                alert("Error al subir consulta");
            }
        });
  //  } else {
    //    alert("Must select an evidence file!");
  //  }

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
