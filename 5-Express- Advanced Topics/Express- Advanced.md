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

So, now let me show you how to create a custom *Middleware function*. So on line *5* of the *index.js* file, we're adding JSON *Middleware function*. After that we're going to call *app.use*. Once again, we call this method to install a *Middleware function*, in a *Request Processing Pipeline*. So we need to pass a function that takes a *request*, and *response*, and *next*, which is a reference to the next *Middleware function* in the pipeline. We simply pass a function here, now in this function, let's do a simple *console.log('Logging...')*. Let's imaging this *Middleware function* is for logging every request. So we perform our logging and then we call *next* to pass control to the next *Middleware function* in the pipeline. If you don't do this, because we're not terminating the request-response cycle, our request will end up hanging.

```javascript
app.use(function(req, res, next) {
    console.log('Logging...');
    next();
});
```

Let me show you what happens, I'm going to comment out the *next* method, save. Now back in *Postman*, on the address tab, I'm going to send a simple HTTP *get* request for our courses endpoint. So send, and you can see that we're not getting a response, it's *Loading...*. And if we look in the console, we can see our *Logging...* message. So, this indicaes that our *Middleware function* was executed successfully, but because, we did not pass control to another *Middleware function* to terminate the request-response cycle, our request end up hanging there.

So let's uncomment out the *next* method. We can also create another *Middleware function* for performing authentication. So I'm going to select the custom *Middleware function* code we just wrote, duplicate it. And in this second *Middleware function*, I'm going to change the *console.log* message to *Authenticating...*. Now, back in *Postman*, let's send another request, now look in the terminal, we have two messages, *Logging...* and *Authenticating...*.

```javascript
app.use(function(req, res, next) {
    console.log('Authenticating...');
    next();
});
```

So what I want you to pay attention to here is that our *Middleware functions* are called in sequence. First, our login *Middleware function* is called, then, the *Middleware function* for authenticating the user, and finally, the route handler which is another *Middleware function*.

Now in terms of clean coding, when you want to create a custom *Middleware function*, you don't want to write all that code inside *index.js* or *index module*. You should put each *Middleware function* in a separate file or separate module. So, let's create a new file, called *logger.js*. Now, back in the *index.js* file, let's grab the logging *Middleware function*, cut it, and back in *logger.js*, we paste that there. We give the function a name, like *log*, and finally, export it like this;

```javascript
module.exports = log;
```

So, this module exports a single function. Now, back in *index.js*, on the top, we load our new module. And then we can install it by calling *app.use(logger)* inside the *index.js* file.

```javascript
const logger = require('./logger');
```

Now you understand exactly what this *app.use(express.json());* line of code means. So when we call *express.json()*, it returns a function, a *Middleware function* that has three parameters, *request*, *response*, and *next*. That *Middleware function* parses the *request body*, and if there is a JSON object, it will set *req.body*, and then it will pass control to the next *Middleware function*.

Back in *index.js*, so this is how we define a custom *Middleware function* in a separate module, we import it here, and then install it, by calling *app.use*. We could use the same technique for the second *Middleware function*, but I'm going to leave that to you as an exercise.

## 4- Built-in Middleware

So in the last lecture, you learn how to build custom *Middleware*, but as I told you before, in *express* we have a few built-in *Middleware functions*. One of them is the *express.json()* middleware, that now you're familiar with, so it parses the body of the request, and if there is a JSON object it will populate *req.body* property. We have another similar *Middleware function* that is called *urlencoded*.

So let's duplicate *app.use(express.json());* line inside the *index.js* file. So instead, we will have;

```javascript
app.use(express.urlencoded());
```

Again, this is a method we call, and what we get in result is a *Middleware function*. This *Middleware function* parses incoming requests with *urlencoded payloads*. That is a request with a body like this *key=value&key=value*. Now this is more of a traditional approach, it's not something that we use that often these days. Basically, if you have an HTML form with input fields and post that form to the server, the body of the request will look like this *key=value&key=value*. So, that's where you have *urlencoded payload* in the body of the request. Now, this middleware parses this body and populate *req.body* like a JSON object.

