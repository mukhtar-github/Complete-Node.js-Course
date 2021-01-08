# Building RESTful API's Using Express

## 1 - Introduction

So, earlier in section 2, where we talked about Node's Module System. You learned about *HTTP Module*. We use it to create a web server that listens on *port 3000* and responds to requests to the end-points. So the root or */api/courses*. Now, while this approach is perfectly fine, it's not ideal for building a complex application. Because in a large complex application, we might have various endpoints and we don't want to hard code all these *if* statements in the function. So in this section, we're going to look at *Express* which is a fast and lightweight framework for building web applications. So next we're going to look at *RESTful services*.

## 2 - RESTful Services

Let's start this section with a brief introduction to *RESTful services*. Also called *RESTful API's*. So earlier, at the beginning of this course, I introduced you to the *client-server architecture*. So most, if not all applications we use these days follow this architecture. The *app* itself is the client or the *frontend* part. Under the hood, it needs to talk to the server or the backend, to get or save the data. This communication happens using the *HTTP* protocol. The same protocol that powers our web. So on the server, we expose a bunch of services that are accessible via the HTTP protocol. The client can then directly call these services by sending HTTP requests. Now, this is where *REST* comes into the picture. *REST* is short for Representational State Transfer. It may probably doesn't make any sense to you, because it was introduced by a Ph.D. student as part of his thesis. But the theory aside, *REST* is a convention for building these HTTP services.

> *REST* is short for Representational State Transfer. It may probably doesn't make any sense to you, because it was introduced by a Ph.D. student as part of his thesis.

So, we use simple *HTTP* protocol principles to provide support to *create, read, update, and delete date*. We refer to these operations as *CRUD* operations. Now let's explore this convention using a real-world example. Let's say we have a company called *Vidly* for renting out Movies. We have a client *app* where we manage the lists of our customers. On the server, we should expose a service and, endpoint like this: *http//vidly.com/api/customers*. So the client can send *HTTP requests* to this endpoint to talk to our service. Now a few things about this endpoint you need to know.

First of all, the address can start with *HTTP*, or *HTTPS*. That depends on the application and its requirements. If you want the data to be exchanged on a secure channel, you would use *HTTPS*. After that, we have the domain of the application. Next, we have */api*. This is not compulsory, but you see a lot of companies follow this convention to expose their RESTful services. They include the word *API* somewhere in the address. It can be after the domain or it can be a *sub*domain like *api.vidly.com*. There is no hard and fast rule. After that, we have */customers* which refers to the collection of customers in our application. In the *REST* world, we refer to this part as a resource. We can expose our resources such as *customers*, *movies*, *rentals*, and various endpoints.

So this is our endpoint to work with the customers. All the operations around customers, such as *creating* a customer, or *updating* a customer, would be done by sending an *HTTP* request to this endpoint. The type of *HTTP* request determines the kind of operation. So, every *HTTP* request has what we call a verb or a method that determines its type or intention. Here are the standard *HTTP* methods. We have *GET* for getting data, *POST* for creating data, *PUT* for updating data, *DELETE* for deleting data. Now let's explore each of these using our *customers* example. To get the list of all customers, we should send an HTTP *GET* request to this address: Request => *GET /api/customers*. Note the plural name of customers here, which indicates a list of customers. So we send an *HTTP get* request to this endpoint, our service should send us something like this;

```javasript
[
 { id: 1, name: '' },
 { id: 2, name: '' },
 ...  
]
```

So we have an array of customer objects. If we want a single customer, we should include the id *(1)* of that customer in the address: Request => *GET /api/customers/1*. Then our server would respond to the customer object like this: Response => *{ id: 1, name: '' }*. Now to update a customer, we should send an HTTP *PUT* request to this endpoint: Request => *PUT /api/customers/1 => { name: '' }*. And note that we are specifying the id *(1)* of the customer to be updated. But also, we should include the customer object in the body of the request as indicated above. So this is a complete representation of the customer object with updated properties. We send this to the server, and the server updates the customer with a given id according to these values: Response => *{ id: 1, name: '' }*. Similarly, to delete a customer, we should send an HTTP *DELETE* request to this endpoint: Request => *DELETE /api/customers/1*. But here, we don't need to include the customer object in the body of the request because all we need to delete a customer is an id.

