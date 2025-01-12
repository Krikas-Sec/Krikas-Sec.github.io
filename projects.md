---
layout: default
title: Projects
permalink: /projects/
---

# My Projects

Welcome to the Projects page! Below, you'll find the tools and utilities I’ve developed as part of the Krikas-Sec initiative. These projects are designed to assist sysadmins and security enthusiasts in their work. Explore each tool and find links to the respective repositories.

---

## **PortHawk**
[PortHawk](https://github.com/Krikas-Sec/PortHawk)  
A lightweight, fast, and concurrent port scanning tool written in Go. PortHawk is designed for efficiency and speed, allowing you to scan open ports on an IP address or DNS name. Features include:
- Customizable port ranges.
- Concurrent scanning with a routine limit.  
**APT Support:** You can install PortHawk via the Krikas-Sec APT repository for easy deployment.

*Development Status:*  
The current development branch includes experimental features and is under active improvement.  

---

## **HTTP Header Analyzer**
[HTTP Header Analyzer](https://github.com/Krikas-Sec/http-header-analyzer)  
A simple Python tool to analyze HTTP headers for common security issues. This tool provides insights into header configurations and flags potential security vulnerabilities, making it a valuable resource for web developers and penetration testers.

---

## **IP Range Scanner**
[IP Range Scanner](https://github.com/Krikas-Sec/ip-range-scanner)  
A simple Bash script to scan an IP range for active hosts. It’s perfect for network administrators and security professionals looking to quickly identify active devices in their network.  

Features:
- Lightweight and straightforward.
- No external dependencies required.

---

## **APT Repository**
[APT Repository](https://github.com/Krikas-Sec/apt-repo)  
Host and manage Debian packages for tools like PortHawk. The Krikas-Sec APT repository allows you to easily install and update tools using standard APT commands.

To add the repository to your Debian-based system:
```bash
echo "deb [trusted=yes] https://krikas-sec.github.io/apt-repo stable main" | sudo tee -a /etc/apt/sources.list
sudo apt update
sudo apt install porthawk
```

# **More Tools Coming Soon!**
I’m constantly working on new tools to simplify workflows for sysadmins and security professionals. Stay tuned for updates and additions to the Krikas-Sec project portfolio.

**Feel free to explore and contribute** to any of these projects via their respective GitHub repositories. For feedback, suggestions, or collaboration, don’t hesitate to reach out!