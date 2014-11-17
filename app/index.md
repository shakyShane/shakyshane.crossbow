---
layout: "page.hbs"
title: "shakyShane.com"
---

<h1>Posts</h1>
<ul ss-Nav="posts">
    {{#posts}}  
    <li>
        <span ss-Post-Date>{{this.date}}</span>
        <a href="{{this.url}}" title="{{this.title}}">{{this.title}}</a>
    </li>
    {{/posts}}
</ul>
