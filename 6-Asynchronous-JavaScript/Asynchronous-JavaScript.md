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

This is an example of *synchronous* or *blocking* program. In this program, when the first line executes, the program is *blocking*, and the second line has to wait until the first line finishes execution. So that's why we call programs like this *synchronous* or *blocking*. In contrast, we have *Asynchronous* or *non-blocking* program.

Let me show you an example of an *Asynchronous* program. So in JavaScript, we have this function that you should be familiar with, *setTimeout*. This takes two arguments, thie first one is a function, so I'm using the *arrow* function syntax, so let's pass *2000* milliseconds or *2* seconds. After *2* seconds, the code inside this function will be executed. So, I'm going to use this to simulate a call to a *database* that is going to take *2* seconds.

```javascript
setTimeout(() => {
    console.log('Reading a user from a database...');
}, 2000);
```
