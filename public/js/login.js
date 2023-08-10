async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-login').value;
    const password = document.querySelector('#password-login').value;

    if (username && password) {
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({
                username, password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            // const responseData = await response.json();
            // const userId = responseData.userId; // Extract the userId from the response

            // Redirect to dashboard with the userId as query parameter
            // document.location.replace(`/dashboard`);
            alert('Login successful');
        } else {
            alert(response.statusText);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', loginFormHandler);
});
