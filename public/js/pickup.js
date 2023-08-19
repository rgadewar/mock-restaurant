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

    const response = await fetch('/pickup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.text();
    // Display the response or perform further actions
    console.log(result);
  });
});
