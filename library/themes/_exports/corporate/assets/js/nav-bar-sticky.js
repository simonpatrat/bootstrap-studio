var stickyNav = function(el) {
  var $theNav = el;
  var $w = $(window);

  $w.on('scroll orientationChange', function() {
      var wTop = $w.scrollTop(); 

      if(wTop > 1) {
        $theNav.addClass('sticky-nav');

      }else{

        $theNav.removeClass('sticky-nav');  

      }

    });  
      

  

};

$(document).ready(function() {
  stickyNav($('#main-navigation'));  
});