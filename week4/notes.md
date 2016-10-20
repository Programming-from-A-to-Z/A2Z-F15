---
title: Programming from A to Z Week 5 Notes
layout: redirected
sitemap: false
redirect_to: http://shiffman.net/a2z/data-apis/
---

<head>
<script language="javascript" type="text/javascript" src="/javascripts/p5/p5.js"></script>
<script language="javascript" type="text/javascript" src="/javascripts/p5/p5.dom.js"></script>
<script language="javascript" type="text/javascript" src="notes.js"></script>
</head>

# Week 4 Notes

## All examples (client-side)
* [Wordnik -- get random words](01_wordnik_randomwords/), [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week4/01_wordnik_randomwords)
* [Wordnik -- other API calls](02_wordnik_word_info/), [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week4/02_wordnik_word_info)
* [NYTimes -- article search](03_nytimes_articles/), [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week4/03_nytimes_articles)
* [NYTimes -- word counts](04_nytimes_word_counts/), [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week4/04_nytimes_word_counts)
* [Wikipedia -- article search](05_wikipedia/), [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week4/05_wikipedia)
* [Google Custom Search](06_google_image_search/), [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week4/06_google_image_search)
* [Instagram](07_instagram_image_search/), [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week4/07_instagram_image_search)
* [Google Sheets with tabletop.js](08_google_sheets/), [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week4/08_google_sheets)
* [Mad Libs with Google Sheets with tabletop.js](09_google_sheets_madlibs/), [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week4/09_google_sheets_madlibs)
* [Saving data to parse.com](10_parse_form/), [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week4/10_parse_form)
* [Mad libs with parse.com](11_parse_madlibs), [source code](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week4/11_parse_madlibs)

## Examples requiring server-side

