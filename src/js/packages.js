$(document).on('click', '.package__details-toggler', function() {
  $(this).toggleClass('is-active');
  if($(this).hasClass('is-active')) {
    $(this).find('span').text('Свернуть');
    $(this).closest('.package__details').find('.package__details-cut').slideDown();
  } else {
    $(this).find('span').text('Показать больше');
    $(this).closest('.package__details').find('.package__details-cut').slideUp();
  }
  return false;
});
