---
layout: papercut-homepage
---
<section class="cover paper" id="about" aria-labelledby="name">
  <div class="cover-heading">
    <h1 id="name" aria-label="YIFAN LIU"><span class="riso" data-ink="YIFAN LIU">YIFAN LIU</span></h1>
    <p class="research-statement">My work focuses on <strong>bimanual</strong><br class="desktop-break"> and <strong>dexterous manipulation.</strong></p>
    <div class="bio-line"><p>I'm a B.Eng. student in the School of Mechanical and Automotive Engineering at <a href="{{ site.affiliation_link }}">SCUT</a>, with an expected graduation date of <strong>June 2028</strong>.</p></div>
    <a class="paper-button" href="#projects">Explore projects <span aria-hidden="true">↘</span></a>
  </div>
  <div class="portrait-collage">
    <img class="halftone-disc" src="{{ '/assets/papercut/halftone-disc.svg' | relative_url }}" alt="" width="600" height="600" aria-hidden="true">
    <figure class="portrait-print scrap">
      <span class="tape tape--pink tape--cover-a" aria-hidden="true"></span><span class="tape tape--pink tape--cover-b" aria-hidden="true"></span>
      <div class="portrait-image"><img src="{{ site.avatar | relative_url }}" alt="Portrait of YIFAN LIU" width="1024" height="1024" fetchpriority="high"></div>
      <figcaption><button type="button" class="portrait-toggle" aria-pressed="false" hidden>Original photo ↗</button></figcaption>
    </figure>
  </div>
  <div class="cut-line" aria-hidden="true"><svg viewBox="0 0 64 40"><circle cx="10" cy="9" r="7"/><circle cx="10" cy="31" r="7"/><path d="M16 13 L58 30 M16 27 L58 10"/></svg></div>
</section>
<section class="news paper section" aria-labelledby="news">
  <div class="section-top"><h2 aria-label="News" id="news" class="riso" data-ink="NEWS">NEWS</h2></div>
  <ol class="news-grid">
    {% for item in site.data.news %}
    <li class="news-scrap scrap" data-paper-seed="{{ forloop.index | plus: 20 }}">
      {% if forloop.first %}<span class="tape tape--pink tape--numbers-a" aria-hidden="true"></span>{% elsif forloop.last %}<span class="tape tape--blue tape--numbers-b" aria-hidden="true"></span>{% endif %}
      <div class="news-meta"><time datetime="{{ item.date | replace: '.', '-' }}">{{ item.date }}</time><img src="{{ item.logo | relative_url }}" alt="{{ item.logo_name | escape }}" width="92" height="32" loading="lazy"></div>
      <p{% if item.title %} title="{{ item.title | escape }}"{% endif %}>{{ item.text }}</p>
    </li>
    {% endfor %}
  </ol>
</section>
<section class="experience paper section" aria-labelledby="experience">
  <div class="section-top"><h2 aria-label="Intern" id="experience" class="riso" data-ink="INTERN">INTERN</h2></div>
  <div class="experience-grid">
    {% for item in site.data.experience %}
    <article class="intern-ticket intern-ticket--{{ item.institution | downcase }} scrap" data-paper-seed="{{ forloop.index | plus: 40 }}">

      <div class="badge-band" aria-hidden="true"></div>
      <div class="ticket-body">
        <div class="ticket-strip mono"><span>{{ item.period }}</span></div>
        <h3 class="institution-heading"><img class="institution-logo" src="{{ item.logo | relative_url }}" alt="{{ item.institution_name | escape }}" width="{{ item.logo_width }}" height="{{ item.logo_height }}" loading="lazy"></h3>
        <div class="ticket-advisor"><span class="mono">{{ item.relationship }}</span><a href="{{ item.advisor_url }}" target="_blank" rel="noopener noreferrer">{{ item.advisor }} ↗</a></div>
      </div>
    </article>
    {% endfor %}
  </div>