And finally, to create a customer, we need to send an HTTP *POST* request to this endpoint: Request => *POST /api/customers => { name: '' }* Note that here because we are adding a new customer, we are not dealing with a specific customer, so we don't have the id in the address. We are working with the collection of customers, so we are posting a new customer to this collection. And that's why we should include the customer object in the body of the request. The server gets this object and creates the customer for us: Response => *{ id: 1, name: '' }*.

So this is the RESTful convention. We expose our resources such as *customers* using a simple, meaningful address, and support various operations around them, such as creating or updating them, using standard HTTP methods. *GET /api/customers*, *GET /api/customers/1*, *PUT /api/customers/1*, *DELETE /api/customers/1*, *POST /api/customers*. So, throughout this section, you're going to learn how to use the *Express* framework to build a *RESTful* service for managing the list of customers. However, in this section, we won't be doing any *database* work because that will bring additional complexity. Our focus will be purely on building *HTTP* services and, we will use a simple array in memory to keep the list of our customers. Later in the course, we'll look at using a *database*.

> So this is the RESTful convention. We expose our resources such as customers using a simple, meaningful address and support various operations around them, such as creating or updating them, using standard HTTP methods. *GET /api/customers*, *GET /api/customers/1*, *PUT /api/customers/1*, *DELETE /api/customers/1*, *POST /api/customers*.

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

So here's the code that we wrote in the section about Node core, where I introduced you to the *HTTP* module. So we can see, with the *HTTP* module we can create a web server. Here we have a callback function that takes two parameters, *requests* and *response*. And with this *request* object, we can check the *URL* of the incoming request. So with this, we can define various routes for our application. So if we have a request for let's say *(req.url === '/api/courses')*, this is how we're going to respond to the client *{ res.write(JSON.stringify([1, 2, 3])); }*. Now, while this approach certainly works, it's not very maintainable because as we define more routes for our application, we need to add more *if* blocks in the callback function. So that's when a framework comes into the picture.

A framework gives our application a proper structure, so we can easily add more routes while keeping our application code maintainable. There are various frameworks out there for building web applications and web servers on top of Node. The most popular one is *Express*. So if you head over to *npmjs.com* and search for *express*. So back in the terminal, let's create a folder and call it *express-demo*. Let's run the *npm init* with *--yes* flag inside the folder. So now we have a *package.json* file and finally, we can install *express*. In the next lecture, I'm going to show you how to build your first web server using *express*.

> A framework gives our application a proper structure, so we can easily add more routes while keeping our application code maintainable. There are various frameworks out there for building web applications and web servers on top of Node. The most popular one is *Express*.

## 4 - Building Your First Web Server

All right, let's add a new file and name it *index.js*. You could also call it *app.js* it doesn't matter. So in this file, first, we want to load the *Express* module. So we use our *require* function, give it the name of our module, which is *express*. Now, this returns a function, we call that *express*. Now we need to call this function. As you can see, this returns an object of type *express*. By convention, we call this object, *app*. So we store the result in a constant called *app*. So this represents our application. This *app* object has a bunch of useful methods. We have methods like, *GET*, *POST*, *PUT*, and *DELETE*.

```javascript
const express = require('express');
const app = express();
```

All these methods correspond with *HTTP* verbs, or *HTTP* methods that I told you about earlier in this section. So if you want to handle an *HTTP Post request* and *endpoint*, you would use *app.post()*. In this lecture we just want to use *app.get()*. We want to implement a couple of endpoints that respond to an *HTTP get requests*. So this method takes two arguments. The first argument is the path or the url. So here I'm going to use slash (/) to represent the root of the website. Now the second argument is a callback function. This is the function that would be called when we have an HTTP *get* request to this endpoint. So this callback function should have two arguments, *Request* and *Respond*.
This request object has a bunch of useful properties that give us information about the incoming requests.

```javascript
app.get('/', (req, res) => {
    res.send('Hello World!!!');
});
```

If you want to learn about all these properties, its best to look at the Express Documentation because in this course we're going to use only a handful of these properties. So, head over to [*Expressjs.com*](http://expressjs.com/). On the top, look at the *API* reference, version 4. Now here we can see the request object, and below you can see all the properties that are available to you. We have *baseUrl*, we have *body* to read the body of the request, *cookies*, *fresh*, *hostname*, *ip*, and so on.

