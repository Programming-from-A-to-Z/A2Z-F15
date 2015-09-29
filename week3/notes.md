---
title: Programming from A to Z Week 3 Notes
layout: default
---

<head>
  <script language="javascript" type="text/javascript" src="/javascripts/p5/p5.js"></script>
<script language="javascript" type="text/javascript" src="/javascripts/p5/p5.dom.js"></script>
<script language="javascript" type="text/javascript" src="notes.js"></script>
</head>

# Week 3 Notes

## All examples

* [Loading file now loads into textarea](00_all_together_improved) — [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week3/00_all_together_improved)
* [Regex basics with live ACE editor](01_regexbasics) — [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week3/01_regexbasics)
* [Finding double words](02_doublewords) — [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week3/02_doublewords)
* [Doubling the vowels using replace](03_voweldoubler) — [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week3/03_voweldoubler)
* [Regex from user](04_regex_tester) — [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week3/04_regex_tester)
* [Finding links](05_linkfinder) — [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week3/05_linkfinder)
* [Random Expression Generator](06_reverse_regex_generator) — [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week3/06_reverse_regex_generator), thanks to <a href="http://fent.github.io/randexp.js/">randexp.js</a>.


## Related references
* [Chapter 1, Mastering Regular Expressions](http://safari.oreilly.com/0596002890/mastregex2-CHP-1)
* [Guide to regex in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
* [Eloquent JavaScript Regular Expressions](http://eloquentjavascript.net/09_regexp.html)
* [Play the regex crossword!](http://regexcrossword.com/)

## Exercise ideas
* Write a regular expression that matches any e-mail address.
* Take that regular expression and do a search and replace so that any e-mail address is made into a “mailto:” link.
* Create an example that reads an HTML page and removes any markup and leaves only the raw content.
* Adapt the [regex tester](https://github.com/shiffman/Programming-from-A-to-Z-F14/tree/master/week2_regex/regex_p5/regex_tester) to be a search/replace tester.
* Create a regex that matches only code comments in code.

## Regular Expressions 

<p><div style="background: #DDDDDD; padding: 18px"><em>WARNING: This is a woefully incomplete overview of regular expressions.  It would be absurd to try to fully cover the topic in a short handout like this.  Hopefully, this will provide some of the basics to get you started, but to really understand regular expressions, I suggest you to read as much of <a href="http://safari.oreilly.com/0596002890/">Mastering Regular Expressions</a> by Jeffrey E.F. Friedl as you have time for.  In addition, the <a href="http://eloquentjavascript.net/09_regexp.html">regular expressions chapter in Eloquent JavaScript</a> is more comprehensive than below.</em></div></p>

A **[regular expression](http://en.wikipedia.org/wiki/Regular_expression)** is a sequence of characters that describes or matches a given amount of text.  For example, the sequence <code class="regex">bob</code>, considered as a regular expression, would match any occurance of the word "bob" inside of another text. The following is a rather rudimentary introduction to the basics of regular expressions.  We could spend the entire semester studying regular expressions if we put our mind to it. Nevertheless, we'll just have a basic introduction to them this week and learn more advanced technique as we explore different text processing applications over the course of the semester.

A truly wonderful book written on the subject is: <a href="http://regex.info/">Mastering Regular Expressions</a> by Jeffrey Friedl.  I might recommend at least reading [Chapter 1](http://safari.oreilly.com/0596002890/mastregex2-CHP-1).

Regular expressions (referred to as “regex” for short) have both literal characters and meta characters.  In <code class="regex">bob</code>, all three characters are literal, i.e. the “b” wants to match a “b”, the “o” an “o”, etc.    We might also have the regular expression:

<code class="regex">^bob</code>

In this case, the <code class="regex">^</code> is a meta character, i.e. it does not want to match the character “^”, but instead indicates the "beginning of a line." In other words the regex above would find a match in:

**bob goes to the park.**

but would not find a match in:

**jill and bob go to the park.**

Here are a few common meta-characters (I'm listing them below as they would appear in a JavaScript regular expression, which may differ slightly from other languages or environments) used to get us started:

### Position Metacharacters:

<pre>
^     beginning of line
$     end of line
\b    word boundary
\B    a non word boundary
</pre>

### Single Character Metacharacters:

<pre>
.     any one character
\d    any digit from 0 to 9
\w    any word character (a-z,A-Z,0-9)
\W    any non-word character
\s    any whitespace character (tab, new line, form feed, end of line, carriage return)
\S    any non whitespace character
</pre>

### Quantifiers (refer to the character that precedes it):

<pre>
?         appearing once or not at all
*         appearing zero or more times
+         appearing one or more times
{min,max} appearing within the specified range
</pre>

Using the above, we could come up with some quick examples:

* <code class="regex">^$</code> — matches beginning of line followed by end of line, i.e. match any blank line!
* <code class="regex">ing\b</code> — matches “ing” followed by a word boundary, i.e. any time “ing” appears at the end of a word!

**Character Classes** serve as a kind of *or* statement amongst individual characters and are denoted by characters enclosed in brackets, i.e. <code class="regex">[aeiou]</code> means match any vowel.  Using a <code class="regex">^</code> negates the character class, i.e. <code class="regex">[^aeiou]</code> means match any character not a vowel (note this isn't just limited to letters, it really means <i>anything at all</i> that is not an a, e, i, o, or u.)  A hyphen indicates a range of characters, such as <code class="regex">[0-9]</code> or <code class="regex">[a-z]</code>.

Another key metacharacter is <code class="regex">|</code>, meaning or.  This is known as the concept of **alternation**.

<code class="regex">John | Jon</code> means match “John” or Jon”

Note: this regex could also be written as <code class="regex">Joh?n</code>, meaning match “Jon” with an optional “h” between the “o” and “n.”

Parentheses can also be used to constrain the alternation.  For example, <code class="regex"> (212|646|917)\d*</code> matches any sequence of zero or more digits preceded by 212, 646, or 917 (presumably to retrieve phone numbers with NYC area codes).  Note this regular expression would need to be improved to take into consideration white spaces and/or punctuation.

Parentheses also serve the purpose of capturing groups for back-references.  For example, examine the following regular expression: <code class="regex">\b([0-9A-Za-z]+)s+\1\b</code>.

The first part of the expression in parentheses reads: <code class="regex">\b([0-9A-Za-z]+)</code> meaning match any “word” containing at least one or more letters/digits.  The next part <code class="regex">\s+</code> means any sequence of at least one white space.  The third part <code class="regex">\1</code> says match whatever you matched that was enclosed inside the first set of parentheses, i.e. <code class="regex">([0-9A-Za-z]+)</code>.   So, thinking this over, what will this regular expression match in the following line?

**This is really really super super duper duper fun.  Fun!**

## Testing regex with sublime text

One quick way you can test regular expressions is with sublime text's "find".  Simply enable the regex option (indicated by the <code class="regex">.*</code> button) after hitting ⌘F.

![sublime](images/sublime.png)

The `Aa` option makes the regular expression case-insensitive.   Let's look at some other examples (special thanks to [Friedl”s Mastering Regular Expressions](http://regex.info)).

Matching urls: <code class="regex">http://[^\s<>"']+</code>

Checking this regex against <a href="">this sample file</a> yields the following results:

![sublime2](images/sublime2.png)

Here's another regular expression example that uses a back reference to matches any repeated words <code class="regex">\b(\w+)\s+\1</code>.

![sublime3](images/sublime3.png)

(Note, in the above example, the metacharacter <code class="regex">\b</code> means “word boundary”, i.e. the beginning *or* end of a word.)  Without checking for a word boundary the regex <code class="regex">(\w+)\s+\1</code> would match "This is" for example.

Find/replace with regex in Sublime Text is also incredibly useful.  For example, here's how you might change all markdown urls of the format <code>[name](link)</code> to html <code>&lt;a href="link"&gt;name&lt;/a&gt;.

![sublime6](images/sublime6.png)

## Regular Expressions in JavaScript

In JavaScript, regular expressions like Strings are objects.  For example, a regex object can be created like so:

{% highlight javascript %}
var regex = new RegExp('aregex');
{% endhighlight %}

While the above is technically correct (and sometimes necessary, we'll get to this later), a more common way to create a regex in JavaScript is with forward slashes.  Whereas a String is an array of characters between quotes, a regex is an array of characters between forward slashes.  For example:

{% highlight javascript %}
var regex = /aregex/;
{% endhighlight %}

The `RegExp` object has several methods.  The first thing you might try is the `test()` function which returns `true` or `false` depending on if the string passed in matches the regex.  This can be used to validate an e-mail address for example.

{% highlight javascript %}
var email = /\w+@\w+\.(net|com|edu|org)/;
if (email.test("daniel@shiffman.net")) {
  console.log("That's a valid e-mail!");
}
{% endhighlight %}

The JavaScript `String` object also has several methods which accept regular expressions as input.  For example `search()` is a function that works similarly to `indexOf()`.  It looks for a regular expression match and returns the index of that match.

{% highlight javascript %}
var zipcode = "My zip code is 90210";
var index = zipcode.search(/\d{5}/);
console.log("The zip code is at index: " + index);
{% endhighlight %}

Probably the most useful regular expression method is `match()`.  `match()` is a method of the `String` object that returns the matches of a regular expression.

{% highlight javascript %}
var txt = "This is a test.";    // The String the search in
var regex = /test/;             // The regex  
var results = txt.match(regex); // Execute the search
{% endhighlight %}

`results` now contains the following array:

{% highlight javascript %}
[ 'test' ]
{% endhighlight %}

If the regular expression includes capturing parenthese, the groups would also appear in the array.  For example, let's say you needed a regex to match a phone number a string.

{% highlight javascript %}
var txt = 'Phone numbers: 212-555-1234 and 917-555-4321 and 646.555.9876.';  
var regex = /(\d+)[-.]\d+[-.]\d+/;               
var results = txt.match(regex);
{% endhighlight %}

The above isn't necessarily the greatest phone number matching regex, but it'll do for this example.  One or more numbers followed by a dash or period followed by one or more numbers, a dash or period again, and one or more numbers.  Let's look at the resulting array.

{% highlight javascript %}
[ '212-555-1234', '212' ]
{% endhighlight %}

Notice how the full phone number match appears as the first (index 0) element and the captured group (the area code) follows.  You might notice, however, that there are three phone numbers in the original input String and yet `match()` only matched the first one.  In order to find all the matches, we'll need to add several other steps.

### Step 1. Add the global flag: `g`.

Regular expressions can include flags that modify how the search operates.  For example the flag `i` is for case-insensitivity so that the regular expression <code class="regex">hello</code> with the flag `i` would match “hello”, “Hello”, “HELLO”, and “hElLO” (and other permutations).  A flag is added after the second forward slash like so: <code class="regex">/hello/i</code>.  The global flag `g` tells the regular expression that we want to search for **all** of the matches and not just the first one.

{% highlight javascript %}
var regex = /(\d+)[-.]\d+[-.]\d+/g;  // Now includes the global flag 
{% endhighlight %}

Let's look at what happens when you run the same code now.

{% highlight javascript %}
var txt = 'Phone numbers: 212-555-1234 and 917-555-4321 and 646.555.9876.';  
var regex = /(\d+)[-.]\d+[-.]\d+/g;               
var results = txt.match(regex);
{% endhighlight %}

The results:

{% highlight javascript %}
["212-555-1234", "917-555-4321", "646.555.9876"]
{% endhighlight %}

Notice how `match()` now returns all of the matches in original string as elements of the array.  However, the captured group for the area codes is now lost.  If there are multiple matches **and** you want to have captured groups, you have to instead use the `exec()` method which is part of the `RegExp` object.

In the case of a single match, the `exec()` function works identically to `match()`.  The `exec()` function, even with the global flag, will still return only the first match.  However, if you call `exec()` a second time with the same regex and input string, it will move on and return the results for the second match (or `null` if there is no match.)  You can therefore write a `while` loop to keep checking until the result is null.

{% highlight javascript %}
var text = 'Phone numbers: 212-555-1234 and 917-555-4321 and 646.555.9876.';  
var regex = /(\d+)[-.]\d+[-.]\d+/g;               
var results = regex.exec(text);

while (results != null) {
  // do something with the matched results and then

  // Check again
  results = regex.exec(text);
}
{% endhighlight %}

This could also be written with the following shorthand (The examples linked from here, however, use the longer-winded code for clarity.)

{% highlight javascript %}
while (var results = regex.exec(text)) {
  // do something with the matched results
}
{% endhighlight %}

## Splitting with Regular Expressions

I can now revisit the [week 2 discussion](http://shiffman.github.io/A2Z-F15/week2/notes.html) of p5's `split()` and `splitTokens()` functions and look at how regular expressions work as a delimiter with the native `String` `split()` method.  In this case, a string is split into an array of substrings beginning at each match of that regular expression. Here's a simple example that quickyl counts the # of words (not perfect by any means).

{% highlight javascript %}
var text = "This text has characters, spaces, and some punctuation.";
var regex = /\W+/; // one or more non-word chars (anything not a-z0-9)

var words = text.split(regex);
console.log('Total words: ' + words.length);
{% endhighlight %}

The `words` array now contains:

{% highlight javascript %}
[ 'This',
  'text',
  'has',
  'characters',
  'spaces',
  'and',
  'some',
  'punctuation'
]
{% endhighlight %}

What if you, however, would like to include all the delimiters?  To accomplish this, simply enclose your delimiters in capturing parentheses.  With `var regex = /(\W+)/;` therefore you'll get the following result.

{% highlight javascript %}
[ 'This',
  ' ',
  'text',
  ' ',
  'has',
  ' ',
  'characters',
  ', ',
  'spaces',
  ', ',
  'and',
  ' ',
  'some',
  ' ',
  'punctuation',
  '.',
  '' ]
{% endhighlight %}

<a name="searchreplace"></a>
## Search and Replace

Running a search and replace is one of the more powerful things one can do with regular expressions.  This can be accomplished with the String's `replace()` method.  The method receives two arguments, a regex and a replacement string.  Wherever there is a regex match, it is replaced with the string provided.

{% highlight javascript %}
var text = 'Replace every time the word "the" appears with the word ze.'; 

// \b is a word boundary
// You can think of this as an invisible boundary 
// between a non-word character and a word character.
var regex = /\bthe\b/g;  

var replaced = text.replace(regex,'ze');
{% endhighlight %}

The result is:

```
Replace every time ze word "ze" appears with ze word ze.
```

We can also reference the matched text using a backreference to a captured group in the substitution string.  A backreference to the first group is indicated as <code class="regex">$1</code>, <code class="regex">$2</code> is the second, and so on and so forth.
{% highlight javascript %}
var text = "Double the vowels.";
var regex = /([aeiou]+)/g;
var replaced = text.replace(regex, '$1$1');
{% endhighlight %}

The result is:

```
Dououblee thee vooweels
```

You can try out some regex below as well as [take a look at the code for making this regex tester](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week3/04_regex_tester). 

<p>
  <textarea rows="10" cols="75" id='input'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</textarea>
</p>
  
<p>
  <input type="text" id="regex" value="\w+"><input type="checkbox" id="global">global<input type="checkbox" id="case">case insensitive
</p>
<p><button id="button">Run the regex</button></p>

<pre id="output"></pre>

<p>You can also explore this <a href="http://shiffman.github.io/A2Z-F15/week3/01_regexbasics/">walk-through of JS regex functionality</a></p>.