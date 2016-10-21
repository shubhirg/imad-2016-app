
var commentInput = document.getElementById('comment');
  var comment = commentInput.value;
  var submit = document.getElementById( "submit_btn");
submit.onclick = function(){
  
var comments = ['c1','c2'];
              var list = '';
              
              for(var i = 0; i < comments.length; i++){
                  list += '<li>' + comments[i] + '</li>';
              }
              
              var ul = document.getElementById('commentlist');
              ul.innerHTML = list;    
    
  };
  