So back to our code, when we get an HTTP request to the root of our website, we're going to respond in a *Hello World* message. So *response.send('Hello World')*. So this is how we define a *route*. We specify the path or the Url, and a callback function which is also called a *route handler*. Now finally, we need to listen on a given port. So we call *app.listen*. We give it a port number like *3000*, and optionally we can pass a function that will be called when the application starts listening on the given port. So once again we use the arrow function syntax to display something on the console. So back in the terminal, *node index.js*. Okay, we're listening on port 3000. Now let's switch over to Chrome and go *localhost:3000*. So here's Our *Hello World* message.

```javascript
app.listen(3000, () => console.log('Listening on port 3000...'));
```

Now let's define another route. Once again, we're going to call *app.get*, this one is going to be */api/courses*. Once again you pass a function with two arguments, that is *request* and *response*, and this goes to a code block. Now in a real-world scenario, where you want to get the list of courses from the database and return them. But as I told you before, in this section our focus is purely on building these endpoints, we're not going to do any database work. So I'm going to simply return an array of numbers. So *response.send*, we pass an array of *3* numbers. In the future, we can replace these numbers with actual course objects. So save. Now back in the terminal, we have to stop the earlier process and start it again. So, press control and *C* to cancel. Okay, one more time, *node index.js*. Now back in Chrome, let's head over to */api/courses*. Look we have an array of *3* numbers, beautiful.

```javascript
app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});
```

So this is what I want you to pay attention to here, in this implementation, we don't have those *if (?)* blocks. We define the new route, like calling *app.get*, and with this structure, as our application grows, we can move some of these routes to different files. For example, we can move all the routes related to courses to a separate file, like *courses.js*. So *Express* gives our application a skeleton, a structure.

>By convention, we call this object, *app*. So we store the result in a constant called *app*. So this represents our application. This *app* object has a bunch of useful methods. We have methods like *GET*, *POST*, *PUT*, and *DELETE*.

## 5 - Nodemon

So far, you've noticed that every time we make a change to the code, we have to go back to the terminal and stop this process and start it again. This is very tedious. So I'm going to show you a better way. We are going to install a node package called *Nodemon*, which is short for *Node Monitor*. So in the terminal, *npm install -g*, because we want to install this globally so we can run it anywhere. And the name of the package is *Nodemon*. All right *nodemon* is installed. So with this, instead of running our application using node, we use *nodemon*. Now we can see *nodemon* is watching all the files in the folder. Any files with any extensions. So if we go back to our code and make a simple change and then save the file, now look in the terminal, nodemon restarted our application or our process due to changes. So we don't have to do this manually anymore. Now back in the browser, if we send a request to the root of the website, we can see our new message displayed there.

## 6 - Environment Variables

Now, one thing we need to improve in this code is this hardcoded value *3000* for the ports. So we have used *3000* as an arbitrary number, while this may work on your development machine. It's unlikely that this is going to work in the production environment. Because when you deploy this application to a hosting environment, the port is dynamically-assigned by the hosting environment. So we can't rely on *3000* to be available. So, the way to fix this is by using an *environment variable*. So, typically in hosting environments for Node applications, we have this environment variable called *ports*.

> An environment variable is a variable that is part of the environment in which a process runs.

An environment variable is a variable that is part of the environment in which a process runs. Its value is set outside this application. I'm going to show you how that works in a second. So in this application, we need to read the value of this *port environment variable*. And the way we do that is by using the *process object*. So, we have this global object called *process*. This object has a property called *env*, which is short for *environment variables*. And after that, we add the name of our *environment variable*, in this case, *PORT*. So if this is set we're going to use it, else we're going to use *3000*. Now, we can store the result in a constant called *port*. And finally, we need to replace *3000* with *port*, and also change our message accordingly. So, I'm going to replace the *single quote* with *backtick*, so we can use a template string. And we're going to replace *3000* with a dynamic value. So, we add dollar sign, curly braces, and then add our constant, in this case, *port*.

```javascript
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
```

