---
layout: default
title: Projects
permalink: /projects/
---

# My Projects

Welcome to the Projects page! Below you'll find tools and writeups created under the **Krikas-Sec** and **PowerHack** initiative—where we focus on Windows-first hacking using PowerShell and WSL. These open-source projects aim to help sysadmins, security enthusiasts, and ethical hackers improve their workflows and sharpen their skills.

---

## 💻 **PowerHack — Hacking From Windows**
[PowerShell Scripts by Krikas-Sec](https://github.com/Krikas-Sec/PowerShell-Scripts)  
PowerHack is a curated collection of PowerShell scripts and utilities developed specifically for hacking **from Windows**. These tools allow you to:

- Perform reconnaissance, fuzzing, and enumeration from a Windows environment.
- Integrate PowerShell with WSL and Linux-style hacking workflows.
- Run automated tasks, generate reports, and use REST APIs—all inside PowerShell.

**Ideal For:** Windows pentesters, sysadmins learning security, bug bounty hunters.

---

## 🚀 **PortHawk**
[PortHawk](https://github.com/Krikas-Sec/PortHawk)  
A lightweight, fast, and concurrent port scanning tool written in Go. Features include:

- Customizable port ranges.
- Concurrent scanning with a goroutine limit.

**APT Support:** Install PortHawk via the Krikas-Sec APT repository for easy deployment.

*Development Status:* Actively maintained with experimental features in progress.

---

## 🌐 **HTTP Header Analyzer**
[HTTP Header Analyzer](https://github.com/Krikas-Sec/http-header-analyzer)  
Analyze HTTP headers for misconfigurations and missing security headers. Great for:

- Web developers checking security posture.
- Pentesters performing reconnaissance.

---

## 🔍 **IP Range Scanner**
[IP Range Scanner](https://github.com/Krikas-Sec/ip-range-scanner)  
A Bash script that scans an IP range for active hosts. Lightweight and no dependencies required.

- Quickly discover devices on local networks.
- Useful for network mapping and validation.

---

## 📦 **APT Repository**
[APT Repository](https://github.com/Krikas-Sec/apt-repo)  
A Debian package repository for hosting Krikas-Sec tools like PortHawk.

**Quick Setup:**
```bash
echo "deb [trusted=yes] https://krikas-sec.github.io/apt-repo stable main" | sudo tee -a /etc/apt/sources.list
sudo apt update
sudo apt install porthawk
```

---

## 📁 **Writeups**
Alongside tools, I publish CTF walkthroughs and hacking writeups as part of the **PowerHack** initiative.

- 💀 Practical hacking examples.
- 🔐 Real-world TryHackMe and lab challenges.
- ⚡ Windows-first solutions using PowerShell.

🧭 **[Explore Categories »](/categories)** to browse all writeups by type.

---

## 🛠️ **More Tools Coming Soon!**
I’m constantly building and experimenting. More PowerShell scripts, CTF tools, and automation utilities are in the works. Stay tuned—and feel free to [contribute on GitHub](https://github.com/Krikas-Sec)!
