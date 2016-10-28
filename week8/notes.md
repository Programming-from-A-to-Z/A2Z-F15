---
title: Programming from A to Z Week 8 Notes
layout: redirected
sitemap: false
redirect_to:  http://shiffman.net/a2z/cfg
---

# Context-Free Grammar

<!--<head>
<script language="javascript" type="text/javascript" src="../javascripts/p5/p5.js"></script>
<script language="javascript" type="text/javascript" src="../javascripts/p5/p5.dom.js"></script>
<script language="javascript" type="text/javascript" src="generate.js"></script>
</head>-->

## Examples
* [Context-Free Grammar basic](01_cfg_raw/) — [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week8/01_cfg_raw)
* [Context-Free Grammar from file](02_cfg_reader/) — [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week8/02_cfg_reader)
* [Context-Free Grammar from JSON file](03_cfg_reader_json/) — [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week8/03_cfg_reader_json)
* [Generate Context-Free Grammar JSON file](04_cfg_generate_grammar/) — [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week8/04_cfg_generate_grammar)
* [LSystem](05_LSystem/) — [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week8/05_LSystem)

## CFG projects
* [Context-Free Art](http://www.contextfreeart.org/)

## Related references
* [Context-Free Grammars by Allison Parrish](http://www.decontextualize.com/teaching/rwet/recursion-and-context-free-grammars/)
* [Context-Free Grammars by Daniel Howe](http://www.rednoise.org/pdal/index.php?n=Main.Grammars)
* [Context-Free Grammars by Randal C. Nelson](https://www.cs.rochester.edu/~nelson/courses/csc_173/grammars/cfg.html) -- includes some info about thinking about programming syntax as CFG
* [Example grammars](http://marvin.cs.uidaho.edu/Teaching/CS445/grammar.html)
* [Three Models for the Description of Language (Chomsky)](http://chomsky.info/articles/195609--.pdf)
* [More on grammars](http://matt.might.net/articles/grammars-bnf-ebnf/)
* [More on L-Systems](http://natureofcode.com/book/chapter-8-fractals/#86-l-systems) from [The Nature of Code](http://natureofcode.com/book).

## Exercise ideas
* Rework any of the example programs to use something other than text (or, at least, text that represents language) as its basic unit. For example: musical notes, songs in playlists, pixels in an image, etc.
* Invent your own grammar. Consider using one that generates something other English sentences: music, images, code, etc.
* Build a grammar that pulls its terminal words from [Wordnik](https://www.wordnik.com/).
* Build a grammar based on a source text [as demonstrated here](04_cfg_generate_grammar/) — [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week8/04_cfg_generate_grammar).  

## Grammars

From <a href="http://en.wikipedia.org/wiki/Grammar">Wikipedia</a>:  “Grammar is the study of the rules governing the use of a given natural language, and, as such, is a field of linguistics. Traditionally, grammar included morphology and syntax; in modern linguistics these subfields are complemented by phonetics, phonology, semantics, and pragmatics.”

A [Context-Free Grammar](http://en.wikipedia.org/wiki/Context-free_grammar) is a set of rules that define the syntax of a language — what is and is not a valid sequence of “tokens”.   Programming languages, for example, are context-free grammars — a compiler reads your code to make sure it conforms to specific rules and informs you of any errors.   (These rules aren’t limited to the production of text, and can be used for music, images, etc.) A context-free grammar, however, isn’t robust enough to describe the complexities of natural language.  After all, they have no context!  Natural languages can be described using <a href="http://en.wikipedia.org/wiki/Context-sensitive_grammar">Context-sensitive grammars</a>, a concept introduced by <a href="http://en.wikipedia.org/wiki/Noam_Chomsky">Chomsky</a> in the 50s.

For our purposes here, we want to learn how to define our own context free grammars and generate text from them.  I’m going to give a short explanation here, followed by code examples.  For more detailed discussions, I would recommend [Daniel Howe’s (creator of RiTa)explanation](http://www.rednoise.org/pdal/index.php?n=Main.Grammars) and [Context-Free Grammars by Allison Parrish](http://www.decontextualize.com/teaching/rwet/recursion-and-context-free-grammars/).

All “production rules” in a context-free grammar are of the form:

<pre>
V -> w
</pre>

where `V` is a single “non-terminal” and `w` is a sequence of “terminals” and “non-terminals”

A non-terminal symbol is simply another symbol which needs to be defined in another production rule.  A terminal symbol does not need to be defined because that’s it, you’ve reached the end, what is here is what should be in the sentence itself.  Here’s an incredibly simple CFG.

<pre>
s -> a b
a -> 'the'
b -> c 'cat'
c -> 'happy'
c -> 'sad'
</pre>

Anything in single quotes is a “terminal” element, meaning this is the end and no more substitutions are necessary.  In the above “cat,” “happy,” and “sad” are all terminals. Anything that is not in quotes is non-terminal, or a “symbol.”  The abve example has 4 symbols — s, a, b, c. The symbol “s” is commonly used to indicate “start” or “sentence.”

Notice how in the above set of rules the symbol c can be “happy” or “sad.”   This is often express with an OR (pipe character) to combine these two rules:

<pre>
c -> 'happy' | 'sad'
</pre>

Again, this grammar is incredibly basic, and is just for demonstrating how the elements work.  The only two valid “sentences” that conform to this grammar are:

<pre>
the happy cat
the sad cat
</pre>


The process of generating the above two sentences goes something like:

`s` becomes `a b` which becomes `the c cat` which then becomes `the happy cat` or `the sad cat`.  Here, either “happy” or “sad” is picked randomly (with a 50% chance for each one.)

How do we build a data structure to track a context-free grammar?  Yup, again, we're going to use a JavaScript object just like with the concordance or N-gram analysis.  Here we'll take a production rule and map non-terminal characters to keys and the possible outcomes as an array of values.

{% highlight javascript %}
var cfg = {
  's': [['a', 'b']],
  'a': [['the']],
  'b': [['c', 'cat']],
  'c': [['happy'], ['sad']]
};
{% endhighlight %}

The above may look a little strange to you.  Notice how the value for each key is an array of arrays.  Each element of the larger array is one possible outcome which is an array itself: the list of elements in that outcome.  I should also note that the is no distinction between a “symbol” and a “terminal.”  Everything is just a String, if there is a rule associated with that String then it is a symbol, if not, it's terminal.

A generated sentence from the CFG is commonly referred to as an “expansion” and is a bit tricky to implement.  We could try to just use a loop, iterating over a sentence and executing the production rules.  The nested nature of the rules, however, introduces a great deal of complexity.  An elegant strategy, however, is to call a function recursively expanding the same sentence over and over again until there are no non-terminal elements left.  Let's assume we have an empty array and some seed (often called an "axiom").

{% highlight javascript %}
var expansion = [];
var seed = 's';
{% endhighlight %}

We can write a function that receives both the array and the seed and calls itself recursively if a rule that matches that seed String is present.

{% highlight javascript %}
function expand(start, expansion) {
  if (cfg.hasOwnProperty(start)) {
    // Grab one possible expansion
    var possible = rules[start];
    var random_expansion = choice(possible);
    // Call this method again with the current element of the expansion
    for (var i = 0; i < random_expansion.length; i++) {
      expand(random_expansion[i], expansion);
    }
  // if the rule wasn't found, then it's a terminal: simply append the
  // string to the expansion
  } else {
    expansion.push(start);
  }
}
{% endhighlight %}

The [full implementation of the CFG object can be found here](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week8/01_cfg_raw/cf.js).  In addition, here are some sample grammars: [creating a grammar in code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week8/01_cfg_raw/sketch.js), [a grammar file](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week8/02_cfg_reader/test.grammar), [a grammar files as JSON](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week8/03_cfg_reader_json/grammars/grammar.json), [haiku grammar file as JSON](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week8/03_cfg_reader_json/grammars/haiku.json).  These grammars come from [Allison Parrish](https://github.com/aparrish/rwet-examples) and [Daniel Howe](http://rednoise.org/rita/).

Finally, a grammar file is something you can generate yourself based on some algorithm.  For example, using [this haiku grammar file from Daniel Howe](http://www.rednoise.org/rita/examples/haiku.g), you could read in a source text, analyze the syllable counts of all the words, and rewrite the grammar file to reflect these new words.  Here is a version of this grammar file using words from an Obama speech: [generated_grammar.g](http://shiffman.net/itp/classes/a2z/week09/2008/data/generated_grammar.g).

Here is an [example that uses a concordance to get al the words from a source file and the RiTa library to count syllables](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week8/04_cfg_generate_grammar).
