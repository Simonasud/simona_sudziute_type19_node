document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    console.log('email  ===', email);
    const password = document.getElementById('password').value;

    // Siunčiame užklausą į serverį
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Jei prisijungimas pavyko, išsaugome duomenis į localStorage
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRole', data.role); // Arba kitaip gauti vartotojo rolę iš duomenų

        // Nukreipiame į kitą puslapį
        window.location = 'shop.html';
      } else {
        console.error('Klaida prisijungiant:', data.message);
      }
    } catch (error) {
      console.error('Klaida siunčiant užklausą:', error);
    }
  });
});
