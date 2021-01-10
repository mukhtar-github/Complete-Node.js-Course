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

So, now let me show you how to create a custom *Middleware function*. So on line *5* of the *index.js* file, we're adding JSON *Middleware function*. After that we're going to call *app.use*. Once again, we call this method to install a *Middleware function*, in a *Request Processing Pipeline*. So we need to pass a function that takes a *request*, and *response*, and *next*, which is a reference to the next *Middleware function* in the pipeline. We simply pass a function here, now this function, let's a simple *console.log('Logging...')*. Let's imaging this *Middleware function* is for logging every request. So we perform our logging and then we call *next* to pass control to the next *Middleware function* in the pipeline. If you don't do this, because we're not terminating the request-response cycle, our request will end up hanging.

```javascript
app.use(function(req, res, next) {
    console.log('Logging...');
    next();
});
```

Let me show you what happens, I'm going to comment out the *next* method, save. Now back in *Postman*, on the address tab, I'm going to send a simple HTTP *get* request for our courses endpoint. So send, and you can see that we're not getting a response, it's *Loading...*. And if we look in the console, we can see our *Logging...* message. So, this indicaes that our *Middleware function* was executed successfully, but because, we did not pass control to another *Middleware function* to terminate the request-response cycle, our request end up hanging there.

So let's uncomment out the *next* method. We can also create another *Middleware function* for performing authentication. So I'm going to select the custom *Middleware function* code we just wrote, duplicate it. And in this second *Middleware function*, I'm going to change the *console.log* message to *'Authenticating...'*. Now, back in *Postman*, let's send another request, now look in the terminal

```javascript
app.use(function(req, res, next) {
    console.log('Authenticating...');
    next();
});
```
