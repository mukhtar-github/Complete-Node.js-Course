// 1 - Introduction

// So, earlier in section 2, were we talked about Node's Module System. You learned about 'HTTP Module'. We use it to create
// a web server that listens on 'port 3000' and responds to requests to the end-points. So the root or '/api/courses'. Now,
// while this approach is perfectly fine, it's not ideal for building a complex application. Because in a large complex 
// application, we might have various endpoints and we don't want to hard code all these 'if' statements in the function. So
// in this section, we're going to look at 'Express' which is a fast and light weight framework forb building web applications.
// So  next we're going to look at 'RESTful services'.


// 2 - RESTful Services

// Let's start this section by a brief introduction to 'RESTful services'. Also called "RESTful API's". So earlier, at the
// beginning of this course, I introduced you to the client server architecture. So most, if not all applications we use these
// days follow this architecture. The app itself is the client or the frontend part. Under the hood, it needs to talk to the
// server or the backend, to get or save the data. This communication happens using the http protocol. The same protocol that
// powers our web. So on the server, we expose a bunch of services that are accessible via the http protocol. The client can
// then directly call these services by sending http requests. Now, this is where Rest comes into the picture. REST is short
// for Representational State Transfer. It may probably doesn't make any sence to you, because it was introduced by a PhD 
// student as part of his thesis. But the theory aside, REST is baiscally a convention for building these http services. So,
// we use simple http protocol principles to provide suport to 'create, read, update, and delete date'. We refer to these
// operations as CRUD operations. Now let's explore this convention using a real world example. Let's say we have a company
// called Vidly for renting out Movies. We have a client app where we manage the lists of our customers. On the server, we 
// should expose a service and endpoint like this: http//vidly.com/api/customers. So the client can send http requests to this
// endpoint to talk to our service. Now a few things about this endpoint you need to know. First of all, the address can 
// start with http, or https. That depends on the application and it's requirements. If you want the data to be exchanged on
// a secure channel, you would use https. After that we have the domain of the application. Next we have /api. This is not
// compulsory, but you see alot of companies follow this convention to expose their RESTful services. They include the word
// API somewhere in the address. It can be after the domain or it can be a subdomain like 'api.vidly.com'. There is no hard
// and fast rule. After that, we have /customers which refers to the collection of customers in our application. In the REST
// world, we refer to this part as a resource. We can expose our resources such as customers, movies, rentals, and various 
// endpoints. So this is our endpoint to work with the customers. All the operations around customers, such as creating a 
// customer, or updating a customer, would be done be sending an http request to this endpoint. The type of the http request
// determines the kind of the operation. So every http request has what we call a verb or a method that determines it's type 
// or intension. Here are the standard http methods. We have 'GET' for getting data, 'POST' for creating data, 'PUT' for 
// updating data, 'DELETE' for deleting data. Now let's explore each of these using our customers example. To get the list of
// all customers, we should send an http 'GET' request to this address: Request => GET /api/customers. Note the plural name 
// of customers here, it indicates a list of customers. So we send an http get request to this endpoint, our service should 
//sent us something like this: Response =>
// [
//  { id: 1, name: '' },
//  { id: 2, name: '' },
//  ...  
// ]
// So we have an array of customer object. If we want a single customer, we should include the id (1) of that customer in 
// the address: Request => GET /api/customers/1. Then our server would respond to the customer object like this:
// Response => { id: 1, name: '' }. 
// Now to update a customer, we should send an http 'PUT' request to this endpoint: 
// Request => PUT /api/customers/1. 
//           { name: '' }
// And note that again here, we are specifying the id (1) of the customer to be updated. But also we should include the 
// customer object in the body of the request as indicated above. So this is a complete representation of the customer object
// with updated properties. We send this to the server, and the server updates the customer with a given id according to these
// values: Response => { id: 1, name: '' }. 
// Similarly, to delete a customer, we should send an http 'DELETE' request to this endpoint:
// Request => DELETE /api/customers/1. But here, we don't need to include the customer object in the body of the request,
// because all we need to delete a customer is an id.
// And finally to create a customer, we need to send an http 'POST' request to this endpoint: 
// Request => POST /api/customers
//           { name: '' }
// Note that here because we are adding a new customer, we are not dealing with a specific customer, so we don't have the id
// in the address. We are working with the collection of customers, so we are posting a new customer to this collection. And
// that's why we should include the customer object in the body of the request.
// The server gets this object and creates the customer for us: Response => { id: 1, name: '' }.
// So this is the RESTful convention, we expose our resources such as customers using a simple, meaningful address, and 
// support various operations around them, such as creating or updating them, using standard http methods.
// GET /api/customers
// GET /api/customers/1
// PUT /api/customers/1
// DELETE /api/customers/1
// POST /api/customers
// So, through out this you're going to learn how to use the Express framework to build a RESTful service for managing the
// list of customers. However, in this section, we won't be doing any database work, because that will bring additional 
// complexity. Our focus will be purely on build http services and we will use a simple array in memory to keep the list of 
// our customers. Later in the course, we'll look at using a database.


