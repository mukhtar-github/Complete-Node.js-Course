# Asynchronous JavaScript

## 1- Synchronous vs Asynchronous Code

So in the last section, you learned how to build *RESTful* API's using *Express*. But in that section, we used a simple array to manage the list of our courses. In real-world applications however, instead of using an array in memory, we use a *database*. Now, before I teach you how to access a *database* in *Node*, I want to make sure that you have a good and in-depth understanding of *Asynchronous* programming. And that's the topic for this section.

So back in the terminal, let's create a new folder for this section, *async-demo*. Let's go into this folder, and do an *npm init* with the *--yes* flag.

```javascript
{
  "name": "async-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Okay, beautiful, we have a new *Node* project, and now let's open this folder in our favorite editor. Now let's add a new file, *index.js*. In this file, I'm going to write a couple of *console.log* statements.

```javascript
console.log('Before');
console.log('After');
```

This is an example of *synchronous* or *blocking* program. In this program, when the first line executes, the program is *blocking*, and the second line has to wait until the first line finishes execution. So that's why we call programs like this *synchronous* or *blocking*. In contrast, we have *asynchronous* or *non-blocking* program.

Let me show you an example of an *asynchronous* program. So in JavaScript, we have this function that you should be familiar with, *setTimeout*. This takes two arguments, the first one is a function, so I'm using the *arrow* function syntax, so let's pass *2000* milliseconds or *2* seconds. After *2* seconds, the code inside this function will be executed. So, I'm going to use this to simulate a call to a *database* that is going to take *2* seconds.

```javascript
console.log('Before');
setTimeout(() => {
    console.log('Reading a user from a database...');
}, 2000);
console.log('After');
```

So, I'm simulating the action of *reading a user from a database* that is going to take *2* seconds. Now, when we run this program, what do you think we're going to see in the console? Someone may think, first, we're going to see this message, *Before*, then the program is going to wait for *2* seconds, and then we're going to display the second message, and finally the third message. But that's not how this program works.

Let's have a look. So back in the terminal, *node index.js*. See what happened?

```javascript
Before
After
Reading a user from a database...
```

We have *Before*, *After* and then *reading a user from a database*. Also, what is more interesting, is that *Before* and *After* are displayed immediately, and then we have the wait for *2* seconds. Let's see what's happening here. This *setTimeout* function is an example of an *asynchronous* or *non-blocking* function. When we call this function, this function will schedule a task to be performed in the future, in this case *2* seconds after. So, *2* seconds after, it will call the function that we pass as the first argument.

So, when we run this program, the first line is executed, then we get to the second line. Now, all this function does is scheduling a task to be performed in the future. It doesn't wait, it doesn't block, it just schedules a task. And then the control is returned. So, then we get to the last line and display the *After* in the console. So that's why, when we run this program, first we see *Before*, then immediately after, we see *After* and *2* seconds later, when the function is executed, we get the message about *reading a user from a database*.

> When an *Asynchronous*  function is called, all it does is scheduling a task to be performed in the future.

So, this is the difference between *synchronous* and *asynchronous* code. Now, one thing I need to clarify here is that *asynchronous* does not mean *concurrent* or *multi-threader*. In this program we have a single thread, so our single thread, first executes the first line, *Before*. Then schedules a function to be called in *2* seconds, next it will display the last line,*After*, in the console, and after that it will be free, so in *2* seconds from now, it will execute the function and display the message, *reading a user from a database* on the console.

Earlier in the course, I gave you a metaphor. Remember the imaginary Restaurant? So, in a *synchronous* restaurant, when you get a table, the waiter comes to you, takes your order, gives it to the kitchen, and then sits there waiting untill your food is ready, before moving onto the next table. This is an example of a *synchronous* or *blocking* restaurant. In contrast, in an *asynchronous* restaurant, the waiter doesn't wait in the kitchen. So while the Chef is preparing your meal, the waiter will move onto the next table to take their order.

What is important here is that we have a single waiter or waitress, this is like a single thread in a program. So, we don't have multiple threads, we don't have concurrency. Now, why do you need to know all of these. Because, in *Node* programs, whenever you're dealing with an operation that involves *disk* or *network* access, you're dealing with *asynchronous* code. So you need to understand how *asynchronous* code behaves, and more importantly, you need to know to write *asynchronous* code in a clean and maintainable way. And that's what you're going to learn in this section.

## 2- Patterns for Dealing with Asynchronous Code

Alright, now let's make this program a little bit more real. So, I'm going to extract the *setTimeout* function and put it inside a separate function called *getUser*.

```javascript
function getUser() {
    setTimeout((id) => {
        console.log('Reading a user from a database...');
    }, 2000);  
}
```

And then, we call *getUser* instead

```javascript
console.log('Before');
getUser(1);
console.log('After');
```

So, we have a function for getting a user object from our *database*. Now, to make this even more real, we can pass an argument into our called function, like user with an id say *1*. So, we should have a parameter called *id* in our function. Now in this function, we need to return a user object. So when we read the user from the *database*, right after that, we're going to return an object. Let's say this object has an *id* property, and it also has a *gitHubUsername* property. We're going to set that to *mukhtar*.

```javascript
function getUser() {
    setTimeout((id) => {
        console.log('Reading a user from a database...');
        return { id: id, gitHubUsername: 'mukhtar' };
    }, 2000);  
}
```

Now here is the interesting part. Back to *getUser(1)*, we cannot get this user object like this, say *const user = getUser(1);*. This does not work. So, if we do a *console.log(user);*, we're going to get *undefined* on the console.

```javascript
console.log('Before');
const user = getUser(1);
console.log(user);
console.log('After');

function getUser(id) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        return { id: id, gitHubUsername: 'mukhtar' };
    }, 2000);  
}
```

Let's have a look. So back in the terminal, let's run *node index.js*. So look,

```javascript
Before
undefined
After
Reading a user from a database...
```

The reason for this, is because the function that we passed to *setTimeout* is executed two seconds after. So, what we're returning from this function will not be available at the time of calling *getUser()*. Because, in this function, we're just calling *setTimeout* to schedule a task for the future. If you want to return a value from *getUser()*, we have to return it outside *setTimeout* function. So let's say return *1*. In this case, this value that we're returning here, will be available on this line, *const user = getUser(1);*. So, the *user* constant we have here will be *1*.

But that's not what we want. Because when accessing a *database*, the result is not available immediately. It may take half a second, it may take one second or two seconds, who knows. So, that's why I've called *setTimeout* to simulate a long running operation. In this case *console.log('Reading a user from a database...');*, we're reading something from the *database*, and at this point *return { id: id, gitHubUsername: 'mukhtar' };*, the result will be ready.

So, how can we access 