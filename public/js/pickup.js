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
    
    try {
      const response = await fetch('/pickup', {
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
        window.location.href = `/pickup/result?chosenTime=${chosenTime}`;
    } else {
        console.error('An error occurred:', response.statusText);
    }
} catch (error) {
    console.error('An error occurred:', error);
}
});
});





