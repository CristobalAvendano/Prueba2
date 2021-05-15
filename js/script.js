fn_ocultarEtiquetas();
fn_indicadores();
fn_clima();

function fn_ocultarEtiquetas() {

    $('#lbl_rut').hide();

    $('#lbl_nombre').hide();

    $('#lbl_apellidoPat').hide();

    $('#lbl_apellidoMat').hide();

    $('#lbl_correo').hide();

    $('#lbl_cuenta').hide();
}

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

function fn_validarRut() {
    $.getJSON('https://api.libreapi.cl/rut/validate', function (data) {
        var validar = data.rut;
        console.log(data.rut)
        var rut = $('#txt_rut').val();

    })
}

function fn_indicadores() {
    $.getJSON('https://api.libreapi.cl/economy/indicators', function (data) {
        var indicadores = data;


        $('#txt_indicadores').text('Indicadores Economicos        Dolar: $' + indicadores.data.dolar + '   -    ' + 'Euro: $' + indicadores.data.euro + '   -    ' + 'UF: $' + indicadores.data.uf);

    })
}

function fn_clima() {
    $.getJSON('https://api.libreapi.cl/weather/stations', function (data) {
        var clima = data;

        $('#txt_clima').text('Temperatura actual: ' + clima.data[35].temperature + "°");



    })
}