// 3 - Introducing Express

// const http = require('http');
// const { url } = require('inspector');

// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.write('Hello World');
//         res.end();
//     }

//     if (req.url === '/api/courses') {
//         res.write(JSON.stringify([1, 2, 3]));
//     }
//     res.end();
// });

// server.listen(3000);

// console.log('Listening on port 3000...');

// So here's the code that we wrote in the section about Node core, where I introduced you to the http module. So we can see,
// with http module we can create a web server. Here we have a callback function that takes two parameters, requests and
// response. And with this request object, we can check the URL of the incoming request. So with this, we can define various
// routes for our application. So if we have a request for let's say (req.url === '/api/courses'), this is how we're going
// to respond to the client { res.write(JSON.stringify([1, 2, 3])); }. Now, while this approach certainly works, it's not
// very maintainable, because as we define more routes for our application, we need to add more 'if' blocks in the callback
// function. So that's when a framework comes into the picture. A framework gives our application a proper structure, so we
// can easily add more routes, while keeping our application code maintainable. There are various frameworks out there for
// building web applications and web servers on top of Node. The most popular one is Express. So if you head over to npmjs.com,
// and search for express. So back in the terminal, let's create a folder and call it 'express-demo'. Let's run npm init 
// with --yes flag inside the folder. So now, we have a package.json file and finally we can install express. In the next 
// lecture I'm going to show you how to build your first web server using express.


// 4 - Building Your First Web Server

