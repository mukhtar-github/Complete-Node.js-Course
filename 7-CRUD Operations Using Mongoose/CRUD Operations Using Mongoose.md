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

Alright now, let's add a new file here, *index.js*. The first thing we need to do, is to connect to *MongoDB*. So, we load, this *mongoose* module, and store it in this constant *mongoose*. Now, this object has a method called *connect*, we use this to connect to *MongoDB*. Now, here we pass a connection string, that is *Mongodb://localhost*. This references the *MongoDB* that we installed on this machine. When you want to deploy your application to a production environment, you're going to have a different connection string for the production environment.

Earlier in this section about *Express*, I told you how to manage various configuration settings for different environments, in this course, we are not dealing with that level of complexity, so I have hard coded the connection string here. But in a real application, your connection string should come from a configuration file, so, here's our *MongoDB* server. Now, after that we add the name of our database. In this case, I'm going to use a simple playgroung database. Now, we have not created this database, and it doesn't matter. The first time we write something to this database, *MongoDB* will automatically create this database for us.

Okay, so this is how we connect to a *MongoDB* database. Now this *connect* method returns a *Promise*. So, we can call *then*, when this *Promise* is fulfilled, that means we have connected to a *MongoDB* database. So here we can do a simple *console.log('Connected to MongoDB')*. And by the way, here I'm using *console.log* for simplicity, as I told you in the section about *Express*, in the real application it's better to use the *debug* module, because with that you have more control over how much of this debugging messages you want to see in the console window. But in this section, we don't want to get distracted with too much complexity, we just want to focus on *MongoDB*.

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

So, we've connected to our *MongoDB* database. Now, the next thing we need to do is to create a *Schema*. We use a *Schema* to define the shape of documents within a collection in *MongoDB*. What do I mean by that? Well, let's go back to our *MongoDB compass*. I've created this *playground* database here, and in this database we have this collection called *courses*. A *collection* in *MongoDB* is like a table in a relational database. Now in this *courses* *collection*, we have three *3* documents. The *document* in *MongoDB* is kind of similar to a *row* in a relational database. So, in relational databases, we have *tables and rows*, in *MongoDB*, we have *collections and documents*.

Now, let's take a look at this *collection*. So here is an exampple of a *document*, each *document* is a container of *key value* pairs. So here we have *_id* which is a unique identifier for each *document*. We have *tags*, which is an array of *key value* pairs, we have *date*, *name*, *author*, *isPublished*, and *version*. Don't worry about how I created these, you're going to learn that over the next few lectures.

Now, in *Mongoose* we have this concept called *Schema*. This is just specific to *Mongoose*, it's not part of *MongoDB*. We use a *schema* in *Mongoose* to define the shape of *documents* in a *MongoDB* collection. So we use that to define what are the properties we have in this *document*.

Now let me show you how to create a *schema*. So back in *vs code*, let's define a constant, called it *courseSchema*. A *Schema* defines the shape of *course* documents in a *MongoDB* database. So, we set this to a *new mongoose.Schema()* class. Here, when creating an instance of this class, we pass an object, and in this object we specify *key value* pairs that we should have in *course* documents. So, we want each *course* to have a *name* property, and the type of this property should be a string. Similarly, each *course* should have an author of type *String*. I want our *courses* to have *tags*. And here I want to have an array of *Strings*. Now technically when this is stored, each *object* in this array will be a *key value* pair. The *key* will be the *index*, and the *value* will be that *String*.

Now also, I want each *course* to have a *date* property of type *Date*. We can also give this a default value. So, we can change this from *Date* to an *Object*. This *Object* has a type property that we set to *Date*. And also has a property called *default*, and we set it to *Date.now*. With this, we don't have to specify a date when creating a *course* object. *Date.now* will be used as the default value for this property. And finally, I want each *course* to have a property called *isPublished* which should be a *boolean*.

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

Now we can create an object based on this class. So, let's create a *course* object, and here I'm using camel case notation, because the first letter of the first word in this case *course*, is lowercase. So, we use camel case to name our objects, and pascal case to name our classes. So, we set this *course* to a *new Course*. And, in this constructor function we pass an object, to initialize our *course* object. So, let's set the property of this *course*. I'm going to set the *name* to *Node.Js course*. Set the *author* to *Mukhtar*, set the *tags* to an array of two strings, so we can have *node* and let's say *backend*.

Now, this is one interesting thing about *Mongo* or *NoSQL* databases in general. You can see that a document in *MongoDB* can be a complex object. So here, this *tags* property is an array of strings. We don't have something like that in the relational databases. In other words, a *row* in a relational database has simple attributes. If you want to *model* this structure in a relational database, you need three *tables*, *courses*, *tags*, and an intermediary table called *tags*. Because here, we have many to many relationship between *courses* and *tags*. In *MongoDB* or in *NoSQL* database in general, we don't have this structure, we don't have to define these *tables*, we don't have to script them. We simply create our objects and store them in the database. That's why we call them *schema less*, they don't have *schema*.

So here's our *tags* property. Now, the other property we have is *date*. But earlier I defined this to have a default value, so I'm not going to set this here. And the last property is *isPublished*, I'm going to set this to *true*.

```javascript
const Course = mongoose.model('Course', courseSchema);
const course = new Course({
    name: 'Node.js Course',
    author: 'Mukhtar',
    tags: ['node', 'backend'],
    isPublished: true
});
```

