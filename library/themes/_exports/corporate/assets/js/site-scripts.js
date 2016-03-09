
// Adding a new method to jQuery
jQuery.fn.extend({

   bsw_ajaxLoad : function() {
      var loader = $('<div class="_bsw-loader text-center"><span class="_bsw-loader fa fa-spinner fa-spin"></span></div>');
      return this.each(function() {
          
        $(this).on('inview', function(event, isInView) {
            
                if (isInView) {
                    if($(this).find('._bsw-ajax-content').length === 0) {
                        $(this).append(loader);

                        var url = $(this).data('href');
                        $(this).load( url +' ._bsw-ajax-content', function( response, status, xhr ) {
                           if ( status == "error" ) {
                             var msg = "Sorry but there was an error: ";
                             $( "#error" ).html( msg + xhr.status + " " + xhr.statusText );
                           }else if(status == "success") {
                             //console.log('Youpi');
                             loader.fadeOut(function() {
                               $(this).remove();
                             });


                             $(this).addClass('content-loaded');  
                             $(this).find('._bsw-ajax-content').addClass('visible');

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
    // Detect if site is "boxed" on load
    var isBoxed = localStorage.getItem("is_boxed"); 
    if(typeof isBoxed != 'undefined' && isBoxed === "true") {
        $('body').addClass('boxed');
    }
    // Loader and page transition on load
    $('.whole-site').addClass('bswjs');
    $('.whole-site').addClass('transitioned fade');
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
                
            default:
                return false;
            break;
        }
    });
    


};


$(document).ready(function() {
  siteScripts();  
  $('[data-ajax-content]').bsw_ajaxLoad();  
});

