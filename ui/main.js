var submit = getElementById( "submit_btn");
submit.onclick = function(){
  
  var request = new  XMLHttpRequest();
  request.onreadystatechange = function(){
      
      if(request.readystate === XMLHttpRequest.DONE){
          
          if(request.status === 200){
              
              var comments = req.responseText;
              comments = JSON.parse(comments);
              var list = '';
              
              for(var i = 0; i < comments.length; i++){
                  list += '<li>' + comments[i] + '</li>';
              }
              
              var ul = document.getElementById('commentlist');
              ul.innerHTML = list;
          } 
      }
  };
  
  request.open('GET','http://shubhirg.imad.hasura-app.io/submit-comment?name=' + comment,true);
  request.send(null);
  
};