So, let's quickly recap. Once we have a *schema*, we need to compile that into a *model*, which gives us a *class*, next we can create an object based on that class, and this object *maps* to a document in the *MongoDB* database. Next, I'm going to show you how to save this document in our database.

## 7- Saving a Document

Alright, so here's our *course* object that *maps* to a *course* document in *MongoDB*. Now, let's save this to our database. So, this *course* object has a method called *save*. Here, we're dealing with an asynchronous operation, because it's going to take some time to *save* this course to the database, because we are going to access the file system, that's why, we are dealing with an asynchronous operation. The result of this operation will be ready in the future. So this method returns a *Promise*. We can *await* it and get the result.

Now this result is the actual *course* object that is saved in the database. So when we save this *course* in *MongoDB*, *MongoDB* is going to assign a unique identifier to this *course* object, to this *course* document. Now, with this, we can see the *id* that is assigned by *MongoDB*. So, let's log it on the console, *console.log(result)*. As I told you before, whenever you use *await*, your code should be inside an *async* function. So, I'm going to define a function, *async*, function, *createCourse*. Then put all the *course* object code inside the *createCourse*. So we create a *course* object, save it. And then display the result on the console. And finally, we call *createCourse()* and save.

```javascript
async function createCourse() {
    const course = new Course({
        name: 'Node.js Course',
        author: 'Mukhtar',
        tags: ['node', 'backend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}
createCourse();
```

Now back in terminal, in this section, I'm going to run this application using *node* instead of *nodemon*, because I don't want every time I make a simple change in the code, that will result in creating a new document in our *MongoDB* database. So, *node index.js*. Okay. beautiful, our *course* was saved in the database, and here is the document that is actually stored in our *MongoDB*.

```javascript
Connected to MongoDB...
{
  tags: [ 'node', 'backend' ],
  _id: 60aa1f90de378737292fe8de,
  name: 'Node.js Course',
  author: 'Mukhtar',
  isPublished: true,
  date: 2021-05-23T09:25:36.111Z,
  __v: 0
}
```

Look, *MongoDB* assigned the *_id* property, and is set to this unique identifier *60aa1f90de378737292fe8de*. Now, let's go back to *MongoDB compass*, so let's refresh it, here's our *playground* database, we have the *courses* collection and in this collection we have one document, alright. So this is the beauty of *MongoDB* or *NoSQL* databases. Unlike relational databases, we didn't have to create a *table*, we didn't have to script that *table*, simply created a document, and store it in a *MongoDB* database.

So back in the code, let's modify these values and create another document, because in the next lecture, I'm going to show you how to query documents. So, let's change course *name* to *Angular* course. And we add two *tags*, *angular* and *frontend*, save. Back in the terminal, let's stop the first process and run the application again.

```javascript
Connected to MongoDB...
{
  tags: [ 'angular', 'frontend' ],
  _id: 60aa1fefb3dde037671a9075,
  name: 'Angular Course',
  author: 'Mukhtar',
  isPublished: true,
  date: 2021-05-23T09:27:11.564Z,
  __v: 0
}
```

So here's our second document, and if you look at *MongoDB compass*, let's refresh the result, look we have two documents in our courses collection, beautiful. So next I'm going to show you how to query documents.

## 8- Querying Documents

Alright, now let me show you how to retrieve documents from a *MongoDB* database. So I'm going to create another function, *async* function *getCourses*. And then I'm going to replace the call to *createCourse* with *getCourses*. Now, let's implement this function. So, the *Course* class that we defined earlier has a bunch of methods for querying documents. We have *find* to get a list of documents, we have *findById* which is pretty self explanatory, and we have *findOne* which returns a single document. Now we have a few more *find* methods but don't worry about them, we use them to find a document and then remove or update it. We're going to look at them later in the section.

So, let's look at *find* method, as you can see, this method returns a *DocumentQuery* object. Now this *DocumentQuery* object is kind of like a *Promise*. So it has a *then* method. So we can *await* it and get the result. So let's say *courses*, and with this, we get all the courses in our database, so let's display it on the console. Now back in terminal, *node index.js*.

```javascript
Connected to MongoDB...
[
  {
    tags: [ 'node', 'backend' ],
    _id: 60aa1f90de378737292fe8de,
    name: 'Node.js Course',
    author: 'Mukhtar',
    isPublished: true,
    date: 2021-05-23T09:25:36.111Z,
    __v: 0
  },
  {
    tags: [ 'angular', 'frontend' ],
    _id: 60aa1fefb3dde037671a9075,
    name: 'Angular Course',
    author: 'Mukhtar',
    isPublished: true,
    date: 2021-05-23T09:27:11.564Z,
    __v: 0
  }
]
```

So look we get an array with two objects. Here's our first course, that's the *Node* course, and here's the second course, that's the *Angular* course, beautiful. Now we can also pass a filter here, so as the first argument to the *find* method, we pass an object, and in this object we add one or more *key value* pairs for filtering. So let's say we want to get only the courses for Mukhtar. So we set *author* to *Mukhtar*. We can pass another property, another filter, *isPublished* and set it to *true*. So with this filter we only get the published courses by Mukhtar. So this is how we retrieve documents.

