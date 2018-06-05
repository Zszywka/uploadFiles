var fs = require('fs');
var formidable = require('formidable');
// + npm install --save formidable

//---------------------------- UPLOAD FILES[PICTURES]---------------------------
// function show the form
exports.welcome = function(request,response) {
  console.log("Rozpoczynam obsługę żadania welcome".green);
  fs.readFile('templates/start.html', function(err, html){
    response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"});
    response.write(html);
    response.end();
  });
}

// function upload the pictures
exports.upload = function(request, response) {
  // console.log(("Rozpoczynam obsługę żądania upload.").green);
  var form = new formidable.IncomingForm();
  form.parse(request, function(error, fields, files) {
      fs.renameSync(files.upload.path, "test.png");
      fs.readFile('templates/upload.html', function(err, html){
      response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
      response.write(html);
      response.end();
      })
    });
}

// function show the pictures on webside
exports.show = function(request, response) {
  console.log(("Rozpoczyna obsługę żądania show").green);
  fs.readFile('test.png', 'binary', function(error, file) {
    response.writeHead(200, {'Content-Type':'image/png/jpg'});
    response.write(file,'binary');
    response.end();
  });
}

//-----------------------------ERROR--------------------------------------------
// functions show the error
exports.error = function(request, response) {
  console.log(('Nie wiem co robić').red);
  fs.readFile('templates/error.html', function(err,html) {
    response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    response.write(html);
    response.end();
  });
}
// function show the picture with a error
exports.imageError = function(request, response) {
  console.log(('wszedlem w rysunek bledu').red);
  fs.readFile('templates/error.jpg', function(err, file){
    response.writeHead(200, {'Content-Type':'image/png/jpg'});
    response.write(file, 'binary');
    response.end();
  });
}
