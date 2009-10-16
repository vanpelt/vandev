---
layout: post
title: MongoDB Fancy Ass Grouping
---

So lately I've been playing with [Mongodb](http://mongodb.org) for [CrowdFlower](http://crowdflower.com).  We need to calculate statistics from the information that we gather.  Mongo provides support for this but has little documentation.  I thought it would be appropriate to describe how I got some of the fancier group statements working.  Let's take this document format as an example:

{% highlight javascript %}
{
     "state": "finished",
     "data": {
       "everythings_good": "yes"
     }
   }
{% endhighlight %}

The key property alone of the group function can not be used because our key is in an embedded member.  We have to use the keyf property of the [group](http://www.mongodb.org/display/DOCS/Aggregation) command.  I'm using the Mongo ruby library and it currently doesn't support the use of this property.  Instead I issue the raw db_command:

{% highlight ruby %}
    db = Mongo::Connection.new.db('docs')
    db.db_command({
      "group" => {
        "ns" => "ratings",
        "$reduce" => Mongo::Code.new(<<-JS),
          function(obj,prev){ prev.count++; }
        JS
        "$keyf" => Mongo::Code.new(<<-JS),
          function(obj){
            var g = {}
            g[obj.data.everythings_good] = true
            return g
          }
        JS
        "cond" => {},
        "initial" => {:count => 0}
      }
    })
{% endhighlight %}

This command returns the following value:

{% highlight ruby %}
    {
      "retval"=>[
        {"yes"=>1.0, "count"=>17355.0}, 
        {"no"=>1.0, "count"=>6395.0}
      ], 
      "count"=>23750.0, 
      "keys"=>2, 
      "ok"=>1.0
    }
{% endhighlight %}

**Note:** the keyf property was not working properly until version 1.1.0 of mongodb