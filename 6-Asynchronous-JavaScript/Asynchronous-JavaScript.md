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

    // return 1;
}
```

Let's have a look. So back in the terminal, let's run *node index.js*. So look,

```javascript
Before
undefined
After
Reading a user from a database...
```

The reason for this, is because the function that we passed to *setTimeout* is executed two seconds after. So, what we're returning from this function will not be available at the time of calling *getUser()*. Because, in this function, we're just calling *setTimeout* to schedule a task for the future. If you want to return a value from *getUser()*, we have to return it outside *setTimeout* function. So let's say *return 1*. In this case, this value that we're returning here, will be available on this line, *const user = getUser(1);*. So, the *user* constant we have here will be *1*. So back in the terminal, let's run *node index.js*. So look,

```javascript
Before
1
After
Reading a user from a database...
```

But that's not what we want. Because when accessing a *database*, the result is not available immediately. It may take half a second, it may take one second or two seconds, who knows. So, that's why I've called *setTimeout* to simulate a long running operation. In this case *console.log('Reading a user from a database...');*, we're reading something from the *database*, and at this point *return { id: id, gitHubUsername: 'mukhtar' };*, the result will be ready.

So, how can we access this *user* object in the main program here *const user = getUser(1);*? Well, there are three patterns to deal with *asynchronous* code. We have *Callbacks*, *Promises*, and *Async and Await*, which is basically some syntactical sugar over *Promises*. Now, chances are you're familiar with some or all of these or maybe none of these. And it doesn't matter. In the next lecture, we're going to look at *Callbacks* and how you can use them to get the result of an
*asynchronous* operation.

## 3- Callbacks

So, in the last lecture, you learned that this *return { id: id, gitHubUsername: 'mukhtar' };* *user* object that you're returning, will not be available as the returned value of this *const user = getUser(1);* function. In this lecture, I'm going to show you how to use a *Callback* to get this *user* object. So first, let's delete the *return 1* we were returning outside the *setTimeout* function, because we don't really need it.

Now, we need to make a small change to the signature of this *getUser()* function. We need to add another parameter, we call this *callback*.

```javascript
function getUser(id, callback) {};
```

A *callback* is a function that we're going to call when the result of an *asynchronous* operation is ready. In this case, at this point *return { id: id, gitHubUsername: 'mukhtar' };*, the result is ready, so we're going to call this *callback* function back with this *{ id: id, gitHubUsername: 'mukhtar' };*, *user* object. So, we simply call the *callback* function and give it the *user* object, like this.

```javascript
function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({ id: id, gitHubUsername: 'mukhtar' });
    }, 2000);
}
```

Now, back to this *const user = getUser(1);* line. We're not going to get a return value from this function, so let's delete this *const user*. So now, our *getUser(1)* function needs a *second argument*. We need to pass a function that will be called with this *{ id: id, gitHubUsername: 'mukhtar' };*, *user* object argument. So, we can pass a function as a *second argument* to our *getUser(1)* function, this function takes a *user* argument, because we're passing a *user* object in this *callback({ id: id, gitHubUsername: 'mukhtar' })*. Now, we have access to the *user* object that we have read from the *database*. So we can display it on the console.

```javascript
console.log('Before');
console.log('After');
console.log('Reading a user from a database...');
getUser(1, (user) => {
    console.log('User', user);
});

