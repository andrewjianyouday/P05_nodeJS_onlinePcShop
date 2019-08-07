const fs = require ('fs'); // core node module
const http = require('http'); // 
const url = require('url');


const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');  // load the file and store in json variable
const laptopData = JSON.parse(json); // pase it into an javascript object 

// console.log(json);
// console.log(__dirname)
// console.log(json)

// create a server // with a callback function that will be run when each tiem that someone accesses the webserver
const server = http.createServer((request, response) => {

    /**
     * Url
     */
   const pathName = url.parse(request.url, true).pathname;
   const id = url.parse(request.url, true).query.id; // read id form URL

    console.log(url.parse(request.url, true));

   if(pathName === '/products' || pathName === '/'){
    response.writeHead(200, {'Content-type': 'text/html'}); // header ok -> set content type as html/text
    response.end('this is the PRODUCTS page');                   // print text then

   } 
   
   else if
   
    (pathName === '/laptop' && id < laptopData.length ){
        response.writeHead(200, {'Content-type': 'text/html'});
        response.end(`this is the LAPTOP page for laptop ${id}`);    
    
   }else{
    response.writeHead(404, {'Content-type': 'text/html'});
    response.end('url is not found on the server');    

   }


});

// to keep listen to a speci port + ip addr
// callback func get fired once it starts listening
server.listen(1338, '127.0.0.1', () =>{
    console.log('Listening for request now')
});
