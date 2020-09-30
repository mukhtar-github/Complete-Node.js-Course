const { contains } = require('underscore');
// 2 - Package.json

//Before you add any Node packages to your application, you need to create a file that is called package.json
//Package.json is basically a json file that includes some basic information about your application or your
//project, such as it's name, it's version, it's authors and so on. It's basically a bunch of metadata about your
//application. And all Node applications by standard have this package.json file. Moreover, before adding any node 
//packages to your application, you need to create a package.json file. So, as a best practice whenever you start
//a Node project, you need to run npm-init to create package.json. The faster way to create a package.json file is
//to supply the flag npm init --yes.


// 3 - Installing a Node Package

//In this lecture, I'm going to show you how to add a third party library, or a third party Node package to your
//Node application. So, we're going to install a popular Javascript library called underscore.


// 4 - Using a Package

//Let's create a new file in the root of this project, and call it npm.js. We're going to use our require function to load
//the underscore module. By convention, we use an underscore for referring to the underscore library. We use the require
//function, and as the argument, we supply underscore. This is how the require function works. When you supply the module
//name as an argument inside the require function, first it assumes the module is a core module. In Node, we don't have a
//core module called underscore. So the require function thinks maybe this underscore is a file or folder in this project.
//However, earlier in the course, you learn that in order to reference a file or folder, we use (./). So, if the argument
//to the require function was (./underscore), then the require function would assume that we have a file called underscore.js
//in the same folder. If not, it would assume underscore is a folder, and inside this folder we have a file called index.js.
//But in this case, we neither have a file or folder called underscore inside this project. So, the require function moves
//onto the third step. It assumes that this module we've specified here exists inside the Node module's folder. So, this is
//how the require function resolves a module. So, you have loaded the module now let's use it. See result below. So, this is
//how you use third party node modules in your applications.

//var _ = require('underscore');

//var result = _.contains([1, 2, 3], 2);

//console.log(result);// => true.


// 5 - Package Dependencies

//I want you to install a Node package called Mongoose. We use this to store our data in MongoDB. Now, let's take a look at
//what we have inside of the Node Module folder with this (ls node_modules). Look, we have lots of folder here. We didn't
//install any of these libraries, we only install Mongoose and Underscore. So, these other libraries you see here, these are
//other Node Packages that Mongoose is dependent upon. In the previous version of npm, we had a different behavior. So, all
//the dependencies of a given package were stored inside that package folder. However, this created a mess, because we ended
//up with the same package being installed multiple times, and also in some situations, it would end up with a very deeply
//nested structure. So, in recent versions of npm, this behavior changed, and now all dependencies are stored under our Node
//Module's folder. Now, there is an exception here. If one of these packages uses a different version on one of these
//dependencies, then that version would be stored locally with that package.


// 6 - NPM Packages and Source Control

//We have quite a few folders inside the Node modules. Now this is a very small application. In a real world application, we
//are going to have lots of folders in the Node modules folder, and the size of te folder will grow siginificantly. Let's
//say you want to give the application codes to a friend to work on it via email or dropbox. You don't want to send all the
//contents of the module's folder. You might ask, what about the application dependencies? That our application may not work.
//The good news is that our dependencies are stored in the package.json. We can restore all these dependencies by running
//npm install or i.