function getUser(id, callback) {
    setTimeout(() => {
        callback({ id: id, gitHubUsername: 'mukhtar' });
    }, 2000);
}
```

Also, we don't need the *console.log(user);* line anymore. Now, let's run this program and see what happens. So, *node index.js*, and we have this,

```javascript
Before
After
Reading a user from a database...
User { id: 1, gitHubUsername: 'mukhtar' }
```

So, this is an example of a *callback* function. When a *result* of an *asynchronous* operation is ready, the *callback* function will be called together with the *result*. In this case, the *user* object. And in the *callback* function, we used the *Arrow* function syntax.

> When a *result* of an *asynchronous* operation is ready, the *callback* function will be called together with the *result*.

Now, here is a small exercise for you. In this program, let's imagine once we read a *user* object from the *database*, then we're going to look at this property *gitHubUsername*, and then we're going to call *github API*, to get the list of repositories for this user. So, we're going to create a function called *getRepositories*. This function takes an argument, which is the *username* of a user on *Github*, and it's going to return an array with a list of repositories.

```javascript
function getRepositories(username) {
    return ['repo1', 'repo2', 'repo3'];
}
```

Now, this is a *Synchronous* function, here we don't have any *Asynchronous* code, we don't have a call to *setTimeout*, or anything that is *asynchronous*. Your job is to convert this function to an *asynchronous* function. And then call it inside the *getUser()* function. So once we have the *user* object, we need to get the *repositories*.

So as an exercise, convert this function to an *asynchronous* function that takes two seconds to complete, and use a *callback* to get the result, the list of *repositories*. And finally display those *repositories* on the console.

Alright, to make this function *asynchronous*. Again, I'm going to use the *setTimeout*. Give it the *callback* function, and the timeout of 2 seconds. Now, in this function, we can do a simple *console.log('Calling Github API...')*. This is completely optional, we don't really need this as part of this exercise. Now finally, need to return the array, the list of *repositories*, to the client or consumer of the function.

However, as you learned earlier, we cannot return a value like this in our *setTimeout* function. Instead, we need to use a *callback*. So, we add a second parameter in our *getRepositories* function called *callback*, which is a function. We're going to call this function with the array, the list of *repositories*. So, we're going to replace *return* with a *callback* function. As simple as that.

```javascript
function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Calling GitHub API...');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}
```

So, now we have an *asynchronous* function that takes a *callback* to return the result. Now back to our main code, there we have the *user* object. So after that, we're going to get the *repositories* for this user. So we call the *getRepositories* function, as the first argument we pass *user.gitHubUsername*, and as a second argument we need to pass a *callback* function. This *callback* function takes an argument which is an array of strings. So, let's call this array of strings *repos*, and goes to a code block.

Now, here we can display these *repos* on the console. So, this is the end result.

```javascript
getUser(1, (user) => {
    // Get user object
    console.log('User', user);

    // Get the repositories
    getRepositories(user.gitHubUsername, (repos) => {
        console.log('Repos', repos);
    });

});
```

Now, back in the terminal, let's run *node index.js*. So, we got an array of three strings.

```javascript
Before
After
Reading a user from a database...
User { id: 1, gitHubUsername: 'mukhtar' }
Calling GitHub API...
Repos [ 'repo1', 'repo2', 'repo3' ]
```

## 4- Callback Hell

Alright, so this is what we have so far. What I want you to note in this code is the nested structure, so we have the *getUser()* function, and we're nesting the *getRepositories()* in it. Now in a real-world application, maybe we want to do something after we get the list of repositories for this user. Perhaps, we want to go to the first repository and get all the commits in that repository.

With these *callbacks*, our code will end up looking like what we have below. So we can have another function called *getCommits()*, let's say it takes the address of a repository as the first argument, and then we will have another *callback* function as the second argument, which takes an array of commits. So *commits* goes to a code block.

```javascript
// Asynchronous
console.log('Before');
getUser(1, (user) => {
    getRepositories(user.gitHubUsername, (repos) => {
        getCommits(repo, (commits) => {
            // CALLBACK HELL
        });
    });
});
console.log('After');
```

See this nested structure, this is not what we have in *synchronous* code. So, if all these functions were *synchronous*, our code will end up looking like this. Let me show you. So this is the *synchronous* version of the same code. You would have a *console.log* to display *Before*. Then, we would call *getUser* and give it an argument of *1*. We would get a *user* object and we would store it in a constant called *user*. Then we would call *getRepositories* and give it *user.gitHubUsername*. This will return an array of repositories and we would store it in a constant called *repo*. And then we would call *getCommits* and pass maybe the first repository *repos[0]* as the argument, and get all the commits and store them in a constant called *commits*. And finally, we would do a *console.log* of *After*.

```javascript
// Synchronous
console.log('Before');
const user = getUser(1);
const repo = getRepositories(user.gitHubUsername);
const commits = getCommits(repos[0]);
console.log('After');
```

So I want you to compare these two different implementations. The first implementation is *asynchronous* and the second is *synchronous*. You can see the *synchronous* implementation is far easier to read and understand. With *asynchronous* implementation, because of these *callbacks*, we have these deeply nested structure. And in a real-world application, these can look even worse. So we refer to this as *CALLBACK HELL*. Or some people call it *Christmas Tree Problem*. Because the indentations look like a Christmas Tree. So next, I'm going to show you a simple solution to resolve the *callback hell* proplem.

## 5- Named Functions to Rescue

Now, let me show you a simple solution to resolve the *callback hell* proplem. So first let's delete the code that we don't need. I'm going to delete all the code in the *synchronous* section. So, we want to get rid of the *callback hell* issue, the nested structure. The technique we're going to use is to replace an *Anonymous* function with a *Named* function. What do I meant by that? Well, look at the second argument to the *getCommits* function. So, this is the second argument,

```javascript
(commits) => {};
```

right? This is what we call an *anonymous* function, a function that doesn't have a name. Here is another example, as the second argument to *getRepositories* function, we have this *anonymous* function.

```javascript
(repos) => {
    getCommits(repo, (commits) => {});
}
```

So, we're going to replace each *anonymous* function with a *named* function. And with this, we can flatten the structure of the code. Let me show you how that works. So, we're going to start at the deepest level. I'm going to replace the first *anonymous* function with a *named* function, now the function gets an array of *commits*, and let's say we want to display these *commits* on the console. So, I'm going to name the function *displayCommits*. It gets an array of *commits* and simply does a *console.log(commits)*.

```javascript
function displayCommits(commits) {
    console.log(commits);
}
```

Now, look at the signature of the *named* function. It takes an array of *commits*, and it has a body that does a *console.log(commits)*. This is similar to what we have in the *anonymous* function right? So, we can replace the *anonymous* function with a reference to *displayCommits*. Note that in place of the *anonymous* function, I'm not calling the *named* function, I'm just simply passing a reference to the *named* function.

```javascript
(repos) => {
    getCommits(repo, displayCommits);
}
```

Alright, so on the call to *getRepositories*, we have another *anonymous* function. This *anonymous* function takes an array of repositories *repos* and then get the *commits* for that repositories.

```javascript
(repos) => {
    getCommits(repo, displayCommits);
}
```

So let's create a function, called *getCommits* that takes an array of repositories *repos*.

```javascript
function getCommits(repos) {}
```

So this function has the same signature as the *anonymous* function, right? Now inside the *named* function, we put the code that we want to execute from the *anonymous* function. So I'm going to cut it and place it inside our *named* function.

```javascript
function getCommits(repos) {
    getCommits(repo, displayCommits);
}
```

And then we can replace the *anonymous* function with the reference to our new *named* function, *getCommits*.

```javascript
getUser(1, (user) => {
    getRepositories(user.gitHubUsername, getCommits);
});
```

Now, one more time, here's our last *anonymous* function.

```javascript
(user) => {
    getRepositories(user.gitHubUsername, getCommits);
}
```

So this *anonymous* function takes a *user* object and then gets the repositories for that user. So, let's create another function called *getRepositories* and it takes a *user* as a parameter. And in the body of this function, we're going to call *getRepositories* with these arguments *(user.gitHubUsername, getCommits)*.

```javascript
function getRepositories(user) {
    getRepositories(user.gitHubUsername, getCommits);
}
```

Now, this may look a little bit confusing at first, because we have a function called *getRepositories* and inside the function we're calling another function which is also called *getRepositories*. But these two functions are different. Because the first one takes a *user* object, whereas the second function takes a string, which is the *gitHubUsername* and a *callback* function.

So, now we can replace the *anonymous* function with the reference to *getRepositories*.

```javascript
getUser(1, getRepositories);
```

See what happened? We no longer have a deeply nested structure. So, we call *getUser*, when we have the *user*, then we're going to get the *repositories* for that *user*. Now, in the first function, we pass the user-name, *gitHubUsername*. When we have the *repositories*, then we're going to get the *commits* for one of these *repositories*.

And similarly in the second function, when we get the *commits* for one of these *repositories*, then we're going to display those *commits*. So, this is how we read the code. Again, it's not ideal, but its a little bit better than what we had before. Atleast we don't have the *callback hell*. Now, there is a better way to deal with *asynchronous* code, and that's by using *Promises*, which is the topic for the next lecture.

## 6- Promises

In this lecture, we're going to look at *Javascript Promises*, which are extremely powerful when it comes to dealing with *asynchronous* code. So what is a *Promise*? A *Promise* is an *object* that holds the eventual result of *asynchronous operation*. So when an *asynchronous operation* completes, it can either result in a *value* or an *error*. A *Promise* basically promises you that it would give you the result of an *asynchronous operation*.

This *object* can be in one of the three states. Initially, when we create a *promise object*, it will be in the *Pending* state. At this point, it will kick-up some *asynchronous operation*, when the results are ready, the *Promise* can either be *Fulfilled* or *Resolved* which basically means the operation completed successfully. So here we going to have a *value*. Otherwise, if something went wrong during the execution of that *asynchronous operation*, our *Promise* would be in the *Rejected* state. In this case we're going to have an *Error*.

Now let's see this in action. So, back in our project, I'm going to add a new file, called *promise.js*. This file is going to be our playground to work with *Promises*. Once you master *Promises*, then in the next lecture we're going to modify the code in *index.js*, and use *Promises* to clean our *asynchronous* code. So, I'm going to create a *Promises* object here, so *p*, we set it to a *new Promise()*. This constructor function takes an *argument*. The *argument* is a function with two parameters, *resolve and reject*.

```javascript
const p = new Promise(function(resolve, reject) {
    
});
```

So, when creating a new *Promise*, we should pass a function with two parameters, *resolve* and *reject*. We can also use the *arrow* function syntax to make it a little bit simpler.

```javascript
const p = new Promise((resolve, reject) => {});
```

Now at this point, we're going to kick off some *async* work. You may access a *database* or call up a *web service*, or start a *timer*, or any kind of *asynchronous operation*. So here, we're going to have some *async* work. Eventually, when that *async* work completes, we should either have a *value*, or an *error*. If there is a *value*, we want to return that to the consumers of that *Promise*. So somewhere in the code, we're going to consume that *Promise*. Because that *Promise* object, promises us that it's going to give us the result of an *asynchronous* operation. So we need to send this result to the consumer of that *Promise*.

> So, when creating a new *Promise*, we should pass a function with two parameters, *resolve* and *reject*.

The way we do that is by using the *resolve*, or *reject* parameters. Now basically, these two parameters are functions. So we can call *resolve* and pass a *value*  as an argument, let's say *1*. This is the result of our *asynchronous* operation. And we are using *resolve* to send this *value* to the consumers of that *Promise* object. We are going to see that in a second.

Now alternatively, if something goes wrong, we want to return an *error* to the consumer of that *Promise*. In that case, instead of the *resolve()* function, we're going to call the *reject()* function. And here, we can pass an *error* message. As a best practice, it's better to pass an *Error* object instead of a simple string like this; *reject('error')*. And we put the message inside the *Error* object.

```javascript
reject(new Error('message'));
```

Now let me temporarily comment the *error* object out. Let's imagine our *asynchronous* operation completes successfully. We need to produce *1* as the result. In a real-world application, instead of *1*, perhaps we are going to have a *user* object that we read from a *database*. So, that is the result of our *asynchronous* operation. Now, we need to consume that *Promise*. So somewhere else in the code, we get that *Promise* object, and we have two *methods* on that object, we have *catch* for catching any *errors*, and *then* for getting the result of our *asynchronous* operation.

So, we call *then*, and as an argument, we pass a function, that function takes *result* as a parameter, in this case *result* is that *1* that we're resolving in our code. Now, what do we want to do with this? Let's say we just want to display it on the console, like this;

```javascript
p.then(result => console.log('Result', result));
```

Now let's go back in the terminal and run *node promise.js*

```javascript
Result 1
```

So, we got *1* as the *result*, beautiful. In this implementation, there is really no *asynchronous* work. I'm simply resolving a value immediately. So let's make this a little bit more real life.

So, we can call *setTimeout* and pass a *callback* function into it and a *timeout* value, let's say *2* seconds, to kick off some *async* work.

```javascript
setTimeout(() => {}, 2000);
```

This is getting similar to our *getUser* function right? So, now we have an *asynchronous* operation. The *callback* function would be called after *2* seconds. Inside the *callback*function we can *resolve* a value, so we're going to move *resolve(1)* inside the *callback*function.

```javascript
setTimeout(() => {
    resolve(1);
}, 2000);
```

So after *2* seconds, the *asynchronous* operation is going to produce a value of *1*. Let's run the application one more time. So back in terminal, Now it's taking *2* seconds and eventually we get;

```javascript
Result 1
```

Let's say, during the execution of this *asynchronous* operation, something goes wrong, so you want to return an *error* to the consumer of that *Promise*. So, instead of *resolve*, we're going to use *reject*. So we're going to move *reject* line of code inside the *callback* function. That *Promise* object as you saw earlier has two methods, *catch* and *then*. So, we have *then* for the success scenario, and we can also chain *catch* in case something goes wrong.

> As a best practice, it's better to pass an *Error* object instead of simple string like this *reject('error')*.

So, we call *catch*, and as an argument, we pass a function, and that function takes *error* as a parameter. So, we can simply display the *error* message on the console.

```javascript
p
.then(result => console.log('Result', result))
.catch(err => console.log('Error', err.message));
```

Each *Error* object that we have in *Javascript*, like this *new Error('message')* has a property, so the *error* message that we pass in the *Error* object will be stored in a property called *message*.

```javascript
setTimeout(() => {
      // resolve(1);
      reject(new Error('message'));
   }, 2000);