// Alright, let's add a new file and name it index.js. You could also call it app.js, it doesn't really matter. So in this 
// file, first we want to load the express module. So we use our require function, give it the name of our module, which is
// express. Now this returns a function, we call that express. Now we need to call this function (see index.js). As you can 
// see, this returns an object of type express. By covention, we call this object, app. So we store the result in a constant
// called app. So this represents our application. This app object has a bunch of useful methods. We have methods like, GET,
// POST, PUT and DELETE. All these methods correspond with http verbs, or http methods that I told about earlier in this 
// section. So if you want to handle an http Post request and endpoint, you would use app.post(). In this lecture we just 
// want to use app.get(). We want to impliment a coulple of end-points that respond to an http get requests. So this method 
// takes two arguments. The first argument is the path or the url. So here I'm going to use slash (/) to represent the root
// of the website. Now the second argument is a callback function. This is the function that would called when we have an 
// http 'get' request to this endpoint. So this callback function should have two arguments, Request and Respond.
// This request object has a bunch of useful properties that gives us information about the in-coming requests. If you want
// to learn about all these properties, its best to look at the Express Documentation, because in this course we're going use
// only a handful of these properties. So, head over to Expressjs.com. On the top, look at the API reference, version 4. Now
// here we can see the request object, and below you can see all the properties that are available to you. We have 'baseUrl',
// we 'body' to read the body of the request, 'cookies', 'fresh', 'hostname', 'ip', and so on. So back to our code, when we 
// get an http request to the root of our website, we're going to respond in 'Hello World' message.
// So response.send('Hello World'). So this is how we define a route. We specify the path or the Url, and a callback function
// which is also called a route handler. Now finally, we need to listen on a given port. So we call app.listen. We give it a
// port number like 3000, and optionally we can pass a function that will be called when the application starts listening on
// the given port. So once again we use the arrow function syntax to display something on the console. So back in the terminal,
// 'node index.js'. Okay we're listening on port 3000. Now let's switch over to Chrome and go 'localhost:3000'. So here's Our
// 'Hello World' message. Now let's define another route.
// Once again, we're going to call 'app.get', this one is going to be /api/courses. Once again you pass a function with two
// arguments, that is request and response, and this goes to a code block. Now in a real-world scenario, here you want to
// get the list of courses from the database and return them. But as I told you before, in this section our focus is purely
// on building these endpoints, we're not going to do any database work. So I'm going to simply return an array of numbers.
// So response.send, we pass an array of 3 numbers. In the future we can replace these numbers with actual course objects.
// So save. Now back in the terminal, we have to stop the earlier process and start it again. So, press control and C to 
// cancel. Okay, one more time, 'node index.js'. Now back in Chrome, let's head over to '/api/courses'. Look we have an array of
// 3 numbers, beautiful. So this is what I want you to pay attention to here, in this implementation, we don't have those
// 'if (?)' blocks. We define new route, like calling 'app.get', and with this structure, as our application grows, we can
// move some of these routes to different files. For example, we can move all the routes related to courses to a separate
// file, like 'courses.js'. So Express gives our application a skeleton, a structure.


// 5 - Nodemon

// So far you've notice that every time we make a change to this code, we have to go back in terminal and stop this process
// and start it again. This is very tedious. So I'm going to you a better way.
// We're going to install a node package called Nodemon, which is short for Node Monitor. So in the terminal 'npm install -g'
// because we want to install this globally so we can run it anywhere. And te name of the package is Nodemon.
// Alright nodemon is installed. So with this, instead of running our application using node, we use use nodemon. Now we can
// see nodemon is watching all the files in this folder. Any files with any extensions. So, if we go back to our code and
// make a simple change and then save the file, now look in the terminal, nodemon restarted our application or our process
// due to changes. So we don't have to do this manually anymore. Now back in the browser, if we send a request to the root
// of the website, we can see our new message displayed there.


// 6 - Environment Variables

// Now, one thing we need to improve in this code, is this hard coded value (3000) for the ports. So, we have used 3000 as
// an anbitrary number, while this may work on your developement machine. It's unlikely that this is going to work in the
// production environment. Because when you deploy this application to a hosting environment, the port is dynamically
// assigned by the hosting environment. So we can't rely on 3000 to be available. So, the way to fix this is by using an 
// environment variable. So, typically in hosting environments for Node applications, we have this environment variable
// called ports. An environment variable is basically a variable that is part of the environment in which a process runs.
// It's value is set outside this application. I'm going to show you how that works in a second. So, in this application, we
// need to read the value of this port environment variable. And the way we do that is by using the process object. So, we 
// have this global object called 'Process'. This object has a property called 'env', which is short for environment 
// variables. And after that, we add the name of our environment variable, in this case 'PORT'. So, if this is set, we're 
// going to use this, otherwise, we're going to use 3000. Now, we can store the result in a constant called port. And finally,
// we need to replace 3000 with port, and also change our message accordingly. So, I'm going to replace the single code with
// back tick. So, we can use a template string. And we're going to 3000 with a dynamic value. So, we add doller sign, curly
// braces, and then add our constant, in ths case 'port'. Now, back in the terminal, let'srun this application using nodemon.
// So, on this machine you can see, I don't have an environment variable called 'port', that's why 3000 is used as the port
// for this web server. Now, I'm going to set an environment variable. So, let's stop this process.  On Mac we can set an 
// environment variable by executing the 'export' command. If you're on Windows, you should use 'set'. So, 'export' or 'set',
// we add the name of the environment variable, in this case 'PORT'. And set it's value. I'm going to use 5000. So, now we
// have this environment variable called 'PORT', with the value of 5000. With these, when we run this application, 
// 'nodemon index.js', we can see that now, we are listening on port 5000. So, this is the proper way to assign a port to
// your Node applications. You should attempt to read the value of an environment variable called port. If there is a value,
// you should use that. Otherwise, use an arbitrary number through a developement machine.
// //PORT
// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening on port ${port}...`));


