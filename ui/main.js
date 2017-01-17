

function loadLeftMenu () {
    var menu = document.getElementById('menu');
    menu.onclick = function () {
    var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
            var menuContent = document.getElementById('menuContent');              
            if (request.status === 200) {
                  var content = '';
                  var articleData = JSON.parse(this.responseText);   /*how to get image from folder configure server to folder*/
                  content += `<a href="/articles/${articleData[i].heading}">Traveling Diaries</a>`;
                  articles.innerHTML = content;
              } else {
                  articles.innerHTML('Oops! Could not load all articles!')
              }
          }
      };
      
      request.open('GET', '/get-articles', true);
      request.send(null);
  }
      var menuContent = document.getElementById('menuContent');
      menuContent.innerHTML = `<a href="/articles/travel">Traveling Diaries</a>
                                <a href="/articles/"
                                <button type="submit" id="music">Music</button>
                                <button type="submit" id="family">Family</button>
                                <button type="submit" id="technology">Technology</button>
                                <button type="submit" id="food">Food</button>
                                <button type="submit" id="replies">Replies</button>
                                <button type="submit" id="aboutme">About Me</button>
                                <button type="submit" id="contact">Share Your Thoughts</button>`;
    }
}

function loadSearch() {
  var search = document.getElementById('searchmenu');
  search.innerHTML = '<input type= "text" name="search" id="search" placeholder="Search.." />';
}
 
function loadLoginForm () {    /*Enter display Image option*/

    var loginHtml = `
        
          <div id="id01" class="modal">
            
            <div class="modal-content animate">
              <div class="imgcontainer">
                <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
                <img src="img_avatar2.png" alt="Avatar" class="avatar">
              </div>

              <div class="container">
                <label><b>Username</b></label>
                <input type="text" placeholder="Enter Username" id="username" required>

                <label><b>Password</b></label>
                <input type="password" placeholder="Enter Password" id="password" required>
                  
               <center><button type="submit" id="login_btn">Login</button>
                <button type="submit" id="register_btn">Not a follower ? Register</button></center>
              </div>

              <div class="container" style="background-color:#f1f1f1">
                <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
                <span class="psw">Forgot <a href="#">password?</a></span>
              </div>
            </form>
          </div>
       
        `;
    var modal = document.getElementById('id01');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    document.getElementById('login_area').innerHTML = loginHtml;
    
    // Submit username/password to login
    var submit = document.getElementById('login_btn');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  submit.value = 'Sucess!';
              } else if (request.status === 403) {
                  submit.value = 'Invalid credentials. Try again.';
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              } else {
                  alert('Something went wrong on the server');
                  submit.value = 'Login';
              }
              loadLogin();
          }  
          // Not done yet
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        submit.value = 'Logging in...';
        
    };
    
    var register = document.getElementById('register_btn');
    register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully');
                  register.value = 'Registered!';
              } else {
                  alert('Could not register the user');
                  register.value = 'Register';
              }
          }
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        register.value = 'Registering...';
    
    };
}

function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_area');                                                            /*take logout away from here and add user image*/
    loginArea.innerHTML = `
        <h3> Welcome, <i>${username}</i>!</h3>
        <a href="/logout">Logout</a>
    `;
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                 loadLoginForm();
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

function loadArticles () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('articles');
            if (request.status === 200) {
                var content = '<ul>';
                var articleData = JSON.parse(this.responseText);   /*how to get image from folder configure server to folder*/
                for (var i=0; i< articleData.length; i++) {
                    content += `<li>
                    (${articleData[i].date.split('T')[0]})
                    </br>
                    <a href="/articles/${articleData[i].title}">${articleData[i].heading}</a>
                    <img src= "${articleData[i].articleimage}" class = "img-circle" >                                     
                    <hr/>
                    </li>`;
                }
                content += "</ul>"
                articles.innerHTML = content;
            } else {
                articles.innerHTML('Oops! Could not load all articles!')
            }
        }
    };
    
    request.open('GET', '/get-articles', true);
    request.send(null);
}


// The first thing to do is to check if the user is logged in!
loadLogin();

// Now this is something that we could have directly done on the server-side using templating too!
loadArticles();

loadLeftMenu();
loadSearch();