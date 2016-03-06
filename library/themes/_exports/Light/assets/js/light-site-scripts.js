var siteScripts = function() {
    
    $('[data-toggle="tooltip"]').tooltip();
    
    $('#mainNav').affix({
      offset: {
        top: 100
      }
    });
    
    // fixed gototop button apparition
    var gototopfixed = $('.gototop.pos-fixed');
    $(window).on('scroll', function() {
        var winTop = $(this).scrollTop();
        if(winTop> ($(window).height() / 3) * 2) {
            gototopfixed.fadeIn(300, function() {
                $(this).addClass('in');
            });
        }else {
            gototopfixed.fadeOut(300, function() {
                $(this).removeClass('in');
            });            
        }
    });

    // Dropdown fadeToggle on hover
    $('#mainNav ul.nav li.dropdown').hover(function() {
      $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(300);
    }, function() {
      $(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(200);
    });

    // Detect if site is "boxed" on load
    var isBoxed = localStorage.getItem("is_boxed"); 
    if(typeof isBoxed != 'undefined' && isBoxed === "true") {
        $('.whole-site').addClass('boxed');
    }
    // Data Change buttons
    $(document).on('click', '[data-change]', function(event) {
        event.preventDefault();
        var dataChangeType = $(this).data('change');
        switch(dataChangeType) {
            case 'boxed':
                
                if($('.whole-site').hasClass('boxed')) {
                    $('.whole-site').removeClass('boxed');
                    // Store value in localStorage
                    localStorage.setItem("is_boxed", false);                    
                }else {
                    $('.whole-site').addClass('boxed');
                    // Store value in localStorage
                    localStorage.setItem("is_boxed", true);
                }
                
            break;
            
            case 'goToTop':
                var $win = $('html, body');
                $win.animate({
                    scrollTop : 0
                },1000);
            break;
                
            default:
                return false;
            break;
        }
    });    
};

// Init site scripts
$(document).ready(siteScripts);