Now, back in the terminal, let's run this application using *nodemon*. So, on this machine, you can see, I don't have an *environment variable* called *port*, that's why *3000* is used as the port for this web server. Now, I'm going to set an *environment variable*. So, let's stop the process. On Mac, we can set an *environment variable* by executing the *export* command. If you're on Windows, you should use *set*. So, *export* or *set*, we add the name of the *environment variable*, in this case, *PORT*. And set its value. I'm going to use *5000*, i.e. *export PORT=5000*. So, now we have this environment variable called *PORT*, with the value of *5000*. With these, when we run the application, *nodemon index.js*, we can see that now, we are listening on port *5000*. So, this is the proper way to assign a *port* to your Node applications. You should attempt to read the value of an *environment variable* called *port*. If there is a value, you should use that, otherwise, use an arbitrary number through a development machine.

## 7 - Route Parameters

All right, so currently we have a *route* for getting the list of courses.

```javascript
app.get('/api/courses',... 
```

In this section, I'm will show you how to create a *route* to get a single course. So, earlier in one of the sections where I talked about *RESTful* services. You learn that to get a single course, we should include the *id* of the course in the *URL*. So, our *endpoint* should be like this, *'/api/courses/1'*, assuming that *'1'* is the *id* of the course. So, let's see how we can implement a *route* like this. So *app.get*, we add the path, that is *api/courses*, now here we need to define a parameter, so we add a colon and *id*. So, *id* is the name of our parameter here, you can use anything here, it doesn't have to be *id*, it could be *course id*. But *id* is shorter, and more conventional. Now we add our *route handler* function.

```javascript
app.get('/api/courses:id', (req, res) => {

});
```

So *request* and *response*. Now to read this parameter, we use *request.params.id*. So now, let's send this to the client. So *resource.send*.

```javascript
app.get('/api/courses:id', (req, res) => {
    res.send(req.params.id);
});
```

Back in the browser, now let's head over to *'http://localhost:3000/api/courses/1'*. So you can see that we successfully read the value of this parameter, which is *1*.

Also, it is possible to have multiple parameters in a *route*. For example, imagine you're building a service for powering a *blog*. So you could have a *route* with, *posts*, *year*, *month*. So we have two parameters.

```javascript
app.get('/api/posts/:year/:month', (req, res) => {

});
```

And with this, we can get all the posts for the given months and the given year. Now we can read these parameters just like before. So *request.params.year* or *month*. For this demo, let me show you how the *request.params* object looks like;

```javascript
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});
```

So save, and back in the browser, head over to *'http://localhost:3000/api/posts/2018/1'*.

```javascript
{
    year: "2018",
    month: "1"
}
```

That is how our *request.params* object looks. We have two properties, *year* and *month*, and they are named based on our *route* parameters.

With *Express*, we can also get *Query string* parameters. These are parameters that we add in the *Url* after a *question mark*. For example, we can get all the posts in January 2018 and sort them by their name. So we add a *question mark*, followed by *sortBy*, set it to *name*, like this; *'http://localhost:3000/api/posts/2018/1?sortBy=name'*. That is a *Query string* parameter. We use *Query string* parameters to provide additional data for our backend services. So we use *route* parameters for *essential* or *required* values, whereas we use *Query string* parameters for anything optional. Now let me show you how to read *Query string* parameters. So, back in the *VS code*, instead of *request.params*, we use *request.query*.

```javascript
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});
```

Back in Chrome, and this is what we get.

```javascript
{
    sortBy: "name"
}
```

So *query* parameters are stored in an object with a bunch of key-value pairs.
> With *Express*, we can also get *Query string* parameters. These are parameters that we add in the *Url* after a *question mark*. We use *Query string* parameters to provide additional data for our backend services.

## 8 - Handling HTTP GET Requests

All right, now let's implement a new endpoint to get a single course from the server. So, first of all, let's change

```javascript
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});
```

Back to

```javascript
app.get('/api/courses/:id', (req, res) => {
    res.send(req.params);
});
```

Now, on the top of our file, let's define an array called *courses*.

```javascript
const courses = [
    { id: 1, name: 'course1'},
    { id: 2, name: 'course2'},
    { id: 3, name: 'course3'}
];
```

So, we set *courses* to an array, and in this array, we're going to have 3-course objects. So each Object should have a couple of properties, like *id* and *name*. Of course, we can have more only that for simplicity, I'm just going to stick to two properties. So we have two endpoints. One to get all the *courses* and the other to get a *single-course*. In the first one, we're going to return our *courses* array.

