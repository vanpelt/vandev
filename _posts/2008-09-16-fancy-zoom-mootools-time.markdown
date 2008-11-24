---
layout: post
title: Fancy Zoom Mootools time
---

<script src="http://github.com/vanpelt/fancy-zoom/tree/master%2Fmootools%2Fjs%2Ffancyzoom.min.js?raw=true" type="text/javascript"></script>

<script type="text/javascript">
/* <![CDATA[ */
document.addEvent('domready', function(){
   new FancyZoom($('hot_thumb'), {scaleImg:true, directory:'/images'})
})
/* ]]> */
</script>

So I stumbled upon this [project](http://github.com/jnunemaker/fancy-zoom/tree/master) on github.com... If you browse the archives of this blog you might see I have an affinity for Mootools over Prototype or JQuery _(Although JQuery is hot, and the new FX stuff is tempting me to stop being a rebel)_.  Regardless, Fancy Zoom for Mootools is [born](http://github.com/vanpelt/fancy-zoom/tree/master/mootools).  It's a pretty straight forward port.  The main performance gain is that the effects are only initialized once no matter how many FancyZoom instances there are on a page.  Click on the thumbnail below to see it in action.

<a id="hot_thumb" href="#hot">
<img src="http://farm3.static.flickr.com/2269/2777947066_5a04fb7b5b_s.jpg" /></a> 

<div id="hot">
<img src="http://farm3.static.flickr.com/2269/2777947066_5a04fb7b5b.jpg" />
</div>

In unrelated news the image you just clicked on is of me speaking at the local [San Francisco JavaScript meetup](http://javascript.meetup.com) a couple weeks ago.  I attempted to give a tutorial of Mootools called [Instimage](http://github.com/vanpelt/instimage/tree/master).  If you do a search for ["sf js"](http://www.google.com/search?q=sf+js) my [slides](http://www.slideshare.net/sfjsmeetup/chris-van-pelt-instimage-and-mootools-sf-js-3-presentation/) are the first result for some reason...  Pagerank is the end all.  Peace.