// 7 - Route Parameters

// Alright, so currently we have a route for getting the list of courses. Now, in this section, I'm going to show you how to 
// create a route, to get a single course. So, earlier in one of the sections, where I talked about RESTful servises. You
// learn that in order to get a single course, we should include the ID of the course in the URL. So, our endpoint should be
// like this, '/api/courses/1', assuming that '1' is the ID of the course. So, let's see how we can impliment a route like
// this. So app.get, we add the path, tat is api/courses, now here we need to define a paramter, so we add colon(:) and id. 
// So, id is the name of our parameter here, you can use anything here, it doesn't have to be id, it could be course id. But
// id is shorter, and more conventiontional. Now we add our route handler function. So request and response goes to, now in 
// order to read this parameter, we use request.params.id. So for now, let's just send this to the client. So resource.send.
// Back in the browser, now let's head over to /api/courses/1. So you can see, we successfully read the value of this parameter.
// Also it is possible to have multiple parameters in a route. For example, imagine you're building a service for powering a
// block. So you could have a route like this, posts, year, month. So we have two parameters. And with this, we can get all 
// the posts for the given months and the given year. Now we can read this parameters just like before. So request.params.year
// or month. For this demo, let me show you this request.params object. So let's delete year, save. =>
// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.params);
// });
//Back in browser, let's head over to api/posts/2018/1 => 
// {
// year: "2018",
// month: "1"
// }
// So this is our request params object. We have two properties, year and month, and their name based on our route parameters.
// With Express we can also get Query string parameters. These are parameters that we add in the Url after question mark(?),
// for example, we can get all the posts in January 2018, and sort them by their name. So we add a question mark, sortBy,
// set this to name. => http://localhost:3000/api/posts/2018/1?sortBy=name. This is a Query string parameter. We use Query
// string parameters to provide additional data for our backend services. So we use route parameters for essential or required
// values, whereas we use query string parameters for anything that is optional. Now let me show you how to read query parameters.
// So, back in VS code, instead of requested params, we use request.query. Back in Chrome, and this is what we get. =>
// {
//     sortBy: "name"
// }
//So query parameters are stored in an object with a bunch of key value pairs.


// 8 - Handling HTTP GET Requests

