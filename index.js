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


    // PRODUCT OVERVIEW
   if(pathName === '/products' || pathName === '/'){
    response.writeHead(200, {'Content-type': 'text/html'}); // header ok -> set content type as html/text
    // response.end('this is the PRODUCTS page');                   // print text then

    fs.readFile(`${__dirname}/templates/template-overview.html`, `utf-8`, (err, data) => {

        let overviewOutput = data;
        
        fs.readFile(`${__dirname}/templates/template-card.html`, `utf-8`, (err, data) => {

            const cardsOutput = laptopData.map(el => replaceTemplate(data, el)).join('');
            overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput)
            
            console.log(cardsOutput)
            response.end(overviewOutput)

        });
       
    });

   } 
   

   // LAPTOP DETAIL
   else if
   
    (pathName === '/laptop' && id < laptopData.length ){
        response.writeHead(200, {'Content-type': 'text/html'});
        // response.end(`this is the LAPTOP page for laptop ${id}`);    

        fs.readFile(`${__dirname}/templates/template-laptop.html`, `utf-8`, (err, data) => {
            const laptop = laptopData[id];
            const output = replaceTemplate(data, laptop);
            // let output = data.replace(/{%PRODUCTNAME%}/g, laptop.productName);
            //  output = output.replace(/{%PRICE%}/g, laptop.price);
            //  output = output.replace(/{%IMAGE%}/g, laptop.image);
            //  output = output.replace(/{%SCREEN%}/g, laptop.screen);
            //  output = output.replace(/{%CPU%}/g, laptop.cpu);
            //  output = output.replace(/{%STORAGE%}/g, laptop.storage);
            //  output = output.replace(/{%RAM%}/g, laptop.ram);
            //  output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
            response.end(output)
        });
        
    
   }

//    else if((/\.(jpg)$/i).test(pathName)){
//     fs.readFile( `${__dirname}/data/img${pathName}`, (err,data)=>{ //async
//         response.writeHead(200, {'Content-type': 'image/jpg'});
//         response.end(data);


//     });
//    }
   

    // IMAGES
    else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)) {
        fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) => {
            response.writeHead(200, { 'Content-type': 'image/jpg'});
            response.end(data);
        });
    }

   // URL NOT FOUND
   else{
    response.writeHead(404, {'Content-type': 'text/html'});
    response.end('url is not found on the server');    

   }


});

// to keep listen to a speci port + ip addr
// callback func get fired once it starts listening
server.listen(1338, '127.0.0.1', () =>{
    console.log('Listening for request now')
});


function replaceTemplate(originalHtml, laptop){
    let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%ID%}/g, laptop.id);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    return output;
}