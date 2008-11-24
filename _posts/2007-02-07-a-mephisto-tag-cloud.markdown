---
layout: post
title: A mephisto tag cloud
---

As I continue to customize my new [mephisto](http://mephistoblog.com) installation, I wanted a tag cloud for the Folksonomy section at the bottom of the page.  At first I thought I would use a mephisto plugin... after further consideration I decided that was a little overkill.  JavaScript kicks ass, especially with the recent [release](http://blog.mad4milk.net/entry/mootools-version-1-official-world-release) of [mootools](http://mootools.net) version 1.0, so I decided to let it do the work.  I created a small class called Overcast which makes tag clouds easy peasy japaneasy.  So, just how easy is it to get a tag cloud in mephisto?  Here's a snipet from my layout.liquid

{% highlight html %}
{{ 'mootools' | javascript }}
{{ 'overcast' | javascript }}
</head>

<div id="overcast">
  {% for tag in site.tags %}
    <a href="/tags/{{ tag }}" class="_{{tag | tagged_articles | size}}" rel="tag">{{ tag }}</a>
  {% endfor %}
</div>
<script type="text/javascript">
/* <![CDATA[ */
  over = new Overcast({min: 1, fuzz: 2, overlay: "/images/gloss.png"});
/* ]]> */
</script>
{% endhighlight %}

A couple sexy things to note are the cool transparent overlays ontop of each tag, and the ability to fuzz tags when your weights aren't very diverse.  Also, if you've got [Firebug](http://getfirebug.com) you can type _over.update("amazing",4)_ in the console to add a new tag to the cloud with that weight, or _over.update("javascript", 3)_ to change the weight of an existing tag.  All of the functionality is documented in the source.

Grab the [source](http://vandev.com/javascripts/overcast.js) from the include in this page.  I'll put it under version control soon.
