document.addEventListener('DOMContentLoaded', () => {
  const displayMessage = (message, className) => {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageElement.classList.add(className);
    document.querySelector('.card').appendChild(messageElement);
  };

  const signupFormHandler = async (event) => {
    event.preventDefault();

    const emailInput = document.querySelector('#email-signup');
    const passwordInput = document.querySelector('#password-signup');

    const email = emailInput.value;
    const password = passwordInput.value;

    if (email && password) {
      try {
        const response = await fetch('/api/users/signup', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const responseData = await response.json();
          displayMessage(responseData.message, 'success-message');
          setTimeout(() => {
            window.location.href = '/login';
          }, 3000); // Redirect after 3 seconds (adjust the delay as needed)
        } else {
          const responseData = await response.json();
          displayMessage(responseData.error, 'error-message');
        }
      } catch (err) {
        console.error('Error during signup:', err);
        displayMessage('An error occurred. Please try again later.', 'error-message');
      }
    }
  };

  const signupForm = document.querySelector('#signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', signupFormHandler);
  }
});
