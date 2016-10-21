var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one' : {
            title : 'Article-One',
            heading : 'Hello',
            content : 'This is article one. '
    },
    'article-two' : {
            title : 'Article-Two',
            heading : 'Hello',
            content : 'This is article two. '
    },
    'article-three' : {
            title : 'Article-Three',
            heading : 'Hello',
            content : 'This is article three. '
    },
    
};

function createTemplate(data){
    
    var title = data.title;
    var heading = data.heading;
    var content = data.content;
    
    var htmlTemplate = `
        <html>
            <head>
                <title>${title}</title>
             
                    <script src = "/main.js" ></script>
            </head>
            <body>
                <h3>${heading}</h3>
                <div>${content}</div>
        
            </body>
        </html>`; 
    return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function (req, res) {
    var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
