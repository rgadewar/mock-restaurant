document.addEventListener('DOMContentLoaded', () => {
  const pickupForm = document.querySelector('#pickup-form');

  pickupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
      user_id: pickupForm.user_id.value,
      pickup_time: pickupForm.pickup_time.value,
      name: pickupForm.name.value,
      phone: pickupForm.phone.value
    };

    const phoneErrorElement = document.querySelector('#phone-error');
    
    try {
      const response = await fetch('/api/pickup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        const { successMessage, chosenTime } = jsonResponse;

        // Display the response or perform further actions
        console.log(successMessage, chosenTime);

        // Redirect to the result page after processing form data
        window.location.href = `/api/pickup/result?chosenTime=${chosenTime}`;
      } else {
        const errorResponse = await response.json();
        if (errorResponse.errors) {
          // Display validation error messages on the UI
          errorResponse.errors.forEach((errorMessage, index) => {
            if (index === 0) {
              // Display the first validation error next to the corresponding field
              phoneErrorElement.textContent = errorMessage;
            }
            // You can add similar code for other fields if needed
          });
        } else {
          console.error('An error occurred:', response.statusText);
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });
});
