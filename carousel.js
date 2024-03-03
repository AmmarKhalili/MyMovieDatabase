window.addEventListener('load', () => {
    console.log('load');
    setupCarousel();
  });
  
  function setupCarousel() {
    console.log('carousel');
    const slides = Array.from(document.querySelectorAll('.carousel__slide'));
    const shuffledSlides = shuffle(slides);
    const slidesContainer = document.querySelector('[data-slides]');
  
    // Ta bort befintliga slides från slidesContainer
    slidesContainer.innerHTML = '';
  
    // Lägg till de slumpmässiga slides i slidesContainer i den slumpmässiga ordningen
    shuffledSlides.forEach(slide => {
      slidesContainer.appendChild(slide);
    });
  
    // Fortsätt med att sätta upp karusellens funktionalitet
    const buttons = document.querySelectorAll('[data-carousel-btn]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const offset = btn.dataset.carouselBtn === 'next' ? 1 : -1;
        const activeSlide = document.querySelector('[data-active]');
        let newIndex = shuffledSlides.indexOf(activeSlide) + offset;
  
        if (newIndex < 0) {
          newIndex = shuffledSlides.length - 1;
        } else if (newIndex >= shuffledSlides.length) {
          newIndex = 0;
        }
  
        // Ta bort data-active från nuvarande slide
        activeSlide.removeAttribute('data-active');
  
        // Sätt data-active till nästa slide
        shuffledSlides[newIndex].setAttribute('data-active', true);
      });
    });
  }
  
  // Funktion för att blanda elementen i en array slumpmässigt
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  
  