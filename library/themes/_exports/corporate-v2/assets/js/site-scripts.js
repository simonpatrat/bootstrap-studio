// Addind javscript class on body before dom ready
document.body.className += " bswjs";

// Adding a new method to jQuery
// Creating jQuery bsw_ajaxLoad mini plugin
jQuery.fn.extend({

   bsw_ajaxLoad : function() {
      var loader = $('<div class="_bsw-loader text-center"><span class="_bsw-loader fa fa-spinner fa-spin" style="color: #343434; font-size: 24px"></span></div>');
      
      // Ajax element loaded custom event handler
      $(document).on('bsw_ajax-element-loaded', function(event) {
         //alert('Ajax element loaded);
         //console.log('CUSTOM APP EVENTS: Event: Ajax element loaded, Source: '+event.source+' Message: '+event.message+' Time: '+event.time);
         // Here the code you want executre once each ajax element is loaded 
          
      });       
      return this.each(function() {
          
        $(this).on('inview', function(event, isInView) {
            
                if (isInView) {
                    if($(this).find('._bsw-ajax-content').length === 0) {
                        $(this).append(loader);

                        var url = $(this).data('href');
                        $(this).load( url +' ._bsw-ajax-content', function( response, status, xhr ) {
                           if ( status == "error" ) {
                             var msg = "Sorry but there was an error: ";
                             $(this).html( msg + xhr.status + " " + xhr.statusText );
                           }else if(status == "success") {
                             //console.log('Youpi');
                             loader.fadeOut(function() {
                               $(this).remove();
                             });


                             $(this).addClass('content-loaded');  
                             $(this).find('._bsw-ajax-content').addClass('visible');
                             
                             // Trigger Ajax loaded event on document
                             $.event.trigger({
                                 type: 'bsw_ajax-element-loaded',
                                 source: 'ajax',
                                 message: 'Ajax element Object Loaded from AJAX Request',
                                 time: new Date()
                             });                               
                               

                           }
                        });  
                    }else {
                        return;
                    }     

                }           
          

        });
        

      });
   }               

});

var siteScripts = function() {
    // Intitialize Tooltips
    $('[data-toggle="tooltip"]').tooltip();
    
    // Detect if site is "boxed" on load
    var isBoxed = localStorage.getItem("is_boxed"); 
    if(typeof isBoxed != 'undefined' && isBoxed === "true") {
        $('body').addClass('boxed');
    }
    // Loader and page transition on load when images have loaded
    $('.whole-site').imagesLoaded( function() {
        // images have loaded
        //console.log('Images loaded');
        $('.loading-site').addClass('site-loaded');
    });
    
    // Dropdown fadeToggle on hover
    $('#main-navigation ul.nav > li.dropdown').hover(
        
        function() {
        
      $(this).find(' > .dropdown-menu').stop(true, true).delay(100).fadeIn(300);
        
        }, function() {
        
            $(this).find('> .dropdown-menu').stop(true, true).delay(200).fadeOut(200);
      
        });


    // fixed gototop button apparition
    var gototopfixed = $('.btn-go-to-top.pos-fixed');
    $(window).on('scroll', function() {
        var winTop = $(this).scrollTop();
        if(winTop > ($(window).height() / 3) * 2.2) {
            gototopfixed.addClass('in');
        }else {
            gototopfixed.removeClass('in');         
        }
    });    
    
    // _bsw-vertical-menu expanded or not
    var $_bswVerticalMenuList = $('._bsw-vertical-menu-sub');
    $_bswVerticalMenuList.each(function() {
        var $this = $(this);
        var $deployer = $this.closest('li').find(' > a');
        if($deployer.attr('aria-expanded') === "true") {
            $this.show().removeClass('_bsw-sub-visible').addClass('_bsw-sub-hidden');
            $deployer.next('.fa').removeClass('fa-rotate-270');
        }else {
            $this.hide().removeClass('_bsw-sub-hidden').addClass('_bsw-sub-visible');
            $deployer.next('.fa').addClass('fa-rotate-270');
        }        
    });

    
    // Data Change buttons
    $(document).on('click', '[data-change]', function(event) {
        event.preventDefault();
        var dataChangeType = $(this).data('change');
        switch(dataChangeType) {
            case 'boxed':
                
                if($('body').hasClass('boxed')) {
                    $('body').removeClass('boxed');
                    // Store value in localStorage
                    localStorage.setItem("is_boxed", false);                    
                }else {
                    $('body').addClass('boxed');
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
                
            case 'deploy-sub':
                var $this = $(this);
                var $thisSub = $(this).closest('li').find(' > ul');
                if($this.attr('aria-expanded') === "true") {
                    $this.attr('aria-expanded', 'false');
                    $thisSub.slideUp(300).removeClass('_bsw-sub-visible').addClass('_bsw-sub-hidden');
                    $this.next('.fa').addClass('fa-rotate-270');
                }else {
                    $this.attr('aria-expanded', 'true');
                    $thisSub.slideDown(300).removeClass('_bsw-sub-hidden').addClass('_bsw-sub-visible');
                    $this.next('.fa').removeClass('fa-rotate-270');
                }
                                                                                    
            break;
                                                                                    
            default:
                return false;
            break;
        }
    });
    
    // Initialize Google map
    // Required script file : site-scripts-google-map-init.js
    initMap();
    
    if (matchMedia) { // If the method is supported by browser
        //console.log('matchmedia : suported');
        var mq_xs = window.matchMedia("(max-width: 767px)");
        var mq_sm = window.matchMedia("(min-width: 768px)");
        var mq_m = window.matchMedia("(min-width: 992px)");
        var mq_l = window.matchMedia("(min-width: 1200px)");
        mq_xs.addListener(WidthChange);
        mq_sm.addListener(WidthChange);
        mq_m.addListener(WidthChange);
        mq_l.addListener(WidthChange);
        WidthChange(mq_xs);
        WidthChange(mq_sm);
        WidthChange(mq_m);
        WidthChange(mq_l);
        
        
    }

    // media query change
    function WidthChange(mq) {
        
      if (mq.matches) {
        return true;
        //console.log(mq);
      } else {
        return false;
        //console.log(mq);
      }
      
    }


};


$(document).ready(function() {
    
  siteScripts();  
  $('[data-ajax-content]').bsw_ajaxLoad();  
});

