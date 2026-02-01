document.addEventListener("DOMContentLoaded", () => {

  //Obtener ID desde la URL
  const params = new URLSearchParams(window.location.search);
  const studentId = params.get("id");

  if (!studentId) {
    alert("ID de estudiante no válido");
    return;
  }

  const form = document.getElementById("edit-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  // Seguridad extra
  if (!form || !nameInput || !emailInput || !passwordInput) {
    console.error("Formulario de edición incompleto");
    return;
  }

  //Cargar datos del estudiante
  loadStudent(studentId);

  //Enviar cambios
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await updateStudent(studentId);
  });

});


// =======================

async function loadStudent(studentId) {
  try {
    const response = await fetch(`/students/${studentId}`);

    if (!response.ok) {
      throw new Error("Estudiante no encontrado");
    }

    const student = await response.json();

    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("password").value = student.password;

  } catch (error) {
    console.error(error);
    alert("No se pudo cargar el estudiante");
  }
}

async function updateStudent(studentId) {
  try {
    const response = await fetch(`/students/${studentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      })
    });

    if (!response.ok) {
      throw new Error("Error al actualizar");
    }

    alert("Estudiante actualizado correctamente");
    window.location.href = "/viewstudents.html";

  } catch (error) {
    console.error(error);
    alert("No se pudo actualizar el estudiante");
  }
}