But we can also, sort our documents, we can set a limit on the number of documents that are returned, we also select specific properties in the documents. Let's say our *course* documents, they have *50* properties, maybe we don't want to return all these properties to the client. Perhaps we want to return only their name. So, let me show you how to build a more complex query. Earlier you saw that this *find* method returns a *DocumentQuery* object. So, we can customize the query. We can apply a *limit*, let's say *10*, we can *sort* the documents, we can pass an object in the *sort* method, and in this object, we add one or more *key value* pairs for sorting.

So let's say we want to *sort* these documents by their *name*. We set *name* to *1*. One indicates ascending order. If you want to *sort* these documents in a descending order, you use *-1*. Now as I told you, you can have multiple *key value* pairs. We also have another method *select*, and with this, we can select the properties that we want to be returned, for example, let'say we only want to get the *name* and the *tags* properties of each *course* document. So, we set *name* to *1*, and *tags* to *1* as well.

```javascript
async function getCourses() {
  const courses = await Course
  .find({ author: 'Mukhtar', isPublished: true })
  .limit(10)
  .sort( { name: 1, })
  .select( {name: 1, tags: 1});
  console.log(courses);
}
getCourses();
```

Now let's run this application, so back in terminal *node index.js*.

```javascript
[
  {
    tags: [ 'angular', 'frontend' ],
    _id: 60aa1fefb3dde037671a9075,
    name: 'Angular Course'
  },
  {
    tags: [ 'node', 'backend' ],
    _id: 60aa1f90de378737292fe8de,
    name: 'Node.js Course'
  }
]
```

So look, now the *course* objects that we get, they only have three properties, *tags* and *name*. We selected these two properties, but also we get the *_id* property that is assigned by *MongoDB* by default. Also, these documents, they're sorted by their *name*, so *Angular* course comes first, even though we created this course later. So, this is how we build queries. In the next lecture, I'm going to show you how to do more complex filtering.

## 9- Comparison Query Operators

So, in the last lecture, you learned how to use the *find* method to filter documents. Over the next few lectures, I'm going to show you how to build more complex queries. Now, if you have never worked with *MongoDB* before, you may find this syntax we use to build queries, a little bit unfamiliar or strange. And I totally understand that, because I've been there before. But in this lecture, I'm going to show you a technique to remember the syntax and then you will realize it's actually very easy.

So, the topic for this lecture is *Comparison operators*. So in *MongoDB* we a bunch of operators for comparing values. Since *Mongoose* is build on top of *MongoDB* driver, these operators, these standard operators that *MongoDB* understands, they're also available in *Mongoose*. So, here are the *comparison operators* that we have in *MongoDB*. We *eq*, which is short for *equal*. We have *ne*, which is short for *not equal*. We have *gt* which is short for *greater than*. We have *gte*, which is short for *greater than or equal to*. Similarly, we have *lt*, which is short for *less than*. We have *lte*, which is short for *less than or equal to*. We also have *in* and *nin*, which is short for *not in*.

Now, for the purpose of this lecture, let's imagine our *courses* have a prize property. I'm going to comment out the *find* method. Let's say we want to get all the *courses* that are *ten dollars*. How do we do this? So, we call *find* and pass an object for filtering, set the prize to *10*. So this returns only the *courses* that are *ten dollars*. Now what if we want *courses* that are more than *ten dollars*? How can we express this using *JSON* objects in JavaScript?

Well, we know that in JavaScript, an object is basically a collection of *key value* pairs. So here, our *key* is *price*, and our *value* is *10*. With this simple value, we cannot express the concept of *more than* or *greater than 10*. So in order to express the concept of *greater than 10*, we need to pass an object in the place of the value *10*. This object is again a container for *key value* pairs. So here, I can use one of those operators as a *key*. So, I can use *greater than* operator as a *key*, so we use a dollar sign *$* to indicate that this is an operator *gt*, that is *greater than*, and we set the value to *10*. So see what I did? I replaced a simple value like *10* with an object to express a concept, the concept of *greater than 10*.

Now we can change this operator to *greater than or equal to*, if we want the *courses* that are *ten dollars* in the result as well. Now, let's take this to the next level. What if we want to get the *courses* that are between *10* and *20* dollars? Again, we can use another operator. So, *less than or equal to 20* dollars.

```javascript
.find( { price: { $gt: 10, $lte: 20 } })
```

So this is how we can use these comparison operators to query documents.

Now let's look at another example. Let's imagine we want to get *courses* that are *10* dollars, or *15* dollars, or *20* dollars. So, I'm going to comment the second *find* method out, let's start from scratch. So we call *find*, pass an object for filtering, set the prize, again if I use *10*, I can only compare equality to *10*. We don't want that. We want *courses* that are either *10* dollars or *15* dollars, or *20* dollars. So we place an object to express our query. Now, we use an operator that is *$in*. So, what should we use for the value? We want to express a query where *courses* are either *10* dollars or *15* dollars, or *20* dollars. So, we are dealing with three values here.

What JavaScript construct do we use to express multiple values? We use an *array*, right? So *[10, 15, 20]*.

```javascript
.find( { price: { $in: [10, 25, 20]}})
```

See what I've done so far? I haven't memorized anything. I just tried to logically think, how can we use JavaScript constructs to express a concept, to express a query. So these are the *Comparison operators*. In the next lecture, we're going to look at the *Logical operators*.

## 10- Logical Query Operators

