---
layout: halftone-homepage
---

<section id="about" class="about">
  <h2>About</h2>
  <div class="intro">
    <p>Hi! I am <strong>{{ site.title }}</strong>, a research student at <a href="{{ site.affiliation_link }}">{{ site.affiliation }}</a>, working on <span class="keyword">embodied intelligence</span> and <span class="keyword">robotic learning</span>.</p>
    <p>Feel free to reach out if you are interested in collaboration or potential opportunities.</p>
    <a class="text-link" href="{{ site.github_link }}" target="_blank" rel="noopener">GitHub <span aria-hidden="true">↗</span></a>
  </div>
  {% if site.avatar %}<img class="portrait" src="{{ site.avatar | relative_url }}" alt="Portrait of {{ site.title }}" width="144" height="144" decoding="async">{% endif %}
</section>

<section class="news section" aria-labelledby="news">
  <h2 id="news">News</h2>
  <ol class="news-list">
    {% for item in site.data.news %}
    <li><time>{{ item.date }}</time><img src="{{ item.logo | relative_url }}" alt="{{ item.logo_name | escape }}" width="86" height="36" loading="lazy" decoding="async"><p{% if item.title %} title="{{ item.title | escape }}"{% endif %}>{{ item.text }}</p></li>
    {% endfor %}
  </ol>
</section>

<section class="experience section" aria-labelledby="experience">
  <h2 id="experience">Experience</h2>
  <div class="experience-list">
    {% for item in site.data.experience %}
    <article>
      {% if item.logo %}<img{% if item.institution == 'SCUT' %} class="scut-logo"{% endif %} src="{{ item.logo | relative_url }}" alt="{{ item.institution_name | escape }} logo" width="200" height="62" loading="lazy" decoding="async">{% endif %}
      <h3>{{ item.role }}</h3>
      <p>{{ item.relationship }}: <a href="{{ item.advisor_url }}" target="_blank" rel="noopener">{{ item.advisor }}</a></p>
      <p class="period">{{ item.period }}</p>
    </article>
    {% endfor %}
  </div>
</section>

<!-- Add selected publications and projects here when they are ready. -->
