---
layout: post
title: Croppr, ready for primetime
---

It's been a long time coming... Croppr has grown out of it's infancy.  Sparked recently by the release of [Gravatar 2.0](http://gravatar.com) and the Ruby on Rails podcast [Camping II](http://podcast.rubyonrails.com/programs/1/episodes/the_camping_episode_ii), I dove back into the code and cleaned it up.  Croppr now adheres to the minimalistic principles of [Camping](http://code.whytheluckystiff.net/camping).  RMagick was thrown out in favor of [ImageScience](http://seattlerb.rubyforge.org/ImageScience.html).  The javascript was tweaked for performance and readability using the ever so light and powerfull [MooTools](http://mootools.net).  The magic is really in the javascript, I encourage you to check [it](http://svn.vandev.com/croppr/trunk/ext/croppr.js) out.  All the pieces come together as a living tutorial of how to implement Croppr on your own.  Go [play](http://vandev.com/croppr) with my vain demo!  If you want to get sneaky and upload your own image tag `/new` to the end of the URL, but keep it clean...  Here's an overview on how to get her up and running on your own machine:

{% highlight javascript %}
sudo gem install mongrel
sudo gem install camping
sudo gem install json
sudo gem install sqlite3-ruby (you need to have sqlite3 installed) 
sudo gem install image_science (you need to have freeimage installed)

svn co http://svn.vandev.com/croppr/trunk croppr
cd croppr

ruby croppr.rb
{% endhighlight %}

It's that easy.  You should be able to follow the documentation in the javascript and the implementation example in the camping app to get her working yourself.  Goodluck, and let me know of any crazy browser issues.  I half-assed tested it in IE 6 and 7...  Safari and Firefox are golden.
