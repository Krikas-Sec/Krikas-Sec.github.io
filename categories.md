---
layout: default
title: Categories
permalink: /categories/
---

<h1>📚 Categories</h1>
<p>Browse writeups and posts grouped by category.</p>
<hr>

<div class="category-list">
  {% for category in site.categories %}
    <div class="category-block">
      <h2><a href="/categories/{{ category[0] | slugify }}/">{{ category[0] | capitalize }}</a></h2>
      <ul>
        {% for post in category[1] %}
          <li>
            <a href="{{ post.url }}">{{ post.title }}</a> - {{ post.date | date: "%B %d, %Y" }}
          </li>
        {% endfor %}
      </ul>
    </div>
  {% endfor %}
</div>