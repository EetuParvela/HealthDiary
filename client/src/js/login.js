import { fetchData } from './fetch.js';

const registerUser = async (event) => {
  event.preventDefault();

  const registerForm = document.querySelector('.register-form');

  const username = registerForm.querySelector('#username').value.trim();
  const password = registerForm.querySelector('#password').value.trim();
  const email = registerForm.querySelector('#email').value.trim();

  const bodyData = {
    username: username,
    password: password,
    email: email,
  };

  const url = 'http://localhost:8000/api/users';

  const options = {
    body: JSON.stringify(bodyData),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetchData(url, options);

  if (response.error) {
    console.error('Rekisteröityminen epäonnistui:', response.error);
    return;
  }

  if (response.message) {
    console.log(response.message, 'success');
  }

  console.log(response);
  registerForm.reset();
};

const loginUser = async (event) => {
  event.preventDefault();

  const loginForm = document.querySelector('.login-form');

  const username = loginForm.querySelector('#username').value.trim();
  const password = loginForm.querySelector('#password').value.trim();

  const bodyData = {
    username: username,
    password: password,
  };

  const url = 'http://localhost:8000/api/users/login';

  const options = {
    body: JSON.stringify(bodyData),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetchData(url, options);

  if (response.error) {
    console.error('Kirjautuminen epäonnistui:', response.error);
    return;
  }

  if (response.message) {
    console.log(response.message, 'success');
    localStorage.setItem('token', response.token);
    localStorage.setItem('name', response.user.username);
    setTimeout(function () {
      window.location.href = 'diary.html';
    }, 3000);
  }

  console.log(response);
  loginForm.reset();
};

const registerForm = document.querySelector('.register-form');
registerForm.addEventListener('submit', registerUser);

const loginForm = document.querySelector('.login-form');
loginForm.addEventListener('submit', loginUser);

