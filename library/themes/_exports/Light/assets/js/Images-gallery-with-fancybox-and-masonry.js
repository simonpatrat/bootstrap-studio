var bswFancyBox = function() {
    //FANCYBOX
    //https://github.com/fancyapps/fancyBox
    $(".fancybox").fancybox({
        openEffect: "none",
        closeEffect: "none"
    });  
  
};

var bswMasonry = function(grid, item, colWidth) {
    var $grid = $(grid);
    var item = item;
    var colWidth = colWidth;
    $grid.masonry({
      // options
      itemSelector: item,
      columnWidth : colWidth
    });  
};

$(document).ready(function() {
    
    // FANCYBOX INIT
    bswFancyBox();
    
    // MASONRY INIT
    bswMasonry('.bsw-image-gallery','.bsw-masonry-item', '.bsw-masonry-item');
});
