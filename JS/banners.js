function showSlide(index) {
    slides[currentIndex].classList.remove('active');
    
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }
    
    slides[currentIndex].classList.add('active');
}

function nextSlide() {
    showSlide(currentIndex + 1);
    clearInterval(timer);
    timer = setInterval(nextSlide, 5000);
}

function previousSlide() {
    showSlide(currentIndex - 1);
    clearInterval(timer);
    timer = setInterval(nextSlide, 5000);
}

const slides = document.querySelectorAll('.slide');
const btnPrev = document.querySelector('.prev');
const btnNext = document.querySelector('.next');

let currentIndex = 0;
let timer = setInterval(nextSlide, 5000);

btnNext.addEventListener('click', nextSlide);
btnPrev.addEventListener('click', previousSlide);
