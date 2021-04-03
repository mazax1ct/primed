var disableBodyScroll = bodyScrollLock.disableBodyScroll;
var enableBodyScroll = bodyScrollLock.enableBodyScroll;
var clinicsDropdown = document.querySelector('.header__clinics-dropdown');
var menuDropdown = document.querySelector('.header__menu-dropdown');

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

//выпадашка с клиниками
$(document).on('click', '.js-clinics-toggler', function () {
  $(this).toggleClass('is-active');

  if($(this).hasClass('is-active')) {
    scrollBarWidth();
    //if($('body').width() < 1025) {
      disableBodyScroll(clinicsDropdown);
    //}
    $('.header__clinics-dropdown').addClass('is-open');

    document.addEventListener('click', closeClinicsMenu);
  } else {
    $('#menu-open').remove();
    $('body').removeClass('compensate-for-scrollbar');
    //if($('body').width() < 1025) {
      enableBodyScroll(clinicsDropdown);
    //}
    $('.header__clinics-dropdown').removeClass('is-open');

    document.removeEventListener('click', closeClinicsMenu);
  }

  return false;
});

function closeClinicsMenu(evt) {
  if (!$('.header__clinics-dropdown-inner').is(evt.target) && $('.header__clinics-dropdown-inner').has(evt.target).length === 0) {
    $('.header__clinics-dropdown').removeClass('is-open');
    $('.js-clinics-toggler').removeClass('is-active');
    document.removeEventListener('click', closeClinicsMenu);
    enableBodyScroll(clinicsDropdown);
    /*$('#menu-open').remove();
    $('body').removeClass('compensate-for-scrollbar');*/
	}
}

//главное меню
$(document).on('click', '.js-menu-toggler', function () {
  $(this).toggleClass('is-active');

  if($(this).hasClass('is-active')) {
    scrollBarWidth();
    $(this).find('svg use').attr('xlink:href', '#close');
    //if($('body').width() < 1025) {
      disableBodyScroll(menuDropdown);
    //}
    $('.header__menu-dropdown').addClass('is-open');

    document.addEventListener('click', closeMainMenu);
  } else {
    $('#menu-open').remove();
    $('body').removeClass('compensate-for-scrollbar');
    $(this).find('svg use').attr('xlink:href', '#menu');
    //if($('body').width() < 1025) {
      enableBodyScroll(menuDropdown);
    //}
    $('.header__menu-dropdown').removeClass('is-open');

    document.removeEventListener('click', closeMainMenu);
  }

  return false;
});

function closeMainMenu(evt) {
  if (!$('.header__menu-dropdown-inner').is(evt.target) && $('.header__menu-dropdown-inner').has(evt.target).length === 0) {
    $('.header__menu-dropdown').removeClass('is-open');
    $('.js-menu-toggler').removeClass('is-active');
    $('.js-menu-toggler').find('svg use').attr('xlink:href', '#menu');
    document.removeEventListener('click', closeMainMenu);
    enableBodyScroll(menuDropdown);
    /*$('#menu-open').remove();
    $('body').removeClass('compensate-for-scrollbar');*/
	}
}

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
