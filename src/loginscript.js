const images = document.querySelectorAll('.slideshow-image');
const radios = document.querySelectorAll('.slideshow-radio');

let currentIndex = 0;

function showImage(index) {
    images.forEach((image) => {
        image.classList.remove('active');
    });

    radios.forEach((radio) => {
        radio.classList.remove('active');
    });

    images[index].classList.add('active');
    radios[index].classList.add('active');
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function previousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

radios.forEach((radio, index) => {
    radio.addEventListener('click', () => {
        currentIndex = index;
        showImage(currentIndex);
    });
});

setInterval(nextImage, 2500);