* [Web scraping with proxy](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week4/12_server_proxy_scraping)
* [Twitter search and posting](https://github.com/shiffman/A2Z-F15/tree/gh-pages/week4/13_server_twitter_oauth)



## Related references

## Data

This material is excerpted partially (and adapted for JavaScript) from <a href="http://learningprocessing.com">Learning Processing</a>.

<p>Data can come from many different places: websites, news feeds, spreadsheets, databases, and so on. Let's say you've decided to make a map of the world's flowers. After searching online you might find a PDF version of a flower encyclopedia, or a spreadsheet of flower genera, or a JSON feed of flower data, or a REST API that provides geolocated lat/lon coordinates, or some web page someone put together with beautiful flower photos, and so on and so forth. The question inevitably arises: “I found all this data; which should I use, and how do I get it?”</p>

<p>If you are really lucky, you might find a JavaScript library that hands data to you directly with code. Maybe the answer is to just download this library and write some code like:</p>

{% highlight javascript %}
function setup() {
  var fdb = new FlowerDatabase();
  var sunflower = fdb.findFlower("sunflower");
  var h = sunflower.getAverageHeight();
}  
{% endhighlight %}

<p>In this case, someone else has done all the work for you. They've gathered data about flowers and built a library with a set of functions that hands you the data in an easy-to-understand format. This library, sadly, does not exist (not yet), but there are some that do.</p>

<p>Let's take another scenario. Say you’re looking to build a visualization of Major League Baseball statistics. You can't find a library to give you the data but you do see everything you’re looking for at mlb.com. If the data is online and your web browser can show it, shouldn't you be able to get the data? Passing data from one application (like a web application) to another is something that comes up again and again in software engineering. A means for doing this is an API or “application programming interface”: a means by which two computer programs can talk to each other. Now that you know this, you might decide to search online for “MLB API”. Unfortunately, mlb.com does not provide its data via an API. In this case you would have to load the raw source of the website itself and manually search for the data you’re looking for. While possible, this solution is much less desirable given the considerable time required to read through the HTML source as well as program algorithms for parsing it.</p>

<p>The goal of these notes is to give you an overview of techniques, ranging from the more difficult manual parsing of data, to the parsing of standardized formats, to the use of an API designed specifically for JavaScript itself. Each means of getting data comes with its own set of challenges. The ease of using a JavaScript library is dependent on the existence of clear documentation and examples. But in just about all cases, if you can find your data in a format designed for a computer (spreadsheets, XML, JSON, etc.), you'll be able to save some time in the day for a nice walk outside.</p>


<!--## Tabular Data

<p>A table consists of data arranged as a set of rows and columns, also called “tabular data.” If you've ever used a spreadsheet, this is tabular data. p5.js's <code>loadTable()</code> function takes comma-separated (csv) or tab-separated (tsv) values and automatically places the contents into a <code>Table</code> object storing the data in columns and rows. This is a great deal more convenient than struggling to manually parse large data files with <code>split()</code>.</p>


<figure class="no-rule" id="fig_18_05_datacsv"><img alt="fig_18_05_datacsv" src="images/fig_18_05_datacsv.png" />
<figcaption>Each line is a row of a table.</figcaption>
</figure>

<p>Instead of saying:</p>

<pre data-type="programlisting">
String[] stuff = loadStrings("data.csv");
</pre>

<p>I can say:</p>

<pre data-type="programlisting">
Table table = loadTable("data.csv");
</pre>

<p>Now I've missed an important detail. Take a look again at <a data-type="xref" href="#fig_18_05_datacsv">data.csv</a> above. Notice how the first line of text is not the data itself, but rather a <em>header row</em>. This row includes labels that describe the data included in each subsequent row. The good news is that Processing can automatically interpret and store the headers for you, if you pass in the option <code>"header"</code> when loading the table. (In addition to <code>"header"</code>, there are other options you can specify. For example, if your file is called data.txt but is comma separated data you can pass in the option <code>"csv"</code>. If it also has a header row, then you can specifiy both options like so: <code>"header,csv"</code>). A full list of options can be found on the <a href="http://processing.org/reference/loadTable_.html"><code>loadTable()</code> documentation page</a>.</p>

<pre data-type="programlisting">
Table table = loadTable("data.csv", "header");
</pre>

<p>Now that the table is loaded, I can show how you grab individual pieces of data or iterate over the entire table. Let's look at the data visualized as a grid.</p>

<figure class="no-rule" id="fig_18_06_datacsv_grid"><img alt="fig_18_06_datacsv_grid" src="images/fig_18_06_datacsv_grid.png" />
<figcaption> </figcaption>
</figure>

<p>In the above grid you can see that the data is organized in terms of rows and columns. One way to access the data, therefore, would be to request a value by its numeric row and column location (with zero being the first row or first column). This is similar to accessing a pixel color at a given (x,y) location, though in this case the y position (row) comes first. The following code requests a piece of data at a given (row, column) location.</p>

<pre data-type="programlisting">
int val1 = table.getInt(2, 1);      <span class="callout-bubble pos-7">235</span>

float val2 = table.getFloat(3, 2);  <span class="callout-bubble pos-7">44.758068</span>

String s = table.getString(0, 3);   <span class="callout-bubble pos-7">“Happy”</span>
</pre>

<p>While the numeric index is sometimes useful, it’s generally going to be more convenient to access each piece of data by the column name. For example, I could pull out a specific row from the <code>Table</code>.</p>

<pre data-type="programlisting">
TableRow row = table.getRow(2);    <span class="callout-bubble pos-7">Gets the third row (index 2)</span>
</pre>

<p>Note in the above line of code that a <code>Table</code> object refers to the entire table of data while a <a href="http://processing.org/reference/TableRow.html"><code>TableRow</code></a> object handles an individual row of data within the <code>Table</code>.</p>

<p>Once I have the <code>TableRow</code> object, I can ask for data from some or all of the columns.</p>

<pre data-type="programlisting">
int x = row.getInt("x");             <span class="callout-bubble pos-7">273</span>

int y = row.getInt("y");             <span class="callout-bubble pos-7">235</span>

float d = row.getFloat("diameter");  <span class="callout-bubble pos-7">61.14072</span>

String s = row.getString("name");    <span class="callout-bubble pos-7">“Joyous”</span>
</pre>

<p>The method <a href="http://processing.org/reference/Table_getRow_.html"><code>getRow()</code></a> returns a single row from the table. If you want to grab all the rows and iterate over them you can do so in a loop with a counter accessing each row one at a time. The total number of available rows can be retrieved with <code>getRowCount()</code>.</p>

<pre data-type="programlisting">
for (int i = 0; i &lt; table.getRowCount(); i++) {

  TableRow row = table.getRow(i);  <span class="callout-bubble pos-6">Here, I access each row of the table one at a time, in a loop.</span>
  float x = row.getFloat("x");
  float y = row.getFloat("y");
  float d = row.getFloat("diameter");
  String n = row.getString("name");

  // Do something with the data of each row

}
</pre>

<p>If you want to search for a select number of rows within the table, you can do so with <a href="http://processing.org/reference/Table_findRows_.html"><code>findRows()</code></a> and <a href="http://processing.org/reference/Table_matchRows_.html"><code>matchRows()</code></a>.</p>

<p>In addition to being read, <code>Table</code> objects can be altered or created on the fly while a sketch is running. Cell values can be adjusted, rows can be removed, and new rows can be added. For example, to set new values in a cell there are functions <code>setInt()</code>, <code>setFloat()</code>, and <code>setString()</code>.</p>

<pre data-type="programlisting">
row.setInt("x", mouseX);<span class="callout-bubble">Update the value of column <code>"x"</code> to <code>mouseX</code> in a given <code>TableRow</code>.</span>

</pre>

<p>To add a new row to a <code>Table</code>, simply call the method <a href="http://processing.org/reference/Table_addRow_.html"><code>addRow()</code></a> and set the values of each column.</p>

<pre data-type="programlisting">
TableRow row = table.addRow();<span class="callout-bubble pos-5">Create a new row.</span>

row.setFloat("x", mouseX); <span class="callout-bubble pos-5">Set the values of all columns in that row.</span>
row.setFloat("y", mouseY);
row.setFloat("diameter", random(40, 80));
row.setString("name", "new label");
</pre>

<p>To delete a row, simply call the method <a href="http://processing.org/reference/Table_removeRow_.html"><code>removeRow()</code></a> and pass in the numeric index of the row you would like removed. For example, the following code removes the first row whenever the size of the table is greater than ten rows.</p>

<pre data-type="programlisting">
// If the table has more than 10 rows
if (table.getRowCount() > 10) {

  table.removeRow(0); <span class="callout-bubble pos-5">Delete the first row (index 0).</span>
}

</pre>

<p>The following example puts all of the above code together. Notice how each row of the table contains the data for a <code>Bubble</code> object.</p>

<div data-type="example" id="loading_saving_tabular_data" style="page-break-inside:auto">
<h5>Loading and Saving Tabular Data</h5>

<figure id="fig_18_07_tablebubbles" class="float-right"><img alt="Image" src="images/fig_18_07_tablebubbles.png" />
<figcaption> </figcaption>
</figure>

<pre data-type="programlisting">
Table table;<span class="callout-bubble pos-1 width-3">A <code>Table</code> object and an array of <code>Bubble</code> objects. The data from the table will fill the array.</span>
Bubble[] bubbles;

void setup() {
  size(480, 360);
  loadData();
}

void draw() {
  background(255);
  // Display all bubbles
  for (int i = 0; i &lt; bubbles.length; i++) {
    bubbles[i].display();
  }
}

void loadData() {
  table = loadTable("data.csv", "header");<span class="callout-bubble pos-8">Load file into <code>table</code> — <code>"header"</code> indicates file has header row.  The size of the array is then determined by the number of rows in the table.</span>
  bubbles = new Bubble[table.getRowCount()];


  for (int i = 0; i &lt; table.getRowCount(); i++) {

    TableRow row = table.getRow(i);<span class="callout-bubble pos-7">Iterate over all the rows in a table.</span>


    float x = row.getFloat("x");<span class="callout-bubble pos-7">Access the fields via their column name (or index).</span>
    float y = row.getFloat("y");
    float d = row.getFloat("diameter");
    String n = row.getString("name");
    bubbles[i] = new Bubble(x, y, d, n);<span class="callout-bubble below pos-7">Make a <code>Bubble</code> object out of the data from each row.</span>
  }
}


void mousePressed() {
  TableRow row = table.addRow();<span class="callout-bubble pos-7">When the mouse is pressed, create a new row and set the values for each column of that row.</span>
  row.setFloat("x", mouseX);
  row.setFloat("y", mouseY);
  row.setFloat("diameter", random(40, 80));
  row.setString("name", "Blah");

  if (table.getRowCount() > 10) {<span class="callout-bubble pos-7">If the table has more than 10 rows, delete the oldest row.</span>
    table.removeRow(0);
  }

  saveTable(table, "data/data.csv");<span class="callout-bubble pos-7">This writes the table back to the original CSV file and reload the file so that what's drawn matches.</span>
  loadData();
}

class Bubble {<span class="callout-bubble pos-3">This simple <code>Bubble</code> class will be used for several data examples in this chapter. It draws a circle to the window and display a text label when the mouse hovers.</span>
  float x, y;
  float diameter;
  String name;

  boolean over = false;

  // Create the Bubble
  Bubble(float tempX, float tempY, float tempD, String s) {
    x = tempX;
    y = tempY;
    diameter = tempD;
    name = s;
  }

  // Checking if mouse is over the bubble
  void rollover(float px, float py) {
    float d = dist(px, py, x, y);
    if (d &lt; diameter/2) {
      over = true;
    } else {
      over = false;
    }
  }

  // Display the Bubble
  void display() {
    stroke(0);
    strokeWeight(2);
    noFill();
    ellipse(x, y, diameter, diameter);
    if (over) {
      fill(0);
      textAlign(CENTER);
      text(name, x, y+diameter/2+20);
    }
  }
}

</pre>
</div>

<p>While unrelated to the main topic of this chapter data,  Here, the distance between a given point and a circle's center is compared to that circle's radius as depicted in <a data-type="xref" href="#fig_18_08_rollover">#fig_18_08_rollover</a>.</p>.

<figure class="no-rule" id="fig_18_08_rollover"><img alt="fig_18_08_rollover" src="images/fig_18_08_rollover.png" />
<figcaption> </figcaption>
</figure>

<pre data-type="programlisting">
boolean rollover(int mx, int my) {
  if (dist(mx, my, x, y) &lt; diameter/2) {<span class="callout-bubble below">This function returns a boolean value (true or false) depending on whether the point (mx,my) is inside the circle. Notice how radius is equal to half the diameter.</span>
    return true;
  } else {
    return false;
  }
}</pre>

</section>-->

<!--<section data-type="sect1" id="non_standard_data">
<h1>Data that is not in a standardized format</h1>

<p>What if your data is not in a standard format like a table, how do you deal with it then? One of the nice features about <code>loadStrings()</code> is that in addition to pulling text from a file, you can also grab a URL. For example:</p>

{% highlight javascript %}
var lines;

function preload() {
  lines = loadStrings("http://www.yahoo.com");</pre>
}
{% endhighlight %}

<p>When you send a URL path into <code>loadStrings()</code>, you get back the raw HTML (Hypertext Markup Language) source of the requested web page. It’s the same stuff that appears upon selecting “View Source” from a browser’s menu options. You don’t need to be an HTML expert to follow this section, but if you are not familiar at all with HTML, you might want to read <a href="http://en.wikipedia.org/wiki/HTML">http://en.wikipedia.org/wiki/HTML</a>.</p>

<p>Unlike with the comma-delimited data from a text file that was specially formatted for use in a Processing sketch, it’s not practical to have the resulting raw HTML stored in an array of strings (each element representing one line from the source). Converting the array into one long string can make things a bit simpler. As you saw earlier in the chapter, this can be achieved using <code>join()</code>.</p>

<pre data-type="programlisting">
String onelongstring = join(lines, " ");</pre>

<p>When pulling raw HTML from a web page, it’s likely you do not want all of the source, but just a small piece of it. Perhaps you’re looking for weather information, a stock quote, or a news headline. You can take advantage of the text manipulation functions you learned — <code>indexOf()</code>, <code>substring()</code>, and <code>length()</code> — to find pieces of data within a large block of text. You saw an early example of this in <a data-type="xref" href="#fill_in_the_blanks_to_get_the_substring">#fill_in_the_blanks_to_get_the_substring</a>. Take, for example, the following <code>String</code> object:</p>

<pre data-type="programlisting">
String stuff = "Number of apples:62. Boy, do I like apples or what!";</pre>

<p>Let’s say I want to pull out the number of apples from the above text. My algorithm would be as follows:</p>

<ol>
  <li>
  <p>Find the <em>end of the substring</em> “apples:” Call it start.</p>
  </li>
  <li>
  <p>Find the <em>first period</em> after “apples:” Call it end.</p>
  </li>
  <li>
  <p>Make a <em>substring</em> of the characters between start and end.</p>
  </li>
  <li>
  <p>Convert the string to a number (if I want to use it as such).</p>
  </li>
</ol>

<p>In code, this looks like:</p>

<pre data-type="programlisting">
int start      = stuff.indexOf("apples:" ) + 8;  // STEP 1 <span class="callout-bubble pos-13">The index where a string ends can be found by searching for that string and adding its length (here, 8).</span>
int end        = stuff.indexOf(".", start);      // STEP 2
String apples  = stuff.substring(start, end);    // STEP 3
int apple_no   = int(apples);                    // STEP 4</pre>

<p>The above code will do the trick, but I should be a bit more careful to make sure I don’t run into any errors if I do not find the string I am searching for. I can add some error checking and generalize the code into a function:</p>

<pre data-type="programlisting">
// A function that returns a substring between two substrings
String giveMeTextBetween(String s, String startTag, String endTag) { <span class="callout-bubble pos-10 below">A function to return a substring found between two strings. If beginning or end “tag” is not found, the function returns an empty string.</span>
  // Find the index of the beginning tag
  int startIndex = s.indexOf(startTag);
  // If I don't find anything
  if (startIndex == -1) {
    return "";
  }
  // Move to the end of the beginning tag
  startIndex += startTag.length();

  // Find the index of the end tag
  int endIndex = s.indexOf(endTag, startIndex); <span class="callout-bubble pos-10"><code>indexOf()</code> can also take a second argument, an integer. That second argument means: Find the first occurrence of the search string after this specified index. I use it here to ensure that <code>endIndex</code> follows <code>startIndex</code>.</span>
  // If I don't find the end tag,
  if (endIndex == -1) {
    return "";
  }
  // Return the text in between
  return s.substring(startIndex, endIndex);
}</pre>

<p>With this technique, you are ready to connect to a website from within Processing and grab data to use in your sketches. For example, you could read the HTML source from nytimes.com and look for today’s headlines, search finance.yahoo.com for stock quotes, count how many times the word “flower” appears on your favorite blog, and so on. However, HTML is an ugly, scary place with inconsistently formatted pages that are difficult to reverse engineer and parse effectively. Not to mention the fact that companies change the source code of web pages rather often, so any example that I might make while I am writing this paragraph might break by the time you read this paragraph.</p>

<p>For grabbing data from the web, an XML (Extensible Markup Language) or JSON (JavaScript Object Notation) feed will prove to be more reliable and easier to parse. Unlike HTML (which is designed to make content viewable by a human’s eyes) XML and JSON are designed to make content viewable by a computer and facilitate the sharing of data across different systems. Most data (news, weather, and more) is available this way, and I will look at examples in <a data-type="xref" href="#beginner_xml">#beginner_xml</a> and <a data-type="xref" href="#JSON">#JSON</a>. Though much less desirable, manual HTML parsing is still useful for a couple reasons. First, it never hurts to practice text manipulation techniques that reinforce key programming concepts. But more importantly, sometimes there is data you really want that is not available in an API format, and the only way to get it is with such a technique. (I should also mention that regular expressions, an incredibly powerful techinque in text pattern matching, could also be employed here. As much as I love regex, it’s unfortunately beyond the scope of this book.)</p>

<p>An example of data only available as HTML is the <a href="http://imdb.com">Internet Movie Database</a>. IMDb contains information about movies sorted by year, genre, ratings, etc. For each movie, you can find the cast and crew list, a plot summary, running time, a movie poster image, the list goes on. However, IMDb has no API and does not provide its data as XML or JSON. Pulling the data into Processing therefore requires a bit of detective work. Let's look at the page for the <em>Shaun the Sheep Movie</em>.</p>

<figure class="no-rule" id="fig_18_09_shaunsheep"><img alt="Image" src="images/fig_18_09_shaunsheep.png" />
<figcaption> </figcaption>
</figure>

<p>Looking in the HTML source from the above URL, I find a giant mess of markup.</p>

<figure class="no-rule" id="fig_18_10_shaunsheep_sourc"><img alt="fig_18_10_shaunsheep_sourc" src="images/fig_18_10_shaunsheep_sourc.png" />
<figcaption> </figcaption>
</figure>

<p>It’s up to me to pore through the raw source and find the data I am looking for. Let's say I want to know the running time of the movie and grab the movie poster image. After some digging, I find that the movie is 139 minutes long as listed in the following HTML.</p>

<pre data-type="programlisting">
&lt;div class="txt-block">
  &lt;h4 class="inline">Runtime:&lt;/h4>
    &lt;time itemprop="duration" datetime="PT139M">139 min&lt;/time>
&lt;/div>
</pre>

<p>For any given movie, the running time itself will be variable, but the HTML structure of the page will stay the same. I can therefore deduce that running time will always appear in between:</p>

<pre data-type="programlisting">
&lt;time itemprop="duration" datetime="PT139M"></pre>

<p>and:</p>

<pre data-type="programlisting">
&lt;/time></pre>

<p>Knowing where the data starts and ends, I can use <code>giveMeTextBetween()</code> to pull out the running time.</p>

<pre data-type="programlisting">
String url = "http://www.imdb.com/title/tt0058331";
String[] lines = loadStrings(url);
// Get rid of the array in order to search the whole page
String html = join(lines, " ");



// Searching for running time
String start = "&lt;time itemprop=\"duration\" datetime=\"PT139M\">"; <span class="callout-bubble pos-3 width-10 below">A quote in Java marks the beginning or end of a string. So how do you include an actual quote in a <code>String</code> object? The answer is via an “escape” sequence. (You encountered this in <a data-type="xref" href="#display_text_that_is_centered_and_rotate">#display_text_that_is_centered_and_rotate</a>.) A quote can be included using a backward slash, followed by a quote. For example: <code>String q = "This String has a quote \"in it";</code></span>






String end = "&lt;/time>";
String runningtime = giveMeTextBetween(html, start, end);
println(runningtime);

</pre>

<p></p>

<div data-type="example" id="parsing_IMDb" style="page-break-inside:auto">
<h5>Parsing IMDb manually</h5>

<figure class="float-right" id="fig_18_11_parsing_imdb"><img alt="fig_18_11_parsing_imdb" src="images/fig_18_11_parsing_imdb.png" />
<figcaption> </figcaption>
</figure>

<pre data-type="programlisting">
String runningtime;
PImage poster;

void setup() {
  size(300, 350);
  loadData();
}

void draw() {
  // Display all the stuff I want to display
  background(255);
  image(poster, 10, 10, 164, 250);
  fill(0);
  text("Shaun the Sheep", 10, 300);
  text(runningtime, 10, 320);
}

void loadData() {
  String url = "http://www.imdb.com/title/tt2872750/";

  String[] lines = loadStrings(url);<span class="callout-bubble pos-7">Get the raw HTML source into an array of strings (each line is one element in the array).  The next step is to turn array into one long string with <code>join()</code>.</span>
  String html = join(lines, "");


  String start = "&lt;time itemprop=\"duration\" datetime=\"PT139M\">";
  String end = "&lt;/time>";
  runningtime = giveMeTextBetween(html, start, end);<span class="callout-bubble pos-12">Searching for running time.</span>

  start = "&lt;link rel='image_src' href=\"";
  end = "\">";
  String imgUrl = giveMeTextBetween(html, start, end);<span class="callout-bubble pos-12">Searching for the URL of the poster image.</span>
  poster = loadImage(imgUrl);<span class="callout-bubble below">Now, load that image!</span>
}


String giveMeTextBetween(String s, String before, String after) {

  String found = "";<span class="callout-bubble pos-6 no-point width-4">This function returns a substring between two substrings (before and after). If it can’t find anything it returns an empty string.</span>

  // Find the index of before
  int start = s.indexOf(before);     
  if (start == -1) {
    return "";                       
  }    

  // Move to the end of the beginning tag
  // and find the index of the "after" String      
  start += before.length();    
  int end = s.indexOf(after, start);
  if (end == -1) {
    return "";                       
  }

  // Return the text in between
  return s.substring(start, end);
}
</pre>
</div>

<aside class="exercise empty" data-type="sidebar" id="expand_example_18-5_to_also_search_for_t">
<h5><em>Expand <a data-type="xref" href="#parsing_IMDb">#parsing IMDb</a> to also search for the movie's rating on IMDb.</em></h5>
</aside>

<aside class="exercise empty" data-type="sidebar" id="expand_example_18-5_to_also_search_for_t_2">
<h5><em>Expand <a data-type="xref" href="#parsing_IMDb">#parsing IMDb</a> to data related to more than one movie. Can you retrieve the list of all movies released in a given year? Consider creating a <code>Movie</code> class that has a function for retrieving data related to itself.</em></h5>
</aside>

<aside class="exercise empty" data-type="sidebar" id="take_a_look_at_yahooapostrophes_quotatio">
<h5><em><a href="http://www.wikipedia.org/">Wikipedia</a> is another site with lots of data not available via an API. Create a sketch that grabs information from a Wikipedia page.</em></h5>
</aside>
</section>
-->

<h1>JSON</h1>

<p>The data exchange format that all of this week's examples focus on is called  JSON (pronounced like the name Jason), which stands for JavaScript Object Notation. Its design was based on the syntax for objects in the JavaScript programming language (and is most commonly used to pass data between web applications) but has become rather ubiquitous and language-agnostic.  Working with it in JavaScript is incredibly convenient.</p>

<p>All JSON data comes in the following two ways: an object or an array.  And the syntax for these is identical to the syntax you see in JavaScript itself.</p>

<p>Let's take a look at a JSON object first. A JSON object is identical to a JavaScript object (without functions). It’s a collection of variables with a name and a value (or "name/value pair").  Each name is encoded as a string enclosed in quotes, this is just about the only difference.  For example, following is JSON data describing a person:</p>

{% highlight javascript %}
{
  "name":"Olympia",
  "age":3,
  "height":96.5,
  "state":"giggling"
}
{% endhighlight %}

<p>This is how it might look if you typed it into your code directly (the quotes are no longer necessary.)</p>

{% highlight javascript %}
var person = {
  name: "Olympia",
  age: 3,
  height: 96.5,
  state: "giggling"
}
{% endhighlight %}

<p>An object can contain, as part of itself, another object.  Below, the value of “brother” is an object containing two name/value pairs.</p>

{% highlight javascript %}
{
  "name":"Olympia",
  "age":3,
  "height":96.5,
  "state":"giggling",
  "brother":{
    "name":"Elias",
    "age":6
  }
}
{% endhighlight %}


<p>To compare to data format like XML, the preceding JSON data would look like the following (for simplicity I'm avoiding the use of XML attributes).</p>

{% highlight xml %}
<xml version="1.0" encoding="UTF-8"?>
<person>
  <name>Olympia</name>
  <age>3</age>
  <height>96.5</height>
  <state>giggling</state>
  <brother>
    <name>Elias</name>
    <age>6</age>
  </brother>
</person>
{% endhighlight %}

<p>Multiple JSON objects can appear in the data as an array. A JSON array is simply a list of values (primitives or objects). The syntax is identical to JavaScript syntax. Here is a simple JSON array of integers:</p>

{% highlight javascript %}
[1, 7, 8, 9, 10, 13, 15]
{% endhighlight %}

You might find an array as part of an object. Below the value of “favorite colors” is an array of strings.

{% highlight javascript %}
{
  "name":"Olympia",
  "favorite colors":["purple","blue","pink"]
}
{% endhighlight %}

A great place to find a selection of JSON data sources to play with is <a href="https://github.com/dariusk/corpora">corpora</a>, a github repository maintained by <a href="http://tinysubversions.com/">Darius Kazemi</a>.  For example, here's <a href="https://github.com/dariusk/corpora/blob/master/data/animals/birds_antarctica.json">a JSON file containing information about birds in Antarctica</a>.

## Loading JSON into your code

<p>Now that I've covered the syntax of JSON, I can look at using the data in JavaScript and p5.js.  The first step is simply loading the data <code>loadJSON()</code>. <code>loadJSON()</code> can be called in <code>preload</code> or used with a callback.  I'm using callbacks in just about all my examples so let's follow that syntax here.</p>

{% highlight javascript %}
function setup() {
  loadJSON('birds_antarctica.json', gotData);
}

function gotData(data) {
  // The JSON is now in data!
  console.log(data);
}
{% endhighlight %}

The data from the JSON file is passed into the argument <code>data</code> in the <code>gotData</code> callback.  Then it becomes a bit of detective work.  How is the data structured — a single object? an array of objects?  An object full of arrays of objects?  Let's look at a snippet from the birds of Antarctica.

{% highlight javascript %}
{
  "description": "Birds of Antarctica, grouped by family",
  "source": "https://en.wikipedia.org/wiki/List_of_birds_of_Antarctica",
  "birds": [
    {
      "family": "Albatrosses",
      "members": [
        "Wandering albatross",
        "Sooty albatross",
        "Light-mantled albatross"
      ]
    },
    {
      "family": "Cormorants",
      "members": [
        "Antarctic shag",
        "Imperial shag",
        "Crozet shag"
      ]
    }
  ]
}
{% endhighlight %}

If the JSON file is loaded into the variable <code>data</code>, the way you access that data is no different than if you had said:

{% highlight javascript %}
var data = {
  "description": "Birds of Antarctica, grouped by family",
  "source": "https://en.wikipedia.org/wiki/List_of_birds_of_Antarctica"
  // etc
}
{% endhighlight %}

For example, if you wanted to display the description and link it to the source you would say:

{% highlight javascript %}
createA(data.source, data.description);
{% endhighlight %}

And since <code>birds</code> is an array of objects, you can use a <code>for</code> loop just the way you always do with arrays.  Each element of the array is an object itself with properties that can be accessed like <code>family</code> and <code>members</code> (which is also an array!).

{% highlight javascript %}
for (var i = 0; i < data.birds.length; i++) {
  var family  = data.birds[i].family;
  createElement('h2', family);
  var members = data.birds[i].members;
  for (var j = 0; j < members.length; j++) {
    createDiv(members(i));
  }
}
{% endhighlight %}

Here's what this looks like:

<div style = "padding:24px;background-color:#f8f8f8;margin-bottom:24px">
<p><a href="https://en.wikipedia.org/wiki/List_of_birds_of_Antarctica">Birds of Antarctica, grouped by family</a></p>
<h2>Albatrosses</h2>
<div>Wandering albatross</div>
<div>Sooty albatross</div>
<div>Light-mantled albatross</div>
<p></p>
<h2>Cormorants</h2>
<div>Antarctic shag</div>
<div>Imperial shag</div>
<div>Crozet shag</div>
</div>


## APIs

<p>What makes something an API versus just some data you found, and what are some pitfalls you might run into when using an API?</p>

<p>An API (Application Programming Interface) is an interface through which one application can access the services of another. These can come in many forms. <a href="http://openweathermap.org/">Openweathermap.org</a> is an API that offers its data in JSON, XML, and HTML formats. The key element that makes this service an API is exactly that offer; openweathermap.org's sole purpose in life is to offer you its data. And not just offer it, but allow you to query it for specific data in a specific format. Let's look at a short list of sample queries.</p>

<dl>
  <dt><a href="http://api.openweathermap.org/data/2.5/weather?lat=35&amp;lon=139">http://api.openweathermap.org/data/2.5/weather?lat=35&amp;lon=139</a></dt>

  <dd style="margin-bottom:8px">A request for current weather data for a specific latitude and longitude.</dd>

  <dt><a href="http://api.openweathermap.org/data/2.5/forecast/daily?q=London&amp;mode=xml&amp;units=metric&amp;cnt=7&amp;lang=zh_cn">http://api.openweathermap.org/data/2.5/forecast/daily?q=London&amp;mode=xml&amp;units=metric&amp;cnt=7&amp;lang=zh_cn</a></dt>

  <dd style="margin-bottom:8px">A request for a seven day London forecast in XML format with metric units and in Chinese.</dd>

  <dt><a href="http://api.openweathermap.org/data/2.5/history/station?id=5091&amp;type=day">http://api.openweathermap.org/data/2.5/history/station?id=5091&amp;type=day</a></dt>

  <dd>A request for a historical data for a given weather station.</dd>
</dl>

<p>One thing to note about openweathermap.org is that it does not require that you tell the API any information about yourself. You simply send a request to a URL and get the data back. Other APIs, however, require you to sign up and obtain an access token. <em>The New York Times</em> API is one such example. Before you can make a request, you'll need to visit <a href="http://developer.nytimes.com/"><em>The New York Times</em> Developer site</a> and request an API key. Once you have that key, you can store it in your code as a string.</p>

{% highlight javascript %}
// This is not a real key
var apiKey = "40e2es0b3ca44563f9c62aeded4431dc:12:51913116";
{% endhighlight %}

<p>You also need to know what the URL is for the API itself. This information is documented for you on the developer site, but here it is for simplicity:</p>

{% highlight javascript %}
var url = "http://api.nytimes.com/svc/search/v2/articlesearch.json";
{% endhighlight %}

<p>Finally, you have to tell the API what it is you are looking for. This is done with a “query string,” a sequence of name value pairs describing the parameters of the query joined with an ampersand. This functions similarly to how you pass arguments to a function. If you wanted to search for the term "JavaScript" from a <code>search()</code> function you might say:</p>

{% highlight javascript %}
search("JavaScript");
{% endhighlight %}

<p>Here, the API acts as the function call, and you send it the arguments via the query string. Here is a simple example asking for a list of the oldest articles that contain the term "JavaScript" (the oldest of which turns out to be May 12th, 1852).</p>

{% highlight javascript %}
// The name/value pairs that configure the API query are: (q,JavaScript) and (sort,oldest)
var query = "?q=JavaScript&sort=oldest";
{% endhighlight %}

<p>This isn't just guesswork. Figuring out how to put together a query string requires reading through the API's documentation. For <em>The New York Times</em>, it’s all outlined on <a href="http://developer.nytimes.com/docs/read/article_search_api_v2">the <em>Times'</em> developer website</a>. Once you have your query you can join all the pieces together and pass it to <code>loadJSON()</code>. Here is a tiny example that simply displays the most recent headline.</p>

{% highlight javascript %}
function setup() {

  var apiKey = "sample-key";
  var url = "http://api.nytimes.com/svc/search/v2/articlesearch.json";
  var query = "?q=JavaScript&sort=newest";

  // Here, I format the call to the API by joing the URL with the API key with the query string.
  loadJSON(url+query+"&api-key="+apiKey, gotData);

  function gotData(data) {
    // Grabbing a single headline from the results.
    var headline = data.response.docs[0].headline.main;
    createP(headline);
  }
}
{% endhighlight %}

<p>Some APIs require a deeper level of authentication beyond an API access key. Twitter, for example, uses an authentication protocol known as “OAuth” to provide access to its data. Writing an OAuth application requires more than just passing a string into a request.  There are some examples this week that use server-side programming in Node to perform the authentication.</p>

## Encoding URLs

Certain characters and invalid in URLs.  For example, let's say you were querying wordnik for the words "bath towel".  You would have to say <code>bath%20towel</code>.  You could do this yourself with a regex or use URI encoding with <code>encodeURI()</code>.  [Here is more documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) and an example below.

{% highlight javascript %}
var query = 'http://api.wordnik.com/v4/word.json/bath towel/api_key=apikeyblahblahblah';
// Encode the query before you ask for it
var encoded = encodeURI(query);
loadJSON(encoded, callback);
{% endhighlight %}

<code>encodeURI</code> does not encode the following characters: <code>, / ? : @ & = + $ #</code>. This is as it should be since these are used in URLs to mean certain things.  However, if you wanted to have a $ or / as part of some text you are passing into a key/value pair you *would* want to encode these characters.  For this <code>encodeURIcomponent()</code> can be used.
