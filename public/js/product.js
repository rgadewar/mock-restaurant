// Get product details from the page
const product = {
  product_name: "{{ product.product_name }}", // Use the template engine to insert the product name
  price: "{{ product.price }}", // Remove unnecessary whitespace before product.price
  stock: "{{ product.stock }}",
  productId: "{{ product.id }}",
};

// Get the current URL
const currentURL = window.location.href;

// Split the URL by "/"
const urlParts = currentURL.split('/');

// The last part of the URL should be the product ID
const productID = urlParts[urlParts.length - 1];

console.log(productID); // This should print the product ID (e.g., 1)

// Get form element
const addToCartForm = document.getElementById('add-to-cart-form');

// Add event listener for form submission
addToCartForm.addEventListener('submit', event => {
  event.preventDefault(); // Prevent default form submission

  const quantity = parseInt(document.getElementById('quantity').value, 10);
  console.log("quantity ", quantity);

  if (!isNaN(quantity) && quantity > 0) {
    // Send product ID, quantity, and price to the server to add to cart
    const price = parseFloat(product.price); // Parse price as a float
    fetch('/add-to-cart', {
      method: 'POST',
      body: JSON.stringify({ product_id: productID, quantity }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      return response.json();
    })
    .then(result => {
      console.log("Result:", result); 
      // Handle success or show error message
      if (result.message) {
        // Handle success message
        displaySuccessMessage(result.message);
        window.location.href = "/success"; // Redirect to success page
      } else if (result.error) {
        // Handle error message
        console.log("Error:", result.error);
        displayErrorMessage(result.error);
      }
    })
    .catch(async error => {
      // Handle fetch error or unexpected response
      console.error("Fetch error:", error);
    
      try {
        const errorResponse = await error.response.json();
        const errorMessage = errorResponse.error || "An error occurred while processing your request.";
        displayErrorMessage(errorMessage);
      } catch (jsonError) {
        displayErrorMessage("An error occurred while processing your request.");
      }
    });
    
    

    // Function to display success message
    function displaySuccessMessage(message) {
      const successMessage = document.createElement('div');
      successMessage.textContent = message;
      successMessage.style.color = 'green';
      document.body.appendChild(successMessage);
    }

    // Function to display error message
    function displayErrorMessage(error) {
      const errorMessage = document.createElement('div');
      errorMessage.textContent = error;
      errorMessage.style.color = 'red';
      document.body.appendChild(errorMessage);
    }
  }
});