In this lecture, I'm going to show you how to use the *Logical query operators*. So here is our original query for getting all the *courses* that match this criteria.

```javascript
.find({ author: 'Mukhtar', isPublished: true })
```

They are authored by *Mukhtar* and they are *published*. What if we want to get the *courses* that are published by *Mukhtar* or the *courses* that are *published*. So we can have *courses* that are *published* but they are not authored by *Mukhtar*. That's where we need the *or* operator. So, here are the *logical operators* we have. We have *or* and *and*. Let's see how we can use these operators. So, I'm going to comment out the first *find* method. Instead,we're going to call the *find* method without any filters. After that, we call the *or* method.

Now here's a question for you. What JavaScript construct do we use to store multiple values? We use an *array*, right? So we need to pass an array into the *or* method, and in this array we add two objects, each object is a filter, just like the filter object that we pass to the *find* method. So, in the first filter object, we add *author*, we set that to *Mukhtar*, in the second, we add *isPublished* and we set that to *true*.

```javascript
.find()
.or([{ author: 'Muktar' }, { isPublished: true }])
```

Now with this, we'll get *courses* that are authored by *Mukhtar* or *courses* that are *published*. The *and* logical operator is exactly the same. So, instead of using the *or* method, we use the *and* method. And with these, we pass an *array* of filter objects. And this is technically similar to passing a filter object to the *find* method. But sometimes in more complex queries, you may find a place for using the *and* method. Next, we're going to look at *regular expressions*.

## 11- Regular Expressions

So back to our original query. In this example, we're getting *courses* who's author is exactly this string *Mukhtar*. If we have a *course*, with author set to *Mosh*, or *Hamedani*, those *courses* will not be returned. So, if you want to have more control over filtering strings, you need to use a *regular expression*. Let me show you how that works. So, let's say we want to get *courses* who's author starts with *Mosh*. This is how we write this query. So *find*, we pass an object, set the *author* as the key, now instead of passing a string as the value, we pass a *regular expression*, so we add a slash (/), then we add a pattern that we're going to modify in a second, and another slash.

```javascript
.find({ author: /pattern/})
```

So this is the syntax, for representing a *regular expression*. Now, in *regular expressions*, you can use the caret *^* character to represent a string that starts with something. I can add *Mukhtar*. So, this *regular expression*, represent a string that starts with *Mukhtar*. So, as long as the the *author* starts with *Mukhtar*, it doesn't matter what we have after. Those *courses* will be returned.

```javascript
/^Mukhtar/)
```

Now, what if you want to look for *courses* who's author ends with a giveng string. Let's say *Ends with Hamedani*. So this is how we write this query, *find*, pass an object, we see the *author* to a *regular expression*. And the pattern we use here is *Hamedani$*. So dollar sign in *regular expressions* indicates the end of a string. So here we are looking for *courses* who's author ends with *Hamedani*. Now this query is case sensitive. If you want to make it case insensitive, you append an *i* at the end.

```javascript
.find({ author: /Hamedani$/i })
```

And finally, let's look at the last example. What if you want to look for *courses* who's author contains the word *Mosh*? So *Mosh* can be at the beginning, it can be in the middle, or it can be at the end. Let me show you how to write this query. So we call *find*, pass an object, author, regular expression. Here's our pattern.

```javascript
.find({ author: /.*Mosh.*/i })
```

So .* in a regular expression means we can have 0 or more characters, we don't care what those characters are. So, with this pattern, with this regular expression, we have 0 or more characters before or after Mosh. And once again, if you want to make this case insensitive, you put an i at the end. Of course you can use more complex regular expressions. The explanation of JavaScript regular expressions is beyond the scope of this course. So if you want to learn more about regular expressions, just read a tutorial about JavaScript regular expressions.

## 12- Counting

```javascript
async function getCourses() {
  const courses = await Course
  .find({ author: 'Mukhtar', isPublished: true })
  .sort( { name: 1, })
  .select( {name: 1, tags: 1});
  console.log(courses);
}
getCourses();
```

So in the above query, we're filtering our *courses* and picking only their *name* and *tags* properties. So, if we run this application, *node index.js*.

```javascript
[
  {
    tags: [ 'angular', 'frontend' ],
    _id: 60aa1fefb3dde037671a9075,
    name: 'Angular Course'
  },
  {
    tags: [ 'node', 'backend' ],
    _id: 60aa1f90de378737292fe8de,
    name: 'Node.js Course'
  }
]
```

 This is what we get, an array of two *courses*, and each *course* has these three properties, *tags, _id, and name*. Sometimes we just want to get the number of documents, instead of the actual documents. So, if That's the case, we don't need to use the *select* method, instead we call the *count* method.

 ```javascript
async function getCourses() {
    const courses = await Course
    .find({ author: 'Mukhtar', isPublished: true })
    .sort( { name: 1, })
    .count();
    console.log(courses);
  }
  getCourses();
 ```

And this returns the count of documents that matches the *find* method criteria. So, back in terminal, let's run the application again.

```javascript
Connected to MongoDB...
2
```

Look, we have two documents that matches our filter.

## 13- Pagination

So, earlier we learned about the *limit* method. A method that goes hand in hand with *limit* method is the *skip* method. And we use this to impliment *pagination*. Let me show you how this works. So, let's define a constant, called *pageNumber*, this can be *1, 2, 3* whatever. So, let'set this to two. We have another constant called *pageSize* set to *10*. So I've hardcoded these numbers here as purely for simplicity, but in a real world application, we pass these values as query strings parameters to our *RESTful API's*.

