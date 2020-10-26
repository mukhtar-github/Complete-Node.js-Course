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
//npm install or i. If we want to exclude the Node module folder, we add a new file in the root of our folder with the 
//extention of .gitignore. Then, we can list all the files and folders that should be excluded from our git repository. 
//In this case, node_modules with a slash to indicate that it is a folder.


// 7 - Semantic Versioning

//So earlier in this section, I mentioned the Caret character. What does this mean? Well, in order to understand this, first
//we need to understand Semantic Versioning. Which is also called Samver. In Semanti versioning, the version of a Node package
//has three components (Numbers). The first number is what we call the major version. The second one is what we call the minor
//version. And the third one is what we call the patch version, or patch release, which is used for bug fixes. 
//The Caret character tells npm that we're interested in any version of Mongoose as long as the major version remains the 
//same.So if there is a newer minor or patch version available, we will be interested in that package as well. Another way
//or another syntax to specify a version without using a caret character is by writing the major version dot x. For example,
//4.x. Sometimes, in some real world applications instead of the Caret character, you may see Tilde (~). And this means you
//are interested in any versions, as long as the major version and the minor version remains the same. So the alternative
//syntax to specify a version without using the Tilde character is by writing the major version and the minor version dot x.
//For example, 1.8.x. So we can see that the Caret and the Tilde character help you keep your applications up to date with
//the latest releases of these dependencies. However, sometimes this can cause issues in the real world. For example, let's
//say Underscore releases a new version that is 1.8.4. They may fix a bug, but they may break something else, and that may
//interfere with your application. In that case, you want to make sure that you're using the exact same version. So if 
//someone checks out your code from the repository three months later. You want to make sure they have exact same version
//of Underscore that was used on day one. In other to do that, you simply remove the Caret or Tilde character. So next time
//you run npm install you'll get this exact version. So this is how Semantic versioning, Caret and Tilde characters work.


// 8 - Listing the Installed Packages

//If you want to see the list of all the installed dependencies and their exact version, you can simply run npm list. So,
//in the list tree, you can see all the dependencies and their dependencies. Now, the tree is a little bit polluted with 
//too much detail. Maybe you're only interested in the dependencies of your application, not the dependencies of other 
//packages. If that's the case, when you run npm list, you supply a flag  that is --depth=0.


// 9 - Viewing Registry Info for a Package

//Earlier in this section, I told you that if you want to learn about an npm package, you can simply head over to npmjs.com
//and search for that package. But there is a faster way to find all the metadata about a given library. We can run npm view
//and specify a package like Mongoose. If your interested only on the dependencies, you can run npm view mongoose dependencies.
//Another useful property is versions. If you want to see all the versions of Mongoose that have been released so far, you
//can run npm view mongoose versions. This is useful, because sometimes, you may want to downgrade to an earlier version or
//you may want to upgrade to a newer version, in this case you can see the history.


// 10 - Installing a Specific Version of a Package

//Sometimes you may need to install a specific version, not necessarily the latest version. So to do that, you run npm install
//then you put an @ sign and then set the version, let's say 2.4.2. Now, we can see that our package.json is updated.


// 11 - Updating Local Packages

//In the real world, as you build your application, there might be newer versions of the dependencies you have installed.
//So, you want to find out what packages have been outdated and what are the new versions. To find this information you run
//npm outdated. So, with npm oudated, you can see all the outdated packages. Now, if you want to update them, you run 
//npm update. However, this only works for updating minor and patches releases. If you want to update these dependencies to
//their very latest version. For that, we need a different command line tool. So, run npm install -g, which stands for 
//global, and the name of the package we're going to install is npm-check-updates. Now, if you are on Mac or Linux, you 
//prefix this with sudo and enter your password. Okay, now we a new command line tool called npm-check-updates. If you run
//this, you can see all the outdated packages and thier new versions.


// 12 - DevDependencies

//So far, all the dependencies we have installed are application dependencies, like mongoose and underscore. So our 
//application needs these dependencies in order to function properly, but sometimes we use dependencies that are only used
//during developement. For example, we have tools for running unit tests, we have tools for doing static analysis on our 
//code, we have tools for bundling our JavaScript code and soon. These dependencies are developement dependencies, and they
//should not go into production environment where we deploy our application. So in this lecture, I'm going to show you how
//to install a dependency, a node package called jshint. Which is a static analysis tool for JavaScript code. It basically
//analyzes our JavaScript code, and look for potential problems or syntactical errors. So, we run npm install jshint. Now
//in order to specify that this is a developement dependency, we supply a flag --save-dev.
//All dependencies, whether they are application dependencies or developement dependecies, they are stored inside of the 
//Node modules folder. They are segregated in package.json


// 13 - Uninstalling a Package

// Run npm uninstall package name or npm un package name.


// 14 - Working with Global Packages

//All these packages we have install so far, like underscore and jshint, these are particular to this node project in this 
//folder. But there are node packages on npm registry that are not specific to an application. These are often command line
//tools that you want to access from everywhere. They're not tied to a specific folder, or a specific project. Npm is an 
//example of one of these global packages.It's a command line tool, we can run it from any folder. It's not specific to a
//given project. Another popular command line tool is Angular CLI. We use this to create a new angular project. If you want
//to install a Node package globally, you use the -g flag.


// 15 - Publishing a Package

//In this lecture, I'm going to show you how to create your own Node packages and publish them on npm registry. First let's
//create a new folder. We're going to create a new Node project, let's call this Lion-lib(mkdir lion-lib). So, we're going
//to create a library called lion. Just like how we have a  library called underscore. Now let's go to lion(cd lion-lib/).
//Here we need to create a package.json file. So (npm init --yes). Let's open the folder in vs-code and add a new file to
//it, index.js, because that's our entry point to our package. Now, here we can export one or more functions. I'm going to
//export a very simple function, (module.exports.add). We set this to a function that takes two parameters and simply
//returns their sum. Very simple function, we just want to focus on how to publish a Node package. Now, back in the terminal.
//If you don't have an account on npm.js, you need to create an account first. You can do that by running (npm adduser). If
//you already have an account, you then run (npm login). Either way, you're going to get these thre questions. First is your
//user name, then your password, and finally your email address. In order to publish this package, we run npm publish. So,
//when you try to publish, you're going to get an error because you don't have the permission to modify that package. So to
//solve this issue, go back to package.json and use a unique name for your package(lion-lib-mtg). So, I publish this package
//on npm, now we can use it in another Node application. So, let's go out of this folder(cd ..). Create another folder like
//node app. So, we start with (npm init --yes), we get a basic package.json. And, we can install this package that we just 
//published, using (npm install lion-lib-mtg). Now let's open it. So inside of node_modules, you can see we have lion-lib-mtg,
//we have index.js, which is where we're exporting our add function. And we have our package.json. Now the package.json that
//you see here, has more metadata than what we provided, because once you publish, npm adds it's own properties to the 
//package.json. Also you can see, this package is listed under dependencies. The current version is version 1.0.0. Now we 
//can use this as another Node module is this application. So, in the root of this folder I'm going to create a new file,
//index.js. And load our Node module. So we use the require and name of our module is lion-lib-mtg. We store it in a variable,
//lion, and simply call lion. Look, we have the Add function. We give it two arguments, and store the out come in the result 
//variable, then console.log(result). Now back in the terminal









