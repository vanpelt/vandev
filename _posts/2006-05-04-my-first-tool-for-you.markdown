---
layout: post
title: Introducing AjaxSpy
---

While playing with the new RJS templates in rails, I found it difficult to know what was actually being returned from my requests.  Thus, AjaxSpy was born.  It's a simple JavaScript and CSS file.  All you need to do is include the js file in the header of your document, the css is automagically included (must be in the stylesheets directory).  The script relies on Prototype 1.5.0rc0, and for it to be sexy you need the Scriptaculous effects library.  You can include it conditionaly based on params in the query string, or do some fancy session stuff.  That's all up to you.  This is what I've been doing

{% highlight ruby %}
<%= javascript_include_tag "prototype", "effects" %>
<%= javascript_include_tag "debugger" if params["debug"] %>
{% endhighlight %}

The script is currently only working with Firefox and Safari, I'll work on the bastard child that is IE down the road.  Here's what it looks like, syntax highlighting and all:

<a href="http://vandev.com/assets/2007/2/1/AjaxSpy.png" title="AjaxSpy Preview"><img src="http://blog.vandev.com/files/AjaxSpy.png" alt="AjaxSpy Preview" width="640px" /></a>

I present to you, AjaxSpy:

* [debugger.js](http://vandev.com/assets/2007/2/1/debugger.js)
* [debug.css](http://vandev.com/assets/2007/2/1/debug.css)

Again, to install simply include the js in the layout, it automagically includes the css (as long as it's in a directory named "stylesheets" relative to the site route).  Let me know if you have any problems.
