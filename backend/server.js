const SQLite3 = require('sqlite3').verbose(); //Importa el módulo sqlite3 y habilita el modo "verbose" para obtener más detalles en los mensajes de error.

const express = require('express'); //Importa el módulo express, que es un framework para construir aplicaciones web en Node.js.
const app = express(); //App es una instancia de la clase express, que representa nuestra aplicación web.
const port = 3000; //port es el puerto que el servidor escuchará para recibir solicitudes.

//base de datos SQLite
const DBlite = new SQLite3.Database('./courgister.db', 
(err) => 
{
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
})
//Nota de recordatorios:
// "." en la ruta es una buena practica y indica que la base de datos está en el mismo directorio que el archivo server.js
//(err) es un parametro que se puede usar para manejar errores.
//"=>" forma de escribir funciones.


//Uso de json.
app.use(express.json()); //Middleware para parsear JSON en las solicitudes entrantes.

//Conexion directa.
const path = require('path');

app.use(express.static(path.join(__dirname, "../frontend")));


//===============================================================================================================================================
//Ruta GET para obtener todos los estudiantes.
app.get('/students', (request, response) => {
    DBlite.all('SELECT * FROM students', [], (error, rows) => 
    {
        if (error) {
            response.status(500).json({ error: error.message });
            return;
        }

        response.json(rows);
    });
});

//Cargar archivo HTML principal.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});


//Para visualizar un estudiante por ID
app.get('/students/:id', (req, res) => {
  const { id } = req.params;

  DBlite.get(
    'SELECT * FROM students WHERE id = ?',
    [id],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (!row) {
        return res.status(404).json({ error: "Estudiante no encontrado" });
      }

      res.json(row);
    }
  );
});

//request es lo que se envia del lado del cliente.
//response es lo que se envia del lado del servidor.

//DBlite.all(consulta, parametros, callback).

//error es un parametro que maneja mensajes de errores.
//response.status(500) establece el código de estado HTTP a 500 (Error Interno del Servidor) donde envia una respuesta JSON con el mensaje de error.

//rows solo es un nombre de variable que contiene los resultados de la consulta SQL.



//API REST es un conjunto de reglas que permiten la comunicación entre sistemas a través de HTTP.
//en este caso, el API REST es el Get y Post para manejar estudiantes.
//===============================================================================================================================================
//Ruta POST para agregar un nuevo estudiante.

app.post('/students', (request, response) => {
    const { name, email,  password } = request.body;

    if (!name || !email || !password) {
        response.status(400).json({ error: '[!] Faltan datos.' });
        return;
    }

    const sql = 'INSERT INTO students (name, email, password) VALUES (?, ?, ?)';

    DBlite.run(sql, [name, email, password], (error) => 
    {
        if (error) {
            response.status(500).json({ error: error.message });
            return;
        }

        response.status(201).json({ id: this.lastID, name, email, password });
    });
});
//===============================================================================================================================================
//Actualizar estudiante existente.
app.put('/students/:id', (request, response) => {
    const { id } = request.params;
    const { name, email, password } = request.body;

    DBlite.run("UPDATE students SET name = ?, email = ?, password = ? WHERE id = ?"
        , [name, email, password, id], (error) => 
    {
        if (error) {
            response.status(500).json({ error: error.message });
            return;
        }
        response.json({ message: 'Estudiante actualizado correctamente' });;
    });
});

//DBlite.run(consulta, parametros, callback).
//request.params es un objeto que contiene propiedades mapeadas a los parámetros de ruta.

//===============================================================================================================================================
app.delete('/students/:id', (request, response) => {
    const { id } = request.params;
    DBlite.run('DELETE FROM students WHERE id = ?', [id], function(error) {
        if (error) {
            response.status(500).json({ error: error.message });
            return;
        }
        response.json({ message: 'Estudiante eliminado correctamente' });
    });
});
//===============================================================================================================================================








//Crear tabla students si no existe.
DBlite.run(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP
  )` , (err) => 
{
  if (err) {
    console.error('Error creando la tabla:', err.message);
  } else {
    console.log('Tabla students creada o ya existe.');
  }
});







//Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

//listen es un método de la instancia de express que inicia el servidor.
//El primer parametro es el puerto.
//El segundo parametro es una función callback que se ejecuta cuando el servidor está listo. es como una notificación en terminos simples. 