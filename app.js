const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Configura la conexión a la base de datos
const db = mysql.createConnection({
host: 'localhost', // Cambia esto por la dirección de tu servidor MySQL
user: 'root', // Cambia esto por tu nombre de usuario de MySQL
password: '', // Cambia esto por tu contraseña de MySQL
database: 'biblioteca' // Cambia esto por el nombre de tu base dedatos MySQL
});
// Conéctate a la base de datos
db.connect((err) => {
if (err) {
console.error('Error al conectar a la base de datos:', err);
throw err;
}
console.log('Conexión a la base de datos MySQL exitosa');
});
// Configura el middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(bodyParser.json());
// Sirve archivos estáticos desde la carpeta 'public'
app.use(express.static(__dirname));

// Ruta para registrar un préstamo de libro
app.post('/api/registrar_prestamo', (req, res) => {
const { nombre, titulo, fecha_prestamo, fecha_devolucion } = req.body;
// Inserta el préstamo en la base de datos
const sql = 'INSERT INTO prestamos (nombre, titulo, fecha_prestamo, fecha_devolucion) VALUES (?, ?, ?, ?)';
const values = [nombre, titulo, fecha_prestamo, fecha_devolucion];
db.query(sql, values, (err, result) => {
if (err) {
console.error('Error al registrar el préstamo:', err);
res.status(500).json({ success: false, message: 'Error al registrar el préstamo' });
} else {
console.log('Préstamo registrado con éxito');
res.status(200).json({ success: true, message: 'Préstamo registrado con éxito' });
}
});
});
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});

