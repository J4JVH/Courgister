//MOSTRAR DATOS DE ESTUDIANTES EN UNA TABLA
const tableBody = document.getElementById('students-table-body');

fetch('/students')
  .then(response => response.json())
  .then(students => {

    tableBody.innerHTML = ''; // limpia la tabla

    students.forEach(student => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.date_creation}</td>
        <td><button class="btn btn-sm btn-outline-primary edit-btn" data-id="${student.id}">Editar</button></td>
        <td><button class="btn btn-sm btn-outline-danger delete-btn" data-id="${student.id}">Eliminar</button></td>
      `;

      tableBody.appendChild(row);
    });

  })
  .catch(error => {
    console.error('Error al cargar estudiantes:', error);
  });


document.addEventListener("click", async (e) => {

  // EDITAR
  if (e.target.classList.contains("edit-btn")) {
    const id = e.target.dataset.id;
    window.location.href = `/editstudent.html?id=${id}`;
  }

  // ELIMINAR
  if (e.target.classList.contains("delete-btn")) {
    const id = e.target.dataset.id;

    const confirmDelete = confirm("¿Estás seguro de eliminar este estudiante?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/students/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al eliminar");
      }

      alert("Estudiante eliminado correctamente");

      // eliminar fila sin recargar
      e.target.closest("tr").remove();

    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el estudiante");
    }
  }
});


