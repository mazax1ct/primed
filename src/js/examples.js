$(document).ready(function() {
  if($('.js-examples-slider').length) {
    $('.js-examples-slider').slick({
      mobileFirst: true,
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: '<button class="slick-arrow slick-prev" aria-label="Назад" type="button"><svg class="slick-arrow__arrow" aria-hidden="true"><use xlink:href="#arrow_left"/></svg></button>',
      nextArrow: '<button class="slick-arrow slick-next" aria-label="Вперед" type="button"><svg class="slick-arrow__arrow" aria-hidden="true"><use xlink:href="#arrow_right"/></svg></button>',
      appendArrows: $('.examples__arrows')
    });
  }
});
