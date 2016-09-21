---
title: Programming from A to Z Week 1 Notes
layout: redirected
sitemap: false
redirect_to:  http://shiffman.net/a2z/intro
---

# Week 1 Notes

## Git, Github, Github pages

One of the first things we'll explore in this class is git, github, and github pages.  By no means, is github pages required for hosting your projects.  But it's free and fast and lives on github.  So there are many reasons why you might like to consider it, at least during the homework / experimentation stage / of a project.  Here are some resources for getting started.

* Git and Github
   * [Introduction to Git and Command Line by Steve Klise](http://sklise.com/2012/09/22/introduction-to-git/)
   * [Git workflow for beginners](http://sklise.com/2012/10/07/git-workflow-beginner/)
   * ["Try" Git tutorial](https://try.github.io/levels/1/challenges/1)
* Github Pages: 
   * [A Guide to Github pages](https://www.thinkful.com/learn/a-guide-to-using-github-pages/)

## JavaScript

The core language for this class is JavaScript.  If JavaScript is new to you, I would suggest starting with the the  [first four chapters of Eloquent JavaScript](http://eloquentjavascript.net/).  And there are [many more resources for learning online](https://github.com/shiffman/A2Z-F15#learning--intro) as well.

## p5.js

The framework we'll be exploring is [p5.js](http://p5js.org).  Here are some links to get your started.

  * [Overview of p5.js](https://github.com/processing/p5.js/wiki/p5.js-overview)
  * [p5.js transition from Processing](https://github.com/processing/p5.js/wiki/Processing-transition)
  * [ICM intro p5.js video lessons](https://vimeo.com/channels/learningp5js/)

### Examples

  * [p5.js basics](00_p5_canvas_js_basics.js/basics/), [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week1/00_p5_canvas_js_basics.js/basics)
  * [empty example](00_p5_canvas_js_basics.js/empty_example/), [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week1/00_p5_canvas_js_basics.js/empty_example)
  * [processing vs p5 1](00_p5_canvas_js_basics.js/processing_p5_conversion_0/), [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week1/00_p5_canvas_js_basics.js/processing_p5_conversion_0)
  * [processing vs p5 2](00_p5_canvas_js_basics.js/processing_p5_conversion_1/), [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week1/00_p5_canvas_js_basics.js/processing_p5_conversion_1)

## HTML and CSS

The class will assume basic knowledge of HTML and CSS.  Of course I'm happy to answer questions and go over these topics, but they won't be explicitly covered in class, other than in the context of JavaScript DOM manipulation.  For review, I would suggest reading the p5.js [HTML and CSS overview](https://github.com/processing/p5.js/wiki/Intro-to-HTML-and-CSS).  The [HTML and CSS book](http://www.htmlandcssbook.com/) is also excellent.

* [basic HTML and CSS example](02_DOM/01_html_css/), [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week1/02_DOM/01_html_css/)

## DOM manipulation with JS

The first JavaScript task I'll demonstrate is "DOM manipulation", i.e. using programming to change the HTML and CSS of a page on the fly.  This is something possible with native JavaScript, as well as many different JS frameworks and libraries, the most well-known probably being [JQuery](https://jquery.com/).  In class, we'll use the p5.js DOM library primarily, as well as dig into native JS and other frameworks when necessary.

* [p5.js DOM library tutorial](https://github.com/processing/p5.js/wiki/Beyond-the-canvas)

## Examples

* [create HTML elements](02_DOM/02_build_html_css_p5/), [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week1/02_DOM/02_build_html_css_p5/)
* [using select, and parent/child](02_DOM/03_select_parent_child/), [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week1/02_DOM/03_select_parent_child/)
* [dynamic CSS with `style()`](02_DOM/04_css_with_p5_style/), [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week1/02_DOM/04_css_with_p5_style/)
* [absolute positioning of DOM elements](02_DOM/05_absolute_position_DOM/), [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week1/02_DOM/05_absolute_position_DOM/)
* [handling events: mousePressed](02_DOM/06_mousepressed/), [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week1/02_DOM/06_mousepressed/)
* [handling events: mouseOver, mouseOut](02_DOM/07_mouseover_mouseout/), [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week1/02_DOM/07_mouseover_mouseout/)
* [animating a DOM element](02_DOM/08_animateDOM/), [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week1/02_DOM/08_animateDOM/)
* [building a simple interface](02_DOM/09_interface/), [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week1/02_DOM/09_interface/)
* [weird sliders experiment](02_DOM/10_sliders/), [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week1/02_DOM/10_sliders/)

## JavaScript Objects

JavaScript objects will be key to just about everything we do this semester.  We'll be using objects for DOM manipulation like `p5.Element` and the native JS `Element`.  We'll be exploring data coming in as JSON ("JavaScript Object Notation").  We'll focus a lot on the JS `String` object as well as objects from other libraries.  And we'll write our own objects for analyzing and generating text.  JavaScript objects (for now, at least until [ES6](http://es6-features.org/#Constants) is more widely adopted) follow a "prototypical inheritance" model which is quite different than the classical OOP found in Java or C++.  [This "object playground" video](http://www.objectplayground.com/) covers the idea in great detail if you are looking for more info.  

### Examples

* [single object](01_objects_in_JS_p5/01_object_example/)
* [parameterized multiple objects](01_objects_in_JS_p5/02_parameterized_objects/)
* [array of objects 1](01_objects_in_JS_p5/03_array_of_objects//)
* [array of objects 2](01_objects_in_JS_p5/04_array_interactive_objects/)
* [array of objects 3 (with push)](05_array_of_objects_push/)
* [inheritance](06_inheritance/)

## Text mashups

In class, we'll do an exercise around mashing up text manually.  Here are links to further reading and information about the techinques we discussed, as well as online versions of the algorithms.  Next week, we'll look at how to build single page web apps that mash up text submitted by users.

* "Cut-ups"
  * [Cut-up Method](http://www.writing.upenn.edu/~afilreis/88v/burroughs-cutup.html) from  Leroi Jones, ed., The Moderns: An Anthology of New Writing in America (NY: Corinth Books, 1963).
  * [Cut-up machine](http://www.languageisavirus.com/cutupmachine.html#.VfHCY51Viko)
* "Erasures"
  * [Erasure Poetry](https://en.wikipedia.org/wiki/Erasure_(artform))
  * [Make an online Erasure](http://erasures.wavepoetry.com/erasures.php?sourceid=23)
* "N+7" or "V+__"
  * [N+7 technique](http://www.languageisavirus.com/articles/articles.php?subaction=showcomments&id=1161978000#.VfHDT51Viko)
  * [N+7 machine](http://www.spoonbill.org/n+7/)
* Jackson Mac Low and the Diastic Technique
  * Excerpt from Virtual Muse: Experiments In Computer Poetry pgs. 95-96
  * [Online Diastic generator](http://www.eddeaddad.net/eDiastic/)
