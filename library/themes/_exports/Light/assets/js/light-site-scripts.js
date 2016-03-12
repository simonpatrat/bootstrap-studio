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
            gototopfixed.addClass('in')
                        .addClass('pulse animated')
                        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                        $(this).removeClass('pulse animated'); 
            });
        }else {
            gototopfixed.removeClass('in');
         
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
    
    // Google map init

    initMap();


    
};

// Google map init function
function initMap() {
  // detect if map element exists in DOM
  var mapElem = document.getElementById('bswgmap');
  if (typeof mapElem != 'undefined' && mapElem !== null ) {
      console.log(mapElem);  
      // Create map styles array
      // Styles 1 : LightGray
      //var styles = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}];
      // Styles 2 : Grayscale darker than Styles 1
      var styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#0c0b0b"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#090909"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#d4e4eb"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#fef7f7"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9b7f7f"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#fef7f7"}]}];
      // Create a map object and specify the DOM element for display.
      // Create a new StyledMapType object, passing it the array of styles,
      // as well as the name to be displayed on the map type control.
      var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

      // Create a map object, and include the MapTypeId to add
      // to the map type control.
      var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(46.5846876,0.3364501),
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        },
        scrollwheel: false  
      };
      var map = new google.maps.Map(mapElem, mapOptions);

      // Setting a marker
      var marqueur = new MarkerWithLabel({
          position: mapOptions.center,
          icon: ' ',
          map: map,
          labelContent: '<i class="fa fa-map-marker fa-4x" style="color:#000;"></i>',
          labelAnchor: new google.maps.Point(15, 50),
          labelClass: "labels" // the CSS class for the label      

      });  
      marqueur.setMap( map );  
      // Set the marker draggable
      marqueur.setDraggable(true); 
      google.maps.event.addListener(marqueur, 'dragend', function(event) {
            //message d'alerte affichant la nouvelle position du marqueur
            //alert("La nouvelle coordonnée du marqueur est : "+event.latLng);
      });
      // Detect click on marker
      /*google.maps.event.addListener(marqueur, 'click', function(event) {
            // Do something on click on marker

      });*/

      //Associate the styled map with the MapTypeId and set it to display.
      map.mapTypes.set('map_style', styledMap);
      map.setMapTypeId('map_style');
      
  } else {
      return;
      
  }

  
}; // End of initMap function

// Init site scripts
$(document).ready(siteScripts);