So, you might have an *API* to get the list of courses, this endpoint can get query strings parameters like this, */api/courses?pageNumber=2&pageSize=10*. This is how it works in the real world, for now we don't have to worry about this. Now, in order to impliment *pagination*, we need to escape all the documents in the previous page. So, here's the formular,

```javascript
.skip((pageNumber - 1) * pageSize)
```

So here I'm assuming that *pageNumber* starts from *1*. So more accurately this is page number, not page index. And then, we change *limit* to *pageSize* instead of number *10*, and with this we can get the documents in a given page.

```javascript
async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10
    const courses = await Course
        .find({ author: 'Mukhtar', isPublished: true })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort( { name: 1, })
        .count();
    console.log(courses);
}
getCourses();
```

## 14- Exercise 1

Alright, now it's time for an exercise. So you should download the zip file attached to this lecture. When you open the zip file, you're going to see two files. *Exercise-data.json*, this is a *JSON* file with a bunch of *course* objects that we're going to import into our database. The other file is an *exercise.txt*, and this is a command that we're going to run in terminal to import that *JSON* file into a new database, you can simply copy paste this into terminal, or you can type it by hand as I'm going to show you in a second.

So back in terminal, let's run *mongoimport*, we use this command to import data into a *MongoDB* database. Now here we need to supply a few flags. The first one is *--db*. Where we specify the name of our database. I want you to use a separate database for these exercises. So *mongo-exercises*. The next flag is *--collection*. We set this to *courses*, after that, we have another flag that is *--file*. And here we pass *exercise-data.json*.

So I'm running this command from this folder where I have this *JSON* file. And finally, the last flag is *--jsonArray*, we need this flag because the data that we have in this *JSON*file is represented using an array. So let's run this command.

```javascript
2021-05-29T14:40:33.650+0100    connected to: mongodb://localhost/
2021-05-29T14:40:33.660+0100    dropping: mongo-exercises.courses
2021-05-29T14:40:34.166+0100    7 document(s) imported successfully. 0 document(s) failed to import.
```

Imported 7 documents. Now let's open up *MongoDB* compass, and refresh. So here's our new database *mongo exercises*, our *courses* collection, and we have 7 documents inside as you can see. Beuatiful.

So here is your first exercice.

> I want you to write a program, and get all the published backend courses in our new database, sort them by their name, and pick only their *name* and *author* properties. So that means you should start from scratch. You need to load the *Mongoose* module, you need to connect to our new *MongoDB* database, you need to create a schema to define the shape of documents in our *courses* collection, and eventually write a query.

