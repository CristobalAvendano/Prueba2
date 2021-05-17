fn_ocultarEtiquetas();
fn_indicadores();
fn_clima();


/* FUNCION PARA OCULTAR ETIQUETAS DE ERRORES*/
function fn_ocultarEtiquetas() {

    $('#lbl_rut').hide();

    $('#lbl_nombre').hide();

    $('#lbl_apellidoPat').hide();

    $('#lbl_apellidoMat').hide();

    $('#lbl_correo').hide();

    $('#lbl_cuenta').hide();
}
/*VALIDACION NOMBRE*/
function fn_nombreVacio() {

    var nombre = $('#txt_nombre').val();

    if (nombre == "") {

        $('#lbl_nombre').show();

        $('#txt_nombre').addClass('is-invalid');

    } else {

        $('#lbl_nombre').hide();

        $('#txt_nombre').removeClass('is-invalid');

        $('#txt_nombre').addClass('is-valid');

    }
}
/*VALIDACION APELLIDO PATERNO*/
function fn_apellidoPatVacio() {

    var apellidoPat = $('#txt_apellidoPat').val();

    if (apellidoPat == "") {

        $('#lbl_apellidoPat').show();

        $('#txt_apellidoPat').addClass('is-invalid');

    } else {

        $('#lbl_apellidoPat').hide();

        $('#txt_apellidoPat').removeClass('is-invalid');

        $('#txt_apellidoPat').addClass('is-valid');

    }
}
/*VALIDACION APELLIDO MATERNO*/
function fn_apellidoMatVacio() {

    var apellidoMat = $('#txt_apellidoMat').val();

    if (apellidoMat == "") {

        $('#lbl_apellidoMat').show();

        $('#txt_apellidoMat').addClass('is-invalid');

    } else {

        $('#lbl_apellidoMat').hide();

        $('#txt_apellidoMat').removeClass('is-invalid');

        $('#txt_apellidoMat').addClass('is-valid');

    }
}
/* VALIDACION CORREO ELECTRONICO*/
function fn_correoVacio() {

    var correo = $('#txt_correo').val();

    if (correo == "") {

        $('#lbl_correo').show();

        $('#txt_correo').addClass('is-invalid');

    } else {

        $('#lbl_correo').hide();

        $('#txt_correo').removeClass('is-invalid');

        $('#txt_correo').addClass('is-valid');

    }
}
/* VALIDACION DEL CAMPO SELECCION TIPO DE CUENTA */
function fn_cuentaVacia() {

    var cuenta = $('#cmb_tipoCuenta option:selected').text();

    if (cuenta == '-- Seleccione --') {

        $('#lbl_cuenta').show();

        $('#cmb_tipoCuenta').addClass('is-invalid');

    } else {

        $('#lbl_cuenta').hide();

        $('#cmb_tipoCuenta').removeClass('is-invalid');

        $('#cmb_tipoCuenta').addClass('is-valid');

    }
}
/* FUNCION PARA LIMPIAR EL FORMULARIO */
function fn_limpiarForm() {
    $('#txt_rut').val("");
    $('#lbl_rut').hide();
    $('#txt_rut').removeClass('is-invalid');
    $('#txt_rut').removeClass('is-valid');

    $('#txt_nombre').val("");
    $('#lbl_nombre').hide();
    $('#txt_nombre').removeClass('is-invalid');
    $('#txt_nombre').removeClass('is-valid');

    $('#txt_apellidoPat').val("");
    $('#lbl_apellidoPat').hide();
    $('#txt_apellidoPat').removeClass('is-invalid');
    $('#txt_apellidoPat').removeClass('is-valid');

    $('#txt_apellidoMat').val("");
    $('#lbl_apellidoMat').hide();
    $('#txt_apellidoMat').removeClass('is-invalid');
    $('#txt_apellidoMat').removeClass('is-valid');

    $('#txt_correo').val("");
    $('#lbl_correo').hide();
    $('#txt_correo').removeClass('is-invalid');
    $('#txt_correo').removeClass('is-valid');

    $('#cmb_tipoCuenta').val("-- Seleccione --");
    $('#lbl_cuenta').hide();
    $('#cmb_tipoCuenta').removeClass('is-invalid');
    $('#cmb_tipoCuenta').removeClass('is-valid');

}
/* FUNCION PARA VALIDAR EL RUT USANDO API */
function fn_validarRut() {
    var rut = $('#txt_rut').val();

    $.getJSON('https://api.libreapi.cl/rut/validate' + '?rut=' + rut, function (data) {
        var validador = false;
        /*console.log(data)*/
        var respuesta = data;
        if (respuesta.status = "success" && respuesta.data.valid == true) {
            validador = respuesta.data.valid;
            validador = true;
            /*console.log(validador + ' ENTRE AL IF Y SOY VERDADERO ' + respuesta.data.valid);*/
        }
        else {
            validador = false;
            /*console.log(validador + ' ENTRE AL ELSE Y SOY FALSO ' + respuesta.data.valid);*/
        }

        if (validador == true) {
            /* console.log('label verde'); */
            $('#txt_rut').removeClass('is-invalid');
            $('#txt_rut').addClass('is-valid');
            $('#lbl_rut').hide();
            validador = true;
        }
        else if (validador == false) {
            /* console.log('label rojo'); */
            $('#lbl_rut').show();
            $('#txt_rut').removeClass('is-valid');
            $('#txt_rut').addClass('is-invalid');
            validador = false;
        }
        /* console.log(validador + ' SOY EL VALIDADOR DEL RUT')*/

        /* REDIRECCION A LA PAGINA DE INICIO CUANDO LOS DATOS INGRESADOS SON CORRECTOS */
        function fn_redireccion() {
            var segundos = 5;
            var rut = validador;
            var nombre = $('#txt_nombre').val();
            var apellidoPat = $('#txt_apellidoPat').val();
            var apellidoMat = $('#txt_apellidoMat').val();
            var correo = $('#txt_correo').val();
            var cuenta = $('#cmb_tipoCuenta option:selected').text();
            /*console.log(rut + ' SOY EL VALIDADOR DE REDIRECCION')*/
            var conteo = setInterval(function () {
                if (nombre != "" && apellidoPat != "" && apellidoMat != "" && correo != "" && rut == true && cuenta != "-- Seleccione --") {
                    $('#modalConteo').modal('show');
                    $("#txt_conteo").text('Seras redirigido al Inicio en ' + segundos + ' segundos');

                    if (segundos == 0) {
                        clearInterval(conteo);
                        window.open('index.html', "_self");
                    }
                    else if ($("#cancelarConteo").click(function () {
                        clearInterval(conteo);
                        $('#modalConteo').modal('hide');
                    }))
                        segundos--;
                }
            }, 1000);
        }
        fn_redireccion();

    }).fail(function () {
        $('#lbl_rut').show();
        $('#txt_rut').addClass('is-invalid');
    });

}


/* FUNCION PARA OBTENER LOS INDICADORES ECONOMICOS DE LA API*/
function fn_indicadores() {
    $.getJSON('https://api.libreapi.cl/economy/indicators', function (data) {
        var indicadores = data;


        $('#txt_indicadores').text('Indicadores Economicos:   Dolar: $' + indicadores.data.dolar + '   -    ' + 'Euro: $' + indicadores.data.euro + '   -    ' + 'UF: $' + Math.round(indicadores.data.uf));

    })
}
/* FUNCION PARA OBTENER EL CLIMA DE LA API (QUINTA NORMAL, RM)*/
function fn_clima() {
    $.getJSON('https://api.libreapi.cl/weather/stations', function (data) {
        var clima = data;

        $('#txt_clima').text('Temperatura actual: ' + clima.data[35].temperature + "°");
    })
}

