$(document).ready(function() {
  if($('.js-clinics-slider').length) {
    var $status = $('.our-clinics__counter');
    var $slickElement = $('.js-clinics-slider');

    $slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
      var i = (currentSlide ? currentSlide : 0) + 1;
      var nil = '';
      var nil_2 = '';
      if (i < 10) {
        nil = '0';
      }
      if (slick.slideCount < 10) {
        nil_2 = '0';
      }
      $status.html(nil + i + ' / ' + nil_2 + slick.slideCount);

    });

    $slickElement.slick({
      mobileFirst: true,
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: '<button class="slick-arrow slick-prev" aria-label="Назад" type="button"><svg class="slick-arrow__arrow" aria-hidden="true"><use xlink:href="#arrow_left"/></svg></button>',
      nextArrow: '<button class="slick-arrow slick-next" aria-label="Вперед" type="button"><svg class="slick-arrow__arrow" aria-hidden="true"><use xlink:href="#arrow_right"/></svg></button>',
      appendArrows: $('.our-clinics__arrows-bottom'),
      responsive: [
        {
          breakpoint: 767,
          settings: {
            appendArrows: $('.our-clinics__arrows-top')
          }
        }
      ]
    });
  }
});
