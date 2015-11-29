---
title: Programming from A to Z Week 11/12 Notes
layout: default
---

# Making APIs and Text Analysis in Node

## Examples
* [basic routes](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week11/01_routes_rest_express)
* [concordance API example](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week11/02_concordance_API_express) -- demonstrates how a server can pre-process a large dataset in advance and hand results to clients.
* [Spellcheck API](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week11/03_spellcheck_API) -- demonstrates how to pass results from node package ([NodeNatural](https://github.com/NaturalNode/natural)) to client, also processes large dataset.
* [Sentiment API](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week11/04_sentiment_API) -- demonstrates how to pass results from node package and also save data for persistence to a JSON file standing in as a basic database.
* [Classification API](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week11/05_classification_API) -- An API that can be trained to classify text into any number of categories.  Picks up the thread of week 5's word counting examples.

## Node packages used
* [Natural](https://github.com/NaturalNode/natural) -- includes modules for string operations (tokenizing, differencing), classification, and other misc tools like spell checking.
* [Sentiment](https://github.com/thisandagain/sentiment) -- AFINN-based sentiment analysis with an easy means of adding/updating your own words and positive/negative scores.
* [re-text](https://github.com/wooorm/retext) -- framework for natural language processing in node.
* [RiTa](https://github.com/dhowe/RiTaJS) -- same RiTa library we looked at before but also available in node.
* [nlp-compromise](https://github.com/spencermountain/nlp_compromise) -- client and server-side misc natual language processing tools.

## Other relevant resources
* [AFINN-111](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010) -- AFINN is a list of English words rated for valence with an integer between minus five (negative) and plus five (positive). The words have been manually labeled by Finn Årup Nielsen in 2009-2011.
* [How to write a spelling checker](http://norvig.com/spell-correct.html) by [Peter Norvig](http://norvig.com/)
* [Text file containing 355k English words](https://github.com/dwyl/english-words)

## Why use server-side programming?

In [week nine's notes](http://localhost:4000/week9/notes.html) on node and twitter bots I covered the basics of working with [node](https://nodejs.org/en/), [npm](https://www.npmjs.com/), and building an API with "RESTian" routes.

This page picks up on that thread and looks at a few scenarios where running server side code to work with text has advantages over running everything on the client.

One of the main reasons you might go down this road is if you have a large dataset that takes a significant amount of time to process.  For example, let's say you want to build a word counting app and you have one million documents to process.  This would be unrealistic to do on the client-side, but reasonable on the server.  

### module.exports

To build this example the first thing I'll do is go and grab `concordance.js` from [week five's examples](http://shiffman.github.io/A2Z-F15/week5/notes.html).  Functions and objects from separate JS files can be used in node just like in an HTML page.  However, this must be done via [node modules](https://nodejs.org/api/modules.html) and the `require()` function.

For example, if you have the following constructor function in a file called `concordance.js`:

{% highlight javascript %}
function Concordance() {
  this.dict = {};
  this.keys = [];
}
{% endhighlight %}

You can "include" this function by saying the following in your main app (`server.js`) with two additional steps.  First, you must add `Concordance` to `module.exports` in `concordance.js`.  `module.exports` is [the object that's actually returned as when you call require](http://stackoverflow.com/questions/5311334/what-is-the-purpose-of-node-js-module-exports-and-how-do-you-use-it).

{% highlight javascript %}
module.exports = Concordance; 
{% endhighlight %}

Once you've done this, you can now get access to `Concordance` with a call to `require()` like so:

{% highlight javascript %}
// Require it
var Concordance = require('./concordance');
// Now make an object with it
var wordcounts = new Concordance();
{% endhighlight %}

### Reading files

Now that I have a `Concordance` object I can start filling it with data on the server.  Let's say I had a sequence of numbered files sitting on the server that I want to process.  I can read those files and pass the contents to the concordance with node's [file system module](https://nodejs.org/api/fs.html) (aka `fs`).  The `fs` module has functions for grabbing a list of files in a directory as well as reading specific files.

{% highlight javascript %}
var fs = require('fs');

// What are all the files in the directory "data"?
var files = fs.readdirSync('data');
// Read all the files one by one
for (var i = 0; i  < files.length; i++) {
  var txt = fs.readFileSync('data/'+files[i], 'utf8');
  wordcounts.process(txt);
}
{% endhighlight %}

One thing you might notice about the above is the use of `readdirSync()` and `readFileSync()` as opposed to `readdir()` and `readFile()`.   The "sync" refers to "synchronous" meaning these lines of code are "blocking".  The data has to be read before moving onto the next line.  This is unusual in JavaScript in that typically a callback is required to be executed when the data is read.  This is a case where I am happy for the program to stop and wait because I want to process all of the data before the server starts listening for connections. It's ok if it takes a long time because this only happens once when the server starts.

### Routes for results

Now that the data is read, I can create routes that send the data to a client making a `loadJSON()` request with p5 (or pick your function using any JS library that can make HTTP requests.)  Here's one that sends everything in the concordance object.

{% highlight javascript %}
// Route for sending all the concordance data
app.get('/all', showAll);

function showAll(req, res) {
  // Send the entire concordance
  res.send(wordcounts);
}
{% endhighlight %}

I can also get fancier and make up my own protocol for sending back pieces of data from the concordance.  For example, here is some code that returns the count for a specific word or "word not found" if it is not present in the concordance.  The point is to send back a JavaScript object — it's up to you to put in the object what you think makes the most sense.

{% highlight javascript %}
// Now a route for data about one word
app.get('/search/:word', showOne);

function showOne(req, res) {
  var word = req.params['word'];

  var reply = { };
  var count = wordcounts.getCount(word);

  // If it's not part of concordance send back a message
  if (count === undefined) {
    reply.status = 'word not found';
  // Otherwise send back the word and count
  } else {
    reply.status = 'success';
    reply.count = count;
  }
  reply.word = word;

  res.send(reply);
}
{% endhighlight %}

### What does the client say?

The client can then access this data with `loadJSON()`.

{% highlight javascript %}
  // Getting all the data
  loadJSON('/all', gotAll);

  // Getting data for one word -- 'apple'
  loadJSON('/search/apple', gotOne);

  function gotAll(data) {
    // deal with all the data
  }

  function gotOne(data) {
    // deal with the results of the search for a single word
  }
{% endhighlight %}

## CORS

One thing you might notice about the above `loadJSON()` calls is that they do not reference the domain itself, simply the route "all" or "search".  This is because I am assuming that the p5 sketch will be hosted by the same node app that is running the API code.  In fact, in my example I'm doing exactly this by placing the p5 sketch in a "public" folder and serving those files statically using node and express:

{% highlight javascript %}
app.use(express.static('public'));
{% endhighlight %}

However, let's say you want others to be able to access your API from their code.  In order for this to be possible you must enable something called [CORS (Cross-origin resource sharing)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).  This prevents others from getting those nasty "XMLHttpRequest cannot load. No 'Access-Control-Allow-Origin' header is present on the requested resource." errors.  

This is easy enough to do with the [Node CORS package](https://github.com/expressjs/cors).

<pre>
$ npm install cors --save
</pre>

{% highlight javascript %}
var cors = require('cors');
app.use(cors());
{% endhighlight %}

## Persistance

## GET vs POST

## Parse.com

## More on sync vs async








