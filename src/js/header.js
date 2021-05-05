var disableBodyScroll = bodyScrollLock.disableBodyScroll;
var enableBodyScroll = bodyScrollLock.enableBodyScroll;
var headerDropdown = document.querySelector('.header__dropdown');

//функция навешивания класса на шапку
var resize_scroll = function(e) {
  if($(window).scrollTop() > 0) {
    $(".header").addClass("scrolled");
  } else {
    $(".header").removeClass("scrolled");
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

//выпадающий список клиник
$(document).on('click', '.js-clinics-drop', function () {
  $(this).toggleClass('is-active');
  $('.clinics-menu').toggleClass('is-open');
  return false;
});

$(document).on('click', '.js-clinics-dropdown', function () {
  $('.dropdown-menu').toggleClass('is-open');
  return false;
});

$(window).on("scroll", function () {
  $('.js-clinics-drop').removeClass('is-active');
  $('.clinics-menu').removeClass('is-open');
  $('.dropdown-menu').removeClass('is-open');
});

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
