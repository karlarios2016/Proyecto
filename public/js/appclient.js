$("#page3").on("pagecreate",page3_onload);

function page3_onload(e){
  $("#btnNewUser").on("click", function(e){
    e.preventDefault();
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