```

Now this time, when we run the application, we're going to get an *error* message on the console, because we're rejecting the *Promise*. So back in the terminal, let's run *node promise.js*. So look, instead of *Result 1*, we got this *error* message.

```javascript
Error message
```

So let's quickly recap, a *Promise* is an object that holds the eventual result of an *asynchronous* operation. Initially, it's in the pending state, when we create the *Promise*. At a point, it kicks off an *asynchronous* operation, that operation can complete successfully or it can fail. If it completes successfully, we say the *Promise* is *resolved* or *fulfilled*. The state of the *Promise* changes from *pending* to *resolved*, which is also called *fulfilled*.

Now, if the *asynchronous* operation fails, the state of the *Promise* will go from *pending* to *rejected*. So, we use the *reject* function to return an *error* to the consumer of that *Promise*.

So, this is how we create a *Promise*,

```javascript
const p = new Promise((resolve, reject) => {
   // kick off some async work
   // ...
   setTimeout(() => {
      resolve(1); // pending => resolved, fulfilled
      reject(new Error('message')); // pending => rejected
   }, 2000);
});
```

And this is how we consume it,

```javascript
p
.then(result => console.log('Result', result))
.catch(err => console.log('Error', err.message));
```

We call *then*, to get the *result*, and *catch* to get the *error*. Now here's what you need to take away from this lecture: *anywhere you have an asynchronous function that takes a callback, you should modify that function to return a Promise*, and that's what I'm going to show you in the next lecture.

> A *Promise* is an object that holds the eventual result of an *asynchronous* operation.

## 7- Replacing Callbacks with Promises

```javascript
console.log('Before');
getUser(1, (user) => {
    getRepositories(user.gitHubUsername, (repos) => {
        getCommits(repo[0], (commits) => {
            console.log(commits);
        })
    })
});
console.log('After');

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        callback({ id: id, gitHubUsername: 'mukhtar' });
    }, 2000);
}
```

Alright, this is the code that we wrote earlier, that has the *callback hell* proplem. If you want to code along with me, I've attached this code to this lecture, so download it and you can code along with me. Now, in order to resolve the *callback hell* proplem, we should modify our *asynchronous* function to return a *Promise*.

So, I'm going to modify one of these functions and then I'm going to leave the other two for you as an exercise. So, the *getUser* function should *return* a *Promise*. We *return* a *new Promise*, in the last lecture, you learned that this *Promise* constructor function takes an argument, which is basically a function with two parameters, *resolve* and *reject*. And we use these parameters to signal the result of an *asynchronous* operation or an *error*.

So, we add a code block to our *callback* function, and I earlier told you that we *kickoff some async work* inside the code block. In this case, our *async work* is *setting the timer*. So, we're going to cut the *SetTimeout* code and paste it inside of the *Promise* constructor function. Now finally, we want to get rid of the *callback* parameter of the *getUser* function. So we delete that, and in order to return the *{ id: id, gitHubUsername: 'mosh' }* *user* object to the consumer of the *Promise*, we're going to call the *resolve* function instead of the *callback* function. So, we call *resolve* and give it the *user* object, as simple as that.

```javascript
function getUser(id) {
  return new Promise((resolve, reject) => {
    // Kick off some async work
    setTimeout(() => {
      console.log('Reading a user from a database...');
      resolve({ id: id, gitHubUsername: 'mosh' });
    }, 2000);
  });
   
}
```

So, we modified our *getUser* function, to return a *Promise* and remove the *callback* parameter of the *getUser* function. Now, I want you to use the same technique and modify the remaining two other functions, *getRepositories* and *getCommits*

So, in both the *getRepositories* and *getCommits* functions, we're going to modify the functions to return a *Promise*, and remove the *callback* parameters of both functions.

Now, none of our *asynchronous* functions here take a *callback*. Instead they return a *Promise*. In the next lecture, I'm going to show you how to consume those *Promises*.

> A *Promise* constructor function takes an argument, which is basically a function, a *callback* used to initialize the *Promise*. This *callback* is passed two arguments: a *resolve callback* used to resolve the promise with a value or the result of another promise, and a *reject callback* used to reject the promise with a provided reason or error.

## 8- Consuming Promises

```javascript
getUser(1, (user) => {
  getRepositories(user.gitHubUsername, (repos) => {
    getCommits(repos[0], (commits) => {
      console.log(commits);
    })
  })
});
```

So, we have this *asynchronous* code above, that uses the *callback* approach. In this lecture, I'm going to show you how to rewrite that using *Promises*. So, I'm going to put this side by side so you can see the difference. We call *getUser* and give it *1* as an argument, now this *getUser* returns a *Promise*. So, we can get the *Promise* and store it in a constant *p*. In the last lecture, we learned that every *Promise* object has two methods, *catch* and *then*. We use *catch* to catch *errors* and *then* to get the result of an *asynchronous* operation. So, we can call *then*. At this point, what is the result of our *asynchronous* operation? The result is a *user* object. Because in the *getUser* function, we are *resolving* the *Promise* with a *user* object, *resolve({ id: id, gitHubUsername: 'mosh' })*. So, as an argument to *then*, we pass a function, that function takes a *user* as a parameter. Now, we can do something with that *user* parameter, we can simply display it in the console.

```javascript
const p = getUser(1);
p.then(user => console.log('User', user));
```

Let's run the application up to this point and make sure everthing works. So, I'm going to temporarily comment-out the *asynchronous* code inside the file that uses the *callback* approach. Back in the terminal, let's run *node promise.js*. So, two seconds after, we *read a user from database* and here's our *user* object, beautiful.

```javascript
Before
After
Reading a user from a database...
User { id: 1, gitHubUsername: 'mosh' }
```

Now, we can simplify the code, we can get rid of the constant *p*, and chain *then* to what we get from *getUser* function. So, we delete *const p*, and chain *then* to the result from the *getUser* function. So *getUser*, *then*, we have a *user* object and we can display it on the console.

```javascript
getUser(1).then(user => console.log('User', user));
```

Now, in our previous implimentation, once we got a *user*, then we got a repositories for that *user*. So let's modify the code. Instead of calling *console.log*, we're going to call *getRepositories*, and as an argument, we pass *user.gitHubUsername*. Now, this function that we pass to the *then* method, if the function returns a value, then we'll wrap that value inside a *Promise*. That means, if we return the value, we're going to have another *Promise* so we can call *then* and tthat *Promise*. In this case, that *Promise* is the *Promise* that is returned from the *getRepositories* function. let's have a look at that. So *getRepositories* returns a *Promise* and eventually it will *resolve* that *Promise* with the array; *resolve(['repo1', 'repo2', 'repo3'])*, array of repositories.

So, we're chaining *then* and the second *Promise*. When that *Promise* is *resolved*, we're going to have our array of repositories. Now at this point we want to get the commits for the first repository, so, we call *getCommits*, and as an argument, we pass the first repository. Now, once again, the function *getCommits* also returns a *Promise*, so we can chain *then* on that *Promise*. That *Promise*, when *resolved* will eventually have the list of commits for the given repository. So, we pass a function with *commits* as parameter, and it goes to, we simply display those *commits* on the console.

```javascript
getUser(1)
.then(user => getRepositories(user.gitHubUsername))
.then(repos => getCommits(repos[0]))
.then(commits => console.log('Commits', commits));
```

Now let's run this program one more time. So, *node promise.js*.

```javascript
Before
After
Reading a user from a database...
Calling GitHub API...
Calling GitHub API...
Commits [ 'commit' ]
```

We have *Before* and *After*, two seconds later we read the user from database, two seconds later, we call *GitHub API*, and call it again to get the list of *commits*, and here is the array of *commits*, beautiful.

Now, let's look at the two different implementations. Let's remove the comment in the first implementation. So, in the first implementation, we use *callacks*, and that's why we ended up with the nested structure, the *callback hell* proplem. In the second implementation, we use *Promises* and we got this flat structure. So this is the beauty of using *Promises*. Because *Promises* expose *then* method, we can chain them to implement a complex *asynchronous operation*. But wait a second, we're not done yet, we can take this to the next level. Later in this section, I'm going to show you how to make this code even simpler.

Now finally, before we finish this lecture, as a best practice, when ever we're working with *Promises*, we should make sure to *catch* any errors. So finally, at the end of our code, we call *catch*, get an *error*, and for now just display that *error* on the console. So *Error*, we display *err.message*.

```javascript
catch(err => console.log('Error', err.message));
```

Now, with this implementation, if an *error* occurs during any of these *asynchronous operations*, the *error* function will be called. So, we have the single *error handler* to handle the *errors* that come from any of the *asynchronous operations*.

## 9- Creating Settled Promises

So you have seen a taste of *Promises* throughout this section. In this lecture, we're going to explore the *API* of *Promise* object in *JavaScript* in more detail. So, in our project, let's create a new file, called *promise-api.js*, again this is going to be another playground file. Sometimes you want to create a *Promise* that is already resolved. This is particularly useful when writing unit tests. So you want to simulate a scenario where an *asynchronous* operation like calling a web service competes successfully.

In your unit test, you want to create a *Promise* that is already resolved. So, if that's what you need, you can call *Promise*, this is the *Promise* class in *JavaScript*, it has a static method called *resolve*, and this will return a *Promise* that is already resolved. Now here we can optionaly pass a value like *1*, or, a *user* object, and we get the *Promise*, this *Promise* is already resolved. So, we can call *p.then*, get the result and display it on the console. Let's run this program.

```javascript
const p = Promise.resolve({ id: 1 });
p.then(result => console.log(result));
```

So, back in the terminal, *node promise-api.js*. And this is the *user* object that our *Promise* holds.

```javascript
{ id: 1 }
```

Now similarly, sometimes you want to create a *Promise* that is already rejected. So, if that's the case, instead of calling the *resolve* method, call *reject*. And here, you pass an *error* object. That is the meaning of rejection. Why something failed. So now that our *Promise* is rejected, we need to call *catch* to get the *error*. So, I'm going to rename the *result* to *error*.

```javascript
const p = Promise.reject(new Error('reason for rejection...'));
p.catch(error => console.log(error));
```

Let's run this one more time. So *node promise-api.js*. And here is our *error*, this is the reason for rejection, and the *callstack* that comes with every *error* object in *JavaScript*. So this is reason I said, as a best practice, when ever you want to reject a *Promise*, it's better to use a native *error* object, because it will include the callstack.

```javascript
Error: reason for rejection...
    at Object.<anonymous> (...
```

 If we pass a simple string like, *'reason for rejection...'*, we are not going to see that callstack.

```javascript
const p = Promise.reject('reason for rejection...');
p.catch(error => console.log(error));
```

Let me show you. So let's run this one more time. Look, we only get *'reason for rejection...'*, we don't have the callstack. So,when rejecting *Promises*, always use an *error* object.

## 10- Running Promises in Parallel

Now, sometimes you want to run a few *asynchronous* operations in parallel, and when they all complete, you want to do something after. For example, you may call different *API's*, like Facebook *API* and Twitter *API*, and when the result of both these *asynchronous* operations are ready, then you want to return something to the client. So let's simulate this.

So I'm going to create two *Promises* here, *promise 1*. In this particular implimentation, because we don't want to reject the promise, we're going to exclude the reject parameter. Because, result is the only parameter that we need in this code. So we call *setTimeout* to start an asynchronous operation, we give it a callback function, and a timeout value, 2-seconds. So, let's do a simple *console.log* of *'Async operation 1...'* And we're going to resolve the *Promise* with the value of *1*. So this is our first *Promise*, let's say this is the simulation for calling *Facebook API*.

```javascript
const p1 = new Promise((resolve) => {
   setTimeout(() => {
       console.log('Async operation 1...');
       resolve(1);
   }, 2000);
});
```

Now, I'm going to duplicate the first code, and create another *Promise*. This is going to be our second asynchronous operation like calling another API like *Twitter API* or *Instagram*, and here we're going to resolve this *Promise* with a different value, like *2*.

```javascript
const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Async operation 2...');
        resolve(2);
    }, 2000);
 });
