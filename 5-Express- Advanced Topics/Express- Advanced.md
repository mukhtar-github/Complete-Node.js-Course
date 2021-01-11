# Express- Advanced Topics

## 1- Introduction

In the last session, we learned how to build RESTful services using *Express*. In this section we're going to continue our journey with *Express* and look at more *advanced topics*. More specifically, we'll be looking at *Middleware*, *Configuration*, *Debugging*, *Templating Engines*, and more. So now, let's get started!

## 2- Middleware

One of the core concepts in *Express* that we need to learn, is the concept of *Middleware*, or *Middleware function*. The *Middleware function* is basically a function that takes a request object, and either returns a response to the client, or passes control to another *Middleware function*. You have already seen two examples of *Middleware functions*, one is this route handler function.

```javascript
(req, res) => {
    res.send('Hello World!');
}
```

> The *Middleware function* is basically a function that takes a request object, and either returns a response to the client, or passes control to another *Middleware function*.

So in *Express*, every route handler function we have is technically a *Middleware function*, because it takes a request, *req* object and in this case, it returns a response, *res.send('Hello World!')* to the client. So it terminates the request-response cycle. So, this is one example of a *Middleware function*.

We have another example, that is on line *5* of the *index.js* file.

```javascript
app.use(express.json()); // req.body
```

So when we call *express.json* method, this method returns a function, a *Middleware function*. The job of this *Middleware function* is to read the request, and if there's a JSON object in the body of the request, it will parse the body of the request into a JSON object, and then it will set *req.body* property. So essentially, this is what happens at runtime. When we recieve a request on the server, that request goes through a pipeline, we call this pipeline the *Request Processing Pipeline*.

In this pipeline we have one or more *Middleware functions*. Each *Middleware function* either terminates request-response cycle by returning a response object, or it will pass control to another *Middleware function*. So in our current implementation, our *Request Processing Pipeline* has two *Middleware functions*. The first one is the *Middleware function* that parses the request body into a JSON object. In this case, it doesn't terminate the request-response cycle, so then it passes control to the second *Middleware function*, which is in this case our route handler. In route handler, we have the request object, with the body property populated. So here we can perform some operation and then terminate the request-response cycle by returning a response to the client.

So *Express* includes a few build-in *Middleware functions*, but we can also create custom *Middleware functions* that we can put at the front our *Request Processing Pipeline*. So every request that we get on the server, will go through our *Middleware function*, with this custom *Middleware function*, we can perform cross cutting concerns. For example, we can do *logging*, *authentication*, *authorization*, and so on. So an *Express* application is essentially nothing but a bunch of *Middleware functions*. In the next lecture, I'm going to show you how to create a custom *Middleware functions*.

## 3- Creating Custom Middleware

So, now let me show you how to create a custom *Middleware function*. So on line *5* of the *index.js* file, we're adding JSON *Middleware function*. After that we're going to call *app.use*. Once again, we call this method to install a *Middleware function*, in a *Request Processing Pipeline*. So we need to pass a function that takes a *request*, and *response*, and *next*, which is a reference to the next *Middleware function* in the pipeline. We simply pass a function here, now in this function, let's do a simple *console.log('Logging...')*. Let's imaging this *Middleware function* is for logging every request. So we perform our logging and then we call *next* to pass control to the next *Middleware function* in the pipeline. If you don't do this, because we're not terminating the request-response cycle, our request will end up hanging.

```javascript
app.use(function(req, res, next) {
    console.log('Logging...');
    next();
});
```

Let me show you what happens, I'm going to comment out the *next* method, save. Now back in *Postman*, on the address tab, I'm going to send a simple HTTP *get* request for our courses endpoint. So send, and you can see that we're not getting a response, it's *Loading...*. And if we look in the console, we can see our *Logging...* message. So, this indicaes that our *Middleware function* was executed successfully, but because, we did not pass control to another *Middleware function* to terminate the request-response cycle, our request end up hanging there.

So let's uncomment out the *next* method. We can also create another *Middleware function* for performing authentication. So I'm going to select the custom *Middleware function* code we just wrote, duplicate it. And in this second *Middleware function*, I'm going to change the *console.log* message to *Authenticating...*. Now, back in *Postman*, let's send another request, now look in the terminal, we have two messages, *Logging...* and *Authenticating...*.

