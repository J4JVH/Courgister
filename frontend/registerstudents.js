const form = document.getElementById('registrar');
const result = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // evita recarga

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('/students', 
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  });

  const data = await response.json();

  if (response.ok) {
    result.textContent = 'Estudiante registrado correctamente';
    form.reset();
  } else {
    result.textContent = data.error;
  }
});



