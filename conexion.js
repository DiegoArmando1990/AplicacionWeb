function registrarPrestamo() {
    
    // Obtener los valores del formulario
    const nombre = document.getElementById("nombre").value;
    const titulo = document.getElementById("titulo").value;
    const fechaPrestamo = document.getElementById("fecha_prestamo").value;
    const fechaDevolucion = document.getElementById("fecha_devolucion").value;
    
    // Realizar la conexión a la base de datos y enviar los datos
// Esto es un ejemplo simplificado y debe adaptarse a tu entorno de servidor ybase de datos.
// Aquí se asume que estás utilizando una API de servidor para la conexión ala base de datos.
    const data = {
        nombre: nombre,
        titulo: titulo,
        fecha_prestamo: fechaPrestamo,
        fecha_devolucion: fechaDevolucion
    };
    
    fetch('/api/registrar_prestamo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            // Mostrar un mensaje de éxito o error al usuario
            const mensajeDiv = document.getElementById("mensaje");
            if (result.success) {
                mensajeDiv.innerHTML = "Préstamo registrado exitosamente.";
            } else {
                mensajeDiv.innerHTML = "Error al registrar el préstamo.";
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
