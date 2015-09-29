---
title: Programming from A to Z Week 2 Notes
layout: default
---

# Week 2 Notes

## All examples

* For p5.dom examples, see [Week 1 notes](http://shiffman.github.io/A2Z-F15/week1/notes.html)
* [loadStrings](01_loadStrings) — [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week2/01_loadStrings)
* [loadStrings with callback](02_loadStrings_callback) — [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week2/02_loadStrings_callback)
* ["choose files" button](03_loadFile_Menu) — [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week2/03_loadFile_Menu)
* ["drag and drop" files](04_loadFile_DragDrop) — [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week2/04_loadFile_DragDrop)
* [text input element](05_input_elt) — [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week2/05_input_elt)
* [text input element with canvas](06_input_elt_canvas) — [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week2/06_input_elt_canvas)
* [textarea element](07_textarea) — [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week2/07_textarea)
* [many loading options all together](08_all_together) — [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week2/08_all_together)
* [Flesch Index Calculator](09_flesch) — [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week2/09_flesch)
* [Cut-Up Machine](10_cut_up_machine) — [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week2/10_cut_up_machine)
* [Erasure Poetry Machine](11_erasure) — [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week2/11_erasure)
* [Diastic Machine](12_diastic) — [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week2/12_diastic)
* [Simple Rita Test](13_rita_sentence) — [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week2/13_rita_sentence)

## p5 basics and p5.dom

This week we'll spend some time covering the basics of p5 canvas and dom.  These topics are well covered in the following tutorials:

* [Overview of p5.js](https://github.com/processing/p5.js/wiki/p5.js-overview)
* [p5.js transition from Processing](https://github.com/processing/p5.js/wiki/Processing-transition)
* [ICM intro p5.js video lessons](https://vimeo.com/channels/learningp5js/) -- these are very basic, for beginner programmers
* [p5.js DOM library tutorial](https://github.com/processing/p5.js/wiki/Beyond-the-canvas)

The key functions and topics I will discuss in class are:

* The core "create" functions — `createElement()`, `createP()`, `createDiv()`, `createImg()`.
* Moving things around in the DOM — `parent()`, `child()`
* Making interface elements — `createButton()`, `createSlider()`, `createInput()`, `createSelect()`, `createCheckbox()`.
* Events — `mousePressed()`, `mouseOver()`, `mouseOut()`, `changed()`, and more?  What about `addEventListener()`?
* When to use create vs select — `select()` and `selectAll()`, id vs class vs tag
* Applying CSS styles — `style()` (and when to use a CSS file).

## loadStrings() and preload()

The whole point of this week is to work with programmatic text mashups in the browser.  Take a look at the [William Burroughs' Cut-Up](http://shiffman.github.io/A2Z-F15/week2/10_cut_up_machine/) example.  We'll need two essential skills here — how to load text (from a file or user) and how to work with JavaScript Strings.  Let's first start with loading text from a file.  The simplest way to do this in p5 is with `loadStrings()`.  It loads a local file (accessed by its relative path to the hmtl file).  The simplest way to get the data is to use `preload()` which guarantees that the data is read before `setup()` triggers.

{% highlight javascript %}
var lines;

function preload() {
  lines = loadStrings('path/file.txt');
}
{% endhighlight %}

Note the naming of the variable `lines`.  One of the odd nuances of `loadStrings()` is that it loads all the text into into an array, with each "line" of text as a separate element of an array, i.e. the text file:

{% highlight javascript %}
one
two
three
{% endhighlight %}

comes in as:

{% highlight javascript %}
['one', 'two', 'three']
{% endhighlight %}

This is convenient in many cases, but for us right now, we just want all the text as one giant string.  Therefore, we can use the `join()` function to put it back together. This can't happen until `setup()` however, since the data isn't guaranteed to be loaded until then.

{% highlight javascript %}
var lines;
var txt;

function preload() {
  lines = loadStrings('path/file.txt');
}

function setup() {
  // join() joins the elements of an array
  // Here we pass in a line break to retain formatting
  txt = join(lines, '\n');
}
{% endhighlight %}

## loadStrings and a callback

While using `preload()` is a nice, quick and easy trick to getting text in, it's not how you might typically see code in JavaScript working.  The flow of a program in JavaScript is usually a sequence of events and functions can act as blocks of code triggered when certain events occur.  These functions are known as "callbacks", they are "called back" when the event is triggered.  You've likely seen this with the p5.js dom functions `mousePressed()`, `mouseOver()`, `mouseOut()`, etc.

Loading data works in a similar way.  There is a moment where the code asks to load the file, and then an event that follows later when the data is actually loaded (there could also be an "error" event if there is a problem with the file.)  `loadStrings()` works exactly this way when you pass it two arguments — the name of the file, and a function that will executed when the data from the file is ready (the callback). 

{% highlight javascript %}
var txt;

function setup() {
  loadStrings('path/file.txt', fileready)
}
{% endhighlight %}

The use of a callback is very typical of JavaScript, and we'll be seeing many examples of this over the course of the semester.  It's also possible to write an "anonymous" function directly as an argument to `loadStrings()` but this will make the code a bit harder to follow.  Let's take a look at the `fileready()` function.

{% highlight javascript %}
// The data from the file comes in as the array lines
function fileready(lines) {
  // Here we pass in a line break to retain formatting
  txt = join(lines, '\n');
}
{% endhighlight %}

The function takes a single argument: lines.  lines containa all of the text from the file in a array of strings (unless there was an error).

## User-selected files

The next way of getting text in I want to examine is with a user-selected file.  This can be accomplished one of two ways, a select file button (as below) or a "drop zone" (an area in the page that a user can drag and drop a file.)

### Choose file button

<input type="file" multiple="">

The choose file button can be generated fairly easily with p5.js using `createFileInput()`.  `createFileInput()` requires only a single argument, a callback for when the file(s) are loaded.  A second argument `'multiple'` is optional if you want to allow the user to select multiple files.  In the case of multiple files, the callback is triggered once for each file.

{% highlight javascript %}
var fileSelect = createFileInput(gotFile, 'multiple');

function gotFile(file) {
  // Do something with the file here
}
{% endhighlight %}

The argument passed to the `gotFile()` callback is a `p5.File` object.  It contains metadata about the file such as its name, type, and size, as well as the actual contents of the file, its "data."  All of these are available as properties of the `p5.File` object and accessible with dot syntax.  The following more fleshed out version of the callback creates DOM elements displaying the metadata and contents.  Note how a different action can be performed depending on the file's type.

{% highlight javascript %}
function gotFile(file) {
  createDiv(file.name + ', ' + file.type  + file.size + ', bytes');

  // Handle image and text differently
  if (file.type === 'image') {
    createImg(file.data);
  } else if (file.type === 'text') {
    createP(file.data);
  }
}
{% endhighlight %}

### Drop zone

Another, often more convenient, way to accept files from a user is to allow the user to "drag and drop" files in the page itself.  To do this, you first need to create and style a div that will act as the "drop zone".  For example:

{% highlight html %}
<p><div id="drop_zone">drag a file</div></p>
{% endhighlight %}

<p><div id="drop_zone">drag a file</div></p>

There's nothing particularly special about the CSS for the above drop zone, just some padding and a dotted line.

{% highlight CSS %}
#drop_zone {
  padding: 20px;
  border-style: dotted;
  width: 200px;
  text-align: center;
}
{% endhighlight %}

This could all be generated in p5 using `createDiv()` but it's nice to also see scenarios where the HTML is "hard-coded" and then accessed with JavaScript.  Since the div has an id `drop_zone`, the p5 `select()` function can be used to grab the DOM element.

{% highlight JavaScript %}
var dropZone = select('#drop_zone');
{% endhighlight %}

Note the use of the hash sign `#` to indicate DOM element id.  Once you have a DOM element to act as a drop zone there are three events you can handle — `dragOver()`, `dragLeave()`, and `drop()`.  `dragOver()` and `dragLeave()` are just like `mouseOver()` and `mouseOut()`, only instead of just hovering over the element, the events are triggered only if the user is dragging a file over the element.  This can be useful for giving the user some feedback as to what is going on:

{% highlight JavaScript %}
// Handle the two events
dropZone.dragOver(highlight);
dropZone.dragLeave(unHighlight);

// Set a background style to gray
function highlight()
  dropZone.style('background', '#AAA');
}
// Set it back to nothing
function unHighlight() {
  dropZone.style('background','');
}
{% endhighlight %}

The event we care most about is `drop()`.  This event requires two callbacks — an event to handle the moment the user drops the file(s), and a callback that is triggered when each file is loaded and ready to be accessed.  In the code below, the arguments are in the reverse order, first is the callback for handling the files, and second is the callback for the moment of drop.

{% highlight JavaScript %}
dropZone.drop(gotFile, unHighlight);

function gotFile(file) {
  createDiv(file.name + ', ' + file.type  + file.size + ', bytes');

  // Handle image and text differently
  if (file.type === 'image') {
    createImg(file.data);
  } else if (file.type === 'text') {
    createP(file.data);
  }
}
{% endhighlight %}

Note how I am re-using the exact same `gotFile()` function that we had with the "choose files" button.

## &lt;textarea&gt; and "contenteditable"

If you want to get a large body of text typed in by a user, `createInput()` isn't a great choice.  It's meant more for just a couple words or a single sentence:

Type a sentence: <input size="50" value="I can only fit one sentence here in this box." />

For a larger body of text the `<textarea>` element can be generated using `createElement()`.

{% highlight JavaScript %}
var area = createElememt('textarea', 'Some text to start initially.');
{% endhighlight %}

<p><textarea>Some text to start initially.</textarea></p>

The p5 `size()` function can be used to adjust the areas default size.  

It's also possible to simply use a `div` or `p` element and assign the attribute `contenteditable`.  This makes any DOM element editable by the user (and you can the capture the content of that element with the `html()` function.)  For example:

{% highlight JavaScript %}
var p = createP('this is editable');
p.attribute('contenteditable', 'true');
{% endhighlight %}

Note how you can edit this text below:

<p contenteditable style = "padding: 4px; background-color: #CCC">this will be editable</p>

As always, these elements can also be written into the HTML directly and accessed in p5 with `select()` and `selectAll()`.

{% highlight html %}
<p><textarea id="area">Some text to start initially.</textarea></p>
<p contenteditable id="editableP">this will be editable</p>
{% endhighlight %}

{% highlight javascript %}
var area = select('#area');
var p = select('#editableP');
{% endhighlight %}


## Strings in JS

One you have data from a file or user input (or user file input!), the next step is to do something interesting with it.  For this week, it's up to you to invent something.  To demonstrate some possibilities I'll first run through some of the basic functions available as part of the JavaScript [String object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) and then describe one scenario for analyzing text — the Flesch index.

I should note that almost everything I am doing this week could be improved or expanded with regular expressions, but I am explicitly saving that as a topic for next week.

A String, at its core, is really just a fancy way of storing an array of characters.  With the String object, we might find ourselves writing code like.

{% highlight javascript %}
var sometext = ['h','e','l','l','o'];
{% endhighlight %}

Interestingly enough, there is no distinction between an individual character or a string in JavaScript.  Both of the variables below are storing the same datatype.

{% highlight javascript %}
var a = 'a';
var h = 'hello';
{% endhighlight %}

In JavaScript, strings can be literal primitives or objects.

{% highlight javascript %}
var s1 = 'hello';               // a primitive
var s2 = new String('hello');   // an object
{% endhighlight %}

For the most part, this is a distinction you don't have to worry about.  JavaScript will automatically convert a primitive String into an object when necessary. In general, however, it's good practice to initialize  strings as primitives to increase performance.

## Manipulating Strings

JavaScript provides us with a basic set of strings functions that allow for simple manipulation and analysis (again, leaving out regular expression for now!) All of the availabe String properties and functions are laid out in [the JavaScript reference](ttp://docs.oracle.com/javase/7/docs/api/java/lang/String.html), and I'll explore a few useful ones here.  Let's take a closer look at three: `indexOf()`, `substring()`, and the `length` property.

`indexOf()` locates a sequence of characters within a string. For example, run this code and examine the result:

{% highlight javascript %}
var sentence = 'The quick brown fox jumps over the lazy dog.';
console.log(sentence.indexOf('quick'));
console.log(sentence.indexOf('fo'));
console.log(sentence.indexOf('The'));
console.log(sentence.indexOf('blah blah'));
{% endhighlight %}

Note that `indexOf()` returns a `0` for the first character, and a `-1` if the search phrase is not part of the String.

After you find a certain search phrase within a string, you might want to pull out part of the string and save it in a different variable. This is called a &#8220;substring&#8221; and you can use java&#8217;s `substring()` function to take care of this task. Examine and run the following code:

{% highlight javascript %}
var sentence = 'The quick brown fox jumps over the lazy dog.';
var phrase = sentence.substring(4, 9);
console.log(phrase);
{% endhighlight %}

Note that the substring begins at the specified beginning index (the first argument) and extends to the character at the end index (the second argument) minus one. Thus the length of the substring is end index minus beginning index.

At any given point, you might also want to access the length of the string. This is accomplished this with the length property.

{% highlight javascript %}
var sentence = 'The quick brown fox jumps over the lazy dog.';
console.log(sentence.length);
{% endhighlight %}

It's also important to note that you can concatenate (i.e. join) a string together using the `+` operator.   With numbers plus means add, with strings (or characters), it means concatenate, i.e.

{% highlight javascript %}
var num = 5 + 6;                        // ADDING TWO NUMBERS!
var phrase = 'To be' + ' or not to be'; // JOINING TWO STRINGS!
{% endhighlight %}

## Splitting

One string-related function that will prove very useful in our text analysis programs is [split()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split).  `split()` separates a group of strings embedded into a longer string into an array of strings.

Now the built-in `split()` native to JavaScript uses regular expressions, so this week I'll demonstrate splitting with the p5.js functions `split()` and `splitTokens()`.

Examine the following code:

{% highlight javascript %}
var spaceswords = 'The quick brown fox jumps over the lazy dog.';
// Splits by any space
var list1 = split(spacewords, ' ');
console.log(list1[0]);
console.log(list1[1]);

var commaswords = 'The, quick, brown, fox, jumps, over, the, lazy, dog.';
// Splits by any comma followed by a space
var list2 = split(commaswords, ', ')
for (var i = 0; i < list2.length; i++) {
  console.log(i + ': ' + list2[i]);
}

var mishmosh = 'The quick,brown, fox jumps,over,the lazy, dog.';
// Splits by any comma OR a space!
var list2 = splitTokens(mishmosh, ', ')
for (var i = 0; i < list2.length; i++) {
  console.log(i + ': ' + list2[i]);
}

// Calculate sum of a list of numbers in a string
var numbers = '8,67,5,309';
var numlist = numbers.split(',');
var sum = 0;
for (var i = 0; i < numlist.length; i++) {
  sum = sum + Number(numlist[i]);  // Converting each String into an number!
}
console.log(sum);
{% endhighlight %}

To perform the reverse of split, the p5 function `join()` is used.

{% highlight javascript %}
var words = ['it','was','a','dark','and','stormy','night'];
var sentence = join(words, ' ');
{% endhighlight %}

## Single Page Analysis / Text-Mashup App

I'll end this week by looking at a basic example of text analysis.  I'll read in a file, examine some of its statistical properties, and display a report.  The example will compute the [Flesch Index](http://en.wikipedia.org/wiki/Flesch-Kincaid_Readability_Test)  (aka Flesch-Kincaid Reading Ease test), a numeric score that indicates the readability of a text.   The lower the score, the more difficult the text.  The higher, the easier.  For example, texts with a score of 90-100 are, say, around the 5th grade level, wheras 0-30 would be for &#8220;college graduates&#8221;.  

The Flesch Index is computed as a function of total words, total sentences, and total syllables.  It was developed by Dr. Rudolf Flesch and modified by J. P. Kincaid (thus the joint name).  Most word processing programs will compute the Flesch Index for you, which provides us with a nice method to check our results.

***Flesch Index = 206.835 &#8211; 1.015 * (words / sentences) + 84.6 * (syllables / words)***

The pseudo-code looks something like this:

1. Read input file into string object
2. Count words
3. Count syllables
4. Count sentences
5. Apply formula
6. Display results

The examples above on this page demonstrate how to read in text from a file and store it in a String object.  Now, all I have to do is examine that string, count the total words, sentences, and syllables, and apply the formula as a final step.

The first thing I'll do is count the number of words in the text.  We&#8217;ve seen in some of the examples above that we can accomplish this by using `split()` to split a String up into an array wherever there is a space.  For this example, however, we are going to want to split by more than a space.  A new word occurs whenever there is a space or some sort of punctuation.

{% highlight javascript %}
var delimiters = '.:;?! !@#$%^&*()]+';
var words = splitTokens(delimiters);
{% endhighlight %}

Note again how `splitTokens()` will split using any of the listed characters as a delimiter. Next week, I will cover how to use regular expressions to split text. 

Now that I have split up the text, I can march through all the words (tokens) and count their syllables.

{% highlight javascript %}
for (var i = 0; i < words.length; i++) {
  var word = words[i];
  totalSyllables += countSyllables(word);
  totalWords++;
}
{% endhighlight %}

Ok, so `countSyllables()` isn&#8217;t a function that exists in JavaScript.  I'm going to have to write it myself.   The following method is not the most accurate way to count syllables, but it will do for now.

**Syllables = total # of vowels in a word**<br/>*(not counting vowels that appear after another vowel and when &#8216;e&#8217; is found at the end of the word)*

* &#8220;beach&#8221; &#8211;> one syllable
* &#8220;banana&#8221; &#8211;> three syllables
* &#8220;home&#8221; &#8211;> one syllable

The code looks like this:

{% highlight javascript %}
// A method to count the number of syllables in a word
// Pretty basic, just based off of the number of vowels
// This could be improved
function countSyllables(word) {
  var syl    = 0;
  var vowel  = false;
  var length = word.length;

  // Check each word for vowels (don't count more than one vowel in a row)
  for (var i = 0; i < length; i++) {
    if (isVowel(word.charAt(i)) && (vowel == false)) {
      vowel = true;
      syl++;
    } else if (isVowel(word.charAt(i)) && (vowel == true)) {
      vowel = true;
    } else {
      vowel = false;
    }
  }

  var tempChar = word.charAt(word.length-1);
  // Check for 'e' at the end, as long as not a word w/ one syllable
  if (((tempChar == 'e') || (tempChar == 'E')) && (syl != 1)) {
    syl--;
  }
  return syl;
}

// Check if a char is a vowel (count y)
function isVowel(c) {
  if      ((c == 'a') || (c == 'A')) { return true;  }
  else if ((c == 'e') || (c == 'E')) { return true;  }
  else if ((c == 'i') || (c == 'I')) { return true;  }
  else if ((c == 'o') || (c == 'O')) { return true;  }
  else if ((c == 'u') || (c == 'U')) { return true;  }
  else if ((c == 'y') || (c == 'Y')) { return true;  }
  else                               { return false; }
}
{% endhighlight %}

Again as you will see next week, the above could be vastly improved using Regular Expressions, but it&#8217;s nice as an exercise to learn how to do all the string manipulation manually before you move on to more advanced techniques.

Counting sentences is a bit simpler.  I'll just split the content using periods, question marks, exclamation points, etc. (&#8220;.:;?!&#8221;) as delimiters and count the total number of elements in the resulting array.  This isn&#8217;t terribly accurate; for example, &#8220;My e-mail address is daniel.shiffman@nyu.edu.&#8221;  will be counted as three sentences.  Nevertheless, as a first pass, this will do.

{% highlight javascript %}
// Look for sentence delimiters
var sentenceDelim = '.:;?!';
var sentences = splitTokens(sentenceDelim);
totalSentences = sentences.length;
{% endhighlight %}

Now, all we need to do is apply the formula, generate a report as a string (which can be inserted into a DOM element using [`html()`](http://p5js.org/reference/#/p5.Element/html).

{% highlight javascript %}
// Calculate flesch index
var f1 = 206.835;
var f2 = 84.6;
var f3 = 1.015;
var r1 = totalSyllables / totalWords;
var r2 = totalWords / totalSentences;
var flesch = f1 - (f2 * r1) - (f3 * r2);

// Write Report
var report = "";

report += "Total Syllables: " + totalSyllables + "\n";
report += "Total Words    : " + totalWords + "\n";
report += "Total Sentences: " + totalSentences + "\n";
report += "Flesch Index   : " + flesch + "\n";
{% endhighlight %}