//Alright, now let's impliment a new endpoint, to get a single course from the server. So, first of all let's change =>
// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.params);
// });
// Back to =>
// app.get('/api/courses/:id', (req, res) => {
//     res.send(req.params);
// });
// Wen put the courses and the id parameter. Now, on the top, let's define an array called courses, so constant, we set it to
// an array, and in this array we're going to have 3 course objects. So each object should have a couple of properties, like 
// 'id' and 'name'. And ofcourse we can have more, but for simplicity I'm just going to stick to two properties. Okay, now
// let's duplicate the line and change the id's as well as the name, 2 and 3. So we have two endpoints. One to get all the 
// courses and the other to get a single course. In the first one, we're going to return our courses array. Now in the second
// one, we should write some logic to look for the course with the given id. So, let's delete that which is inside our curly
// brackets first. We're going to call 'courses.find', this is a method that is available on every array in Javascript, as
// an argument to this method, we need to pass a function. This function will be used to find a course that matches a given
// criteria. So, we use the arrow function syntax, 'c =>', and here we write some logic that returns a boolean value. This
// boolean value determines if this course is the one we're looking for or not. So, 'c.id' should equal 'req.params.id', 
// however, this returns a string. So in order for this comparison to work properly, we need to parse this string into an 
// integer. So we call 'parseInt', which is one of the global functions available in Javascript, and then get the result and 
// store it in a constant called course. Now you might be asking why I didn't use 'var' here. Well that would be perfectly 
// fine and that's how most Javascript code out there is written. But going forward, it's best to drop  'var' and either use 
// 'let' or 'const'. We use 'let' if we want to define a variable that we can reset later and use 'const' if we want to define
// a constant. In this case, I don't want to reset the course later in this function. But again, it's perfectly fine to use
// 'let' here as well, its just personal preference. So, we get the course object. Now, if this course doesn't have a value,
// in other words, if you don't find a course with the given id, by convention we should return a response with the http 
// status code of '404'. That means object not found. So this is one of the conventions of RESTful api's. If the client asks
// for a resource, but that resource does not exist on the server, we should return a response with the status code of '404'.
// So, here we call 'res.status(404)'. And optionally, we can send a message as well.
// So, 'send("The course with the given ID was not found")'. Otherwise if we do have a course without an 'id', we are simply
// going to return that to the client. So, 'res.send(course)'. Now let's test this. So back in the browser. Let's head over 
// to 'http://localhost:3000/api/courses/1'. So we have the course with the id '1', and that's why we get this json object in
// the response. However, if I change this to '10', we get this message 'The course with the given ID was not found'. And to
// ensure that the status code of this response is '404', we can open up Chrome developer tools, so right click on the page,
// go to 'inspect', and then on the network tab, make sure you don't have a filter here, so select all, and then refresh the
// page by pressing 'ctrl R' on Windows or 'Cmd R' on Mac. So here is the request that we sent to the server, you can see the
// status is '404', which means not found.


// 9 - Handling HTTP POST Requests

// So far we have created two routes, that respond to http requests, and we use these routes to get all the courses as well
// as a single course. In this lecture, I'm going to teach you how to respond to http post requests. So we use an http post 
// request to create a new course. So, 'app.post' instead of the 'get' method, we use the post method. Now similar to the 
// 'get' method, we need to specify a path. So that should be '/api/courses'. Because we're going to post to the collection 
// of courses, that's why we use the plural name. Then we add our route handler. So request and response goes to code block.
// Alright, so, in this route handler, we need to read the course object that should be in the body of the request, use these
// properties to create a new course object, and then add that course object to our courses array. So, let's create a new 
// course object, 'const course'. Again, I'm using a 'const' here, because we're not going to reset this course object later.
// So let's set this to a new object. Now, here because we're not working with a database, we need to manually assign an 'id'.
// So, 'id', we get the number of elements in our courses array. So 'courses.length', and simply add '1' to it. In the future,
// when we work with a database, the 'id' will be assigned by the database. Next, is the name property. Now, we need to read
// this from the body of the request. So 'req.body.name'. So here I'm assuming that in the request body, we have an object 
// and that object has a name property. Now, in order for this line to work, we need to enable parsing up JSON objects in
// body of the request. Because by default, this feature is not enabled in 'Express'. So on the top, after we get the app 
// object, we need to call 'app.use', and here we call 'express.json'. Now this may look a little bit strange or unfamiliar
// to you, but don't worry, later in this section we're going to explore this in detail. Basically what we're doing here is 
// adding a piece of middle ware. So when we call 'express.json' method, this method returns a piece of middle ware and then 
// we call 'app.use' to use that middle ware in the request processing pipeline. Again we're going to explore that in detail 
// later in the section. So, back to our new route handler. We have a course object, next we push it in an array, so 
// 'courses.push'. And finally, by convention when we post an object to the server, when the server creates a new object or 
// a new resource, it should return that object in the body of the response. So ' res.send(course)'. The reason for this, is 
// because we're assigning this 'id: courses.length + 1' on the server. So we need to return this course object to the client, 
// because chances are the client needs to know the 'id' of this new object or this new resource. So this is how we handle
// http post requests. In the next lecture, I'm going to show you how to test this endpoint.


