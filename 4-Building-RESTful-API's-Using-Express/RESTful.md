# Building RESTful API's Using Express

## 1 - Introduction

So, earlier in section 2, were we talked about Node's Module System. You learned about *HTTP Module*. We use it to create a web server that listens on *port 3000* and responds to requests to the end-points. So the root or */api/courses*. Now, while this approach is perfectly fine, it's not ideal for building a complex application. Because in a large complex application, we might have various endpoints and we don't want to hard code all these *if* statements in the function. So in this section, we're going to look at *Express* which is a fast and light weight framework forb building web applications. So  next we're going to look at *RESTful services*.

## 2 - RESTful Services

Let's start this section by a brief introduction to *RESTful services*. Also called *RESTful API's*. So earlier, at the beginning of this course, I introduced you to the client server architecture. So most, if not all applications we use these
days follow this architecture. The app itself is the client or the frontend part. Under the hood, it needs to talk to the
server or the backend, to get or save the data. This communication happens using the *http* protocol. The same protocol that powers our web. So on the server, we expose a bunch of services that are accessible via the http protocol. The client can then directly call these services by sending http requests. Now, this is where *REST* comes into the picture. *REST* is short for Representational State Transfer. It may probably doesn't make any sence to you, because it was introduced by a PhD student as part of his thesis. But the theory aside, *REST* is baiscally a convention for building these http services.

> *REST* is short for Representational State Transfer. It may probably doesn't make any sence to you, because it was introduced by a PhD student as part of his thesis.

So, we use simple http protocol principles to provide suport to 'create, read, update, and delete date'. We refer to these operations as *CRUD* operations. Now let's explore this convention using a real world example. Let's say we have a company called Vidly for renting out Movies. We have a client app where we manage the lists of our customers. On the server, we should expose a service and endpoint like this: *http//vidly.com/api/customers*. So the client can send http requests to this endpoint to talk to our service. Now a few things about this endpoint you need to know.

First of all, the address can start with http, or https. That depends on the application and it's requirements. If you want the data to be exchanged on a secure channel, you would use https. After that we have the domain of the application. Next we have */api*. This is not compulsory, but you see alot of companies follow this convention to expose their RESTful services. They include the word *API* somewhere in the address. It can be after the domain or it can be a *sub*domain like *api.vidly.com*. There is no hard and fast rule. After that, we have */customers* which refers to the collection of customers in our application. In the *REST* world, we refer to this part as a resource. We can expose our resources such as customers, movies, rentals, and various endpoints.

So this is our endpoint to work with the customers. All the operations around customers, such as creating a customer, or updating a customer, would be done be sending an http request to this endpoint. The type of the http request determines the kind of the operation. So every http request has what we call a verb or a method that determines it's type or intension. Here are the standard http methods. We have *GET* for getting data, *POST* for creating data, *PUT* for updating data, *DELETE* for deleting data. Now let's explore each of these using our customers example. To get the list of all customers, we should send an http *GET* request to this address: Request => *GET /api/customers*. Note the plural name of customers here, it indicates a list of customers. So we send an http get request to this endpoint, our service should sent us something like this: Response =>

```javasript

[
 { id: 1, name: '' },
 { id: 2, name: '' },
 ...  
]

```

So we have an array of customer object. If we want a single customer, we should include the id (1) of that customer in the address: Request => *GET /api/customers/1*. Then our server would respond to the customer object like this: Response => *{ id: 1, name: '' }*. Now to update a customer, we should send an http *PUT* request to this endpoint: Request => *PUT /api/customers/1 => { name: '' }*. And note that again here, we are specifying the id (1) of the customer to be updated. But also we should include the customer object in the body of the request as indicated above. So this is a complete representation of the customer object with updated properties. We send this to the server, and the server updates the customer with a given id according to these values: Response => *{ id: 1, name: '' }*. Similarly, to delete a customer, we should send an http *DELETE* request to this endpoint: Request => *DELETE /api/customers/1*. But here, we don't need to include the customer object in the body of the request, because all we need to delete a customer is an id.

And finally to create a customer, we need to send an http *POST* request to this endpoint: Request => *POST /api/customers => { name: '' }* Note that here because we are adding a new customer, we are not dealing with a specific customer, so we don't have the id in the address. We are working with the collection of customers, so we are posting a new customer to this collection. And that's why we should include the customer object in the body of the request. The server gets this object and creates the customer for us: Response => *{ id: 1, name: '' }*.

So this is the RESTful convention, we expose our resources such as customers using a simple, meaningful address, and support various operations around them, such as creating or updating them, using standard http methods. *GET /api/customers*, *GET /api/customers/1*, *PUT /api/customers/1*, *DELETE /api/customers/1*, *POST /api/customers*. So, through out this section, you're going to learn how to use the Express framework to build a *RESTful* service for managing the list of customers. However, in this section, we won't be doing any database work, because that will bring additional complexity. Our focus will be purely on building http services and we will use a simple array in memory to keep the list of our customers. Later in the course, we'll look at using a database.

