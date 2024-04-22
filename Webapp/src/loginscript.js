const images = document.querySelectorAll('.slideshow-image');
let currentIndex = 0;
function showImage(index) {
    images.forEach((image) => {
        image.classList.remove('active');
    });
    images[index].classList.add('active');
}
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}
function previousImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}
setInterval(nextImage, 2500);