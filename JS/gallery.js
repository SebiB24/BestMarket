function showImage(index) {
    images[currentIndex].classList.remove('display');

    if (index >= images.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = images.length - 1;
    } else {
        currentIndex = index;
    }

    images[currentIndex].classList.add('display');
}

function nextImage() {
    if (currentIndex === images.length - 1 && !repeat) {
        clearInterval(timer);
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i> Play';
        is_playing = false;
        images[currentIndex].classList.remove('display');
        currentIndex = 0;
        return;
    }
    showImage(currentIndex + 1);
}

const images = document.querySelectorAll('.main-image');
const playPauseBtn = document.querySelector('.play-pause');
const repeatCheckbox = document.getElementById('repeat-gallery');
const interval = document.getElementById('timer-interval');
let currentIndex = 0;
let timer;
let is_playing = false;
let repeat = false;

playPauseBtn.addEventListener('click', function () {
    if (playPauseBtn.innerHTML === '<i class="fas fa-play"></i> Play') {
        is_playing = true;
        timer = setInterval(nextImage, parseInt(interval.value));
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
    } else {
        is_playing = false;
        clearInterval(timer);
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i> Play';
    }
});

interval.addEventListener('change', function () {
    if (is_playing) {
        clearInterval(timer);
        timer = setInterval(nextImage, parseInt(interval.value));
    }
});

repeatCheckbox.addEventListener('change', function () {
    if (repeatCheckbox.checked) {
        repeat = true;
    } else {
        repeat = false;
    }
});

