---
layout: post
title: RMagick on Mac OS X 10.4 Tiger
---

Recently I needed Rmagick installed on my Mac OS X 10.4 system.  This turned out to be nearly impossible, until I got down and dirty and just went for a fresh compile from source.  Actually it became more impossible until I found enlightenment on the long and arduous journey.  The following is a pretty bare-bones install.  It leaves out excess functionality like exporting to [TIFF](ftp://ftp.remotesensing.org/libtiff/), working with [PostScript or PDF](http://www.cs.wisc.edu/~ghost/) files, [color management](http://www.littlecms.com/), [EXIF](http://sourceforge.net/projects/libexif) headers, [SVG](http://xmlsoft.org/) images, or [MSWord](http://sourceforge.net/projects/wvware/) documents.  All of this functionality can be added by downloading the source from the links above, and compiling them before you run `./configure` for ImageMagick.  You can also install GraphicsMagick if you like, it shouldn't make a difference which one you use.

The following instructions will have you up and running in no time (actually about 30 minutes depending on the speed of your system _ImageMagick takes forever_).  These instructions assume you have installed Ruby according to the instructions at [HiveLogic](http://hivelogic.com/articles/2005/12/01/ruby_rails_lighttpd_mysql_tiger).  If you have not, make sure you atleast follow the steps up to the point of installing ruby.  This makes sure your path is correct and your build environment is in place.

X11:

10.4 Tiger install DVD or http://www.apple.com/downloads/macosx/apple/x11formacosx.html 

Freetype2:

{% highlight bash %}
curl -O http://umn.dl.sourceforge.net/sourceforge/freetype/freetype-2.2.1.tar.gz
tar zxvf freetype-2.2.1.tar.gz
cd freetype-2.2.1
./configure && make && sudo make install
cd ..
{% endhighlight %}

Jpeg:

{% highlight bash %}
curl -O ftp://ftp.uu.net/graphics/jpeg/jpegsrc.v6b.tar.gz
tar zxvf jpegsrc.v6b.tar.gz
cd jpeg-6b
ln -s `which glibtool` ./libtool
export MACOSX_DEPLOYMENT_TARGET=10.4
./configure --enable-shared && make && sudo make install
cd ..
{% endhighlight %}

PNG:

{% highlight bash %}
curl -O http://umn.dl.sourceforge.net/sourceforge/libpng/libpng-1.2.10-no-config.tar.gz
tar zxvf libpng-1.2.10-no-config.tar.gz
cd libpng-1.2.10
cp scripts/makefile.darwin Makefile
make && sudo make install
cd ..
{% endhighlight %}

ImageMagick:

{% highlight bash %}
curl -O http://umn.dl.sourceforge.net/sourceforge/imagemagick/ImageMagick-6.2.8-0.tar.gz
tar zxvf ImageMagick-6.2.8-0.tar.gz
cd ImageMagick-6.2.8
./configure && make && sudo make install
cd ..
{% endhighlight %}

RMagick (finally and thankfully):

{% highlight bash %}
sudo gem install rmagick
{% endhighlight %}

That's it, goto [RMagick](http://rmagick.rubyforge.org/)'s web site for information on using RMagick in your apps.  Be on the look out for an incredible little [Camping](http://code.whytheluckystiff.net/camping/) app that uses the power of RMagick to appear on VD soon!
