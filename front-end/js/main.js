// main.js

document.addEventListener('DOMContentLoaded', () => {
  const loginStatus = document.getElementById('loginStatus');
  const addItemLink = document.getElementById('addItemLink');
  const deleteItemButton = document.getElementById('deleteItemButton');
  const userSelector = document.getElementById('userSelector');
  const logoutBtn = document.getElementById('logoutBtn');

  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.email) {
    loginStatus.innerHTML = `<span>Welcome, ${user.email}! | <a href="#" id="logoutBtn">Logout</a></span>`;

    if (user.role === 'admin') {
      addItemLink.style.display = 'inline';
      deleteItemButton.style.display = 'inline';
      userSelector.style.display = 'inline';
    }
  } else {
    loginStatus.innerHTML =
      '<span><a href="login.html">Login</a> | <a href="register.html">Register</a></span>';
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', logoutUser);
  }

  function logoutUser() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
  }
});
