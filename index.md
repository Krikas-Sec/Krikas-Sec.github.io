---
layout: default
title: "Welcome to Krikas-Sec"
---

# Welcome to Krikas-Sec

**Krikas-Sec is the home of PowerHack — a hacking lab powered by Windows.**
I develop open-source tools and utilities that streamline workflows for sysadmins, developers, and ethical hackers. Here you'll also find writeups and CTF walkthroughs solved entirely from Windows using PowerShell and WSL — proving that you don’t need Linux to hack like a pro.

---

## 🔐 Latest Writeups

<div class="post-grid">
  {% assign all_posts = site.posts | sort: 'date' | reverse %}
  {% for post in all_posts %}
    <div class="post-card">
      <div class="thumbnail" style="background-image: url('{{ post.image | default: '/assets/img/placeholder.png' }}');"></div>
      <div class="post-info">
        <h3>{{ post.title }}</h3>
        <p>{{ post.date | date: "%B %d, %Y" }}</p>
        <div class="post-tags">
          {% for tag in post.tags %}
            <span>{{ tag }}</span>
          {% endfor %}
        </div>
        <a href="{{ post.url }}" class="btn">Read More</a>
      </div>
    </div>
  {% endfor %}
</div>

---

## **Why Krikas-Sec?**

I created Krikas-Sec to combine my passion for system administration, security, and programming. The goal is to empower professionals and enthusiasts alike with tools that simplify workflows and improve productivity. Every tool is developed with the intention of solving specific problems I've encountered during my years of experience.

*Make hacking smarter — not harder.*

---

## **My Projects**

Here are some of the tools I’ve developed as part of the Krikas-Sec initiative. Each project is built to solve real problems and support ethical hacking, system administration, and automation. Click on a link to explore more:

- 🖥️ PowerShell Scripts
A growing collection of scripts and tools for Windows hacking, automation, and system management — tailored for sysadmins, security pros, and PowerShell learners.

- ⚡ PortHawk
A lightweight and fast port scanning tool written in Go. PortHawk helps you identify open ports on an IP address or DNS name efficiently.

- 📦 APT Repository
A Debian package repository hosting tools like PortHawk. Easily install and update tools using APT commands.

- 🐍 HTTP Header Analyzer
A Python-based tool for analyzing HTTP headers to identify common security issues in web applications.

- 🌐 IP Range Scanner
A simple Bash script for scanning an IP range to discover active hosts on your local network.

---

## **Get in Touch**

Have questions, suggestions, or want to collaborate? Feel free to reach out to me at **[krikas@temphack.org](mailto:krikas@temphack.org)** or visit my **[GitHub profile](https://github.com/Krikas-Sec)**.  

Let’s make IT and security simpler—together!

