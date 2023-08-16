document.addEventListener('DOMContentLoaded', function () {
    const carouselContainer = document.querySelector('.slideshow-container');
    const slides = carouselContainer.querySelectorAll('.mySlides');
    let slideIndex = 0;

    function showSlides() {
      if (slides.length > 0) {
        for (let i = 0; i < slides.length; i++) {
          slides[i].style.display = 'none';
        }
        slideIndex++;
        if (slideIndex > slides.length) {
          slideIndex = 1;
        }
        slides[slideIndex - 1].style.display = 'block';
        setTimeout(showSlides, 2000); // Change image every 2 seconds
      } else {
        console.error('No slides found.');
      }
    }

    showSlides();
  });