Let me show you how that works, so, back to *Postman*, let's send a *post* request to local host *'http://localhost:3000/api/courses'*. So previously, we passed a JSON object in the body, so I told you to select *raw*, and then *application JSON*. However, in this demo, we're going to use *form-urlencoded* here. So now we can pass *key=value* pairs in the body of the request. And they will be concatenated when this request is sent to the server.

So the the key I'm going to set is *name*, and the value is *my course*. Send, now we can see, we successfully created a new course on the server.

```javascript
{
    "id": 4,
    "name": "my course"
}
```

So our *Middleware function* was able to read our request with *urlencoded payload*. Now, if you look in the terminal, you see a warning *body-parser depricated...*. So this warning is telling us that we should pass an object inside the *urlencoded* *Middleware function*, as shown below.

```javascript
app.use(express.urlencoded({ extended: true }));
```

With this, we can pass arrays and complex objects using the *urlencoded* format.

Now finally, the last built-in *Middleware function* we have in *express* is *static*, and we use that to serve the static files. So let me show you how that works. We pass an argument, and that's the name of a folder, in this case, I'm going to use a folder called *public*. So we're going to put all our static assets, like *css*, *images* and so on inside this folder.

```javascript
app.use(express.static('public'));
```

So, let's create a new folder called *public*. For now, I'm going to add a simple text file inside the new folder called
*readme.txt*, and this is a *readme* file. Now, with this *Middleware function*, we can go back to the browser and head over to *'http://localhost:3000/readme.txt'*. So with this Middleware we can serve static content. And note that here we don't have *public* in the Url. So our *static* contents are served from the root of the site. In the next lecture, we're going to look at third party Middleware.

> So with the *static* Middleware we can serve static contents from the root of the site.

## 5- Third-party Middleware

In this lecture, I'm going to introduce you to a couple of third-party Middleware we have in *express*. So head over to *expressjs.com*. On the top, under resources, you can find Middleware. So these are all the third-party Middleware that you can use in your applications. But that doesn't mean that you should use every single *Middleware function* here, because every *Middleware function* will impact the performance of your application.

If you don't need the functionality that comes with a *Middleware function*, don't use it. It's just going to slow down your request processing. So spend some time, have a quick look at the documentation, and see what's out there for you in case you need it. Now, in this list, the Middleware that is considered best practice is *helmet*. It helps you secure your application by setting various HTTP headers.

So let's have a quick look here. Basically, all we have to do is load this *helmet* module using our *require* function, what we get here is a function, so we call that, and that returns a *Middleware function*, and then we'll use that. That's all we have to do. If you want to better understand what *helmet* does under the hood, you really need to look at the documentation, because that's beyond the scope of this course.

So back in the terminal, let's install *helmet*. Now, here in our *index* module, on the top we load *helmet*, get the result and store it in a constant called *helmet*. This is a function, so we're going to call that and pass it to *app.use* method.

The other third-party Middleware that you find useful is *morgan*. We use *morgan* to log HTTP requests. Let me show you how that works. So once again, *npm i morgan*. Now here on the top of the file, we load *morgan* using the *require* function, very simple, and then finally, you use it like this *app.use(morgan());*. So *morgan* is a function, now here you can specify varous formats. I'm going to use the simplest one, that is *tiny*.

```javascript
app.use(morgan('tiny'));
```

Again, you need to look at the documentation to see various options that are available to you. So now, back in the terminal, let's run this application, with *morgan* in place, every time you send a request to the server, it will be logged. So, here I'm going to send a simple *get* request to our courses endpoint. Okay, now at the terminal, *morgan* log our HTTP request, *GET /api/courses 200 79 - 22.179 ms*. And this is the *tiny* format, it's very simple. So we sent an HTTP *get* request to this endpoint, the result was a status code of *200* which means successfull. And the time it took to respond to this request which is *22.179 ms*.

