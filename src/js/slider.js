const slider = $('.products__list').bxSlider({
    pager: false,
    controls: false
});

$('.arrow--prev').on('click', function(e) {
    e.preventDefault();
    slider.goToPrevSlide();
})

$('.arrow--next').on('click', function(e) {
    e.preventDefault();
    slider.goToNextSlide();
})