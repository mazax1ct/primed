$(document).on('click', '.js-answer-toggler', function () {
  $(this).toggleClass('is-active');
  $(this).parent().toggleClass('is-open');
  $(this).next('.answer-accordion__body').slideToggle();
  return false;
});
