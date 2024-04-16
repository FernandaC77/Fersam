<?php
// Recibir los datos del formulario
$nombre = $_POST['nombre'];
$telefono = $_POST['telefono'];
$email = $_POST['email'];
$mensaje = $_POST['mensaje'];

// Dirección de correo electrónico donde se enviará el formulario
$destinatario = 'ecastellucci@entreriossa.com';

// Asunto del correo electrónico
$asunto = 'Nuevo mensaje desde el formulario de contacto';

// Construir el cuerpo del correo electrónico
$cuerpo = "Nombre: $nombre\n";
$cuerpo .= "Teléfono: $telefono\n";
$cuerpo .= "Correo electrónico: $email\n";
$cuerpo .= "Mensaje:\n$mensaje\n";

// Enviar el correo electrónico
mail($destinatario, $asunto, $cuerpo);

// Redireccionar de vuelta a la página de contacto
header('Location: contacto.html');
?>
