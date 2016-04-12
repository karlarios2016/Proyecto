function validar(){
    var txtCorreo = document.getElementById("txtEmail"),
        txtNom = document.getElementById("txtNombre"),
        txtTel = document.getElementById("txtTelef"),
        txtPswd=document.getElementById("txtPswd"),
        txtPswd2=document.getElementById("txtPswd2"),
        txtDir=document.getElementById("txtDireccion"),
        frmData = document.getElementById("frmData"),
        validated = true,
        errors = new Array();

    var emailPattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
        numericoPattern = /^\d+$/,
        notEmptyPattern = /\S+/;

    if(!emailPattern.test(txtCorreo.value)){
        validated = false;
        errors.push("Correo electrónico mal formado");
    }
    if(!notEmptyPattern.test(txtNom.value)){
        validated = false;
        errors.push("Nombre completo no puede ir vacío");
    }
    if(!notEmptyPattern.test(txtTel.value)){
        validated = false;
        errors.push("Telefono no debe ir vacio");
    }
    if(!notEmptyPattern.test(txtPswd.value)){
        validated = false;
        errors.push("Contraseña no puede ir vacía");
    }
    if(!numericoPattern.test(txtPswd2.value)){
        validated = false;
        errors.push("confirmacion de contraseña no puede contener letras");
    }
    if(!numericoPattern.test(txtTel.value)){
        validated = false;
        errors.push("Telefono no puede ir vacío");
    }
    var tmpllegada = Date.parse(diallegada.value);
    if(isNaN(tmpllegada)){
        validated = false;
        errors.push("La fecha de llegada no tiene el formato adecuado");
    }
    var tmpsalida = Date.parse(diasalida.value);
    if(isNaN(tmpsalida)){
        validated = false;
        errors.push("La fecha de salida no tiene el formato adecuado");
    }
    var stDate = new Date(tmpllegada);
    var enDate = new Date(tmpsalida);
    var compDate = enDate - stDate;
    if(compDate < 0){
        validated= false;
        errors.push("El dia de llegada no puede ser antes del dia de salida");
    }
    var curdate = new Date();
    var mday = curdate.getDate();
    if(tmpllegada>mday){
      validated=false;
      errors.push("La fecha de llegada no puede estar en el pasado");
    }
    if(cantPersonas>numhabitaciones){
      validated=false;
      errors.push("La cantidad de habitaciones no puede ser superior a la cantidad de personas");
    }
    if(!validated){
        var errorMsgs = errors.toString().replace(",","\n");
        alert(errorMsgs);
    }else {
        frmData.submit();
    }

}
