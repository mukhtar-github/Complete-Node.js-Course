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
app.use(express.json());
```

So when we call *express.json* method, this method returns a function, a *Middleware function*. The job of this *Middleware function* is to read the request,