```javascript
//Get all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});
```

Now the second one, we should write some logic to look for the *course* with the given *id*. We're going to call *courses.find*. That is a method that is available on every array in Javascript. As an argument to this method, we need to pass a function. This function will be used to find a course that matches the given criteria. So we use the *arrow* function syntax, and here we write some logic that returns a boolean value. This boolean value determines if this course is the one we're looking for or not.

```javascript
//Get a single course
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course with the given ID was not found');
    res.send(course);
});
```

So, *c.id* should equal *req.params.id*, however, this returns a string. So for this comparison to work properly, we need to parse this string into an integer. So we call *parseInt*, which is one of the global functions available in Javascript, and then get the result and store it in a constant called *course*.

Now you might be asking why I didn't use *var* instead of *const*. Well, that would be perfectly fine, and that's how most Javascript code out there is written. But going forward, it's best to drop  *var* and either use *let* or *const*. We use *let* if we want to define a variable that we can reset later and use *const* if we want to define a constant. In this case, I don't want to reset the course later in this function. But again, it's perfectly fine to use *let* here as well, its just personal preference. So, we get the course object. Now if this course doesn't have a value, in other words, if you don't find a course with the given id, by convention, we should return a response with the HTTP status code of *404*. That means the object is not found.

So this is one of the conventions of *RESTful* api's. If the client asks for a resource, but that resource does not exist on the server, we should return a response with the status code of *404*. So, here we call *res.status(404)*. And optionally, we can send a message to the client as well. So, *send("The course with the given ID was not found")*. Otherwise, if we do have a course with an *id*, we will return that to the client. So, *res.send(course)*.

Now let's test this. So back in the browser. Let's head over to *'http://localhost:3000/api/courses/1'*. So we have the course with the id *1*, and that's why we get this JSON object in the response. However, if I change this to *10*, we get this message *The course with the given ID was not found*. To ensure the status code of this response is *404*. We can open up *Chrome developer tools*, so right-click on the page, go to *inspect*, then click on the *Network* tab, be sure you don't have a filter on the *Network* tab, so select *All*, and then refresh the page by pressing *Ctrl R* on Windows or *Cmd R* on Mac. So, we'll see the request we sent to the server. You can see the status is *404*, which means not found.

## 9 - Handling HTTP POST Requests

So far, we have created two routes that respond to HTTP *get* requests, and we use these routes to get *all the courses*  and a *single-course* as well.

```javascript
//Get all courses
app.get('/api/courses',...

//Get a single course
app.get('/api/courses/:id',...
```

> We use an HTTP *post* request to create a new resource.

In this lecture, we're going to learn how to respond to HTTP *post* requests. We use an HTTP *post* request to create a new *course*. So *app.post*, instead of the *get* method, we use the *post* method. Similar to the *get* method, we need to specify a path. So that should be */api/courses*. Because we're going to *post* to the collection of *courses*, that's why we use the plural name. Then we add our *route handler*. So *request* and *response* goes to the code block. In this *route handler*, we need to read the *course* object that should be in the body of the request, use these properties to create a new *course* object, and then add that *course* object to our *courses* array.

So, let's create a new *course* object. Again, we're using a *const* because we're not going to reset the *course* object later. So let's set the *course* to a new object. Because we're not working with a database, we need to manually-assign an *id*. Then we get the number of elements in our *courses* array. So *courses.length*, and add *1* to it. In the future, when we work with a database, the *id* will be assigned by the database. Next is the *name* property. We need to read it from the *body* of the *request*. So *req.body.name*. We are, assuming that in the *request body*, we have an object, and that object has a *name* property.

For that line of code to work, we need to enable parsing up *JSON* objects in the *body* of the *request*. Because by default, that feature is not-enabled in *Express*. So on the top of our *app* file, after we get the *app* object, we need to call *app.use*, and inside, we call *express.json*.

```javascript
app.use(express.json());
```

That may look a little bit strange or unfamiliar to you, but don't worry, we're going to explore that in detail later in the section. What we're doing here is adding a piece of *middleware*. So when we call the *express.json* method, the method returns a piece of *middleware* and then we call *app.use* to use that *middleware* in the request processing pipeline.

