---
layout: default
title: VD - It's not what you think
---

<h2>Archive</h2>
{% for post in site.posts %}
  <h3>{{ post.date | date_to_string }} - <a href="{{ post.url }}">{{ post.title }}</a> - <span>{{ post.content | number_of_words }} words</span></h3>
{% endfor %}