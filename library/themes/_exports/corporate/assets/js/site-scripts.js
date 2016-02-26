
// Adding a new method to jQuery
jQuery.fn.extend({

   bsw_ajaxLoad : function() {
      var loader = $('<span class="_bsw-loader fa fa-spinner fa-spin"></span>');
      return this.each(function() {
        
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
             
             $('.bsw-ajax-content').hide();
             $('.bsw-ajax-content').fadeIn('slow');
           }
        });
      });
   }               

});

$(document).ready(function() {
  $('[data-ajax-content]').bsw_ajaxLoad();  
});