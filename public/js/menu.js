// Assuming you have a product card with class "product-card"
const productCards = document.querySelectorAll('.product-card');

productCards.forEach((card) => {
  card.addEventListener('click', (event) => {
    const productId = event.currentTarget.getAttribute('data-product-id');
    // const productId = card.dataset.productId; // Extract the product ID from a data attribute
    window.location.href = `/product/${productId}`; // Redirect to product details page
  });
});