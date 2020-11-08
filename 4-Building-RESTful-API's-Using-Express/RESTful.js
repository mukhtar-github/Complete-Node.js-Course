// 1 - Introduction

//So, earlier in section 2, were we talked about Node's Module System. You learned about 'HTTP Module'. We use it to create
//a web server that listens on 'port 3000' and responds to requests to the end-points. So the root or '/api/courses'. Now,
//while this approach is perfectly fine, it's not ideal for building a complex application. Because in a large complex 
//application, we might have various endpoints and we don't want to hard code all these 'if' statements in the function. So
//in this section, we're going to look at 'Express' which is a fast and light weight framework forb building web applications.
//So  next we're going to look at 'RESTful services'.


// 2 - RESTful Services

//Let's start this section by a brief introduction to 'RESTful services'. Also called "RESTful API's". So earlier, at the
//beginning of this course, I introduced you to the client server architecture. So most, if not all applications we use these
//days follow this architecture. The app itself is the client or the frontend part. Under the hood, it needs to talk to the
//server or the backend, to get or save the data. This communication happens using the http protocol. The same protocol that
//powers our web. So on the server, we expose a bunch of services that are accessible via the http protocol. The client can
//then directly call these services by sending http requests. Now, this is where Rest comes into the picture. REST is short
//for Representational State Transfer. It may probably doesn't make any sence to you, because it was introduced by a PhD 
//student as part of his thesis.