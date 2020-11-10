// 1 - Introduction

//So, earlier in section 2, were we talked about Node's Module System. You learned about 'HTTP Module'. We use it to create
//a web server that listens on 'port 3000' and responds to requests to the end-points. So the root or '/api/courses'. Now,
//while this approach is perfectly fine, it's not ideal for building a complex application. Because in a large complex 
//application, we might have various endpoints and we don't want to hard code all these 'if' statements in the function. So
//in this section, we're going to look at 'Express' which is a fast and light weight framework forb building web applications.
//So  next we're going to look at 'RESTful services'.


// 2 - RESTful Services

//Let's start this section by a brief introduction to 'RESTful services'. Also called "RESTful API's". So earlier, at the
//beginning of this course, I introduced you to the client server architecture. So most, if not all applications we use these
//days follow this architecture. The app itself is the client or the frontend part. Under the hood, it needs to talk to the
//server or the backend, to get or save the data. This communication happens using the http protocol. The same protocol that
//powers our web. So on the server, we expose a bunch of services that are accessible via the http protocol. The client can
//then directly call these services by sending http requests. Now, this is where Rest comes into the picture. REST is short
//for Representational State Transfer. It may probably doesn't make any sence to you, because it was introduced by a PhD 
//student as part of his thesis. But the theory aside, REST is baiscally a convention for building these http services. So,
//we use simple http protocol principles to provide suport to 'create, read, update, and delete date'. We refer to these
//operations as CRUD operations. Now let's explore this convention using a real world example. Let's say we have a company
//called Vidly for renting out Movies. We have a client app where we manage the lists of our customers. On the server, we 
//should expose a service and endpoint like this: http//vidly.com/api/customers. So the client can send http requests to this
//endpoint to talk to our service. Now a few things about this endpoint you need to know. First of all, the address can 
//start with http, or https. That depends on the application and it's requirements. If you want the data to be exchanged on
//a secure channel, you would use https. After that we have the domain of the application. Next we have /api. This is not
//compulsory, but you see alot of companies follow this convention to expose their RESTful services. They include the word
//API somewhere in the address. It can be after the domain or it can be a subdomain like 'api.vidly.com'. There is no hard
//and fast rule. After that, we have /customers which refers to the collection of customers in our application. In the REST
//world, we refer to this part as a resource. We can expose our resources such as customers, movies, rentals, and various 
//endpoints. So this is our endpoint to work with the customers. All the operations around customers, such as creating a 
//customer, or updating a customer, would be done be sending an http request to this endpoint. The type of the http request
//determines the kind of the operation. So every http request has what we call a verb or a method that determines it's type 
//or intension. Here are the standard http methods. We have 'GET' for getting data, 'POST' for creating data, 'PUT' for 
//updating data, 'DELETE' for deleting data. Now let's explore each of these using our customers example. To get the list of
//all customers, we should send an http 'GET' request to this address: Request => GET /api/customers. Note the plural name 
//of customers here, it indicates a list of customers. So we send an http get request to this endpoint, our service should 
//sent us something like this: Response =>
//[
//  { id: 1, name: '' },
//  { id: 2, name: '' },
//  ...  
//]
//So we have an array of customer object. If we want a single customer, we should include the id (1) of that cuustomer in 
//the address: Request => GET /api/customers/1. Then our server would respond to the customer object like this:
//Response => { id: 1, name: '' }. 
//Now to update a customer, we should send an http 'PUT' request to this endpoint: 
//Request => PUT /api/customers/1. 
//           { name: '' }
//And note that again here, we are specifying the id (1) of the customer to be updated. But also we should include the 
//customer object in the body of the request as indicated above. So this is a complete representation of the customer object
//with updated properties. We send this to the server, and the server updates the customer with a given id according to these
//values: Response => { id: 1, name: '' }. 
//Similarly, to delete a customer, we should send an http 'DELETE' request to this endpoint:
//Request => DELETE /api/customers/1. But here, we don't need to include the customer object in the body of the request,
//because all we need to delete a customer an id.
//And finally to create a customer, we need to send an http 'POST' request to this endpoint: 
//Request => POST /api/customers
//           { name: '' }
//Note that here because we are adding a new customer, we are not dealing with a specific customer, so we don't have the id
//in the address. We are working with the collection of customers, so we are posting a new customer to this collection. And
//that's why we should include the customer object in the body of the request.
//The server gets this object and creates the customer for us: Response => { id: 1, name: '' }.
//So this is the RESTful convention, we expose our resources such as customers using a simple, meaningful address, and 
//support various operations around them, such as creating or updating them, using standard http methods.
//GET /api/customers
//GET /api/customers/1
//PUT /api/customers/1
//DELETE /api/customers/1
//POST /api/customers
//So, through out this you're going to learn how to use the Express framework to build a RESTful service for managing the
//list of customers. However, in this section, we won't be doing any database work, because that will bring additional 
//complexity. Our focus will be purely on build http services and we will use a simple array in memory to keep the list of 
//our customers. Later in the course, we'll look at using a database.


// 3 - Introducing Express

const http = require('http');
const { url } = require('inspector');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    }

    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]));
    }
    res.end();
});

server.listen(3000);

console.log('Listening on port 3000...');

//So here's the code that we wrote in the section about Node core, where I introduced you to the http module. So we can see,
//with http module we can create a web server. Here we have a callback function that takes two parameters, requests and
//response. And with this request object, we can check the URL of the incoming request. So with this, we can define various
//routes for our application. So if we have a request for let's say (req.url === '/api/courses'), this is how we're going
//to respond to the client { res.write(JSON.stringify([1, 2, 3])); }. Now, while this approach certainly works, it's not
//very maintainable, because as we define more routes for our application, we need to add more 'if' blocks in the callback
//function. So that's when a framework comes into the picture. A framework gives our application a proper structure, so we
//can easily add more routes, while keeping our application code maintainable. There are various frameworks out there for
//building web applications and web servers on top of Node.



