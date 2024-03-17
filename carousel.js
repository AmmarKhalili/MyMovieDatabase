window.addEventListener('load', async () => {
  console.log('load');
  const trailerLinks = await fetchTrailerLinks("https://santosnr6.github.io/Data/movies.json");
  const randomTrailerLinks = getRandomTrailerLinks(trailerLinks, 4); // Hämta fyra slumpmässiga trailerlänkar
  let initialIndex = parseInt(localStorage.getItem("initialIndex")); // Hämta sparad index för den första videon
  if (!initialIndex || isNaN(initialIndex) || initialIndex < 0 || initialIndex >= randomTrailerLinks.length) {
    // Om indexet inte finns sparad eller är ogiltig, välj ett slumpmässigt index
    initialIndex = Math.floor(Math.random() * randomTrailerLinks.length);
    localStorage.setItem("initialIndex", initialIndex); // Spara det nya indexet för framtida användning
  }
  setupCarousel(randomTrailerLinks, initialIndex);
});

async function fetchTrailerLinks(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.map(movie => movie.trailer_link);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

function getRandomTrailerLinks(trailerLinks, count) {
  const shuffledLinks = shuffle(trailerLinks);
  return shuffledLinks.slice(0, count);
}

async function setupCarousel(trailerLinks, initialIndex) {
  console.log('carousel');
  const slidesContainer = document.querySelector('[data-slides]');

  // Ta bort befintliga slides från slidesContainer
  slidesContainer.innerHTML = '';

  // Skapa iframe för varje trailerlänk och lägg till dem i slidesContainer
  trailerLinks.forEach((trailerLink, index) => {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', trailerLink);
    iframe.setAttribute('width', '400');
    iframe.setAttribute('height', '300');
    iframe.setAttribute('allowfullscreen', true);

    const slide = document.createElement('div');
    slide.classList.add('carousel__slide');
    slide.appendChild(iframe);

    slidesContainer.appendChild(slide);

    // Om det är den första videon, lägg till attribut data-active
    if (index === initialIndex) {
      slide.setAttribute('data-active', true);
    }
  });

  // Fortsätt med att sätta upp karusellens funktionalitet
  const buttons = document.querySelectorAll('[data-carousel-btn]');
  const slides = Array.from(document.querySelectorAll('.carousel__slide'));
  const shuffledSlides = shuffle(slides);
  let currentIndex = initialIndex;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const offset = btn.dataset.carouselBtn === 'next' ? 1 : -1;
      currentIndex += offset;

      if (currentIndex < 0) {
        currentIndex = shuffledSlides.length - 1;
      } else if (currentIndex >= shuffledSlides.length) {
        currentIndex = 0;
      }

      // Ta bort data-active från nuvarande slide
      slides.forEach(slide => slide.removeAttribute('data-active'));

      // Sätt data-active till nästa slide
      shuffledSlides[currentIndex].setAttribute('data-active', true);
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


  
  
  