> Every *Middleware function* will impact the performance of your application. If you don't need the functionality that comes with a *Middleware function*, don't use it.

So, this is the *tiny* format, you want more details, you set a different format. And by the way, by default, *morgan* logs the request on the console, but you can also configure it to write it to a log file. Again, remember, when you turn on this feature, it will impact your *Request Processing Pipeline*. So perhaps, you may not want to do this in production, or you may want to enable this only in certain situations. For example, you can have a configuration file, when you deploy this application to the production, in certain situations, you can turn this on for a short period of time, and then turn it off. In the next lecture, I'm going to show you how to work with different environments such as *development*, *testing*, and *production*.

## 6- Environments

In a more complex, or enterprise like application, you need to know what environment your code is running on. Is it a *development* environment, or a *production* environment? Perhaps, you may want to enable or disable certain features based on current environment. For example, let's imaging we want to enable logging up HTTP requests only in the *developement* environment, on a developement machine, but not in *production*.

So let me show you how to do this. Earlier you learned about the *process* object, this is a global object in *Node* that gives us access to the current process. This *process* object has a property called *env*, which gives us the environment variables. Now, we have a standard environment variable called *NODE_ENV*, and this environment variable returns the environment for the node application. If it's not set, we're going to get undefined.

```javascript
process.env.NODE_ENV // If it's not set => undefined
```

Alternatively, we can set this from the outside, we can set this to *development*, to *tesing*, to *staging* or *production*. So, for this demo, let's log this on the console.

```javascript
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
```

We have another way to get the current environment, and that is via the *app* object. So this *app* object has a method called *get* that we use to get various settings about the application. Now, one of the settings is *env*. This method *app.get('env')* internally uses this *process.env.NODE_ENV* environment variable to detect the current environment. However, if the environment variable is not set, *app.get('env')* will return *development* by default. Let me show you how that works. So,

```javascript
console.log(`app: ${app.get('env')}`);
```

Now, back in terminal, look our environment variable is not set, so, that's *undefined*. But *app.get('env')*is returning *development* by default. So this is the difference. Now, which approach you choose is purely your personal preference.

```javascript
NODE_ENV: undefined
app: development
```

Now, in this demo, we want to enable logging of HTTP requests, *morgan('tiny')* only on the *development* machine. So we write code like this,

```javascript
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}
```

And for debugging, I want to display something on the console, like *Morgan enabled...*. Now, let's delete the *environment variable* and the *app object* lines, we don,t need them anymore. Back in the terminal, because this my development machine, you can see Morgan is enabled. Now, let's stop this process, set the *environment variable* to production, run the application again, and then you will see that Morgan will not be enabled.

We set our *environment variable* using *export* on Mac or Ubuntu, and *set* on windows. So, *export NODE_ENV=production*. Now, let's run the application one more time, so, *nodemon index.js*. Okay look, we only get theis message *Listening on port 3000...*, we don't have *Morgan enabled...*. So the is how you can tell, if your code is running on a *development*, *testing*, *staging*, or *production* machine.

## 7- Configuration

So, in the last lecture, you learned how to detect the environment in which your application is running. One topic that goes hand-in-hand with environments, is the topic of storing configuration settings for the application, and overriding those settings in each environment. For example, in your development environment you're going to use a different database or Mail server. So, in this lecture, I'm going to show you how to store configuration settings for your application, and override them in each environment.

Now, there're various Node packages out there for managing configuration, the most popular one is *rc*. But my personal preference is another package that is not as popular, but it has a very clean and elegant design, and it's really easy to use. So, look up *npm config*. So, it has a very active community, there are quite a few collaborators in this project, and I find it a better solution to manage the configuraton of your applications.