> So this is the RESTful convention, we expose our resources such as customers using a simple, meaningful address, and support various operations around them, such as creating or updating them, using standard http methods. *GET /api/customers*, *GET /api/customers/1*, *PUT /api/customers/1*, *DELETE /api/customers/1*, *POST /api/customers*.

## 3 - Introducing Express

```javascript
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
```

So here's the code that we wrote in the section about Node core, where I introduced you to the http module. So we can see,
with http module we can create a web server. Here we have a callback function that takes two parameters, requests and
response. And with this request object, we can check the *URL* of the incoming request. So with this, we can define various
routes for our application. So if we have a request for let's say *(req.url === '/api/courses')*, this is how we're going
to respond to the client *{ res.write(JSON.stringify([1, 2, 3])); }*. Now, while this approach certainly works, it's not
very maintainable, because as we define more routes for our application, we need to add more *if* blocks in the callback
function. So that's when a framework comes into the picture.

A framework gives our application a proper structure, so we can easily add more routes, while keeping our application code maintainable. There are various frameworks out there for building web applications and web servers on top of Node. The most popular one is *Express*. So if you head over to *npmjs.com*, and search for express. So back in the terminal, let's create a folder and call it *express-demo*. Let's run *npm init* with *--yes* flag inside the folder. So now, we have a package.json file and finally we can install express. In the next lecture I'm going to show you how to build your first web server using express.

> A framework gives our application a proper structure, so we can easily add more routes, while keeping our application code maintainable. There are various frameworks out there for building web applications and web servers on top of Node. The most popular one is *Express*.

## 4 - Building Your First Web Server

Alright, let's add a new file and name it *index.js*. You could also call it *app.js*, it doesn't really matter. So in this file, first we want to load the *Express* module. So we use our *require* function, give it the name of our module, which is *express*. Now this returns a function, we call that express. Now we need to call this function *(see index.js)* file. As you can see, this returns an object of type express. By covention, we call this object, *app*. So we store the result in a constant called *app*. So this represents our application. This *app* object has a bunch of useful methods. We have methods like, *GET*, *POST*, *PUT* and *DELETE*.

All these methods correspond with *http* verbs, or *http* methods that I told you about earlier in this section. So if you want to handle an *http Post request* and *endpoint*, you would use *app.post()*. In this lecture we just want to use *app.get()*. We want to impliment a coulple of end-points that respond to an *http get requests*. So this method takes two arguments. The first argument is the path or the url. So here I'm going to use slash (/) to represent the root of the website. Now the second argument is a callback function. This is the function that would be called when we have an http *get* request to this endpoint. So this callback function should have two arguments, *Request* and *Respond*.
This request object has a bunch of useful properties that gives us information about the in-coming requests.

```javascript
app.get('/', (req, res) => {
    res.send('Hello World!!!');
});
```

If you want to learn about all these properties, its best to look at the Express Documentation, because in this course we're going to use only a handful of these properties. So, head over to [*Expressjs.com*](http://expressjs.com/). On the top, look at the *API* reference, version 4. Now here we can see the request object, and below you can see all the properties that are available to you. We have *baseUrl*, we have *body* to read the body of the request, *cookies*, *fresh*, *hostname*, *ip*, and so on.

So back to our code, when we get an http request to the root of our website, we're going to respond in *Hello World* message. So response.send('Hello World'). So this is how we define a route. We specify the path or the Url, and a callback function which is also called a route handler. Now finally, we need to listen on a given port. So we call app.listen. We give it a port number like 3000, and optionally we can pass a function that will be called when the application starts listening on the given port. So once again we use the arrow function syntax to display something on the console. So back in the terminal, 'node index.js'. Okay we're listening on port 3000. Now let's switch over to Chrome and go 'localhost:3000'. So here's Our 'Hello World' message.

Now let's define another route. Once again, we're going to call 'app.get', this one is going to be /api/courses. Once again you pass a function with two arguments, that is request and response, and this goes to a code block. Now in a real-world scenario, here you want to get the list of courses from the database and return them. But as I told you before, in this section our focus is purely on building these endpoints, we're not going to do any database work. So I'm going to simply return an array of numbers. So response.send, we pass an array of 3 numbers. In the future we can replace these numbers with actual course objects. So save. Now back in the terminal, we have to stop the earlier process and start it again. So, press control and C to cancel. Okay, one more time, 'node index.js'. Now back in Chrome, let's head over to '/api/courses'. Look we have an array of 3 numbers, beautiful. So this is what I want you to pay attention to here, in this implementation, we don't have those 'if (?)' blocks. We define new route, like calling 'app.get', and with this structure, as our application grows, we can move some of these routes to different files. For example, we can move all the routes related to courses to a separate file, like 'courses.js'. So Express gives our application a skeleton, a structure.

> So this is what I want you to pay attention to here, in this implementation, we don't have those 'if (?)' blocks. We define new route, like calling 'app.get', and with this structure, as our application grows, we can move some of these routes to different files. For example, we can move all the routes related to courses to a separate file, like 'courses.js'. So Express gives our application a skeleton, a structure.
