---
layout: default
title: FAQ - Perguntas Frequentes
permalink: /faq/
---

<div class="faq-container dark-mode">
    <h1 class="faq-title">Perguntas Frequentes</h1>
    
    <div class="faq-categories">
        <h2>Categorias</h2>
        <ul>
            {% assign categories = site.data.faq.categories %}
            {% for category in categories %}
            <li>
                <a href="#{{ category | slugify }}">
                    {{ category }}
                </a>
            </li>
            {% endfor %}
        </ul>
    </div>

    <div class="faq-list">
        {% assign faqs = site.data.faq.entries | sort: 'category' %}
        {% for category in categories %}
        <section id="{{ category | slugify }}" class="faq-section">
            <h2>{{ category }}</h2>
            
            {% for entry in faqs %}
            {% if entry.category == category %}
            <div class="faq-item">
                <div class="faq-question" onclick="toggleAnswer(this)">
                    <h3>{{ entry.question }}</h3>
                    <span class="faq-toggle">+</span>
                </div>
                <div class="faq-answer">
                    <p>{{ entry.answer }}</p>
                </div>
            </div>
            {% endif %}
            {% endfor %}
        </section>
        {% endfor %}
    </div>
</div>

<style>
.faq-container.dark-mode {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #121212;
    color: #fff;
    min-height: 100vh;
}

.faq-title {
    text-align: center;
    margin-bottom: 2rem;
    color: #fff;
    font-size: 2.5rem;
    font-weight: 600;
}

.faq-categories {
    margin-bottom: 2rem;
}

.faq-categories h2 {
    color: #8cb4ff;
    margin-bottom: 1rem;
    font-size: 1.8rem;
}

.faq-categories ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.faq-categories li {
    background: #1a1a1a;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.3s ease;
    border: 1px solid #333;
}

.faq-categories li:hover {
    background: rgba(100, 100, 100, 0.2);
    transform: translateY(-2px);
}

.faq-categories a {
    color: #9d9d9e;
    text-decoration: none;
    font-weight: 500;
}

.faq-categories a:hover {
    color: #fff;
}

.faq-list {
    margin-top: 2rem;
}

.faq-section {
    margin-bottom: 3rem;
    padding: 1.5rem;
    background: #1a1a1a;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    border: 1px solid #333;
}

.faq-section h2 {
    color: #8cb4ff;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    border-bottom: 1px solid #333;
    padding-bottom: 0.5rem;
}

.faq-item {
    margin-bottom: 1rem;
    background: #252525;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    overflow: hidden;
    transition: all 0.3s ease;
}

.faq-question {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}

.faq-question h3 {
    color: #fff;
    margin: 0;
    font-size: 1.1rem;
    font-weight: 500;
}

.faq-toggle {
    color: #9d9d9e;
    font-size: 1.5rem;
    font-weight: bold;
    transition: all 0.3s ease;
}

.faq-answer {
    padding: 0 1rem;
    max-height: 0;
    overflow: hidden;
    transition: all 0.3s ease;
}

.faq-answer p {
    color: #ccc;
    line-height: 1.6;
    padding: 0 0 1rem 0;
    margin: 0;
}

.faq-item.active .faq-answer {
    max-height: 1000px;
}

.faq-item.active .faq-toggle {
    transform: rotate(45deg);
}

.faq-item:hover {
    background: #2a2a2a;
}

@media (max-width: 768px) {
    .faq-container {
        padding: 1rem;
    }
    
    .faq-categories ul {
        gap: 0.5rem;
    }
    
    .faq-categories li {
        padding: 0.3rem 0.8rem;
    }
    
    .faq-title {
        font-size: 2rem;
    }
}
</style>

<script>
function toggleAnswer(element) {
    const item = element.parentElement;
    item.classList.toggle('active');
}
</script>
