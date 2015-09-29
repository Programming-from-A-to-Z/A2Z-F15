---
title: Programming from A to Z Week 3 Notes
layout: default
---

<head>
<script language="javascript" type="text/javascript" src="/javascripts/p5/p5.js"></script>
<script language="javascript" type="text/javascript" src="/javascripts/p5/p5.dom.js"></script>
<script language="javascript" type="text/javascript" src="notes.js"></script>
</head>

# Callback in a Loop Problem

Here's the problem we discussed in class.  This discussion began as a [github gist which you can read here](https://gist.github.com/shiffman/7b96d9951bb3865e7d38).

{% highlight javascript %}

for (var i = 0; i < 10; i++) {
  setTimeout(count, i * 1000);
}

// No good! i = 10 by the time this callback is called!
function count() {
  console.log(i);
}
{% endhighlight %}

The above doesn't work b/c by the time `count()` is called, `i` has the value of `10`.  One way to solve this is by making a "function factory", i.e. a function that generates a callback with an argument.

{% highlight javascript %}

for (var i = 0; i < 10; i++) {
  setTimeout(countIt(i), i * 1000);
}

// Generate a function that is returned as the callback
// i is passed into num so the actual value is retained!
function countIt(num) {
  function count() {
    console.log(num);
  }
  return count;
}
{% endhighlight %}

It's weird but a new function is generate by calling `countIt()` and returned as the callback. `num` is retained for each of these functions and the correct number is logged.

A simpler way to write this is just to call setTimeout in the function with the argument.  Ooops!  I forgot to mention this one in class.


{% highlight javascript %}

for (var i = 0; i < 10; i++) 
  countIt(i);
}

// Maybe a bit more clear to just call setTimeout here in a separate function
function countIt(num) {
  function count() {
    console.log(num);
  }
  setTimeout(count, num * 1000);
}
{% endhighlight %}

This is less weird b/c no function has to be returned, the function is just declared inside the scope of `countIt()`.  This could also be written with an anonymous function, I'll let you decide which is more or less clear.

{% highlight javascript %}
for (var i = 0; i < 10; i++) 
  countIt(i);
}

function countIt(num) {
  // This is the anonymous syntax, yuck!
  setTimeout(function() {
    console.log(num);
  }, num * 1000);
}
{% endhighlight %}

Here's a scenario where divs are highlighted one at a time.

{% highlight javascript %}
var divs = [];

function setup() {
  noCanvas();
  // Make 10 divs
  for (var i = 0; i < 10; i++) 
    var div = createDiv('test ');
    divs.push(div);
  }

  // Just like the previous one, call a function
  // and pass in the div and i
  for (var i = 0; i < divs.length; i++) {
    highlight(divs[i], i);
  }
}

// In that function the specific div is highlighted
// at a time tied to num
function highlight(div, num) {
  setTimeout(highlightDiv, num * 1000);
  function highlightDiv() {
    div.style('background-color', '#CCC');
  }
}
{% endhighlight %}

The same could be achieved with the JavaScript `bind()` function which *binds* the context `this` to a particular object.  So if you bind a callback to a particular div object then the same callback function can be reused.  Here's how this is written:

{% highlight javascript %}
var divs = [];

function setup() {
  noCanvas();
  for (var i = 0; i < 10; i++) 
    var div = createDiv('test ');
    divs.push(div);
  }

  // Using bind to bind the context of a callback
  // to a particular object (in this case a specific div)
  for (var i = 0; i < divs.length; i++) {
    setTimeout(highlight.bind(divs[i]), i*1000)
  }
}

function highlight() {
  this.style('background-color', '#CCC');
}
{% endhighlight %}

The same scenario also comes up if you want to set an event for `mousePressed()` on each `p5.Element` object.  The good news is that you don't need to use any of these solutions!  p5 behind the scenes automatically binds the context (`this`) of your callback to the element it was called on!

{% highlight javascript %}
var divs = [];

function setup() {
  noCanvas();
  for (var i = 0; i < 10; i++) 
    var div = createDiv('test ');
    divs.push(div);
  }

  for (var i = 0; i < divs.length; i++) {
    divs[i].mousePressed(highlight);
  }
}

// p5 does it for you!
// this is "bound" to the specific div the callback is assigned to
function highlight() {
  this.style('background-color', '#CCC');
}
{% endhighlight %}



