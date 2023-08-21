document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const feedbackMessage = document.getElementById('feedback-message');

    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          feedbackMessage.textContent = 'Thank you for contacting us!';
          feedbackMessage.style.color = 'green';
          contactForm.reset();
        } else {
          const responseData = await response.json();
          feedbackMessage.textContent = responseData.error || 'An error occurred while submitting the form.';
          feedbackMessage.style.color = 'red';
        }
      } catch (error) {
        console.error(error);
        feedbackMessage.textContent = 'An error occurred while submitting the form.';
        feedbackMessage.style.color = 'red';
      }
    });
  });