```javascript
app.use(function(req, res, next) {
    console.log('Authenticating...');
    next();
});
```

So what I want you to pay attention to here is that our *Middleware functions* are called in sequence. First, our login *Middleware function* is called, then, the *Middleware function* for authenticating the user, and finally, the route handler which is another *Middleware function*.

Now in terms of clean coding, when you want to create a custom *Middleware function*, you don't want to write all that code inside *index.js* or *index module*. You should put each *Middleware function* in a separate file or separate module. So, let's create a new file, called *logger.js*. Now, back in the *index.js* file, let's grab the logging *Middleware function*, cut it, and back in *logger.js*, we paste that there. We give the function a name, like *log*, and finally, export it like this;

```javascript
module.exports = log;
```

So, this module exports a single function. Now, back in *index.js*, on the top, we load our new module. And then we can install it by calling *app.use(logger)* inside the *index.js* file.

```javascript
const logger = require('./logger');
```

Now you understand exactly what this *app.use(express.json());* line of code means. So when we call *express.json()*, it returns a function, a *Middleware function* that has three parameters, *request*, *response*, and *next*. That *Middleware function* parses the *request body*, and if there is a JSON object, it will set *req.body*, and then it will pass control to the next *Middleware function*.

Back in *index.js*, so this is how we define a custom *Middleware function* in a separate module, we import it here, and then install it, by calling *app.use*. We could use the same technique for the second *Middleware function*, but I'm going to leave that to you as an exercise.

## 4- Built-in Middleware

So in the last lecture, you learn how to build custom *Middleware*, but as I told you before, in *express* we have a few built-in *Middleware functions*. One of them is the *express.json()* middleware, that now you're familiar with, so it parses the body of the request, and if there is a JSON object it will populate *req.body* property. We have another similar *Middleware function* that is called *urlencoded*.

So let's duplicate *app.use(express.json());* line inside the *index.js* file. So instead, we will have;

```javascript
app.use(express.urlencoded());
```

Again, this is a method we call, and what we get in result is a *Middleware function*. This *Middleware function* parses incoming requests with *urlencoded payloads*. That is a request with a body like this *key=value&key=value*. Now this is more of a traditional approach, it's not something that we use that often these days. Basically, if you have an HTML form with input fields and post that form to the server, the body of the request will look like this *key=value&key=value*. So, that's where you have *urlencoded payload* in the body of the request. Now, this middleware parses this body and populate *req.body* like a JSON object.

Let me show you how that works, so, back to *Postman*, let's send a *post* request to local host *'http://localhost:3000/api/courses'*. So previously, we passed a JSON object in the body, so I told you to select *raw*, and then *application JSON*. However, in this demo, we're going to use *form-urlencoded* here. So now we can pass *key=value* pairs in the body of the request. And they will be concatenated when this request is sent to the server.

So the the key I'm going to set is *name*, and the value is *my course*. Send, now we can see, we successfully created a new course on the server.

```javascript
{
    "id": 4,
    "name": "my course"
}
```

So our *Middleware function* was able to read our request with *urlencoded payload*. Now, if you look in the terminal, you see a warning *body-parser depricated...*. So this warning is telling us that we should pass an object inside the *urlencoded* *Middleware function*, as shown below.

```javascript
app.use(express.urlencoded({ extended: true }));
```

With this, we can pass arrays and complex objects using the *urlencoded* format.

Now finally, the last built-in *Middleware function* we have in *express* is *static*, and we use that to serve the static files. So let me show you how that works. We pass an argument, and that's the name of a folder, in this case, I'm going to use a folder called *public*. So we're going to put all our static assets, like *css*, *images* and so on inside this folder.

```javascript
app.use(express.static('public'));
```

So, let's create a new folder called *public*. For now, I'm going to add a simple text file inside the new folder called
*readme.txt*, and this is a *readme* file. Now, with this *Middleware function*, we can go back to the browser and head over to *'http://localhost:3000/readme.txt'*. So with this Middleware we can serve static content. And note that here we don't have *public* in the Url. So our *static* contents are served from the root of the site. In the next lecture, we're going to look at third party Middleware.

> So with the *static* Middleware we can serve static contents from the root of the site.

## 5- Third-party Middleware

