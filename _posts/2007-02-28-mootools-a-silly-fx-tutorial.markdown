---
layout: post
title: Mootools, a silly Fx tutorial
---

I've been loving [mootools](http://mootools.net) lately so I figured I would demonstrate some of it's awesomeness by explaining a few of the effects generated on this very page.

###Awesome bouncy nav tabs (_upper right, funny creative projects_)

{% highlight javascript %}
$$('#header ul li a').each(function(el) {
  var bounce = new Fx.Style(el, 'top', {duration:700, transition: Fx.Transitions.elasticOut});
  var colors = new Fx.Styles(el, {wait:false});
  
  el.addEvent('mouseover', function(){
	el.setStyle('background-color', '#d5e88f');
	bounce.start(15,0);
  	colors.start({
		color: '35342e'
  	});
  });
  el.addEvent('mouseout', function(){
  	colors.start({
		'background-color': '35342e',
		color: 'd5e88f'
  	});
  });
});
{% endhighlight %}

Allright, so moo gives us a DOM selector much like prototypes.  I use it to grab all the `a` tags in my nav list, and then I iterate over them.  Moo has three generic Fx classes, [Style](http://docs.mootools.net/files/Effects/Fx-Style-js.html), [Styles](http://docs.mootools.net/files/Effects/Fx-Styles-js.html), and [Elements](http://docs.mootools.net/files/Effects/Fx-Elements-js.html).  I don't use Fx.Elements here, but you can read about it via moos excellent [documentation](http://docs.mootools.net/files/Core/Moo-js.html).  If you are familiar with the scriptaculous Morph effect, these will come natuarlly.  They let you tween a list of css attributes, leaving the door of possibilities for amazing custom effects wide open.

First I create two effects.  One to deal with the motion, _bounce_, and the other to deal with font and background color, _colors_.  Moo supplies an [optional](http://mootools.net/download/svn) set of robust transitions based on Robert Penner's [easing](http://www.robertpenner.com/easing/easing_demo.html) equations (_the easing demo is extremely helpful_).  I specify the elasticOut transition upon instantiation of the _bounce_ effect to make it, well bouncy.  Setting `wait` to false in the Fx.Styles call tells the effect to go ahead and run even if there is another effect just like it already running. This let's the tab fade back to normal if I mouseout before it's finished.

After the effects are created, all that's left is attaching them to an event.  Voila, crazy cool bouncy tabs.

###A silly unobtrusive smooth scrolling effect (_click "it's not what you think" next to the VD logo_)

{% highlight javascript %}
new SmoothScroll({duration:1000});
{% endhighlight %}

Another [optional](http://mootools.net/download/svn) effect (thank you kickass building tool), is [SmoothScroll](http://docs.mootools.net/files/Plugins/SmoothScroll-js.html).  Upon instantiation she finds all of the targets (aka anything with an id) and adds an event to all the `a` tags referencing that target (aka href="#name_of_target"), which scrolls the window to that element... just click it.

### Opaque image rollover (_what the flick_)

{% highlight javascript %}
$$('div#flickr img').each(function(e){
  var fade = new Fx.Style(e, 'opacity', {wait:false});
  fade.set(.5);
  e.addEvent('mouseover', function(){
	fade.start(1);
  });
  e.addEvent('mouseout', function(){
  	fade.start(.5);
  });
});
{% endhighlight %}

This uses the same techniques as the first effect.  The set method allows you to set the initial position of the effect.  In this case it makes all of the images 50% opaque when the page loads.

So there you have it.  Mootools is silly powerful and fun.  It puts the control in your hands, and does so in a lightweight and extremely sexy manner. 
