document.addEventListener('DOMContentLoaded', async () => {
  // Extract the query parameter value from the URL
  const queryParams = new URLSearchParams(window.location.search);
  const chosenTime = queryParams.get('chosenTime');
  
  // Convert the chosen time to AM/PM format
  const formattedChosenTime = formatToAMPM(chosenTime);
  
  // Update the content of the element with the chosen time
  const chosenTimeElement = document.querySelector('#chosen-time');
  chosenTimeElement.textContent = `You selected the pickup time: ${formattedChosenTime}`;
  
  // Fetch condensed cart data and update cart summary
  try {
    const condensedCartResponse = await fetch('/api/cart/condensed'); // Corrected URL
    if (condensedCartResponse.ok) {
      const condensedCartData = await condensedCartResponse.json();
      displayCartSummary(condensedCartData); // Use displayCartSummary for condensed cart data
    } else {
      console.error('Error fetching condensed cart data:', condensedCartResponse.statusText);
    }
  } catch (error) {
    console.error('An error occurred while fetching condensed cart data:', error);
  }
});

function displayCartSummary(cartData) {
  // Update the content of the cart summary section
  const cartSummaryElement = document.querySelector('#cart-summary');
  cartSummaryElement.innerHTML = `
    <h2>Cart Summary</h2>
    <ul>
      ${cartData.map(item => `
        <li>${item.productName} - Quantity: ${item.quantity} - Total: $${item.total}</li>
      `).join('')}
    </ul>
  `;
}

function formatToAMPM(time) {
  const timeParts = time.split(':');
  let hours = parseInt(timeParts[0]);
  let minutes = parseInt(timeParts[1]);
  let period = 'AM';

  if (hours >= 12) {
    period = 'PM';
    if (hours > 12) {
      hours -= 12;
    }
  }

  return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
}
