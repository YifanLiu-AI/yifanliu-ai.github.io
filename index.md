---
layout: halftone-homepage
---

<section id="about" class="about">
  <h2>About</h2>
  <div class="intro">
    <p>Hi! I am <strong>{{ site.title }}</strong>, a research student at <a href="{{ site.affiliation_link }}">{{ site.affiliation }}</a>, working on <strong>Bimanual Manipulation</strong> and <strong>Dexterous Manipulation</strong>.</p>
    <p>Feel free to reach out if you are interested in collaboration or potential opportunities.</p>
  </div>
  {% if site.avatar %}<img class="portrait" src="{{ site.avatar | relative_url }}" alt="Portrait of {{ site.title }}" width="144" height="144" decoding="async">{% endif %}
</section>

<section class="news section" aria-labelledby="news">
  <h2 id="news">News</h2>
  <ol class="news-list">
    {% for item in site.data.news %}
    <li><time>{{ item.date }}</time><img{% if item.transparent_logo %} class="transparent-logo"{% endif %} src="{{ item.logo | relative_url }}" alt="{{ item.logo_name | escape }}" width="86" height="36" loading="lazy" decoding="async"><p{% if item.title %} title="{{ item.title | escape }}"{% endif %}>{{ item.text }}</p></li>
    {% endfor %}
  </ol>
</section>

<section class="experience section" aria-labelledby="experience">
  <h2 id="experience">Experience</h2>
  <div class="experience-list">
    {% for item in site.data.experience %}
    <article>
      {% if item.logo %}<img{% if item.institution == 'SCUT' %} class="scut-logo"{% endif %} src="{{ item.logo | relative_url }}" alt="{{ item.institution_name | escape }} logo" width="200" height="62" loading="lazy" decoding="async">{% endif %}
      <p class="lab">{{ item.lab }}</p>
      <h3>{{ item.role }}</h3>
      <p>{{ item.relationship }}: <a href="{{ item.advisor_url }}" target="_blank" rel="noopener">{{ item.advisor }}</a></p>
      <p class="period">{{ item.period }}</p>
    </article>
    {% endfor %}
  </div>
</section>

<section class="projects section" aria-labelledby="projects">
  <h2 id="projects">Projects</h2>
  <div class="project-list">
    {% for project in site.data.projects %}
    <article>
      <h3>{{ project.title }}</h3>
      <p class="period">{{ project.meta }}</p>
      {% if project.authors != '' %}<p class="authors">{{ project.authors | escape }}</p>{% endif %}
      <p class="project-links">{% if project.url != '' %}<a href="{{ project.url }}" target="_blank" rel="noopener">Challenge website ↗</a> · {% endif %}<a href="{{ project.code_url }}" target="_blank" rel="noopener">{{ project.code_label }} ↗</a>{% if project.checkpoint_url != '' %} · <a href="{{ project.checkpoint_url }}" target="_blank" rel="noopener">Checkpoints ↗</a>{% endif %}</p>
      <p class="project-intro">{{ project.items[0] }}</p>
      <details>
        <summary>Research details</summary>
        <ol start="2">{% for item in project.items offset:1 %}<li>{{ item }}</li>{% endfor %}</ol>
      </details>
    </article>
    {% endfor %}
  </div>
</section>
