---
layout: post
title: Inside the Croppr frontend
---

I learned allot creating [croppr](http://vandev.com/croppr).  It's pretty intersting what you can do with the DOM and some CSS.  Let's take a peek under the hood.  

The first thing croppr does upon instantiation is create a bunch of DOM elements.  Here's what that looks like.

<a href="#" id="toggle_styles">Toggle Styles</a>
<div id="the_styles">

{% highlight html %}
<div style="background: white;
            position: absolute;
            top: 0px; left: 0px;
            width: 100%; height: 545px;
            opacity: 0.8;"/> 
<div id="croppr" style="overflow: hidden;
                        position: absolute;
                        top: 0px; left: 0px;
                        width: 100%; height: 545px;">                  
  <div style="border: 1px solid #000000;
              overflow: hidden;
              position: absolute;
              top: 50%; left: 50%;
              width: 118px; height: 118px;
              margin-top: -60px; margin-left: -60px;">
    <img src="/croppr/images/1" style="cursor: move;
                                       position: absolute;
                                       top: 50%; left: 50%;
                                       margin-top: -272px; margin-left: -357px;
                                       width: 714px; height: 544px;
                                       opacity: 1;"/>
  </div>
  <img src="/croppr/images/1" style="cursor: move;
                                     position: absolute;
                                     top: 50%; left: 50%;
                                     margin-top: -272px; margin-left: -357px;
                                     width: 714px; height: 544px;
                                     opacity: 0.3;"/>
  <a class="exit">
    <span>EXIT</span>
  </a>
  <a class="crop">
    <span>CROP</span>
  </a>
  <div class="track">
    <div class="handle" style="cursor: move;
                               position: relative;
                               left: 154.312px;"/>
  </div>
</div>
{% endhighlight %}


</div>

<script type="text/javascript" charset="utf-8">
/* <![CDATA[ */
  $('toggle_styles').addEvent('click', toggleStyles);
  function toggleStyles(event) {
    $$('span.style', 'the_styles').each(function(e) {
      var fade = new Fx.Tween(e, {duration:1000, onComplete:function(e){ 
          if(this.to[0].value == 0) {
               e.setStyle('display','none');
               new Element('span', {html:'...'}).inject(e,'before');
          }
      }, onStart: function(e){ 
             e.setStyle('display','inline');
             if(this.from[0].value == 0) e.getPrevious().destroy();
       }
      });
      e.style.visibility == "hidden" ? fade.start( 'opacity', [0,1]) : fade.start( 'opacity', [1,0]);
    });
    event.stop();
  }
  window.addEvent('domready', function(){
     $('second_toggle').addEvent('click', toggleStyles);
     toggleStyles({ stop: function(){} }) 
  });
/* ]]> */
</script>

<a href="#the_styles" id="second_toggle">Toggle</a> the styles to understand what's going on here.  The first element is the transparency or "light box" that dims whatever else is on the screen (_trans_).  The order of the elements is important.  We want the transparency to be all the way in the back.   Elements later in the DOM that are absolutely positioned will be infront of previous absolutely positioned elements (unless we  set the z-index property). 

The next element is our container for all the fun goodies we're about to add (_container_).  It serves three purposes.
 
1. _Makes cleanup easy._  By deleting this element, all the others will disappear.
2. _Namespaces the rest of our elements._  You can target `#croppr .exit` in your CSS without effecting other elements with the class of `exit`.
3. _Get's rid of vertical and horizontal scroll bars._  By setting `overflow:hidden` when the image we are cropping goes outside of the window, the browser doesn't add scrollbars and screw up our math.

The transparent box is not placed in this div because we want a nice fade back into the original environment after we have deleted all of the cropping tools.  More on this in a little bit.

Next we have the mask.  The width and height of the mask is set to the width and height of the desired crop - 2.  We subtract two because it has a 1 pixel border and the box model includes the border in the width and height.  A copy of the main image (_ghost_) is put inside of the mask.  `overflow:hidden` is set on the mask as well, making the parts outside of it invisible.  Both the mask and the ghost are positioned absolutely and have `top` and `left` attributes set to 50%.  We then give them negative `top` and `left` margins.  The mask's margin's will always be half of its width and height, while the ghost's margins are based on it's current position.  This puts the work of keeping the items centered if the window resizes in the hands of the browser.  All of this is done rather elegantly with mootools:

{% highlight javascript %}
this.mask = new Element("div").setStyles({
      border: "1px solid #000",
      overflow: "hidden",
      position: "absolute",
      width: this.options.crop[0]-2+"px",
      height: this.options.crop[1]-2+"px",
      top: "50%",
      left: "50%", 
      marginTop: -this.options.crop[1]/2+"px", 
      marginLeft: -this.options.crop[0]/2+"px" 
}).injectInside(this.container);
this.ghost = this.image.clone(false).injectInside(this.mask);
{% endhighlight %}

The image itself is next up.  She is infront of the mask so we can drag her around without having the mask conflict.  We set the opacity to .3 making the ghosting effect.  The positioning of this image is identical to the one inside the mask.  Infact, as you drag the image, it's css is copied straight into the css of the image inside of the mask.  The only difference is the opacity.

{% highlight javascript %}
draw: function() {
  this.ghost.style.cssText = this.image.style.cssText;
  this.ghost.setOpacity(1);
}

this.drag = new Drag.Base(this.image, {
  limit: {
    x: [-this.size[0] + this.options.crop[0] / 2, -this.options.crop[0] / 2], 
    y: [-this.size[1] + this.options.crop[1] / 2, -this.options.crop[1] / 2]
  },
  modifiers: {
    x: "margin-left", 
    y: "margin-top"
  },
  onDrag: this.draw.bind(this)
});
{% endhighlight %}

Mootool's awesome [Drag](http://docs.mootools.net/Drag/Drag-Base.js) class provides a way to constrain the object being drug via the limit parameter in the constructor.  This logic is repeated in the scaling function (_updateSlide_) to insure the image is not scaled outside of the mask.  This function is the hairiest of them all... maybe we'll dig into her another time.

Last but not least we have the CROP and EXIT buttons along with the slider itself.  These need to be infront of everything else, which is why they are last.  There is no styling done explicitly by the croppr javascript library.  Instead, it gives you the freedom to style them however you would like.  

When we're done using croppr, cleanup is as easy as:

{% highlight javascript %}
this.container.remove();
new Fx.Style(this.trans, 'opacity', {duration: 1000, onComplete: this.trans.remove}).start(0.8, 0);
{% endhighlight %}

And that's that, bending the DOM to do your dirty work turns out not to be so bad...
