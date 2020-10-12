# Heroes of Pymoli

![Pymoli](./HeroesOfPymoli/images/Fantasy.png)

### Overview

The goal of this assignment was to apply the capabilities of Pandas to simplify the task of breaking down and analyzing a dataset. This particular dataset contains 780 rows, each representing an in-game purchase made by a player of **Heroes of Pymoli**, an otherwise free-to-play online game. The 7 columns include the details about the item purchased, as well as the user who purchased it:

User:

- Screen name
- Age
- Gender

Item:

- ID
- Name
- Price

The assignment can be broken down roughly into 3 main sections, by type of analysis required:

Headline numbers:

- Total number of unique players and items
- Total number of purchases and revenue
- Average item price

Gender and age range:

- Number of players per demographic and % of total
- Average of all purchases per demographic
- Average total amount spent per user, per demographic

Top 5:

- Spendiest players
- Most purchased items
- Most profitable items

Thankfully, with Pandas you can do this with very few lines of code using *Series*, *DataFrame* and *groupby*, which allow you to easily create, manipulate, and graphically represent fairly sophisticated matrices. You can start with a fairly messy CSV file, and in a few simple steps end up with a clean, well-structured table.

## The Jupyter Notebook UI

I mainly worked in the Jupyter Notebook browser UI, which lets you write and execute discrete segments of code and see the output in real time in the window. This includes displaying DataFrames as HTML tables:

![Pandas dataframe](./HeroesOfPymoli/images/pandas-df.png)

And there's obviously some CSS going on as well. (You can't see the cursor in that picture, but that row is blue because there's a *:hover* effect.) All the styling comes from a single class called *dataframe*:

![Pandas HTML output](./HeroesOfPymoli/images/pandas-html.png)

I assumed some Jupyter widget was compiling the HTML, but turns out it's actually the *to_html()* function on the DataFrame itself, which outputs an HTML string that Jupyter injects into the DOM as-is. So for fun, I decided to create a web page and do exactly the same thing. First thing I did was concatenate all the output of *to_html()* for every table. Then, to trick Python into writing JavaScript, I wrapped that in backticks and prepended *"let = content "*. Now we have a ready-to-inject JavaScript template literal.

But as far as I can tell, Python won't write to a JS file, but the `<script>` tag isn't picky, it's perfectly happy to run JavaScript code from a TXT file. I created the *index.html* file, added some boilerplate, a jumbotron, and a target `<div>`, then 2 script tags: the first to run *output.txt*, and another to run *index.js*, which injects that *content* variable into the target `<div>` and gives it a haircut. Throw in Bootstrap and a *style.css*, spin up LiveServer, and you get this:

![Webpage demo](./HeroesOfPymoli/images/pymoli-demo.gif)

Obviously, that's pretty unnecessary and a bit outside of the scope of the assignment, but it gave me an excuse to make a GIF.

## Pandas

Back to the data analysis...

### Headline numbers

Getting the headline numbers was mostly a matter of grabbing data using a few Pandas functions:

- *nunique()* for player and item counts
- *count()* for total number of purchases
- *mean()* for average price
- *sum()* for total revenue 

I stored those expressions in a dictionary, then passed that to the *pandas.DataFrame* constructor - or, more specifically, the implementation of the constructor that takes in a dictionary. (There are many ways to create a DataFrame, but for single-row datasets like these, it seemed like the tidiest.)

### Groupby

The rest of the analysis relies heavily on the *DataFrame.groupby()* method, which takes in one of the column names and groups all the rows by unique values in that column. It's a complex data structure, and most of the struggles I had with this assignment were wrapping my head around what a *groupby* object actually is. One reason is that unlike *Series* and *DataFrame*, Pandas doesn't attempt to give you any sort of graphical representation, it just spits out the object reference.

I'll admit I still don't quite know how it works under the hood. It's a bit like a Rubik's cube, in that you don't need to be totally fluent in the nature of its 3-dimensional chess, you just need to figure out the basic tricks for manipulating it. It took hours and hours of playing around (and reading StackOverflow), but at some point it clicked and I was able to refactor some pretty procedural Python into fairly complex and elegant Pandas.

### Binning

One trick Pandas gives you is *binning*, which lets you classify your dataset based on numerical criteria. Normally you need at least 2 lines of code for each condition - ie, an *if*/*elif*/*else* statement and a code block - but with Pandas, you can just call the *cut()* method on a column and pass it a list of numerical range criteria, plus a list of labels for each slice, then save that as a new column in the DataFrame. This allowed me to demarcate every row into 8 age range bins with 3 lines of code, which would otherwise take upwards of 20.

### Map and format

One of the keys to making data human-readable is making sure it's in the correct format. For instance, much of the analysis in this assignment outputs prices, as well as a few percents. An easy way to do this is to call the *map()* method on a column, which performs the supplied callback function. You can write a custom lambda, but in this case we can pass the Python *format* method on a format string:

`generic_df["Some Column"] = generic_df["Some Column"].map("${:.2f}".format`

I got tired of doing that over and over, so I told Pandas to format every float as currency with 2 decimal points near the beginning:

`pd.options.display.float_format = '${:,.2f}'.format`

Now I only had to call *map()* twice to override that formatting for the percents in the gender and age demographics tables, and all the other floats became currency by default.

## Summary

This was a pretty challenging assignment. Pandas is very elegant and useful, but also very complex. Most of its methods have at least a few overrides - eg, the DataFrame constructor mentioned above - and a laundry list of *kwargs*, so it's like that parable about blind men describing an elephant. And while it cuts out huge chunks of procedural boilerplate, it does so by being bewilderingly declarative.

Translation: Pandas is fun.