// 10 - Calling Endpoints Using Postman

//To call http services, we use a Chrome extention called 'Postman'. So if you haven't installed Postman before, search for
//'Chrome Postman'. Here is Postman. Simply add it to chrome. Now you can open this from the apps menu. Now here it is asking
//to sign up, but you don't have to do this. There is a link taking you straight to the app. Now on this page we can create
//a new http request. So, from this dropdown list, we set the type to a post request, we put the url, in this case that's
//'http://localhost:3000/api/courses', on my machine I'm using port 3000 to host this application. Now we need to set the 
//body of this request. From this list, select raw, and then json. So with this, we can put a json object in the body of the 
//request. So let's add an object here, and give it a name property. So 'name', we set this to 'new course'. And then finally,
//send. Okay, if you scroll down you can see the status of the request is 200, which means the request was handled successfully,
//and here's the body of the response. So id is 4, because now we have 4 courses in our array, and this is the same name that
//we sent to the server. So this is how we test http services, using Postman. Now in this implementation, we have assumed that
//there is an object with the name property in the body of the request. What if the client forgets to send this property or
//sends an invalid name, perhaps a name that is too short? That's where input validation comes into the picture, and that's 
//the topic for the next lecture.


// 11 - Input Validation

//In this lecture, I'm going to show you how to do Input Validation. So as a security best practice, you should never ever,
//ever, trust what the client sends you. You should always validate the input. So in this particular example, because we're
//dealing with a simple object with only one property, that is 'name', we can write some validation logic like this; So, 
//'if(!req.body.name || req.body.name.length < 3)', then we're going to return an error to the client. The RESTful convention
//is to return a response with the http status code of '400', that means bad request. So to do this, we call 'res.status(400)',
//and then we can send an error message. In this case, we can write a generic error message like; 'Name is required and should
//should be minimum 3 characters'. Now in your implementation, you may want to differentiate the errors. For example, if the
//client didn't send the name property, perhaps you would just respond with 'Name is required'. Or, if they did send the name
//but the name was not long enough, you could send a different error message. And then finally, we return the error message
//because, we don't want the rest of the function to be executed. So this is the basic idea. However, in a real world 
//application, it's more likely that you'll be working with a complex object, something more complex than this course object.
//You don't want to write a complex validation logic like this at the beginning of your route handler. So let me introduce 
//you to a Node package that makes it really easy for you to validate the input. So on Google, if you search for 'npm joi'
//with i, look here's the first link, so here you can see joi has been downloaded over 250 thousand times over the past day,
//and over 3 million times over the past month. It's a very popular package. Also here on the page, you can see some sample
//code and link to their official documentation. Now let me show you how to replace this validation logic with 'joi'. So first
//back in the terminal, let's install joi. So you can see at the time of recording this video, the the latest version is version 
//13.1.0. If you want to make sure that you have exact same experience as what I'm going to show you in this video, then install
//this exact version. So 'npm i joi@13.1.0'. Now back in code. On the top, we need to load this module. So 'require ('joi'),
//get the result and store it in a constant called 'Joi' with a capital 'J'. Because what is returned from this module is a
//class. And as I told you before, in JavaScript, we use pascal naming convention to name our classes. So the first letter 
//of every word should be uppercase. Also as a best practice, put all your required calls on top of the file. This way you 
//can easily see what are the dependencies of this module. So this module, 'index module', is dependent upon two modules,
//one is 'joi', the other is 'express'. So we have this Joi class, now, back in our route handler. Now with joi, fisrt we 
//need




