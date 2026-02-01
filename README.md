Courgister es un sitio web que permite visualizar y registrar alumnos que hayan entrado a un curso.
server.js se encarga de la creación de la base de datos en caso no exista. Tiene los métodos HTTP (GET, POST, PUT, DELETE), permitiendo
obtener, guardar, cambiar y eliminar datos. Utiliza JSON para tener la lista de datos de manera estructurada.
El desarrollo del frontend está compuesto de HTML, CSS y JavaScript, utilizando la librería de Bootstrap como adicional.
El API REST es el puente que actúa como comunicador entre el backend y el frontend, en este caso son los métodos HTTP.
Los archivos JS del frontend cumplen con funciones según su nombre, viewstudents.js permite mostrar datos en cuadros según indica el ID de la etiqueta, en este mismo script, enviar datos a la siguiente pagina para poder ser editados. Permite eliminar datos pidiendo antes una confirmación.
registerstudents.js permite enviar los datos obtenidos del formulario a la base de datos.
editstudent.js, tras obtener los datos de viewstudents.js, permite el guardado de cambios realizados en caso de rescribir algún dato.

## Tecnologías utilizadas
- Node.js
- Express
- SQLite
- HTML
- CSS
- JavaScript
- Bootstrap