```

Now, we want to kick off both these asynchronous operations, and when they both complete, we want to do something else after. So, we call *Promise.all*. Again this is another method that is available on the *Promise* class instead of a *Promise* object. We give it an array of *Promises*. So I give it an array with *p1* & *p2*. And tis method will return will return a new *Promise* that will be resolved when all the *Promises* in the array are resolved. So, we can get that *Promise* and call *then*, we get the result and display it on the console.

```javascript
Promise.all([p1, p2])
 .then(result => console.log('Result', result));
```

Let's see what happens when we run the application. So, 2-seconds delay, then both these asynchronous operations 1 and 2, they're kicked off almost at the same time, and then eventually we get the result, which is an array of two numbers.

```javascript
Async operation 1...
Async operation 2...
Result [ 1, 2 ]
```

So, a few things I need to clarify here, first of all, here we don't have real concurrency, we don't have multi-threading, we're still dealing with one thread. But that single thread is kicking off multiple asynchronous operations almost at the same time. It's not exactly at the same time, first it starts the *Async operation 1...*, the thread is released, so immediately after, it starts the *Async operation 2...*. We are not waiting for the result of the first asynchronous operation to be ready in order to kick off the second asynchronous operation. This is the situation we had in our previous example, where we got the user object, then we got the repositories, then we got the commits for the first repository. So each asynchronous operation started after the previous asynchronous operation completed, that was different. In this implementation, both these asynchronous operations are started almost at the same time. So that's the first thing I wanted to clarify.

The second thing is that when we get the result, the result will be available as an array. So in this case, each *Promise* is resolved with a value, in this case, *1*, and *2*, so our result array would have two values, *1* and *2*. Now, what if one of these *Promises* fails? So let's change the first *Promise* by adding the *reject* parameter. And instead of resolving it let's reject it with an *error*.

```javascript
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Async operation 1...');
        reject(new Error('Because something failed.'));
    }, 2000);
 });