So, back in the terminal, let's install *config module*. Okay, back in the project, let's ccreate a folder called *config*, in this folder, we can have a default configuration file, so let's add a new file called *default.json*. So, inside the file, we can have a JSON object to define the default configuration settings. For example, let's have a setting in the JSON object called *name*, just a name of our application *My Express App*.

Now, back in the configuration folder, let's add another file, *development.json*. In this file, we can define the settings specific to the development environment. As part of this, we can override the settings that we defined in the *default.json* file, we can also add additonal settings. So, I can change the name, I can override it, saying *My Express App - development*. We can also add additonal properties, and these properties can also be complex objects, for example, we can have a property called *mail*, where we store information about our mail server. So, in the *mail* object, we can have *host* and we can set it to *deve-mail-server*.

> One topic that goes hand-in-hand with environments, is the topic of storing configuration settings for the application, and overriding those settings in each environment.

Similarly, we can create another configuration file called *production.json*. Now, I'm going to go back in *development.json*, copy all the proprties and paste in *production.json*, and then change the name of the application, as well as the address of the mail server. So, with this Node package, we can easily see the default configuration, as well as the configuration for each environment, it's clean, it gives you a very clean structure.

Now, back in our *index.js*, on the top we load the *config* module and store in a constant called *config*, and with this, we can easily get various settings for our application. So, let's look at some few examples.

```javascript
// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
```

Now, back in terminal,I'm going to put this machine in the development environment. So, *export NODE_ENV=development*, and then run our application.

```javascript
Application Name: My Express App - Development
Mail Server: dev-mail-server
Morgan enabled...
Listening on port 3000...
```

So, you can see, the settings of the appliction name, and that of the mail server are coming from our *development.json* file. Now if we change the environment to production, we're going to see different values. So, *export NODE_ENV=production* and run the application one more time. Look, this time our mail server is *prod-mail-server*.

```javascript
Application Name: My Express App - Production
Mail Server: prod-mail-server
Listening on port 3000...
```

So, with this Node package, you can easily store the configuration settings for your application. However, you should not store the application secrets in these configuration files, for example you should not store the password of your database or your mail server. Because, when you're checking your source code, to a repository, that password or that secret is visible to anyone who has access to that source control repository. In fact one of the famous financial companies in the US was hacked, because someone checked in a password into source control repository. So, the way we deal with these secrets, is by storing them in the environment variables.

Let me show you how that works. So, back in terminal, let's define an environment variable for storing the password of a mail server. So, *export password=1234*. Now, to prevent this environment variable to clash with another environment variable, it's better to prefix that with the name of our application. Now, in this demo, let's say the name of our application is *app*, so we add *app* as a prefix, *export app_password=1234*.

So in development environment, we manually set this environment variable, and also in production environment, we most likely have a configuration panel for storing our environment variables. So, we store all these passwords and secrets in our environment variables, and then read them using our *config* module. Now, back in the project, in the configuration folder, we need to add another file called *custom-environment-variables.json*.

Make sure to spell it properly, the name of the file is very important. And in the file, we define the mapping of configuration settings to environment variables. So, I'm going to go in our *development.json* file, copy all that is inside and paste into the new file. Now let's say for the mail property, inside that, we're going to have a property called *password*. So, we want to map this to the environment variable that we created, that was *app_password*.

Now, we don't need *host*, because we're not going to map this to an environment variable, the value is defined in one of our configuration files, so we delete it. And for the same reason, we don't need *name*. So, in this file *custom-environment-variables.json*, we only have the mapping. The mapping of our configuration settings *password*, to environment variables, *app_password*.

Now, back in *index.js*, let's display the password of the mail server.

```javascript
// Configuration
console.log('Mail Password: ' + config.get('mail.password'));
```

So, the *config* object looks at various sources to find a value for the configuration of *mail.password*. The source can be a *configuration-file*, a *JSON-file*, it can be an *environment-variable*, it can also be a *command-line* argument. For that, you need to look at the documentation yourself. Now back in terminal, let's run the application, okay look, our Mail Password is *1234* and this was read from an *environment-variable*, not a *configuration-file*.

