window.addEventListener("load", function() {
  setTimeout(function() {
    document.getElementsByTagName('body')[0].classList.add('loaded');
    setTimeout(function() {
      document.getElementById('preloader').remove();
    }, 300);
  }, 300);
});
