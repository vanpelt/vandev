---
layout: default
title: VD - It's not what you think
---

<h2>Posts</h2>
{% for post in site.posts limit:10 %}
  <h3>{{ post.date | date_to_string }} - <a href="{{ post.url }}">{{ post.title }}</a> - <span>{{ post.content | number_of_words }} words</span></h3>
{% endfor %}
[Full archive](/archive.html)