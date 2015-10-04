---
title: Programming from A to Z Week 3 Notes
layout: default
---

<head>
<script language="javascript" type="text/javascript" src="/javascripts/p5/p5.js"></script>
<script language="javascript" type="text/javascript" src="/javascripts/p5/p5.dom.js"></script>
<script language="javascript" type="text/javascript" src="notes.js"></script>
</head>

# Week 4 Notes

## All examples
## Related references


## Exercise ideas

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
if (table.getRowCount() &gt; 10) {

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

  if (table.getRowCount() &gt; 10) {<span class="callout-bubble pos-7">If the table has more than 10 rows, delete the oldest row.</span>
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
&lt;div class="txt-block"&gt;
  &lt;h4 class="inline"&gt;Runtime:&lt;/h4&gt; 
    &lt;time itemprop="duration" datetime="PT139M"&gt;139 min&lt;/time&gt;
&lt;/div&gt;
</pre>

<p>For any given movie, the running time itself will be variable, but the HTML structure of the page will stay the same. I can therefore deduce that running time will always appear in between:</p>

<pre data-type="programlisting">
&lt;time itemprop="duration" datetime="PT139M"&gt;</pre>

<p>and:</p>

<pre data-type="programlisting">
&lt;/time&gt;</pre>

<p>Knowing where the data starts and ends, I can use <code>giveMeTextBetween()</code> to pull out the running time.</p>

<pre data-type="programlisting">
String url = "http://www.imdb.com/title/tt0058331";
String[] lines = loadStrings(url);
// Get rid of the array in order to search the whole page
String html = join(lines, " ");



// Searching for running time
String start = "&lt;time itemprop=\"duration\" datetime=\"PT139M\"&gt;"; <span class="callout-bubble pos-3 width-10 below">A quote in Java marks the beginning or end of a string. So how do you include an actual quote in a <code>String</code> object? The answer is via an “escape” sequence. (You encountered this in <a data-type="xref" href="#display_text_that_is_centered_and_rotate">#display_text_that_is_centered_and_rotate</a>.) A quote can be included using a backward slash, followed by a quote. For example: <code>String q = "This String has a quote \"in it";</code></span>






String end = "&lt;/time&gt;";
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


  String start = "&lt;time itemprop=\"duration\" datetime=\"PT139M\"&gt;";
  String end = "&lt;/time&gt;";
  runningtime = giveMeTextBetween(html, start, end);<span class="callout-bubble pos-12">Searching for running time.</span>

  start = "&lt;link rel='image_src' href=\"";
  end = "\"&gt;";
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

<pre data-type="programlisting">

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
&lt;xml version="1.0" encoding="UTF-8"?&gt;
&lt;person&gt;
  &lt;name&gt;Olympia&lt;/name&gt;
  &lt;age&gt;3&lt;/age&gt;
  &lt;height&gt;96.5&lt;/height&gt;
  &lt;state&gt;giggling&lt;/state&gt;
  &lt;brother&gt;
    &lt;name&gt;Elias&lt;/name&gt;
    &lt;age&gt;6&lt;/age&gt;
  &lt;/brother&gt;
&lt;/person&gt;
{% endhighlight %}

<p>Multiple JSON objects can appear in the data as an array. A JSON array is simply a list of values (primitives or objects). The syntax is identical to JavaScript syntax. Here is a simple JSON array of integers:</p>

{% highlight javascript %}
[1, 7, 8, 9, 10, 13, 15]
{% endhighlight %}

You might find an array as part of an object. Below the value of “favorite colors” is an array of strings.

{% highlight javascript %}
{
  "name":"Olympia",
  "favorite colors":[
    "purple",
    "blue",
    "pink"
  ]
}
{% endhighlight %}

<p>You also might find an array of objects themselves. For example, here is an array of "Bubble" objects in JSON. Notice how this JSON data is organized as a single JSON object "bubbles," which contains a JSON array of JSON objects, the bubbles.</p>

{% highlight javascript %}
{
  "bubbles":[
    {
      "position":{
        "x":160,
        "y":103
      },
      "diameter":43.19838,
      "label":"Happy"
    },
    {
      "position":{
        "x":372,
        "y":137
      },
      "diameter":52.42526,
      "label":"Sad"
    },
    {
      "position":{
        "x":273,
        "y":235
      },
      "diameter":61.14072,
      "label":"Joyous"
    }
  ]
}
{% endhighlight %}

## Loading JSON into your code

<p>Now that I've covered the syntax of JSON, I can look at using the data in JavaScript and p5.js.  The first step is simply loading the data <code>loadJSON()</code>. <code>loadJSON()</code> can be called in <code>preload</code> or used with a callback.  I'm using callbacks in just about all my examples so let's follow that syntax here.</p>

{% highlight javascript %}
function setup() {
  loadJSON('file.json', gotData);
}

function gotData(data) {
  // The JSON is now in data!
  console.log(data);
}
{% endhighlight %}

The data from the JSON file is passed into the argument <code>data</code> in the <code>gotData</code> callback.

<p>Sample 1:</p>

<pre class="pre" data-type="programlisting">
[
  {
    "name":"Elias"
  },
  {
    "name":"Olympia"
  }
]
</pre>

<p>Sample 2:</p>

<pre class="pre" data-type="programlisting">
{
  "names":[
    {
      "name":"Elias"
    },
    {
      "name":"Olympia"
    }
  ]
}
</pre>

<p>Look how similar the above two samples look. They both contain exactly the same data, two names "Elias" and "Olympia." There is one, very key difference, however, to how the data is formatted: the very first character. Is it a "[" or a "{"? The answer will determine whether you’re loading an array ("[") or an object("{").</p>

<pre class="pre" data-type="programlisting">
JSONObject json = loadJSONObject("file.json"); <span class="callout-bubble pos-9">JSON objects start with a curly bracket: {</span>
</pre>

<pre class="pre" data-type="programlisting">
JSONArray json = JSONArray("file.json");  <span class="callout-bubble pos-9">JSON arrays start with a square bracket: [</span>
</pre>

<p>Typically, even if the data is ultimately organized as an array of objects (such as the array of "bubble" objects), the root element of the JSON data will be an object that contains that array. Let's look at the bubble data one more time.</p>

<pre class="pre" data-type="programlisting">
{
  "bubbles":[
    {
      "position":{
        "x":160,
        "y":103
      },
      "diameter":43.19838,
      "label":"Happy"
    },
    {
      "position":{
        "x":372,
        "y":137
      },
      "diameter":52.42526,
      "label":"Sad"
    }
  ]
}
</pre>

<p>With the above, I first load an object and then pull the array out of that object.</p>

<pre class="pre" data-type="programlisting">
JSONObject json = loadJSONObject("data.json"); <span class="callout-bubble pos-10">Load the entire JSON file as an object.</span>
JSONArray bubbleData = json.getJSONArray("bubbles");<span class="callout-bubble pos-8 below">Pull the array of bubbles out of that object.</span>


</pre>

<p>Just as with XML, the data from an element is accessed via its name, in this case "bubbles." With a <code>JSONArray</code>, however, each element of the array is retrieved via its numeric index.</p>

<pre class="pre" data-type="programlisting">
for (int i = 0; i &lt; bubbleData.size(); i++) {<span class="callout-bubble pos-10">Iterating over a <code>JSONArray</code>.</span>
  JSONObject bubble = bubbleData.getJSONObject(i); 
}</pre>

<p>And when you're looking for a specific piece of data from a <code>JSONObject</code>, such as an integer or string, the functions are identical to those of XML attributes.</p>

<pre class="pre" data-type="programlisting">
  JSONObject position = bubble.getJSONObject("position");<span class="callout-bubble pos-12">Get the position object from the bubble object.</span>


  int x = position.getInt("x");<span class="callout-bubble pos-8">Get x and y as integers from the position object.</span>
  int y = position.getInt("y");

  float diameter = bubble.getFloat("diameter");
  String label = bubble.getString("label");<span class="callout-bubble pos-9">Diameter and label are available directly from the <code>Bubble</code> object.</span>
  
</pre>

<p>Putting this all together, I can now make a JSON version of the bubbles example (leaving out the <code>draw()</code> function and <code>Bubble</code> class which haven't changed.)</p>

<div data-type="example" id="loadJSON">
<h5>Using Processing’s JSON classes</h5>

<pre data-type="programlisting">
// An Array of Bubble objects
Bubble[] bubbles;

void setup() {
  size(480, 360);
  loadData();
}

void loadData() {
  JSONObject json = loadJSONObject("data.json");<span class="callout-bubble pos-12">Load the JSON file and grab the array.</span>
  JSONArray bubbleData = json.getJSONArray("bubbles");


  bubbles = new Bubble[bubbleData.size()]; <span class="callout-bubble pos-9">The size of the array of <code>Bubble</code> objects is determined by the length of the JSON array</span>


  for (int i = 0; i &lt; bubbleData.size(); i++) {

    JSONObject bubble = bubbleData.getJSONObject(i); <span class="callout-bubble pos-12">Iterate through the array, grabbing each JSON object one at a time.</span>

    // Get a position object
    JSONObject position = bubble.getJSONObject("position");
    // Get (x,y) from JSON object "position"
    int x = position.getInt("x");
    int y = position.getInt("y");
    
    // Get diamter and label
    float diameter = bubble.getFloat("diameter");
    String label = bubble.getString("label");

    bubbles[i] = new Bubble(x, y, diameter, label);<span class="callout-bubble pos-12">Put the <code>Bubble</code> objects into an array.</span>
  }
}
</pre>
</div>

<aside class="exercise" data-type="sidebar" id="open_weather_JSON">
<h5>Retrieve the description and current temperature using the following JSON from <a href="http://openweathermap.org/current">openweathermap.org</a>.</h5>.

<pre data-type="programlisting">
{
  "weather":[
    {
      "id":801,
      "main":"Clouds",
      "description":"few clouds",
      "icon":"02d"
    }
  ],
  "main":{
    "temp":73.45,
    "humidity":83,
    "pressure":999,
    "temp_min":70,
    "temp_max":75.99
  }
}
</pre>

<pre data-type="programlisting">
JSONObject json = loadJSONObject(
   "http://api.openweathermap.org/data/2.5/weather?q=New%20York");

JSONObject main = json.getJSONObject(____________);

int temp = main.____________("temp");

// Grab the description (this is just one way to do it)

____________ weather = json.getJSON___________("weather");

String des = weather.getJSONObject(____)._________(_________);
</pre>
</aside>
</section>

<section data-type="sect1" id="Threads">
<h1>Threads</h1>

<p>As you have seen, the various loading functions — <code>loadStrings()</code>, <code>loadTable()</code>, <code>loadXML()</code>, and <code>loadJSONObject()</code> — can be used for retrieving data from URLs. Nonetheless, unless your sketch only needs to load the data once during <code>setup()</code>, you may have a problem. For example, consider a sketch that grabs the price of AAPL stock from an XML feed every five minutes. Each time <code>loadXML()</code> is called, the sketch will pause while waiting to receive the data. Any animation will stutter. This is because these loading functions are “blocking.” In other words, the sketch will sit and wait at that line of code until <code>loadXML()</code> completes its task. With a local data file, this is extremely fast. Nonetheless, a request for a URL (known as an “HTTP request”) in Processing is <em>synchronous</em>, meaning your sketch waits for a response from the server before continuing. Who knows how will that take? No one; you are at the mercy of the server!</p>

<p>The answer to this problem lies in the concept of <em>threads</em>. By now you are quite familiar with the idea of writing a program that follows a specific sequence of steps — <code>setup()</code> first then <code>draw()</code> over and over and over again! A thread is also a series of steps with a beginning, a middle, and an end. A Processing sketch is a single thread, often referred to as the <em>animation</em> thread. Other threads’ sequences, however, can run independently of the main animation loop. In fact, you can launch any number of threads at one time, and they will all run concurrently.</p>

<p>Processing does this quite often, such as with library functions like <code>captureEvent()</code> and <code>movieEvent()</code>. These functions are triggered by a different thread running behind the scenes, and they alert Processing whenever they have something to report. This is useful when you need to perform a task that takes too long and would slow down the main animation's frame rate, such as grabbing data from the network. Here, you want to handle the request <em>asynchronously</em> in a different thread. If that thread gets stuck or has an error, the entire program won't grind to a halt, since the error only stops that individual thread and not the main animation loop.</p>

<p>Writing your own thread can be a complex endeavor that involves extending the Java <a href="https://docs.oracle.com/javase/tutorial/essential/concurrency/threads.html"><code>Thread</code></a> class. However, the <code>thread()</code> method is a quick and dirty way to implement a simple thread in Processing. By passing in a string that matches the name of a function declared elsewhere in the sketch, Processing will execute that function in a separate thread. Let's take a look at a skeleton of how this works.</p>

<pre data-type="programlisting">
void setup() {
  thread("someFunction");
}
 
void draw() {
 
}
 
void someFunction() {
  // This function will run as a thread when called via
  // thread("someFunction") as it was in setup!
}
</pre>

<p>The <code>thread()</code> function receives a string as an argument. The string should match the name of the function you want to run as a thread. In the above example it’s <code>"someFunction"</code>.</p>

<p class="pagebreak-before">Let's look at a more practical example. For an example of data that changes often, I'll use <a href="http://time.jsontest.com/">time.jsontest.com</a> which gives you the current time (in milliseconds). While I could retrieve this from the system clock, this works well for demonstrating continuously requesting data that changes over time. Not knowing about threads, my first instinct might be to say:</p>

<pre data-type="programlisting">
void draw() {
  JSONObject json = loadJSONObject("http://time.jsontest.com/");<span class="callout-bubble pos-10 below">The code will stop here and wait to receive the data before moving on.</span>
  String time = json.getString("time");
  text(time, 40, 100);
}
</pre>

<p>This would give me the current time every cycle through <code>draw()</code>. If I examine the frame rate, however, I'll notice that the sketch is running incredibly slowly (and all it needs to do is draw a single string!). This is where calling the parsing code as a separate thread will help a lot.</p>

<pre data-type="programlisting">
String time = "";

void draw() {
  thread("requestData");<span class="callout-bubble width-5">Now the code will move on to the next line while <code>requestData()</code> executes in a separate thread.</span>
  text(time, 40, 100);
}

void requestData() {
  JSONObject json = loadJSONObject("http://time.jsontest.com/");
  time = json.getString("time");
}
</pre>

<p>The logic is identical, only I am not requesting the data directly in <code>draw()</code>, but executing that request as a separate thread.  Notice that I am not doing any drawing in <code>requestData()</code>.  This is key as executing drawing functions in code that runs on a separate thread can cause conflicts with the main animation thread (i.e., <code>draw()</code>) resulting in strange behavior and errors.</p>

<p>In the above example, I likely don't want to request the data sixty times per second (the default frame rate). Instead I might make use of the <code>Timer</code> class from </p>

<div data-type="example" id="threads">
<h5>Threads</h5>

<figure class="float-right" id="fig_18_19_thread"><img alt="fig_18_19_thread" src="images/fig_18_19_thread.png" />
<figcaption> </figcaption>
</figure>

<pre data-type="programlisting">
Timer timer = new Timer(1000);
String time = "";

void setup() {
  size(200, 200);
  thread("retrieveData");<span class="callout-bubble width-3">Start by requesting the data asynchronously in a thread.</span>
  timer.start();
}

void draw() {
  background(255);
  if (timer.isFinished()) {<span class="callout-bubble width-3">Every one second, make a new request.</span>
    retrieveData();

    timer.start();<span class="callout-bubble width-3">And restart the timer.</span>
  }

  fill(0);
  text(time, 40, 100);

  translate(20, 100);
  stroke(0);
  rotate(frameCount*0.04);<span class="callout-bubble pos-5 width-3">Here I draw a little animation to demonstrate that the <code>draw()</code> loop never pauses.</span>
  for (int i = 0; i &lt; 10; i++) {
    rotate(radians(36));
    line(5, 0, 10, 0);
  }
}

// get the data
void retrieveData() {
  JSONObject json = loadJSONObject("http://time.jsontest.com/");
  time = json.getString("time");
}
</pre>
</div>

<aside class="exercise empty" data-type="sidebar" id="thread_exercise">
<h5><em>Update the weather XML or weather JSON example to request the data in a thread.</em></h5>
</aside>
</section>

<section data-type="sect1" id="APIS">
<h1>APIs</h1>

<p>It’s a bit silly for me to call this section “APIs” given that most of this chapter is about data from APIs. Still, it’s worth taking a moment to pause and reflect. What makes something an API versus just some data you found, and what are some pitfalls you might run into when using an API?</p>

<p>As I've stated, an API (Application Programming Interface) is an interface through which one application can access the services of another. These can come in many forms. Openweathermap.org, as you saw in <a data-type="xref" href="#open_weather_JSON">#open_weather_JSON</a>, is an API that offers its data in JSON, XML, and HTML formats. The key element that makes this service an API is exactly that offer; openweathermap.org's sole purpose in life is to offer you its data. And not just offer it, but allow you to query it for specific data in a specific format. Let's look at a short list of sample queries.</p>

<dl>
  <dt><em>http://api.openweathermap.org/data/2.5/weather?lat=35&amp;lon=139</em></dt>
  <dd>A request for current weather data for a specific latitude and longitude.</dd>
  <dt><em>http://api.openweathermap.org/data/2.5/forecast/daily?q=London&amp;mode=xml&amp;units=metric&amp;cnt=7&amp;lang=zh_cn</em></dt>
  <dd>A request for a seven day London forecast in XML format with metric units and in Chinese.</dd>
  <dt><em>http://api.openweathermap.org/data/2.5/history/station?id=5091&amp;type=day</em></dt>
  <dd>A request for a historical data for a given weather station.</dd>
</dl>

<p>One thing to note about openweathermap.org is that it does not require that you tell the API any information about yourself. You simply send a request to a URL and get the data back. Other APIs, however, require you to sign up and obtain an access token. <em>The New York Times</em> API is one such example. Before you can make a request from Processing, you'll need to visit <a href="http://developer.nytimes.com/"><em>The New York Times</em> Developer site</a> and request an API key. Once you have that key, you can store it in your code as a string.</p>

<pre data-type="programlisting">
// This is not a real key
String apiKey = "40e2es0b3ca44563f9c62aeded4431dc:12:51913116";
</pre>

<p>You also need to know what the URL is for the API itself. This information is documented for you on the developer site, but here it is for simplicity:</p>

<pre data-type="programlisting">
String url = "http://api.nytimes.com/svc/search/v2/articlesearch.json";
</pre>

<p>Finally, you have to tell the API what it is you are looking for. This is done with a “query string,” a sequence of name value pairs describing the parameters of the query joined with an ampersand. This functions similarly to how you pass arguments to a function in Processing. If you wanted to search for the term "processing" from a <code>search()</code> function you might say:</p>

<pre data-type="programlisting">
search("processing");
</pre>

<p>Here, the API acts as the function call, and you send it the arguments via the query string. Here is a simple example asking for a list of the oldest articles that contain the term "processing" (the oldest of which turns out to be May 12th, 1852).</p>

<pre data-type="programlisting">
String query = "?q=processing&amp;sort=oldest";<span class="callout-bubble pos-9">The name/value pairs that configure the API query are: (q,processing) and (sort,oldest)</span>

</pre>

<p>This isn't just guesswork. Figuring out how to put together a query string requires reading through the API's documentation. For <em>The New York Times</em>, it’s all outlined on <a href="http://developer.nytimes.com/docs/read/article_search_api_v2">the <em>Times'</em> developer website</a>. Once you have your query you can join all the pieces together and pass it to <code>loadJSONObject()</code>. Here is a tiny example that simply displays the most recent headline.</p>

<div data-type="example" id="nytimes">
<h5>NYTimes API query</h5>

<pre data-type="programlisting">
void setup() {
  size(200, 200);
  
  String apiKey = "40e2ea0b3ca44563f9c62aeded0431dc:18:51513116";
  String url = "http://api.nytimes.com/svc/search/v2/articlesearch.json";
  String query = "?q=processing&amp;sort=newest";

  // Make the API query
  JSONObject json = loadJSONObject(url+query+"&amp;api-key="+apiKey);<span class="callout-bubble pos-8 below">Here, I format the call to the API by joing the URL with the API key with the query string.</span>




  String headline = json.getJSONObject("response").getJSONArray("docs").
    getJSONObject(0).getJSONObject("headline").getString("main");<span class="callout-bubble pos-8 below">Grabbing a single headline from the results.</span>
  background(255);
  fill(0);
  text(headline, 10, 10, 180, 190);
}
</pre>
</div>

<p>Some APIs require a deeper level of authentication beyond an API access key. Twitter, for example, uses an authentication protocol known as “OAuth” to provide access to its data. Writing an OAuth application requires more than just passing a String into a request and is beyond the scope of this book. However, in these cases, if you’re lucky, you can find a Processing library that handles all of the authentication for you. There are several APIs that can be used directly with Processing via a library, and you can find a list of them in the “Data / Protocols” section of the like:</p>

<pre data-type="programlisting">
TembooSession session = new TembooSession("ACCOUNT_NAME", "APP_NAME", "APP_KEY");<span class="callout-bubble width-7 pos-5 below">Temboo acts as a go-between you and Twitter, so first you just authenticate with Temboo.</span>



Tweets tweets = new Tweets(session);
tweets.setCredential("your-twitter-name");<span class="callout-bubble pos-9">Then you can configure a query to send to Twitter itself and grab the results.</span>
tweetsChoreo.setQuery("arugula");
TweetsResultSet tweetsResults = tweets.run();

JSONObject searchResults = parseJSONObject(tweetsResults.getResponse());

JSONArray statuses = searchResults.getJSONArray("statuses");

JSONObject tweet = statuses.getJSONObject(0);<span class="callout-bubble pos-9 below">Finally, you can search through the results and grab a tweet.</span>
String tweetText = tweet.getString("text"); 
</pre>
</section>
</section>