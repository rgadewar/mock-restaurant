// Assuming you have a product card with class "product-card"
const productCards = document.querySelectorAll('.product-card');

productCards.forEach((card) => {
  card.addEventListener('click', (event) => {
    const productId = card.dataset.productId; // Extract the product ID from a data attribute
    window.location.href = `/product-details?productId=${productId}`; // Redirect to product details page
  });
});