So, back to our new *route handler*. We have a course object, next we push it in an array, so we use *courses.push*. And finally, by convention, when we *post* an object to the server when the server creates a new object or a new resource, it should return that object in the *body* of the *response*. So *res.send(course)*. The reason for this is because we're assigning this *id: courses.length + 1* on the server. So we need to return this course object to the client because chances are, the client needs to know the *id* of the new object or the new resource. So this is how we handle *HTTP post requests*. In the next lecture, we're going to learn how to test this endpoint.

```javascript
app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(courses);
    res.send(course);
});
```

## 10 - Calling Endpoints Using Postman

To call *HTTP* services, we use a Chrome extension called *Postman*. So if you haven't installed *Postman* before, search for *Chrome Postman* and add it to your Chrome Extensions. It will direct you to sign up, but you don't have to do that. There is a link taking you straight to the app. On the app's page, we can create a new HTTP *request*. So, from the dropdown list, we set the type to a *Post* request, we put the url, in this case, *'http://localhost:3000/api/courses'*. On my machine, I'm using port 3000 to host the application. Then, we need to set the *body* of the request. We should select *raw* from the list and then select JSON from the Text dropdown list. So with this, we can put a JSON object in the *body* of the *request*. So, let's add an *Object* in the code editor and give it the *name* property, we set it to *new course*, then finally, we send.

```javascript
{
    "name": "new course"
}
```

Okay, if you scroll down the app's page, you can see the *Status* of the *request* is *200*, which means the *request* was handled successfully, and here's the body of the *response*.

```javascript
{
    "id": 4,
    "name": "new course"
}
```

So *id* is *4* because we now have *4* courses in our array, and this is the same *name* that we sent to the server. So this is how we test HTTP services, using *Postman*. In this implementation, we have assumed that there is an *object* with the *name* property in the *body* of the *request*. What if the client forgets to send this property or sends an invalid *name*, perhaps a *name* that is too short? That's where *input validation* comes into the picture, and that's the topic for the next lecture.

## 11 - Input Validation

In this lecture, I'm going to show you how to do *Input Validation*. So as a security best practice, you should never, ever trust what the client sends you. You should always *validate* the input. So in this particular example, because we're dealing with a simple object with only one property, that is *name*, we can write some validation logic like this;

```javascript
app.post('/api/courses', (req, res) => {
    if(!req.body.name || req.body.name.length < 3) {
        // 400 Bad request
        res.status(400).send('Name is required and should be a minimum of 3 characters');
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(courses);
    res.send(course);
});
```

We're going to return an error to the client if the validation logic is *True*. The RESTful convention returns a response with the HTTP status code of *400*, which means *bad-request*. And to do so, we call *res.status(400)*, and then we can send an error message. In this case, we can write a generic error message, *Name is required and should be a minimum of 3 characters*. Now in your implementation, you may want to differentiate the errors. For example, if the client didn't send the *name* property, perhaps you would respond with *Name is required*. Or, if they did send the name, but the name was not long enough, you could send a different error message. We finally return the error message because we don't want the rest of the function to get executed. So this is the basic idea. However, in a real-world application, it's more likely that you'll be working with a complex object, something more complex than the *course* object.

> So as a security best practice, you should never, ever trust what the client sends you. You should always *validate* the input.

You don't want to write a complex validation logic like this at the beginning of your route handler. So let me introduce you to a Node package that makes it easy for you to validate the input. So on Google search, if you search for *npm joi*. It's a popular package. On the page, you can see some sample code and links to their official documentation.

Now let me show you how to replace this validation logic with *joi*. So first, back in the terminal, let's install *joi*. So you can see at the time of writing this course, the latest version is version 13.1.0. If you want to make sure that you have the same experience as what I'm going to show you, then install this exact version. So *npm i joi@13.1.0*.

On the top of the code file, we need to load the *joi* module.

```javascript
    const Joi = require('joi');
```

Because what returns from the module is a *Class*. And as I told you before, in JavaScript, we use the *Pascal* naming convention to name our Classes. So the first letter of every word should be uppercase. Also, as a best practice, put all your required calls on top of the file. This way, you can easily see the *dependencies* of the module. The *index.js module* is dependent upon two modules. One is *joi*, and the other is *express*.

