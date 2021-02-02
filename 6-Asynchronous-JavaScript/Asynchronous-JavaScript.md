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

So, when creating a new *Promise*, we should pass a function with two parameters, *resolve and reject*. We can also use the *arrow* function syntax to make it a little bit simpler.

```javascript
const p = new Promise((resolve, reject) => {
    
});
```

Now at this point, we're going to kick off some *async* work. You may access a *database* or call up a *web service*, or start a *timer*, or any kind of *asynchronous operation*. So here, we're going to have some *async* work. Eventually, when that *async* work completes, we should either have a *value*, or an *error*. If there is a *value*, we want to return that to the consumers of that *Promise*. So somewhere in the code, we're going to consume that *Promise*. Because that *Promise* object, promises us that it's going to give us the result of an *asynchronous* operation. So we need to send this result to the consumer of that *Promise*.

> So, when creating a new *Promise*, we should pass a function with two parameters, *resolve and reject*.

The way we do that is by using the *resolve*, or *reject* parameters. Now basically, these two parameters are functions. So we can call *resolve* and pass a *value*  as an argument, let's say *1*. This is the result of our *asynchronous* operation. And we are using *resolve* to send this *value* to the consumers of that *Promise* object. We are going to see that in a second.

Now alternatively, if something goes wrong, we want to return an *error* to the consumer of that *Promise*. In that case, instead of the *resolve()* function, we're going to call *reject()*. And here, we can pass an *error* message. As a best practice, it's better to pass an *error* object instead of simple string like this *reject('error')*. So here we pass *reject(new Error('message'))* and put the message inside the *error* object.

Now let me temporarily comment the *error* object out. Let's imagine our *asynchronous* operation completes successfully. I need to produce *1* as the result. In a real-world application, instead of *1*, perhaps we are going to have a *user* object that we read from a *database*. So, that is the result of our *asynchronous* operation. Now, we need to consume that *Promise*. So somewhere else in the code, we get that *Promise* object, and we have two *methods* on that object, we have *catch* for catching any *errors*, and *then* for getting the result of our *asynchronous* operation.

So, we call *then*, and as an argument, we pass a function, that function takes *result*, in this case *result* is that *1* that we're resolving in our code.