```

Now, we need to add *catch*, to get the *error* if one of our *Promises* is rejected. So, let's run the application.

```javascript
Promise.all([p1, p2])
 .then(result => console.log('Result', result))
 .catch(err => console.log('Error', err.message));
```

So, here is our *error*.

```javascript
Async operation 1...
Error Because something failed.
Async operation 2...
```

What I want you to note here, is that if any of our *Promises* is rejected, one of the *Promises* that is returned from *Promise.all* is considered rejected.

And one last thing before we finish this lecture. So, let's go back to our first *Promise*, we don't need *reject* anymore, let's just *resolve* it with the value of *1*.

Sometimes, you may want to kick off multiple asynchronous operations, but you want to do something as soon as one of these asynchronous operations completes. So, you don't want to wait for all of them to complete, you just want to do something as soon as the first operation completes. If that's the case, instead of *Promise.all*, you use *Promise.race*. So again, we pass an array of promises, as soon as one promise in this array is fulfilled, the promise that is returned from the *race* method will be considered fulfilled. So let's see what happens when we run the application.

```javascript
Async operation 1...
Result 1
Async operation 2...
```

So both our asynchronous operations were started, but our promise was resolved as soon as the first asynchronous operation completed. In this case the result we have is not an array, it's the value of the first fulfilled promise.

## 11- Async and Await

So back in our *promise.js*, earlier you saw how we could rewrite the asynchronous code that used the callback based approach, we rewrote it using *Promises*. And there I told you that we can make this code even simpler. So, now in JavaScript we have a new feature called *async and wait*. If you are familiar with C#, there we also have the same feature *async and wait*, it's exactly the same thing. So *async and wait* helps you write asynchronous code like synchronous code. Let me show you what I meant by that. So, I'm going to rewrite the few lines where we're using a promise, I'm going to rewrite these using *async and wait*.

```javascript
getUser(1)
.then(user => getRepositories(user.gitHubUsername))
.then(repos => getCommits(repos[0]))
.then(commits => console.log('Commits', commits))
.catch(err => console.log('Error', err.message));
```

So, we call *getUser(1)*, now this *getUser(1)* function returns a *Promise*. Now, anytime we're calling a function that returns a *Promise* we can *await* the result of that function, and then get the actual result just like calling asynchronous function. So, here we can get the result and store it in a constant called *user* object. Similarly, now that we have a *user* object, we can call *getRepositories*, to get the repositories for this user. So, we pass *user.gitHubUsername*.

Now again this function returns a *Promise*, so we can *await* the result and then get the repositories and store them. And finally, now that we have the repositories, we can call *getCommits*, we pass the first repository *repos[0]*, and again because this function returns a *Promise*, we can *await* it and get the *commits* and store it in a constant.
Finally,we can do a console.log of commits.

```javascript
const user = await getUser(1);
const repos = await getRepositories(user.gitHubUsername);
const commits = await getCommits(repos[0]);
console.log('Commits', commits);
```

So, we can see with this *await* operator, we can write asynchronous code that looks like synchronous code. This is much easier to read and understand than *Callbacks* or even *Promises*. We don't have to go through a chain of calls to the *then* method. So this is *await*. But where is *async*. Well, whenever you use the *await* operator in the function, you need to decorate that function with the *async* modifier. In this particular example, we have written this line *const user = await getUser(1);* in *promise.js* outside of the function. Now, this is the requirement by JavaScrpt engines that whenever you use *await*, you should have a function that is decorated with *async*, and you will find out why in a second.

So, I'm going to define a function in our *async & await* code, let's call it *displayCommits*, because eventually after all these asynchronous operations, we're displaying the commits for this user. So, we're going to move all the *async & await* lines of code inside the *displayCommits* function. Now, you're using *await* inside of a function, so we should decorate that function with *async*, and finally, we call the function.

```javascript
async function displayCommits() {
  const user = await getUser(1);
  const repos = await getRepositories(user.gitHubUsername);
  const commits = await getCommits(repos[0]);
  console.log('Commits', commits);
}
displayCommits();
```

Now, look at the return type of this function, it's returning a Promise of void. That means a Promise that once fulfilled doesn't result in a value. It's void, so basically this is telling us that *async & await* are build on top of Promises, they are syntactical sugars in the language that allow us to write asynchronous code that looks synchronous. Internally, when the javascript engine executes this code, it's going to convert the code into something like this *.then(user => getRepositories(user.gitHubUsername))*, so, even though our code looks synchronous, it doesn't executes synchronously. In other words, when we're awaiting the result of this function, we are not really waiting or blocking in a synchronous fashion.

So in terms of the code execution, when a Javascript engine executes this line *await getUser(1)*, at this point, it's going to release our thread and make it available to do other work. When the result of the *getUser(1)* function is available, then we come back and store the result in the *const user*, and call this second line *await getRepositories(user.gitHubUsername)*. Again we have await, so the thread is released to do other work. So one more time, *async & await* is just syntactical sugar, internally we use *Promises*, our code still runs asynchronously, but it looks and reads synchronously. So, to verify this, let's go back in terminal and run this program, but before we go there, let's just comment out the first implementation which is promised based. Now back in the terminal, let's run *node promise.js*.

```javascript
Before
After
Reading a user from a database...
Calling GitHub API...
Calling GitHub API...
Commits [ 'commit' ]
```

So, we have *Before & After*, two seconds later, we *read something from a database...*, then we *call GitHub API...*, then again, and finally, we have the *[ 'commit' ]*.

Okay, one last thing before we finish this lecture. In our promise base approach, we use this catch method *catch(err => console.log('Error', err.message))* to get any errors. When using *async & await*, we don't have this catch method. The awy we get the errors is using a *try catch* block. So in this function, we wrap our asynchronous code inside of a *try* block. And then we have the *catch* block that gets an error object. So, we *try* to execute our asynchronous code, and if anything goes wrong. Then the *catch* block is executed. So inside the *catch* block we get an *error* object, and we can display the *Error* on the console.

```javascript
async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);
    console.log('Commits', commits);
  }
  catch (err) {
    console.log('Error', err.message);
  }
}
```

So now let's simulate an *error*. So, back to our *getRepositories(username)* function. Inside the function, I'm going to *reject* the promise. So instead of *resolving* it, I'm going to *reject* with an *error*, saying *Could not get the repos.*. Okay, now back in the terminal, let's run this one more time.

```javascript
Before
After
Reading a user from a database...
Calling GitHub API...
Error Could not get the repos.
```

So, *Before & After*, two seconds later, we *read something from a database...*, then we *call GitHub API...*, but something failed, so we got this *Error Could not get the repos.* So when using *async & await*, you need to wrap your code inside of a *try catch* block.

## 12- Exercise

Alright, now is time for an exercise.  So, download the file I've attached to this lecture, that's *exercise.js*. Let's see what happening inside the file. Inside the file, we have some code that is written based on callback based approach. So we have this function *getCustomer*, gets and *id*, and in the callback function, we get a customer object. We do a simple *console.log*, now if the customer is *gold*, we're going to get top movies, and here have another callback function, the argument here is the list of top movies. At this point, we do another console.log. And then finally we send an email to this customer with the list of top movies. And when we're done here we have another callback function, in this function we have a simple console.log statement.

```javascript
getCustomer(1, (customer) => {
  console.log('Customer: ', customer);
  if (customer.isGold) {
    getTopMovies((movies) => {
      console.log('Top movies: ', movies);
      sendEmail(customer.email, movies, () => {
        console.log('Email sent...')
      });
    });
  }
});
```

So let's run this application and see what happens. So *node exercise.js*.

```javascript
Customer:  { id: 1, name: 'Mosh Hamedani', isGold: true, email: 'email' }
Top movies:  [ 'movie1', 'movie2' ]
Email sent...
```

So, it takes about 4 seconds to get a customer, I changed the timeout so you can see more clearly. Here's our customer object, then we get the top movies, and finally, we send an email to this customer with the top movies. So here's what I want to do. I want you to rewrite this code using *async & await*. So do the exercise.

Alright, in order to use as *async & await*, we need to modify our functions like *getCustomer(id, callback)*, *getTopMovies(callback)*, and *sendEmail(email, movies, callback)* to return a *Promise*. Once a function returns a *Promise*, then we can *await* it. So, starting with the *getCustomer(id, callback)* function, first I'm going to remove the *callback*, then I'm going to return a *new Promise*, we pass this *(resolve, reject) => {}* callback function which we call *executor*. So, this function that has two arguments *resolve* and *reject*, we call it *executor*. Now, in this *Promise*, we're going to add our *async* code, *setTimeout*, and finally instead of calling the *callback* function, we're going to call *resolve*. Very simple.

```javascript
function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ 
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      });
    }, 4000);
  });
}
```

Now one more time. This time on *getTopMovies(callback)*. First, we remove the *callback*, then return a *new Promise*, the *(resolve, reject)* that goes to a code block. And in this code block, we have our *async* code. And finally we replace *callback* with *resolve*.

```javascript
function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000);
  });
}
```

And one last time. For *sendEmail(email, movies, callback)* function, again we remove the *callback*, and return a *new Promise* with *(resolve, reject)* and then, put our *setTimeout* function inside the *Promise* function. And finally, just *resolve*.

```javascript
function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 4000);
  });
}
```

Note that, here we are not returning any values to the color of this function, we're simply *resolving*. This is like a void function that doesn't return a value.

So, we have modified our functions to return a *Promise*, now let's go back to our main code
