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

## Basics

Here is an example:

{% highlight javascript %}
{
  "manifest_version": 2,
  "name": "My Extension",
  "version": "0.1"
}
{% endhighlight %}
