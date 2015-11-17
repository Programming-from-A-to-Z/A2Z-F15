---
title: Deploying to Heroku Notes
layout: default
---

# Notes on Deploying to Heroku

* [Heroku Getting Started Guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)
* [How to Deploy a Node.js App to Heroku](https://scotch.io/tutorials/how-to-deploy-a-node-js-app-to-heroku)

## Sign up and create an app

* [Sign up for Heroku](https://heroku.com/)
* [Install Heroku Toolbelt](https://toolbelt.heroku.com/)

## Create the app

* Go to your [dashboard](https://dashboard.heroku.com/apps)
* Select "Create new app" (top right)
* Name your app something (only letters, numbers, and dashes)
* Click "Create App"

## Push your code to heroku

* Login with toolbelt:

<pre>
$ heroku login
</pre>

* Navigate terminal to your project directory.
* If your project is not already a git repository (otherwise skip this step):

<pre>
$ git init
</pre>

* Add heroku as a remote:

<pre>
$ heroku git:remote -a your-app-name
</pre>

* Commit your code (it it's not already).

<pre>
$ git add .
$ git commit -am "commiting the code"
</pre>

* Send to heroku!

<pre>
$ git push heroku master
</pre>

You should then see a whole lot of stuff telling you about how your app is starting and running!

## Was your app a bot?

If your app was a bot, you need an additional step.  Since it's not a web server, you have to tell heroku that this app is a ["worker"](https://devcenter.heroku.com/articles/background-jobs-queueing) app.  This is done with a ["Procfile"](https://devcenter.heroku.com/articles/procfile).  This is a file called exactly "Procfile" in your node directory with a single line:

<pre>
worker: node bot.js
</pre>

[Here's an example](https://github.com/shiffman/A2Z-F15/blob/gh-pages/week9/08_twitter_bot/Procfile).

You then need to login to your dashboard and navigate to the app.  The "worker" dyno must be enabled rather than the default web one (`npm start`).  The app's dashboard should look like the following:

<p>
  <img src="images/dynos.png"/>
</p>

Depending on the order in which you have done things, you might need to restart your app.

<pre>
$ heroku restart
</pre>

## Heroku config settings

Something else you can do with heroku is set variables specific to your app.  This is convenient for, say, API keys.  In other words if you say:

<pre>
$ heroku config:set api_key=99999999999999
</pre>

In your code, you can then have:

{% highlight javascript %}
var key = process.env.api_key;
{% endhighlight %}

More about [config variables in Heroku's help pages](https://devcenter.heroku.com/articles/config-vars).













