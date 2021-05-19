# CRUD Operations Using Mongoose

## 1- Introducing MongoDB

Alright, so back to our *Vidly Application*, so far we have stored the list of genres in an array in memory.

```javascript
const genres = [
  { id: 1, name: 'Action' },  
  { id: 2, name: 'Horror' },  
  { id: 3, name: 'Romance' },  
];
```

That's not how we build real world applications. Because when the server restarts, we're going to lose all the data and memory. So, that's why we need to store our data in a database. Now as I told you before, when building applications with *Node* and *Express*, you have a large number of options in terms of the database you want to use. In this course we're going to use *MongoDB*, because that's a very popular database management system, and it's quite often used in applications build with *Node* and *Express*. So if you have never worked with *MongoDB* before, don't worry, you're going to learn about it bit by bit over the next few sections.

Now, just to set the right expectation, *MongoDB* really requires it's own course, so you're not going to be a *MongoDB* expert by the end of watching this course. But you're going to learn enough to get the job done. Now if you have never worked with *MongoDB* before, *MongoDB* is basically what we call a *document database* or *NoSQL database*. It's different from traditional relational databases like *SQL server*, or *MySQL* and so on.

So in *MongoDB* we don't have the concept of *tables*, *schemas*, *views*, *records*, *colunms*, it's different. So unlike relational databases where you have to design your database ahead of time. In *MongoDB*, there is no such a thing as *schema* or *design*, you simply store your *JSON* objects in *MongoDB*.

So here we have, an array of *genres*, you can simply store all the objects in this array in a collection in *MongoDB*, as simple as that. This also means when querying our data, we get *JSON* objects out of *MongoDB* and we can simply return those objects back to the client, so there is no transformation. Alright, that's enough introduction about *MongoDB*. Next, I'm going to show you how to install it on your machine.

## 2- Installing MongoDB on Mac

## 3- Installing MongoDB on Windows

## 4- Connecting to MongoDB

Alright, now let's create a new project for this section. So I'm going to create a new folder called *mongo-demo*. Let's go in this folder and run *npm init* with the *--yes* flag. Now, we need to install a node package called *Mongoose*. *Mongoose* gives us a simple *api* to work with a *MongoDB* database. Okay, so you can see at the time of writing this article I'm using *Mongoose* version 5.12.9. So, if you want to make sure you have the same experience as what I'm going to show you in this course, I highly encourage you to install the exact same version. Now, finally let's open this in *vs code*.

Alright now, let's add a new file here, *index.js*. The first thing we need to, is to connect to *MongoDB*. So, we load, this *mongoose* module, and store it in this constant *mongoose*. Now, this object has a method called *connect*, we use this to connect to *MongoDB*. Now, here we pass a connection string, that is *Mongodb://localhost*. This references the *MongoDB* that we installed on this machine. When you want to deploy your application to a production environment, you're going to have a different connection string for the production environment.

Earlier in this section about *Express*, I told you how to manage various configuration settings for different environments, in this course, we are not dealing with that level of complexity, so I have hard coded the connection string here. But in a real application, your connection string should come from a configuration file, so, here's our *MongoDB* server. Now, after that we add the name of our database. In this case, I'm going to use a simple playgroung database. Now, we have not created this database, and it doesn't matter. The first time we write something to this database, *MongoDB* will automatically create this database for us.

Okay, so this is how we connect to a *MongoDB* database. Now this *connect* method returns a *Promise*. So, we can call *then*, when this *Promise* is fulfilled, that means we have connected to a *MongoDB* database. So here wecan do a simple *console.log('Connected to MongoDB')*. And by the way, here I'm using *console.log* for simplicity, as I told you in the section about *Express*, in the real application it's better to use the *debug* module, because with that you have more control over how much of this debugging messages you want to see in the console window. But in this section, we don't want to get distracted with too much complexity, we just want to focus on *MongoDB*.

So, this is for a scenario where we are successfully connected to a *MongoDB* database. But what if something goes wrong? We want to *catch* that *error*. Here we get an *error* object and then display it on the console. So, *console.error('Could not connect to MongoDB...'))*, and then we add the *error* object.

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));
```

Now, let's run this application. Back in the terminal,