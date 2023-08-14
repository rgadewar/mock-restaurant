 // Get product details from the page
 const product = {
  product_name: "{{ product.product_name }}", // Use the template engine to insert the product name
  price: "{{ product.price }}", // Remove unnecessary whitespace before product.price
  stock: "{{ product.stock }}",
  productId: "{{ product.id }}",
};

console.log("product_name", product.product_name);
console.log("product_price", product.price);
console.log("product_stock", product.stock);
console.log("productId: ", product.id);

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
      body: JSON.stringify({ product_id: productID, quantity}), // Include price
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(result => {
      // Handle success or show error message
      console.log(result);
    })
    .catch(error => {
      // Handle error
      console.error(error);
    });
  } else {
    // Show error message for invalid quantity
    console.error('Invalid quantity');
  }
});