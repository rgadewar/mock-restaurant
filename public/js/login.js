async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value;
    const password = document.querySelector('#password-login').value;
  
    if (email && password) {
      const response = await fetch('/users/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        // Handle successful login, e.g., redirect
        document.location.replace('/menu');
        // alert('Login successful');
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', loginFormHandler);
  });
  