Now we have the *Joi class*, so back to our route handler. With *joi*, first, we need to define a *Schema*. A *Schema* defined the shape of our *Objects*. What properties do we have in that *Object*, what is the type of each property, do we have an *email*, do we have a string? What is the minimum or the maximum number of characters? Do we have a number? What range should that number be? So that is the job of a *schema*.

First, we're going to define a *schema* inside the *route handler* function. So, *const schema*, we set it to an *Object*, this is shape of our *course object*. So here we want to have a *name* property, and we set it to *Joi.string*, so we're telling *Joi* that this is a string and it should have a minimum of three characters, and it should be required. So it has a very fluent *api*. Again, you can look at the documentation to see all the methods that are available to you. So, here's Our *schema*. Now we call *Joi.validate* and we give it *request.body* as wellas our *schema*. Now, this validate method returns an *Object*. Let's store that in a constant called *result*.

```javascript
app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    console.log(result);

    if(!req.body.name || req.body.name.length < 3) {
        // 400 Bad request
        res.status(400).send('Name is required and should be a minimum of 3 characters');
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(courses);
    res.send(course);
});
```

For this demo, I'm going to log this result on the console. So, before we go any further, let's save this, and let's go back to the *Postman*. Let's create another *course* by tapping on the *send* button to get a *response*. Now back to the terminal, so this our *result* object. It has two properties, *error* and *value*. Only one of these can have a value. So in this case, since we sent a valid *course* object, we have that object here as the value of the *value* property. And you can see *error* is *null*.

```javascript
{
  error: null,
  value: { name: 'new course' },
  then: [Function: then],
  catch: [Function: catch]
}
```

If we send an invalid object *value* will be *null*, and *error* will be set. Let me show you, so, back in *Postman*. Let's remove the *name* property, then send again. Back in the terminal, look, here is the *result* object, this is the *error* property, it's set to an object that has validation error; *Child name fails because name is required*.

```javascript
{
  error: Error [ValidationError]: child "name" fails because ["name" is required]
  {
    isJoi: true,
    details: [ [Object] ],
    _object: {},
    annotate: [Function]
  },
  value: {},
  then: [Function: then],
  catch: [Function: catch]
}
```

So back to our *route handler*, instead of the manual validation logic, we can check the value of *result.error* property.

```javascript
app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    if(result.error) {
        res.status(400).send(result.error);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(courses);
    res.send(course);
});
```

So, if *result.error*. Then we're going to send a response with status code of *400*, and in the body of th response, for now we can simply add *result.error*. And we don't need the *console.log* anymore. So save, now back in *Postman*, one more time, I'm going to send the empty object, now look at the result;

```javascript
{
    "isJoi": true,
    "name": "ValidationError",
    "details": [
        {
            "message": "\"name\" is required",
            "path": [
                "name"
            ],
            "type": "any.required",
            "context": {
                "key": "name",
                "label": "name"
            }
        }
    ],
    "_object": {}
}
```

So this is what we get, an object with these properties; *isJoi*, *name*, *details*, which is an array of error messages. So here is the first message; *name is required*. Now, this object is too complex to send to the client, perhaps you want to simplify it. So, back in the code.

```javascript
app.post('/api/courses', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    if(result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(courses);
    res.send(course);
});
```

One simple solution, is to go to the *details array*, get the first element, and then access the *message* property. Or instead of using the first element, you may want to access all elements in this array, get their *message* property and concatenate them. That's entirely up to you. So save. One more time, let's send an invalid request, and now we get;

```javascript
"name" is required
```

If we go to our request and add the *name* property, but set it to a string that is only one character, now we get a different error message;

```javascript
"name" length must be at least 3 characters long
```

So, we can see that *Joi* makes it really easy to validate input and return proper error messsages to the client.

## 12 - Handling HTTP PUT Requests

Alright, now let's see how we can update a *course*. So let's add a new *route handler*;

```javascript
    app.put('/api/courses/:id', (req, res) => {
        // Look up the course
        // If not existing we
    })
```

So *app.put*, we use the *Put* method for updating resources. Now the path should be *'/api/courses/'*. And here, we need a route parameter, because we're dealing with a specific course. So *id*. Now our *route handler function*, *request* and *response* goes to a code block. Alright, now here is the logic we need impliment. First we need to look-up this course with this given *id*. So *look up the course*, if the course doesn't exist, *If not existing*