```javascript
Application Name: My Express App - Development
Mail Server: dev-mail-server
Mail Password: 1234
Morgan enabled...
Listening on port 3000...
```

Again, this *config package* has alot of useful features, and I leave it up to you to read the documentation and learn more about this package.

## 8- Debugging

Earlier in this section, we wrote this code to see if we're in the *development environment*.

```javascript
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}
```

If yes, we enabled *Morgan* to log HTTP requests, and we also logged this message *Morgan enabled...*, on the console. So this *console.log* is JavaScript programmers oldest friend. We use it all the time for *debugging*. The problem with this approach however, is that sometimes when we are done with them, we delete them or we comment them out. But sometime later, you might need them, so we have to write the code again or remove the comment.

This approach is very tedious, a better way to log messages for the purpose of debugging, is to use the *debug package* in Node. With *debug*, we're going to replace all these *console.log* statements with the call to a debug function, and then we can use an *environment variable* to enable or disable debugging. This way, we don't need to come back to our code and modify the code, we dont have to delete these *console.log* or *debug* statements, we don't have to comment them out, we can control them from the outside, using an *environment variable*.

But more importantly, we can also determine the level of debugging information we want to see. Maybe sometime you're working on a database problem, perhaps we only want to see the debugging information related to the database. So, again we don't have to come back to the code and modify all these *console.log* statements.

So, let me show you how to use the *debug package*. Back in the terminal, let's install *debug*, *npm i debug*. Now, back to our *index module*, on the top, let's load the *debug module*. This require function returns a function, so we call this function and give it an argument, and this argument is an arbitrary namespace, that we define for debugging. For example, we can define a namespace like *app:startup*. Now, when we call this function with this argument, we get a function for writing debugging messages in this namespace. So, let's call that function *startupDebugger*.

Potentially, we can another debugger for debugging database related messsages. So, once again, we load the debug module. We get a function, we call that function, give it a namespace like *app:db*. And this will return a debugging function. So, we get it and store it in *dbDebugger*.

Now, we're going to replace *console.log('Morgan enabled...')* with a call to *startupDebugger* function. So, *startupDebugger('Morgan enabled...')* like that. Now potentially, somewhere in the application, we can have some database work, and there you need to write some debugging information. So, we can use our other debugger function. So, *dbDebugger('Connected to the database...')*, something like that.

Now, we're going back to the terminal and use an *environment variable* to determine what kind of debugging information we want to see in the console. So, we set an *environment variable* called *DEBUG*, like this *export DEBUG=app:startup*. That means with this, we're going to see only the debugging messages that are part of this *app:startup* namespace. Now, if we run the application, we got this.

```javascript
app:startup Morgan enabled... +0ms
```

Now next time I run this application, maybe I don't want to see any debugging information. So we can reset this *environment variable* to nothing, run the application again, we no longer see the debugging message. Or we may want to see debugging messages for multiple namespaces. So we can set our *environment variable* to *export DEBUG=app:startup,app:db*. With this, we'll see the debugging messages in these two namespaces.

Or if we want to see all the debugging messages for our app namespace, we can use a wild card *(export DEBUG=app:*)*. This way, we don't have to repeat each of them individually. Now when we run the application, we see messages in different namespaces.

```javascript
app:startup Morgan enabled... +0ms
app:db Connected to the database... +0ms
Listening on port 3000...
```

And the beautiful thing about this *debug module* is that it color codes, the namespace, so we can easily distinguish various debugging messages. Which we don't get with *console.log* Now, there's also a faster way to set the level of debugging we want to see, so we don't have to explicitly set the *environment variable* using the *export* command. We can set the *environment variable* at the time of write our application.

Let's say this time I only want to see debugging messages in *app:db* namespace. So we set *DEBUG=app:db with a space*, then run our application either with *node* or *nodemon index.js*.

```javascript
app:db Connected to the database... +0ms
```

