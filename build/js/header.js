var disableBodyScroll = bodyScrollLock.disableBodyScroll;
var enableBodyScroll = bodyScrollLock.enableBodyScroll;
var headerDropdown = document.querySelector('.header__dropdown');

//функция навешивания класса на шапку
var resize_scroll = function(e) {
  var h = $(".header__top");
  if($(window).scrollTop() > h.outerHeight()) {
    $(".header__bottom").addClass("scrolled");
  } else {
    $(".header__bottom").removeClass("scrolled");
  }
};

//вычисляем ширину скроллбара
function scrollBarWidth() {
  var scrollBarWidth = window.innerWidth-$(document).width();

  if(scrollBarWidth > 0) {
    $('body').addClass('compensate-for-scrollbar');
    $('head').append('<style id="menu-open" type="text/css">.compensate-for-scrollbar{padding-right:'+scrollBarWidth+"px;}</style>")
  }
}

var $nav = $('.nav');
var $btn = $('.nav button');
var $vlinks = $('.clinics-menu');
var $hlinks = $('.dropdown-menu');
var breaks = [];

function updateNav() {
  if($('body').width() > 1023) {
    var availableSpace = $('.header__top .container').width() - $('.header__logo').width() - $('.header__top-right').width() - $('.header__clinics-button').width() - 120;
    //console.log($('.header__top .container').width(), $('.header__logo').width(), $('.header__top-right').width(), availableSpace);
    if ($vlinks.width() > availableSpace) {
      breaks.push($vlinks.width());
      $vlinks.children('.clinics-menu__item').last().prependTo($hlinks);
      $('.clinics-menu__button span').text(breaks.length);
    } else {
      if (availableSpace > breaks[breaks.length - 1]) {
        //$hlinks.children().first().appendTo($vlinks);
        $hlinks.children().first().insertBefore($('.clinics-menu__more'));
        breaks.pop();
        $('.clinics-menu__button span').text(breaks.length);
      }
      if (breaks.length < 1) {
        $hlinks.addClass('hidden');
      }
    }
    if ($vlinks.width() > availableSpace) {
      updateNav();
    }
  }
}

$(document).ready(function() {
  //запуск функции навешивания класса на шапку
  resize_scroll();

  updateNav();
});

$(window).resize(function() {
  updateNav();
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

//выпадашка с клиниками
$(document).on('click', '.js-clinics-toggler', function () {
  $(this).toggleClass('is-active');

  if($(this).hasClass('is-active')) {
    scrollBarWidth();

    disableBodyScroll(headerDropdown);

    $('.header__dropdown').addClass('is-open');

    $('.header__clinics-dropdown').addClass('is-open');

    document.addEventListener('click', headerDropdownClose);
  } else {
    $('#menu-open').remove();
    $('body').removeClass('compensate-for-scrollbar');

    enableBodyScroll(headerDropdown);

    $('.header__dropdown').removeClass('is-open');

    $('.header__clinics-dropdown').removeClass('is-open');

    document.removeEventListener('click', headerDropdownClose);
  }

  return false;
});

function headerDropdownClose(evt) {
  if (!$('.header__dropdown-inner').is(evt.target) && $('.header__dropdown-inner').has(evt.target).length === 0) {
    $('#menu-open').remove();
    $('body').removeClass('compensate-for-scrollbar');

    $('.header__dropdown').removeClass('is-open');
    $('.header__clinics-dropdown').removeClass('is-open');
    $('.header__menu-dropdown').removeClass('is-open');

    $('.js-clinics-toggler').removeClass('is-active');
    $('.js-menu-toggler').removeClass('is-active');
    $('.js-menu-toggler').find('svg use').attr('xlink:href', '#menu');

    document.removeEventListener('click', headerDropdownClose);
    enableBodyScroll(headerDropdown);
	}

  //console.log(evt.target);
}

//главное меню
$(document).on('click', '.js-menu-toggler', function () {
  $(this).toggleClass('is-active');

  if($(this).hasClass('is-active')) {
    scrollBarWidth();
    $(this).find('svg use').attr('xlink:href', '#close');

    disableBodyScroll(headerDropdown);

    $('.header__dropdown').addClass('is-open');

    $('.header__menu-dropdown').addClass('is-open');

    document.addEventListener('click', headerDropdownClose);
  } else {
    $('#menu-open').remove();
    $('body').removeClass('compensate-for-scrollbar');

    $(this).find('svg use').attr('xlink:href', '#menu');

    enableBodyScroll(headerDropdown);

    $('.header__dropdown').removeClass('is-open');

    $('.header__menu-dropdown').removeClass('is-open');

    document.removeEventListener('click', headerDropdownClose);
  }

  return false;
});

//сабменю
$(document).on('click', '.main-menu__toggler', function () {
  var that = $(this);
  if($(this).hasClass('is-active')) {
    $(this).removeClass('is-active');
    $(this).closest('.main-menu__item--root').removeClass('is-open');
    $(this).closest('.main-menu__item--root').find('.submenu').slideUp();
  } else {
    $('.main-menu__toggler').removeClass('is-active');
    $('.main-menu__item--root').removeClass('is-open');
    $('.submenu').slideUp();

    setTimeout(function() {
      that.addClass('is-active');
      that.closest('.main-menu__item--root').addClass('is-open');
      that.closest('.main-menu__item--root').find('.submenu').slideDown();
    },300);
  }
  return false;
});
