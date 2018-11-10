const express = require('express');
//middleware for dealing with FormData response body
const formidable = require('express-formidable');
//file-system, be able to save to hard disk
const fs = require('fs'); 

const app = express();

app.use(formidable());

//serves all the files from the public dir, middleware
app.use(express.static('public'));



// app.get('/get-posts', function (req, res){
//   //__dirname is a node global object to the current working directory
//   fs.readFile(__dirname + '/data/posts.json', function (err, file){
//     //file will be in buffer format so it's converted to a string
//     // console.log(file.toString()); 
//     // const parsedFile = JSON.parse(file); 
//     res.sendFile(JSON.parse(file)); 
//     console.log(file); 
//   });
// });

//recieves the POST request from the frontend
app.post('/create-post', function (req, res){
  console.log("/create-post");
  // console.log(res.body); //undefined as FormData
  //using the middleware
  console.log(req.fields.blogpost); 
  let time = Date.now(); 
  let currentPost = {}; 
  currentPost[time] = req.fields.blogpost;

  //read the file - assign to a new object and convert to readable
  fs.readFile(__dirname + '/data/posts.json', function (error, file){
    if (error) console.err(error); 
    let parsedFile = JSON.parse(file);
    //add reponse to the existing object
    let writeFile = Object.assign(currentPost, parsedFile);
    console.log(writeFile); 
    writeFile = JSON.stringify(writeFile); 

    fs.writeFile(__dirname + '/data/posts.json', writeFile, function(err){
      if(err) {
        return console.log(err);
      };
    console.log("The file was saved!");
    });
  });
}); 



//set a port for the server to listen to
app.listen(3000, function () {
  console.log('The server is listening on port 3000. Ready to accept requests.')
});

// //writing to hard disk
// fs.writeFile('location-of-file', yourData, function (error){
//   //doSomething here 
// });

// fs.readFile('file-path', function (error, file) {
//   //doSomething here
// });

//routing
//handler function always takes a request and response object
app.get("/get-posts", function(req, res) {
  //when it responds to a request from the / path it sends the response below
  res.sendFile(__dirname + '/data/posts.json');
})

// app.get("/node", function(req, res) {
//   //when it responds to a request from the / path it sends the response below
//   res.send("What's node?");
// })

// app.get("/girls", function(req, res) {
//   //when it responds to a request from the / path it sends the response below
//   res.send("The future is female!");
// })




