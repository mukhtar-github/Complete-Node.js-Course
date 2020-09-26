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

var _ = require('underscore');

var result = _.contains([1, 2, 3], 2);

console.log(result);