So, this is a shortcut to set an *environment variable*, in this case *DEBUG*, and run the application at the same time. And one last thing,in this particular demo, I created two debugging functions, *startup and db* debugger. But in a real -world scenario, you may not necessarily need multiple debugging functions in the same file or in the same module. If that's the case, you can simplify your code by changing the name of the *debugger* function to *debug*.

For example, in this file, let's say we don't have any database work, so I'm going to delete it. We only want to write debugging messages about the application startup, so, let's delete the *dbDebugger* function. Now, we can rename this function, *startupDebugger*  to *debug*. So, that's shorter than writing *console.log()*. And it gives us alot more power and control over how much of the debugging information we want to see. So, prefer the *debug* module to *console.log()* statements.

## 9- Templating Engines

In all the endpoints we have implemented so far, we return JSON objects in the response. Sometimes however, you need to return HTML markup to the client. And that's where we use a *Templating engine*. There are various *Templating engines* available for *express* applications. The most popular ones are *Pug* which used to be called *Jade*. We also have *Mustache*, and *EJS*.

Each *Templating engine* has a different syntax for gegnerating dynamic HTML and returning it to the client. So, for this demo, I'm going to show you how to use *Pug*to generate a dynamic HTML and return it to the client. So, first let's install *Pug*. Now, back in our *index module*, we need to set the *view engine* for the applicaction. So, we set it as.

> For *endpoints requests*, we need to sometimes return HTML markup to the client. And that's where we use a *Templating engine*.

```javascript
app.set('view engine', 'pug');
```

So when we set this, *express* will internally load this module. So we don't have to *require* it. And there is another setting that is not compulsory, it's optional, only if you want to override the path to your templates. We set it as.

```javascript
app.set('views', './views');
```

The name of the property is *views*. And the value is the path to where we store the template. So the default value is *./views*. That means, you should put all your views or all your templates inside a folder called *views*, which should be in the root of the application. Again, this is an optional setting, that's the default value, so we don't have to set that.

Now, let's add a new folder, *views*. Inside this folder, let's add a new file, we can call that *index.pug*. With *Pug*, we can define our template using a syntax like this, so we can have an *HTML* element, then inside that, we can have *head*, then we can have the *title* element. And we can set a value for the *title* dynamically using the syntax, so we add an equal sign, and then the name of a variable that we will set at runtime. I will show you how that works later.

Now, in parallel to *head*, we want to have another element called *body*, and inside that, we want to have an *h1*, and we want to set the value for this dynamically, using a variable called *message*. So you see *Pug* has a cleaner syntax than regular HTML, we don't have those openining and closing elements, ofcourse some people love it, some people hate it.

```javascript
html
    head
        title= title
    body
        h1= message
```

But that aside, let's see how we can convert this to regular HTML and return it to the client. So, back in our *index module*, earlier we defined a route for the root of the application, where we send a simple message to the client *Hello World!*.

```javascript
app.get('/', (req, res) => {
    res.send('Hello World!');
});
```

Now, we are going to replace this with an HTML markup and return it to the client. So, instead of the *send* method, we use the *render* method. As the first argument, we specify the name of our *view*, in that case *index*, because the name of our file is *index.pug*. As a second argument, we pass an object, and this object includes all the values for the parameters that we have defined in our template, like *title* and *message*. So, here I've set two properties, *title* and *message*. That's all we have to do.

```javascript
app.get('/', (req, res) => {
    res.render('index', { title: 'My Express App', message: 'Hello' });
});
```

So now, let's start the application again, and head over to *localhost:3000*. Look, we get our HTML markup. We can verify that by looking at the source of the page, what you see here is our *Pug* template converted to standard HTML. So we have *html*, *head*, *title* of which it's value is inserted dynamically at runtime.

```html
<html>
    <head>
        <title>My Express App</title>
    </head>
    <body>
        <h1>Hello</h1>
    </body>
</html>
```
