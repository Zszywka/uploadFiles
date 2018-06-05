var fs = require('fs');
var formidable = require('formidable');
// + npm install --save formidable

exports.welcome = function(request,response) {
  console.log("Rozpoczynam obsługę żadania welcome".green);
  fs.readFile('templates/start.html', function(err, html){
    response.writeHead(200, {"Content-Type":"text/html;charset=utf-8"}); //????
    response.write(html);
    response.end();
  });
}

//  my bad solution
// exports.upload = function(request,response) {
//   console.log(("Rozpoczynam obsługę żadania upload.").green);
//   var form = new formidable.IncomingForm(); //????
//   form.parse(request, function(error, fields, files){ //????
//     // fs.renameSync(files.upload.path, "test.png");     //???
//     response.writeHead(200, {"Content-Type": "text/html"});
//     response.write("received image:<br/>");
//     response.write("<img src='/show' />");
//     response.end();
//   });
//   fs.readFile('templates/upload.html', function(err, html){
//     response.writeHead(200, {"Content-Type":"text/html; charset=utf-8"});
//     response.write(html);
//     response.end();
//   });
// }

exports.upload = function(request, response) {
  console.log(("Rozpoczynam obsługę żądania upload.").green);
  var form = new formidable.IncomingForm();
  form.parse(request, function(error, fields, files) {
      fs.renameSync(files.upload.path, "test.png");  //
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write("received image:<br/>");
      response.write("<img src='/show' />");
      response.end();
  });
}


exports.show = function(request, response) {
  console.log(("Rozpoczyna obsługę żądania show").green);
  fs.readFile('test.png', 'binary', function(error, file) {
    response.writeHead(200, {'Content-Type':'image/png/jpg'});
    response.write(file,'binary');
    response.end();
  });
}


exports.error = function(request, response) {
  console.log(('Nie wiem co robić').red);
  fs.readFile('templates/error.html', function(err,html) {
    response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    response.write(html);
    response.end();
  });
  // response.write('404');
  // response.end();
}
