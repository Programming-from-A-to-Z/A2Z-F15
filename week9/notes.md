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
* [Bot that replies to @mentions](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week9/10_twitter_replier_bot)


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
* [Making a Twitter bot with node.js and Cloud9](https://botwiki.org/tutorials/making-what_capital/)

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
var utilities = require('./utilities');
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

Some APIs require a level of authentification that can't be done from client-side JavaScript.  A prime example of this is the [Twitter API](https://dev.twitter.com/overview/documentation) which requires something known as [OAuth](https://dev.twitter.com/oauth/overview/faq). For basic API querying, you don't need to go to deep into the inner workings of authenticating.  With node, you can pick one of many node packages that help you connet and query the API. The one I'm using for these examples is called [Twit](https://github.com/ttezel/twit).

Before you can use Twit, you need to follow a few steps.

1. Create a twitter account. You might already have one, but depending on what you are doing, you may want to create a new account to associate with your app.  For example, I am using [this account](https://twitter.com/a2zitp) for all of these examples.

2. Create an "APP".  This can be done by on the [manage your apps](https://apps.twitter.com/) developer page.  One tricky thing here is that to do this you are required to associate a phone number with the account in order to use the API.  You can temporarily enter your own number or else sign up for a free one with [Twilio](https://www.twilio.com/) or [Google Voice](https://www.google.com/voice#inbox).

To create the app, you'll need to enter an app name, description, and associated website (can be anything for now).  You can leave the "callback" field blank.  

3. Once the app is created, navigate to "Keys and Access Tokens".  There you'll find your "Consumer Key (API Key)" and "Consumer Secret (API Secret)".

<p>
  <img src="images/tokens1.png" width="600"/>
</p>

Also, scroll down and click the "Generate Access Token" button.  Now you also have an "Access Token" and "Access Token Secret".

<p>
  <img src="images/tokens2.png" width="600"/>
</p>

Don't worry, if you ever post these keys somewhere by accident (like in an image file on a tutorial) you can always regenerate new ones.

That's it, you're done and ready to use Twit!

## Authenticating with Twit

To make any calls to the API you first need to install Twit and then include the package with `require()`.

<pre>
$ npm install Twit --save
</pre>

{% highlight javascript %}
var Twit = require('twit');
{% endhighlight %}

And then you'll need to authenticate with all those secret keys.  There are a variety of ways to do this.  The easiest is just typing your keys into your code:

{% highlight javascript %}
var T = new Twit({
  consumer_key:         'YOURCONSUMERKEY', 
  consumer_secret:      'YOURCONSUMERSECRET',
  access_token:         'YOURACCESSTOKEN',
  access_token_secret:  'YOURACCESSTOKENSECRET'
});
{% endhighlight %}

This may cause you some problems down the road, however, if you want to publish your code.  One way you can get around this is by putting your keys in a separate file called, say, `config.js`.

{% highlight javascript %}
module.exports = {
  consumer_key:         'YOURCONSUMERKEY', 
  consumer_secret:      'YOURCONSUMERSECRET',
  access_token:         'YOURACCESSTOKEN',
  access_token_secret:  'YOURACCESSTOKENSECRET'
}
{% endhighlight %}

Now you can access this also with `require()`.

{% highlight javascript %}
var config = require('./config.js');
var T = new Twit(config);
{% endhighlight %}

This way if you want to share or publish your code, you can do so leaving out the `config.js` file.  This is what I've done in [this repo here](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week9/07_twitter_api_oauth), though I've included a `config-empty.js` file with some comments on how to enter the tokens.

## Querying the Twitter API

[Full documentation of the various Twit methods is available on github](https://github.com/ttezel/twit), but I'll highlight what you need here for a basic p5.js sketch or bot. 

There are three main calls you can make with Twit: `get()`, `post()`, and `stream()`.

`get()` is useful for looking at particular tweets.  For example, if you want to just search for tweets that match a given keyword, are from a particular user, etc. you can use `get()`.  The following asks for the 10 most recent tweets with the keyword JavaScript.  The callback for receiving the data is `gotData()`.

{% highlight javascript %}
T.get('search/tweets', { q: 'JavaScript', count: 10 }, gotData);
{% endhighlight %}

All of the [arguments you can pass to the search can be found here](https://dev.twitter.com/rest/reference/get/search/tweets).  In addition to the search text, you can search for tweets from a particular location or from a certain time period, and more.

What you get back is just [a lot of JSON as outlined here](https://dev.twitter.com/rest/reference/get/search/tweets).  So for example, if you look at the text of the tweets you would say:

{% highlight javascript %}
function gotData(err, data) {
  var tweets = data.statuses;
  for (var i = 0; i < tweets.length; i++) {
    console.log(tweets[i].text);
  }
}
{% endhighlight %}

The `post()` function is used to post an actual tweet itself.

{% highlight javascript %}
T.post('statuses/update', { status: 'I am tweeting via the API!' }, tweeted);
{% endhighlight %}

The `tweeted()` callback is where you can check whether the tweet was successfully posted or not.

Included in this week's examples is [an example that expands on the above](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week9/07_twitter_api_oauth).  Features include (1) searching the Twitter API and returning the results as JSON for client-side JavaScript to parse and (2) receiving a tweet via a URL query string and passing it along via the API to be posted.

## Writing a bot

There's not much left to say about writing a bot. All of the pieces you need are in the above sections.  And none of the additional complexity of a web server via express is needed.  The bot is simply just a process that executes every so often and tweets something based on some sort of algorithm or data source.  

The easiest way to "schedule" a bot is to use JavaScript's `setInterval()` function.  For example, take the following:

{% highlight javascript %}
// Set up Twit
var Twit = require('twit');
var config = require('./config.js');
var T = new Twit(config);

// Once every hour
setInterval(tweeter, 60*60*1000);
{% endhighlight %}

With the above code, the function `tweeter()` is triggered once per hour (an hour is 60 minutes, a minute is 60 seconds, a second is 1,000 milliseconds).  All that is left to do is have `tweeter()` tweet something.  For example:

{% highlight javascript %}
// A function that tweets a random number!
function tweeter() {
  var num = Math.floor(Math.random()*100);
  var tweet = 'Here\'s a random number between 0 and 100: ' + num;
  
  T.post('statuses/update', { status: tweet }, tweeted);
}
{% endhighlight %}

That's it!  Your first twitter bot.  Of course you might want to do something more involved, like generate from a markov chain, or mix up text from some other API, etc.  But for any of these ideas the above structure will work.

[Here's an example of a twitter bot using a Context-Free Grammar](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week9/09_twitter_bot_cfg) to generate tweets.

## Using the streaming API

The above bot scenario involved tweeting every N milliseconds.  This is what you think of when you think of some sort of autonomous robot tweeting.  It operates on its own, never gets tired, and tweets at a precise time.  But it is also possible to create a bot that participates in the social activity of twitter itself.  This can be accomplished using `stream()`.   [The Twitter streaming API](https://dev.twitter.com/streaming/overview) allows you to execute callbacks when certain events occur -- like when someone follows you.  

There are different kinds of streams -- a "public" stream, a "user" stream, and a "site" stream ([documentation](https://dev.twitter.com/streaming/overview)).  Here, I'll use the "user" stream to demonstrate a "follow event".

{% highlight javascript %}
// A user stream
var stream = T.stream('user');

// When someone follows the user
stream.on('follow', followed);

// In this callback we can see the name and screen name
function followed(event) {
  var name = event.source.name;
  var screenName = event.source.screen_name;
  console.log('I was followed by: ' + name + ' ' + screenName);
}
{% endhighlight %}

Now you could just add a `post()` to tweet back `"Thanks for following me!" + screenName`!

You can also trigger an events whenever the user is mentioned in a tweet.

{% highlight javascript %}
stream.on('tweet', tweetEvent);
{% endhighlight %}

Now this event is triggered both when the user is mentioned and when the user itself tweets.  So if you want to only get @replies you could add a check in the callback like:

{% highlight javascript %}
function tweetEvent(tweet) {
  var reply_to = tweet.in_reply_to_screen_name;
  // Check to see if this was, in fact, a reply to you
  if (reply_to === 'yourusername') {
    // Get the username and content of the tweet
    var name = tweet.user.screen_name;
    var txt = tweet.text;
    // Tweet back a reply?
  }
}
{% endhighlight %}

[Here's an example of a bot](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week9/10_twitter_replier_bot) that replies to all @mentions with the same exact text in reverse.

The same search I used in the `get()` examples can also be accessed as a stream.  For example, to get a continuous stream of all tweets from a certain geolocation:

{% highlight javascript %}
// A geo location
var sanfran = [ '-122.75', '36.8', '-121.75', '37.8' ]
var stream = T.stream('statuses/filter', { locations: sanfran })
stream.on('tweet', tweetEvent);
{% endhighlight %}



