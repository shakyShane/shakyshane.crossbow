---
layout: "page.hbs"
title: "shakyShane.com"
---

<h1>Posts</h1>
<ul class="nav posts">
    {{#posts}}  
    <li>
        <span class="post-date">{{this.date}}</span>
        <a class="post-link" href="{{this.url}}">{{this.title}}</a>
    </li>
    {{/posts}}
</ul>