</section>
<section class="projects paper section" aria-labelledby="projects">
  <div class="section-top"><h2 aria-label="Projects" id="projects" class="riso" data-ink="PROJECTS">PROJECTS</h2></div>
  <div class="project-list">
    {% for project in site.data.projects %}
    <article class="project project--{{ project.id }}" id="project-{{ project.id }}" aria-labelledby="project-title-{{ project.id }}">
      <div class="project-body">
        <figure class="project-media scrap">
          {% if project.id == 'robosyn' %}<span class="tape tape--pink tape--voices-a" aria-hidden="true"></span><span class="tape tape--blue tape--voices-b" aria-hidden="true"></span>{% elsif project.id == 'wrist' %}<span class="tape tape--blue tape--access" aria-hidden="true"></span>{% else %}<span class="tape tape--blue tape--facts-a" aria-hidden="true"></span><span class="tape tape--pink tape--facts-b" aria-hidden="true"></span>{% endif %}
          <div class="media-frame">
            {% if project.animated_preview %}
            <picture><source media="(prefers-reduced-motion: reduce)" srcset="{{ project.poster | relative_url }}"><img src="{{ project.animated_preview | relative_url }}" alt="{{ project.media_alt | escape }}" data-original-video="{{ project.media_src | relative_url }}" data-poster="{{ project.poster | relative_url }}" width="480" height="270" loading="lazy" decoding="async"></picture>
            {% elsif project.media_type == 'video' %}
            <video src="{{ project.media_src | relative_url }}" aria-label="{{ project.media_alt | escape }}" controls muted loop playsinline preload="none" poster="{{ project.poster | relative_url }}" width="960" height="540"></video>
            {% else %}
            <img src="{{ project.media_src | relative_url }}" alt="{{ project.media_alt | escape }}" width="1005" height="369" loading="lazy" decoding="async">
            {% endif %}
          </div>
          <figcaption><div class="media-caption"><h3 id="project-title-{{ project.id }}">{{ project.title }}</h3></div><button type="button" class="expand-media" data-project="{{ project.id }}" aria-label="Expand {{ project.title }}" hidden>Expand ↗</button></figcaption>
          <p class="media-error" hidden>Video unavailable. <a href="{{ project.media_src | relative_url }}" target="_blank" rel="noopener noreferrer">Open video ↗</a></p>
        </figure>
          {% if project.id == 'robosyn' %}<p class="project-stamp project-stamp--ranking"><span class="venue-stack">NeurIPS<small>2026</small></span><strong>#11</strong></p>{% elsif project.id == 'wrist' %}<p class="project-stamp"><strong>ICRA</strong><span>2027<br>UNDER REVIEW</span></p>{% else %}<p class="project-stamp project-stamp--ranking"><span class="venue-stack">ICRA<small>2026</small></span><strong>#17</strong></p>{% endif %}
        <div class="project-info">
          <p class="project-summary">{{ project.summary | escape }}</p>
          <div class="project-meta"><p class="project-period">{{ project.meta | split: ' · ' | first }}</p>{% if project.authors != '' %}<p class="authors">{{ project.authors | escape | replace: "Yifan Liu", "<strong>Yifan Liu</strong>" }}</p>{% endif %}</div>
          <div class="project-links">{% if project.url != '' %}<a href="{{ project.url }}" target="_blank" rel="noopener noreferrer">Challenge website ↗</a>{% endif %}<a href="{{ project.code_url }}" target="_blank" rel="noopener noreferrer">{{ project.code_label }} ↗</a>{% if project.checkpoint_url != '' %}<a href="{{ project.checkpoint_url }}" target="_blank" rel="noopener noreferrer">Checkpoints ↗</a>{% endif %}</div>
        </div>
      </div>
    </article>
    {% endfor %}
  </div>
  <div class="cut-line" aria-hidden="true"><svg viewBox="0 0 64 40"><circle cx="10" cy="9" r="7"/><circle cx="10" cy="31" r="7"/><path d="M16 13 L58 30 M16 27 L58 10"/></svg></div>
</section>
