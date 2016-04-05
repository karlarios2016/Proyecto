$("#page_newUser").on("pagecreate",page_newUser_onload);

function page_newUser_onload(e){
  $("#btnNewUser").on("click", function(e){
    var query={};
    $("form").find("input").each(function(i,obj){
      var ip = $(obj);
      if(ip.attr("name")==="txtEmail"){
        query.txtEmail = ip.val();
      }
      if(ip.attr("name")==="txtPswd"){
        query.txtPswd = ip.val();
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
