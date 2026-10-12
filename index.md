---
layout: halftone-homepage
---

<section id="about" class="about">
  <h2>About</h2>
  <div class="intro">
    <p>I'm a B.Eng. student in the School of Mechanical and Automotive Engineering at <a href="{{ site.affiliation_link }}">SCUT</a>, with an expected graduation date of <strong>June 2028</strong>.</p>
    <p>My work focuses on bimanual and dexterous manipulation.</p>
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
      <div class="project-info">
      <h3>{{ project.title }}</h3>
      <p class="period">{{ project.meta }}</p>
      {% if project.authors != '' %}<p class="authors">{{ project.authors | escape }}</p>{% endif %}
      <p class="project-summary">{{ project.summary | escape }}</p>
      <p class="project-links">{% if project.url != '' %}<a href="{{ project.url }}" target="_blank" rel="noopener">Challenge website ↗</a> · {% endif %}<a href="{{ project.code_url }}" target="_blank" rel="noopener">{{ project.code_label }} ↗</a>{% if project.checkpoint_url != '' %} · <a href="{{ project.checkpoint_url }}" target="_blank" rel="noopener">Checkpoints ↗</a>{% endif %}</p>
      </div>
      <figure class="project-media">
        <div class="project-art project-art--{{ project.id }}">
        {% if project.media_type == 'video' %}
        <video src="{{ project.media_src }}" aria-label="{{ project.media_alt | escape }}" autoplay muted loop playsinline preload="metadata"{% if project.clip_end %} data-clip-start="{{ project.clip_start }}" data-clip-end="{{ project.clip_end }}"{% endif %} style="aspect-ratio: {{ project.media_ratio }}"></video>
        {% else %}
        <img src="{{ project.media_src | relative_url }}" alt="{{ project.media_alt | escape }}" width="1005" height="369" loading="lazy" decoding="async">
        {% endif %}
        </div>
      </figure>
    </article>
    {% endfor %}
  </div>
</section>
