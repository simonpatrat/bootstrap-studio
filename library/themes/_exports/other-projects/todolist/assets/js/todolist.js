var todoList = function() {
    var $taskAdder = $('#task-adder');
    var $taskList = $('#task-list');
    var newItemTemplate = '<li class="list-group-item"><span class="_todo-text"></span>'
        +'<div role="group" class="btn-group pull-right">'
        +'<button class="btn btn-default _todo-remove" type="button"> <i class="glyphicon glyphicon-trash"></i></button>'
        +'<button class="btn btn-default _todo-important" type="button"> <i class="glyphicon glyphicon-star"></i></button>'
        +'<button class="btn btn-default _todo-validate" type="button"> <i class="glyphicon glyphicon-ok"></i></button>'
        +'</div>'
        +'<div class="clearfix"></div>'
    +'</li>';
  $taskAdder.submit(function(event) {
    
    var text = $('#task-adder').val();
    var $el = $(newItemTemplate);

    if(typeof text != 'undefined' && text!='') {
      $el.find('._todo-text').text(text);
      $el.appendTo($taskList);
      console.log($el);

      $('#text-input').val('');    
    }    
    event.preventDefault();  
    return false;
  });  

};

$(document).ready(todoList);