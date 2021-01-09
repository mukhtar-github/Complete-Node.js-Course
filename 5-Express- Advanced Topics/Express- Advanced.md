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
