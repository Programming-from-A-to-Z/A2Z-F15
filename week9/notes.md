---
title: Programming from A to Z Week 9 Notes
layout: default
---

# Twitter Bots (and server-side programming)

<!--<head>
<script language="javascript" type="text/javascript" src="../javascripts/p5/p5.js"></script>
<script language="javascript" type="text/javascript" src="../javascripts/p5/p5.dom.js"></script>
<script language="javascript" type="text/javascript" src="generate.js"></script>
</head>-->

## Examples (node basics)
* [Hello World Node + Express](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week9/01_hello_world_express)
* [Serving static files](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week9/02_serve_files_express)
* [Route basics](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week9/03_routes_express)
* ["RESTful" routes](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week9/04_routes_rest_express)
* [Make your own API](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week9/05_concordance_API)
* [Proxy for scraping html](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week9/06_scraping_proxy)
* [Talking to Twitter API](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week9/07_twitter_api_oauth)

## Examples (twitter bots)
* [Basics -- random number bot](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week9/08_twitter_bot)
* [Bot + text generation with context free grammar](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week9/09_twitter_bot_cfg)

## Bot lists
* [Bot twitter list](https://twitter.com/shiffman/lists/bots)
* [More comprehensive twitter bot list](https://twitter.com/ckolderup/lists/the-fall-of-humanity/members)
* [Bot wiki](https://botwiki.org/tag/twitterbot)
* [Another bot wiki](https://github.com/shiffman/A2Z-F15/wiki/Twitter-Bots)
* [New York Magazine article on bots](http://nymag.com/following/2015/11/12-weirdest-funniest-smartest-twitter-bots.html)

## Watch this!
* [Darius Kazemi Eyeo talk](https://vimeo.com/112289364)

## Bot resources / tutorials
* [Allison Parrish spreadsheet bot tutorial](http://air.decontextualize.com/twitterbot/)
* [Allison Parrish bot workshop notes](https://gist.github.com/aparrish/3ee64d07f0a00b08618a)
* [Allison Parrish node bot example](https://github.com/aparrish/example-twitter-bot-node)
* Twitter Bot node tutorial: [part 1](http://ursooperduper.github.io/2014/10/27/twitter-bot-with-node-js-part-1.html), [part 2](http://ursooperduper.github.io/2014/10/28/twitter-bot-with-node-js-part-2.html), [part 3](http://ursooperduper.github.io/2014/11/03/twitter-bot-with-node-js-part-3.html)
* [Twit Node API](https://github.com/ttezel/twit)
* [Another Node bot tutorial](http://kiafathi.azurewebsites.net/project-making-a-twitter-bot-with-node-js/)

## Node basics

[Node.js](https://nodejs.org/en/) is a JavaScript framework for writing server-side applications.  In its simplest form it allows you to trigger small JavaScript programs from the command line without any browser involved.  For example, assuming [node is installed](https://nodejs.org/en/) if you  write a JavaScript program in a file called `hello.js`:

{% highlight javascript %}
console.log('Node works!');
{% endhighlight %}

And then execute it from terminal with `node hello.js` you'll see:

<pre>
$ node hello.js
Node works!
</pre>

[Node Package Manager (npm)](https://www.npmjs.com/) comes with node and allows you to install and work with node packages.  Node packages are like libraries or add-ons and you can work with them in the same way that you might use a Processing or JavaScript library.

Though it's not required, it's generally good practice to include a `package.json` file with each node project.  This file stores metadata about your project like author, license, as well as any dependencies on other node packages.  You can manually create the file, but the command `npm init` will prompt you with a series of questions.

<pre>
$ npm init
</pre>

After answering the prompts you'll see something like the following in a new package.json file:

{% highlight json %}
{
  "name": "project-name",
  "version": "1.0.0",
  "description": "This is a test project.",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Daniel Shiffman",
  "license": "ISC"
}
{% endhighlight %}

Here is a link to [documentation of package.json contents](https://docs.npmjs.com/files/package.json).

Now let's say you are creating a node application where you want to use the [Twit package](https://www.npmjs.com/package/twit).  Twit is a package for connecting to the Twitter API and I'll user it in examples you'll find later on this page.  To install a package, simply type `npm install packagename`.  You can also [add flags which can modify how a package is installed](https://docs.npmjs.com/cli/install).  One that I'll use here is `--save`.  This flag saves a reference to the package to `package.json` which can come in handy later when deploying your application.

<pre>
$ npm install Twit --save
</pre>

## Express basics

[Express](http://expressjs.com/) is a popular, simple web framework for node.  It includes hooks for the usual things you want to do with a web server, like hosting files and getting query input from a user.  Although Express is not necessary for the ultimate goal of writing twitter bots (no need to be a web server), I'm going to take a little time on this page to walk through some basics related to other kinds of server-side functionality you might need for projects in this course.

First thing you need to do is install express.

<pre>
$ npm install express --save
</pre>

Once it's installed, the way to access code from a node package is through the [`require()`](https://nodejs.org/api/globals.html#globals_require) function.

{% highlight javascript %}
var express = require('express');
{% endhighlight %}


With a reference to express, you can then create an express "app":

{% highlight javascript %}
var app = express();
{% endhighlight %}

The `app` is now a variable that holds an express instance, and allows you to implement functionality on that instance.  For example, you might listen to conenctions on a certain port.  The callback is triggered when the 

{% highlight javascript %}
var server = app.listen(3000);
{% endhighlight %}

You can also serve static files.  For example, if you have a p5.js sketch (with an `index.html` file) and you place it in a folder called public, you can say:

{% highlight javascript %}
app.use(express.static('public'));
{% endhighlight %}

Now anytime you enter the url to your server (if you are running it on your machine, this will be `http://localhost:3000`), the contents of the public folder will be hosted.  (By the way, this is exactly what the [p5.js editor](https://github.com/processing/p5.js-editor) is doing when you hit the run button.)

## Routes with express

Beyond hosting static files, one of the most useful things you can do with server-side programming is execute different blocks of code based on the users' "route".  A route is a path on the server like `http://yourserver.com/path/to/route`.  With static files, this is just a folder structure, but new possibilities open up when you programatically handle a route.  For example, the following code specifies a function to call whenever a user goes to `http://server.com/someroute`.

{% highlight javascript %}
app.get('/someroute', sayHello);
{% endhighlight %}

With the above code, you then need to do define the `sayHello()` function (which of course could have been named anything you want.)

{% highlight javascript %}
function sayHello(request, response) {
  res.send("Hello!");
}
{% endhighlight %}

Notice how the callback `sayHello()` is defined with two parameters: `request` and `response`.  These variables refer to the HTTP [request-response](https://en.wikipedia.org/wiki/Request%E2%80%93response) protocol.  The user made a *request* and the server provides a *response*.  

So in the above example, you can see that the server is just sending back the work "Hello!" in the response.  If you passed a variable full of HTML back through `send()` you'd be serving up a webpage (generated programmtically!).  

You can also look at the data associated with the user's `request`.  For example, if the request was made with a query string like `http://server.com/someroute?name=Olympia`, the value "Olympia" can be accessed via the `query` property of `request`.

{% highlight javascript %}
function sayHello(request, response) {
  var name = request.query.name;
  res.send("Hello " + name + "!");
}
{% endhighlight %}

## RESTful routes

[REST](https://en.wikipedia.org/wiki/Representational_state_transfer) (Representational_state_transfer) is a common style of web architecture that is used by many APIs.  For example, as you may have seeen in previous examples, a request to the [Wordnik API](http://developer.wordnik.com/) looks something like: `http://api.wordnik.com:80/v4/word.json/unicorn/definitions`.  Note how this is different than using a url query string like `http://someapi.com/?word=unicorn`.  Instead of a query string, the API pulls out commands ("definitions") and parameters ("unicorn") from the route itself.  This translates to "Please send the definitons for the word unicorn."

You can implement this style in node using `app.get()` as above.  The difference is the following.  

1. "Variables" (i.e. values that are filled by the user) and notated with a colon (":"). 
2. Those variables are accessed via the `params` property of `request` rather than `query`.

{% highlight javascript %}
app.get('/hello/:name/:age', sayHello);
{% endhighlight %}

A valid url for the above might then be: `http://server.com/hello/Elias/7`.  You could handle the above saying:

{% highlight javascript %}
function sayHello(request, response) {
  var name = request.params.name;
  var age = request.params.age;
  res.send("Hello " + name + ", " + age + ' years old!');
}
{% endhighlight %}

## Making your own API

The scenarios above demonstrate how the code works, but don't really produce any useful results.  Let's take a scenario where you have a server that analyzes a massive corpus of text which you want to visualize from the browser.  In previous weeks, we looked at analyzing text right in the client JavaScript code itself, but this was really only well-suited for smaller datasets.  If the server handles it, the client can be saved a lot of computation time and simple "query" the results from the server and visualize them.

Before I get to the actual server code, one thing that may prove useful is looking at how node "modules" work.  In client-side JavaScript, if you wanted to put some code in another JS file, you simply made something called, say, `file.js`, typed some code and included a reference in the HTML file.  With a node app, there is no HTML file gluing everything together.  Instead the "main" JS file (maybe called "server.js") has to refer to another file using `require()`.  For example, the following code assumes a file called `utilities.js`. 

{% highlight javascript %}
var utilities = require('./utilities);
{% endhighlight %}

The objects and functions you want to have access to must be included inside something called `module.exports`. 

{% highlight javascript %}
module.exports = {
  Concordance: function() {
    // Everything from week 5 concordance example
  }
}
{% endhighlight %}

Now in your made `server.js` you can then create a Concordance object, i.e.

{% highlight javascript %}
var wordcounts = new utilities.Concordance();
{% endhighlight %}

So, let's say the node app then reads in lots of text and fills the wordcounts object on startup.  (Files can be read using the [node file system](https://nodejs.org/api/fs.html) module.)  Then when the user requests a route, say "all":

{% highlight javascript %}
// Route for sending all the concordance data
app.get('/all', showAll);
{% endhighlight %}

The response can be the JavaScript object `wordcounts` itself!

{% highlight javascript %}
function showAll(req, res) {
  // Send the entire concordance
  res.send(wordcounts);
}
{% endhighlight %}

The magic of using express is that the `send()` function will automatically turn the JavaScript object passed into JSON!  The what the end user sees is:

<p>
  <img src="images/all.png" width="600"/>
</p>

Now, a p5 sketch that is stored in, say, the statically hosted "public" folder can query this newly made API!

{% highlight javascript %}
function setup() {
  noCanvas();
  loadJSON('/all', gotData);
}

function gotData(data) {
  var words = data.keys;
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    var count = data.dict[word];
    // Do something with the data!
  }
}
{% endhighlight %}

## Scraping

Another scenario server-side programming can be useful for is scraping HTML from another site.  You can't make an HTTP request to another server from client-side JavaScript, but you can ask your own server to make this request for you!  To do this, you can use the `http` node package.

{% highlight javascript %}
var request = require('request');
{% endhighlight %}

You could specify a route and get the url via a query string.  For example `http://server.com/load?url=http://someothersite.com`.

{% highlight javascript %}
// A router to load a URL
app.get('/load', loadURL);

// Callback
function loadURL(req, res) {
  // Get the URL from the user
  var url = req.query.url;
  
  // Execute the HTTP Request
  request(url, loaded);
  
  // Callback for when the request is complete
  function loaded(error, response, body) {
    // Check for errors
    if (!error && response.statusCode == 200) {
      // The raw HTML is in body
      res.send(body);
    } else {
      res.send('error');
    }
  }
}
{% endhighlight %}

Note how there are nested callbacks in the code above.  First `loadURL()` runs when the user requests the "load" route.  Then the HTTP request is made with `request()`.  When that request is finished the `loaded()` callback runs and sends back the `body` parameter, which is the raw HTML content itself.  

Now this can be called directly from p5's `loadStrings()` method!

{% highlight javascript %}
function setup() {
  loadStrings('load?url=http://something.com', gotData);
}
{% endhighlight %}

## The Twitter API











