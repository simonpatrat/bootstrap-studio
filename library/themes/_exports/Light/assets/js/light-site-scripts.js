$('#mainNav').affix({
  offset: {
    top: 100
  }
});

// Dropdown fadeToggle on hover
$('#mainNav ul.nav li.dropdown').hover(function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(300);
}, function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(200);
});
