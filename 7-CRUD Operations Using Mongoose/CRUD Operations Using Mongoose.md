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

So, this is for a scenario where we are successfully connected to a *MongoDB* database. But what if something goes wrong? We want to *catch* that *error*. Here we get an *error* object and then display it on the console. So, *console.error('Could not connect to MongoDB...')*, and then we add the *error* object.

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));
```

Now, let's run this application. So back in the terminal, *nodemon index.js*.

```javascript
[nodemon] starting `node index.js`
Connected to MongoDB...
```

So, we can see that we've successfully connected to *MongoDB* database.

## 5- Schemas

So, we've connected to our *MongoDB* database. Now, the next thing we need to do is to create a *Schema*. We use a *Schema* to define the shape of documents within a collection in *MongoDB*. What do I mean by that? Well, let's go back to our *MongoDB compass*. I've created this *playground* database here, and in this database we have this collection called *courses*. A *collection* in *MongoDB* is like a table ina relational database. Now in this *courses* *collection*, we have three *3* documents. The *document* in *MongoDB* is kind of similar to a *row* in a relational database. So, in relational databases, we have *tables and rows*, in *MongoDB*, we have *collections and documents*.

Now, let's take a look at this *collection*. So here is an exampple of a *document*, each *document* is a container of *key value* pairs. So here we have *_id* which is a unique identifier for each *document*. We have *tags*, which is an array of *key value* pairs, we have *date*, *name*, *author*, *isPublished*, and *version*. Don't worry about how I created these, you're going to learn that over the next few lectures.

Now, in *Mongoose* we have this concept called *Schema*. This is just specific to *Mongoose*, it's not part of *MongoDB*. We use a *schema* in *Mongoose* to define the shape of *documents* in a *MongoDB* collection. So we use that to define what are the properties we have in this *document*.

Now let me show you how to create a *schema*. So back in *vs code*, let's define a constant, called it *courseSchema*. A *Schema* defines the shape of *course* documents in a *MongoDB* database. So, we set this to a *new mongoose.Schema()* class. Here, when creating an instance of this class, we pass an object, and in this object we specify *key value* pairs that we should have in *course* documents. So, we want each *course* to have to have a *name* property, and the type of this property should be a string. Similarly, each *course* should have an author of type *String*. I want our *courses* to have *tags*. And here I want to have an array of *Strings*. Now technically when this is stored, each *object* in this array will be a *key value* pair. The *key* will be the *index*, and the *value* will be that *String*.

Now also, I want each *course* to have a *date* property of type *Date*. We can also give this a default value. So, we can change this from *Date* to an *Object*. This *Object* has a type property that we set to *Date*. And also has a property called *default*, and we set it to *Date.now*. With this, we don't have to specify a date when creating a *course* object. *Date.now* will be used as the default value for this property. And finally, I want each *course* to have a property called *isPublished* which shoulb be a *boolean*.

So here is the list of types we can use when creating a *Schema*. We have *String*, *Number*, *Date*, *Buffer* which we use for storing binary data, *Boolean*, *objectID* which is use for assigning unit identifiers, and *Array*. Next I'm going to show you how to create and save a *document* based on the *course schema*.

## 6- Models

So here is our *course schema* that defines the shape of *course* documents in our *MongoDB* database.

```javascript
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ Strings ],
    date: { type: Date, default: Date.now, },
    isPublished: Boolean
});
```

Now we need to compile this into a model. What is a model? Well earlier in the course, I talked about the concepts of *Classes* and *Objects*. So as an example, I told you we can have a class called *Human*, and we can have an object like *John*. So an object is an instance of a class. A class is just a blueprint, but an object is an instance of that blueprint. Now in this application, we want to have a class called *Course*, and then we should be able to create instances of that class, like *nodeCourse*, and then we can save *nodeCourse* to our database.

So, to create a class like *Course*, we need to compile the *schema* into a *model*. So, this is how we do it. The *Mongoose* object that we have, has a method called *model*, that takes two arguments. The first argument is the singular name of the collection that this *model* is for. So, in our *MongoDB* database, we want to have a collection called *courses*, right? So, here's the singular name *Course*. The second argument is the *schema* that defines the shape of documents in this collection. So that is *courseSchema*. Now with this, we get a *Course* class in our application. So we can set this to a constant called *Course*. And note that here I'm using pascal naming convention. so, the first letter of course is uppercase, that means this is a class, it's not an object.

Now we can create an object based on this class. So, let's create a *course* object, and here I'm using camel case notation, because the first letter of the first word in this case *course*, is lowercase. So, we use camel case to name our objects, and pascal case to name our classes. So, we set this *course* to a *new Course*. And, in this constructor function we pass an object, to initialize our *course* object. So, let's set the property of this *course*. I'm going to set the *name* to *Node.Js course*,
