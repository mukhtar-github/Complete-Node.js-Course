# Express- Advanced Topics

## 1- Introduction

In the last session, we learned how to build RESTful services using *Express*. In this section we're going to continue our journey with *Express* and look at more *advanced topics*. More specifically, we'll be looking at *Middleware*, *Configuration*, *Debugging*, *Templating Engines*, and more. So now, let's get started!

## 2- Middleware

One of the core concepts in *Express* that we need to learn, is the concept of *Middleware*, or *Middleware function*. The *Middleware function* is basically a function that takes a request object, and either returns a response to the client, or passes control to another *Middleware function*. You have already seen two examples of *Middleware functions*, one is this route handler