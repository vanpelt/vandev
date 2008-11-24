---
layout: post
title: Mootools and my sidebar, doing it
---

This afternoon I was perusing the web and ended up mining [Yelp](http://yelp.com) for something to do in this new and foreign [city](http://www.ci.sf.ca.us).  I noticed a slick [effect](http://www.yelp.com/search?find_desc=something+to+do&find_loc=San+Francisco%2C+Ca) that was used to keep the map in the view port as you scrolled.  I had done this before with the `position:fixed` css directive, but it's rather limited especially in a centered layout.  You also can't choose your easing equation or delay the effect... Thanks [Moo](http://mootools.net), let's do it.

I added a set of links which link to targets on this [page](http://vandev.com) in my sidebar entitled "On this page...".  I want the links to scroll the page to the targeted element, and I also want the links to follow me there so I can click on another one if I need to.  8 lines of javascript with the aid of Mootools gets her done.

{% highlight javascript %}
  var slideEffect = new Fx.Style('sidenav', 'margin-top', {wait:false, duration:800, transition:Fx.Transitions.circOut});
  window.addEvent('load', function() {
    var top = $('sidenav').getPosition().y - 10;
    window.addEvent('scroll', function(){
      slideEffect.start.delay(600, slideEffect, Math.max(0, document.documentElement.scrollTop - top));
    });
    new SmoothScroll({duration:700, transition:Fx.Transitions.circOut});
  });
{% endhighlight %}

Let's analyze the crap out of this code.  I first create a new Fx.Style specifying `wait:false` (_so If I start scrolling down the page and than suddenly switch direction, the effect will simply start over in that new direction_).  I'm modifying the `margin-top` property of the `sidenav` element.  I also specify a custom transition `circOut` which starts fast and than slows to a stop. Using `window.addEvent('load'`, I wait for the document to load because the position of my div is relative to the image of my face.  You could use the `domready` event if the position of the div you will be scrolling is not relative to an image...  Next I get the position of the top of my div and subtract 10 from it to give it some padding.

Now for the magic.  I listen for the `scroll` event and when it happens I fire the recently created `slideEffect`.  However, because the delay is cool and if I don't delay the effect will look really jumpy, I delay the start of the effect.  Moo provides a delay method which can be called on any function.  You have to call it on the function, not on the thing the function returns: e.g. `myFunction.delay(100)` or `function(){return 'rad'}.delay(300)` instead of `myFunction('awesome').delay(30)`.  The second attribute to delay is an object that will become `this` in the function delay is being called on.  In this case we want `this` to be the effect itself.  The third attribute is the attribute(s) that will be passed into the function.  For us, this is an integer representing the new margin.  We calculate this as the maximum of either 0 or the difference of the current viewport offset and the original offset of the image.  

The last thing to do is make a call to `SmoothScroll`, making all links that point to a target scroll to the element with that targets id (this was detailed in my <a href="#article_2140">last</a> post).  So there it is, a detailed description of how my sidebar and mootools did it.