Alright, I'm going to create a new file. Let's call this *exercise1.js*. Here we load *mongoose* and store it in this object, *mongoose*. Now we need to connect to our new *MongoDB* database. So *mongoose.connect*, we pass the connection string which is *mongodb://localhost/mongo-exercises*.

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
.then(() => console.log(' Connected to MongoDB...'))
.catch(err => console.error('Coulld not connect to MongoDB..', err));
```

Next we need to create a *schema* to define the shape of documents in our courses collection. So *const courseSchema*, we set this to *new mongoose.Schema()*. Here I pass an object inside the schema, the properties we need to add inside the object are based on the shape of our course documents. So we have *name*, which should be a string, *author* which is also a string, *tags* which is an array of strings, we have *date* which is a date object, we have *isPublished* which is boolean. And finally *price* which is a number. So here's our *schema*.

```javascript
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: Date,
    isPublished: Boolean,
    price: Number
});
```

Next we to create a *model*. So *const Course* we set this to *mongoose.model()*, we specify the name of our collection inside the model, which is *Course*, and note that this should be singular, and then followed by our *courseSchema* object.

```javascript
const Course = mongoose.model('Course', courseSchema);
```

So now that we have a *model*, we can use this to query our courses. So, we call *Course.find()*, we want to get all the published backend courses. So we pass a filter object with two properties inside the *find* method. *isPublished* should be true, and you want to have the *backend tag* in these documents. We need to *sort* these courses by their *name*. So, *sort*, we pass an object and set *name* to 1. And there is also a different way to use this method, instead of using an object, we pass a string and pass the name of the property we want to use for sorting. So for ascending, we use *name*, for descending we use *-name*.

And finally, we need to pick only *name* and *author* properties. So, *select()* and pass an object with two properties, *name* we set this to 1, and *author* sets to 1 as well. Again here, we can also use a string, so, we pass a string with two properties, *name* and *author*. Which ever approach you choose is purely your personal preference. So now we need to *await* this, get the result and store it in *courses*. Now because we used *await* here we should create an *async function*, so, *async function getCourses({})* and move the *courses* code into the *async function*.

```javascript
async function getCourses() {
    return await Course
    .find({ isPublished: true, tags: 'backend' })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
}
```

Now we can do a *console.log* inside the *async function*, but a better solution is to do it outside the *async function*, because we expect this *async function getCourses({})* to return an array of *courses*. So, we can simply return *courses* at the end of the code, or we can make this code shorter, so we don't have to define *const courses*, we can simply return the result of the whole expression *return await Course*.

So finally, we can call the *getCourses()* function, so as I told you before, that when we decorate a function with *async*, our JavaScript engine automatically wraps the result in a *Promise*. So, look *function getCourses(): Promise<any[]>* here we can see *getCourses* returns a *promise* of any array. This means a *promise* that when resolved, will give us an array of objects. So we *await getCourses*, and store the result in *const courses*. Again, because we have used the *await* operator here, we need to wrap this line of code inside an *async function*. So we can call this async function *run()*, this is to run our program, we put our line of code inside *async function run()*. And inside the *async function run()* we display the *courses* in the console. And finally, we call the *run()* function at the end.

```javascript
async function run() {
    const courses = await getCourses();
    console.log(courses);
} 
run();
```

So this is one way to solve this problem, you don't necessarily need the *run()* function, this is just how I prefer to structure this program. Because *getCourses* is supposed to give us the list of courses. Displaying the courses is not the responsibility of this function. So, let's run this program and make sure everything works. So *node exercise1.js*.

```javascript
Connected to MongoDB...
[
  {
    _id: 5a68fde3f09ad7646ddec17e,
    name: 'ASP.NET MVC Course',
    author: 'Mosh'
  },
  {
    _id: 5a68fdc3615eda645bc6bdec,
    name: 'Express.js Course',
    author: 'Mosh'
  },
  {
    _id: 5a68fdd7bee8ea64649c2777,
    name: 'Node.js Course',
    author: 'Mosh'
  },
  {
    _id: 5a68fe2142ae6a6482c4c9cb,
    name: 'Node.js Course by Jack',
    author: 'Jack'
  }
]
```

This is what we should get. So we have 4 courses, the first one is *ASP.NET MVC Course*, the second is *Express.js Course*, the third is *Node.js Course*, and the last one is *Node.js Course by Jack*.

## 15- Exercise 2

Alright, here's the second exercise.
> Get all the published frontend and backend courses, sort the by their price in descendind order, from most expensive to least expensive, pick only their name and author, and display them on the console.

So I'm going to create a new file, let's call it *exercise2.js*. Now to save time, I'm going to copy some code from our previous solution. So let's go to *exercise1.js*, copy everything, and plce it in our new file. Now, we only need to modify the query. So we want to get all the published frontend and backend courses. In our *find* method, we have *isPublished* set to true, that's perfectly, however, our *tags* is currently set to *backend*.

```javascript
find({ isPublished: true, tags: 'backend' })
```

If I set *tags* to an array of two strings, *['backend', 'frontend']*, this will not work. Because, this will return courses that have both backend and frontend *tags*. So here, the logical *and* operator will be applied. So we need to modify this and use the *in* operator that I explained in the lecture about comparison operators. So let's remove the array
in the *tags*. We set the *tags* property to an object. In this object we're going to have *key value* pairs. Our *keys* are *mongoDB* operators, in this case *$in*. Now, what JavaScript construct can we use to represent multiple values? We use an *array*, right? So we set this to an array of two strings, backend and frontend.

```javascript
find({ isPublished: true, tags: { $in: [ 'frontend', 'backend'] } })
```

Now, there is another way to write this query, we can use the logical *or* operator, and I'm going to show you that in a second. So let's finish the first solution. So, we need to *sort* them by their *price* in descending order, so we set the price to *-1*, or as I told you before, you can pass a string, and set it to *('-price')*. Either way, that's perfectly fine. For this solution, I'm going to use this *sort('-price')* syntax. And finally, we need to pick the *name* and *author* of these courses. So, I'm going to set *select* to a string like this *('name author')*.

```javascript
async function getCourses() {
    return await Course
    .find({ isPublished: true, tags: { $in: [ 'frontend', 'backend'] } })
    .sort('-price')
    .select('name author');
}
```

Let's run this and make sure our application is working. So, *node exercise2.js*.

```javascript
Connected to MongoDB...
[
  {
    _id: 5a68fdd7bee8ea64649c2777,
    name: 'Node.js Course',
    author: 'Mosh'
  },
  {
    _id: 5a6900fff467be65019a9001,
    name: 'Angular Course',
    author: 'Mosh'
  },
  {
    _id: 5a68fde3f09ad7646ddec17e,
    name: 'ASP.NET MVC Course',
    author: 'Mosh'
  },
  {
    _id: 5a68fe2142ae6a6482c4c9cb,
    name: 'Node.js Course by Jack',
    author: 'Jack'
  },
  {
    _id: 5a68fdc3615eda645bc6bdec,
    name: 'Express.js Course',
    author: 'Mosh'
  }
]
```

So you should get 5 courses. We have *Node and ASP.NET* which are *backend* courses, we have *Angular*, which is a *frontend* course, and again we have a *Node* course by *Jack*, and *Express.js* which are both *backend* courses. Now to make sure that our sorting is done properly, I would like to display the *price* of these courses as well. So, I'm going to modify our *select* method to add the *price*.

```javascript
.select('name author price');
```

Now let's run this one more time.

```javascript
Connected to MongoDB...
[
  {
    _id: 5a68fdd7bee8ea64649c2777,
    name: 'Node.js Course',
    author: 'Mosh',
    price: 20
  },
  {
    _id: 5a6900fff467be65019a9001,
    name: 'Angular Course',
    author: 'Mosh',
    price: 15
  },
  {
    _id: 5a68fde3f09ad7646ddec17e,
    name: 'ASP.NET MVC Course',
    author: 'Mosh',
    price: 15
  },
  {
    _id: 5a68fe2142ae6a6482c4c9cb,
    name: 'Node.js Course by Jack',
    author: 'Jack',
    price: 12
  },
  {
    _id: 5a68fdc3615eda645bc6bdec,
    name: 'Express.js Course',
    author: 'Mosh',
    price: 10
  }
]
```

Alright, you can see the most expensive course comes first, and the least expensive course comes last. Beautiful. I told you that there is another way to write the query. So instead of the *in* operator, we can use the *or* operator. So we want all these courses to be published. So *isPublished* is the required part. Now, for *tags*, they should either be *frontend* or *backend*.

So I'm going to break this into two parts, for the first part, we're only going to have the *isPublished* criteria. After that, we use the *or* method. Now what JavaScript construct can we use to store multiple values. multiple Objects? We use an *array*. And for an *or* operator, we need multiple operants right? So we pass an array, in this array we need two objects, two filtering objects. So, here's the first one, we set *tags* to *frontend*, and another similar object, we set *tags* to *backend*. This approach is also perfectly fine.

```javascript
async function getCourses() {
    return await Course
    .find({ isPublished: true})
    .or([ { tags: 'frontend' }, { tags: 'backend' }])
    .sort('-price')
    .select('name author price');
}
```

Now, back in terminal, let's run the application one last time.

```javascript
Connected to MongoDB...
[
  {
    _id: 5a68fdd7bee8ea64649c2777,
    name: 'Node.js Course',
    author: 'Mosh',
    price: 20
  },
  {
    _id: 5a6900fff467be65019a9001,
    name: 'Angular Course',
    author: 'Mosh',
    price: 15
  },
  {
    _id: 5a68fde3f09ad7646ddec17e,
    name: 'ASP.NET MVC Course',
    author: 'Mosh',
    price: 15
  },
  {
    _id: 5a68fe2142ae6a6482c4c9cb,
    name: 'Node.js Course by Jack',
    author: 'Jack',
    price: 12
  },
  {
    _id: 5a68fdc3615eda645bc6bdec,
    name: 'Express.js Course',
    author: 'Mosh',
    price: 10
  }
]
```

And we get the exact same result. Beautiful.

## 16- Exercise 3

And here is our third exercise.

> Get all the published courses that are 15 dollars or more, or have the word 'by' in their title.

Alright, let's get started. So a new file, I'm going to call this *exercise3.js*. And again to save time, I'm going to go to our previous solution, copy all the code and paste it in the new file. Now I'm going to get all the published courses that are 15 dollars or more, or have the word 'by' in their title. So, our first criteria should stay as it is. Because we want to get only the published courses. Then, we need the *or* method, because we want to get the course that are 15 dollars or more, or have the word 'by' in their title. So, we just need to modify our filtering objects.

So, let's delete the two *tags* objects. First we want to get courses that are 15 dollars or more. So we set *price*. Now, I cannot set price to 15 dollars, because this will return only the courses that are 15 dollars. As I told you before, with a simple value, we cannot express a concept like *15 dollars or more*. So we need to replace the value with an object. In this object we have *Key Value* pairs. Our keys are *MongoDB operators*. So, we use *gte*, which is short for *greater than or equal to*. And we set this to 15. So with this, we get all the courses that are 15 dollars or more.

Now, our second filter. We want to get the courses that have the word 'by' in their title. So, we add another object, and set *name*, again we could not set this to 'by', because this will return courses who's title is exactly 'by'. So, we should replace the string 'by' with a regular expression */pattern/*. Now, we want to have the word *by* anywhere in the tittle. So we can have 0 or more characters before or after *by*. So, in regular expressions we use period '.' to represent the character. And we use '*' to represent 0 or more. Now, here we have 'by', and then again we repeat period '.*'. So 0 more characters, before or after. And also, I want to make sure that our search is case insensitive, so we need to put an *i* in the end.

```javascript
async function getCourses() {
    return await Course
    .find({ isPublished: true})
    .or([
        { price: { $gte: 15 } },
        { name: /.*by.*/i }
    ])
    .sort('-price')
    .select('name author price');
}
```

Now let's run the application.

```javascript
Connected to MongoDB...
[
  {
    _id: 5a68fdd7bee8ea64649c2777,
    name: 'Node.js Course',
    author: 'Mosh',
    price: 20
  },
  {
    _id: 5a6900fff467be65019a9001,
    name: 'Angular Course',
    author: 'Mosh',
    price: 15
  },
  {
    _id: 5a68fde3f09ad7646ddec17e,
    name: 'ASP.NET MVC Course',
    author: 'Mosh',
    price: 15
  },
  {
    _id: 5a68fe2142ae6a6482c4c9cb,
    name: 'Node.js Course by Jack',
    author: 'Jack',
    price: 12
  }
]
```

So, you should get 4 courses. The first 3 courses, you can see their price is greater than or equal to 15 dollars. So here we have a 20 dollar course, a 15 dollar course, and another 15 dollar course. But the last course is not 15 dollars, however, here we have the word 'by' in the name of this course.

## 17- Updating a Document- Query First

So, we learned a lot about querying documents. In this lecture I'm going to show you how to uodate documents in a MongoDB database. So, let's create a new function in our index.js file, *async function updateCourse()*. Now, this function should take an id, that's the id of the course we're going to update. And then we're going to replace *getCourses()* with *updateCourse()*.

There are basically two ways to update a document in MongoDB. One of the approach is what I call *Query first*. So, we find the document using *findById()*. Then we modify it's properties, and then finally call the *save()* method. This is probably the approach that you have used in other frameworks. Now the other approach is what I call the *Update first*. So, instead of retrieving a document first, we go in the database and update directly.

We can optionally get the updated document as well. So in this lecture, I'm going to show you the first approach, and we will look at the other approach in the next video. So, in our *updateCourse(id)* function, we want to get the course with a given *id*. So we call *Course.findById(id)*, and pass the *id*. Now, this returns a promise, so we *await* it, get the result and store it in *course*.

Now chances are there is no course with the given *id*. So, we need to check for that. So, if we don't have a course *if (!course)*, we're going to *return* immediately. Otherwise, we're going to update the properties of this course. So we can set *course.isPublished*, to *true*. And also set *course.author* to *Another Author*. Now, there's another approach, instead of setting multiple properties, we can call the *set* method like this;

```javascript
course.set({
        isPublished: true,
        author: 'Another Author'
    });
