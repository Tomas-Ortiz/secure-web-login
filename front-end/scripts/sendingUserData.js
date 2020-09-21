function getCurrentDate() {
  return new Date().toLocaleDateString();
}

function login() {

  let email = $("#inputEmail").val();
  let contrasenia = $("#inputPassword").val();
  let fechaLogin = getCurrentDate().toString();

  const url = 'http://localhost:3000/api/login';

  const data = {
    email: email,
    contrasenia: contrasenia,
    fechaLogin: fechaLogin
  };

  let result = enviarDatosAjax(url, data, 'post');


  if (result.estado === 'ok') {
    return true;
  } else {
    $(".alert").show();
    return false;
  }

}

function register() {

  let nombreCompleto = $("#inputCreateName").val();
  let email = $("#inputCreateEmail").val();
  let contrasenia = $("#inputCreatePassword").val();
  let fechaCreado = getCurrentDate().toString();

  //retorna true si los datos ingresados son válidos y las contraseñas coinciden
  if (inputsAreValid()) {

    const url = 'http://localhost:3000/api/register';

    const data = {
      nombreCompleto: nombreCompleto,
      email: email,
      contrasenia: contrasenia,
      fechaCreado: fechaCreado
    };

    let resultado = enviarDatosAjax(url, data, 'post');

    if (resultado.estado === 'ok') {

      cleanRegistrationInputs();
      cleanInputsColors();

      $("#failureAlert").hide();
      $(".alertMessage").text("• Usuario registrado con éxito. Por favor, verifica el email enviado a tu correo para la confirmación de la cuenta.");
      $("#successAlert").show();

    } else {
      cleanPasswords();

      colorInput($("#inputCreateEmail"), "red");
      colorInput($("#inputCreatePassword"), "");
      colorInput($("#inputRepeatPassword"), "");

      $("#successAlert").hide();
      $(".alertMessage").text("• No se pudo registrar al usuario porque el email ingresado ya existe.");
      $("#failureAlert").show();
    }
  }
  return false;
}

function enviarDatosAjax(url, data, method) {

  let resultado = '';

  $.ajax({
    url: url,
    method: method,
    async: false,
    data: data,
    success: function (data) {
      resultado = data;
    },
    error: function (data) {
      resultado = data;
    }
  });
  return resultado;
}

