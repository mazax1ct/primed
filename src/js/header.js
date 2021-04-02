//функция навешивания класса на шапку
var resize_scroll = function(e) {
  var h = $(".header__top");
  if($(window).scrollTop() > h.outerHeight()) {
    $(".header__bottom").addClass("scrolled");
  } else {
    $(".header__bottom").removeClass("scrolled");
  }
};

$(document).ready(function() {
  //запуск функции навешивания класса на шапку
  resize_scroll();
});

//перезапуск функции навешивания класса на шапку при скролле и ресайзе
$(window).on("scroll", resize_scroll).on("resize", resize_scroll);

//форма поиска
$(document).on('click', '.js-search-toggler', function () {
  $(this).toggleClass('is-active');
  $('.search-bar__form').toggleClass('is-active');
  if($(this).hasClass('is-active')) {
    $(this).find('svg use').attr('xlink:href', '#close');
    $('.search-bar__input').focus();
  } else {
    $(this).find('svg use').attr('xlink:href', '#search');
    $('.search-bar__input').blur();
  }
  return false;
});