```

So, basically, these two approaches are identical, which one you choose is purely your personal preference. In this damo, I'm going to use the first approach. Now finally, we call the *save()* method. This is the same method that we used earlier to create a new course. So it returns a promise, we can *await* it, get the result and display it on the console. So, *console.log(result)*.

```javascript
async function updateCourse(id) {
    const course = await Course.findById();
    if (!course) return;

    if (course.isPublished) 

    course.isPublished = true;
    course.author = 'Another Author';
    
    const result = await course.save();
    console.log(result);

}

updateCourse('5a68fde3f09ad7646ddec17e');
```

Now, I'm going to back in *compass* and get a valid *course id*. Alright, so here in our *courses* collection, I'm going to grab a course id *'5a68fde3f09ad7646ddec17e'* and paste it in *updateCourses*. Now, back in the terminal, let's run this program.

```javascript
{ tags: [ "aspnet", "backend" ],
date: "2018-01-24T21:42:59.605Z",
_id: "5a68fde3f09ad7646ddec17e"
name: "ASP.NET MVC Course"
author: "Another Author",
isPublished: true,
price: 15
__v: 0 }
```

So here's the course that we updated, look, *author* is set to *another author. In  the next lecture, I'm going to show you how to update a document directly in the database without retrieving first.

## 18- Updating a Document- Update First

So, in the last lecture, you learned about the *query first* approach to update a document. This approach is useful, if you recieve an input from the client, and you want to make sure that the update is a valid operation. For example, here we can have a business rule, so if the course is published, maybe we should not be allowed to change it's author. To implement this business rule, we need to retrieve the course first, and then we need to write some logic like this, *if(course.isPublished)*, we want to *return*. We don't want to update this course. So That's when we use the *query first* approach.

```javascript
if (course.isPublished) return;
```

But sometimes you know what you are doing, you're not recieving an input from the client, you just want to update a document, or perhaps multiple documents directly in the database. And that's what I'm going to show you in this lecture. So, instead of using the *findById()* method, we use the *updateOne()* method. Now, the first argument here is a query or a filter object, so we can get the course with this *{ _id: id }*. Or we can pass something more generic. We can get all the courses that are not published like this *{ isPublished: false }*. So with this, we can update multiple documents in one go. Now in this demo, we want to update a course with a particular id. So I'm going to use *{ _id: id }*.

Now the second argument to the *updateOne()* method, is the *update* object. Now here we need to use one or more of the *MongoDB Update operators*. So if you search for *MongoDB Update operators*. On this page you can find the list of all the supportive operators. So, we have *currentDate*, to set the value of a field to the current date.

We have *inc or increment*, this is very powerful. With this, we can increment the value of a field by the specified amount. Imagine you want to build an application like *Facebook*. So when the user likes a post, you want to increment the number of likes. With this operator, you can increment the number of likes directly in the database, you don't have to retrieve the post first, then increment the number of likes. You can also pass a negative value, to decrement the value of a field.

We have *min* which is useful if you want to update a field, if the specified value is less than the existing field value. We have another similar operator, and with this, we can update a field, if the specified value is greater than the existing field value. We have *mul or multiply* which is kind of similar to *increment*, but with this we can multiply the value of a field by the specified amount. We *rename* to rename a field. We have *set* which I'm going to show you in this lecture, and with this we can set the value of a field. And similar to this, we have *unset* which we can use to remove the specified field from a document.

So back in our *update* object. I'm going to use the *set* operator, we set it to an object. And in this object, we add one or more *key value* pairs. So, let's say we want to update the *author* property, set it to *Mukhtar*, and we want to set *isPublished* to false. So, with this *update* method, we can update a document direcly in the database without retrieving it first. Now what we get in *const course*, is the result of the *update* operation. Not the *course* object. So, let's rename it to *result*. Now we don't have to check for the existence of the course.

```javascript
if (!course) return;
```

We don't have to update the properties.

```javascript
course.isPublished = true;
course.author = 'Another Author';
```

And we don't have to save it explicitly.

```javascript
const result = await course.save();
```

Okay, very simple. So, let's get back in the terminal, and run our application again.
