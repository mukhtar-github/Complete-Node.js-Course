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

