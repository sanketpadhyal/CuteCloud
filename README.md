# Cute Cloud ☁️

![Frontend](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-blue?style=flat&logo=html5)
![Authentication](https://img.shields.io/badge/Auth-Firebase-orange?style=flat&logo=firebase)
![Backend](https://img.shields.io/badge/Backend-Node.js-green?style=flat&logo=node.js)
![Database](https://img.shields.io/badge/Database-JSON-lightgrey?style=flat&logo=database)
![Frontend Host](https://img.shields.io/badge/Frontend%20Host-Netlify-blue?style=flat&logo=netlify)
![Backend Host](https://img.shields.io/badge/Backend%20Host-Replit-red?style=flat&logo=replit)
![Realtime Logs](https://img.shields.io/badge/Logs-Telegram%20Channel-blue?style=flat&logo=telegram)
![Admin Panel](https://img.shields.io/badge/Admin%20Panel-Telegram%20Bot-lightblue?style=flat&logo=telegram)

---

## 🌥️ Overview

**Cute Cloud ☁️** is a web application designed to provide users a safe and interactive platform to store, manage, and enjoy their data — including photos, videos, notes, and folders.

It features a live **suggestion system** powered by a **Telegram bot** with admin control, real-time logging, and user management. The app also uses **Firebase authentication** to manage user logins securely.

> ⚠️ **Note:** The main data storage page (folders, photos, videos) is under maintenance. In v2, we plan to integrate **MongoDB** for persistent storage.  
> This project was originally developed some time ago, but I am uploading it today as I had previously forgotten to publish it. The repository was private until now. I have updated the project, but the core features—such as the database for storing user data—are not yet fully functional. I plan to start working on Cute Cloud v2 soon to implement these features.

---

## ✨ Features

- 🔐 **User Authentication**: Powered by **Firebase Auth**
- 💬 **Suggestions Page**: Users can submit feedback to the developer
- 🤖 **Telegram Bot Integration**:
  - Receives live logs of suggestions
  - Admin can ban/unban users
  - View all suggestions stored in **JSON files**
- 🛠️ **Admin Panel in Telegram**: PIN-protected commands to manage suggestions & users
- 🌍 **Frontend Hosted on Netlify**
- ⚙️ **Backend Hosted on Replit**
- 🧊 Responsive and clean glassmorphic UI
- 🚀 Focused on **user experience** and **security**

---

## 🧰 Tech Stack

| Layer                | Technology                                      |
|---------------------|-------------------------------------------------|
| 🎨 Frontend          | HTML, CSS, JavaScript                           |
| 🔐 Authentication    | Firebase Auth                                   |
| 🧠 Backend           | Node.js, Express                                |
| 🗂️ Database (v1)     | JSON files                                      |
| 🌍 Frontend Hosting  | Netlify                                         |
| ⚙️ Backend Hosting   | Replit                                          |
| 📡 Real-time Logs    | Telegram Bot                                    |
| 🛠️ Admin Panel       | Telegram Bot with PIN protection                |

---

## 🖼️ Background Image Usage

We use a **custom background image (`dashboard4.jpg`)** in this project:

![Background Preview](assets/dashboard4.jpg)

⚡ **Performance Note:**  
Always try to use **compressed or low-sized images** for backgrounds.  
This ensures **faster loading times** and a **smoother user experience**, especially for larger recipe collections.

---

## 📲 Telegram Integration & Admin Panel

**Cute Cloud ☁️** leverages **Telegram** for real-time logs and admin management.

- **Telegram Bot:** [@Jevejebekg_bot](https://t.me/Jevejebekg_bot)  
  - PIN-protected admin panel: `0103`  
  - Admin can execute commands directly from Telegram:
    - 🚫 Ban/Unban users
    - 📝 View all suggestions / delete them
    - 🔌 Turn off server safely
    - ⚡ Check server status
    - …and more

- **Telegram Channel for Live Logs:** [Live Logs Channel](https://t.me/+2F0M5MXAVxNkOWM1)  
  - Every new suggestion submitted by users is automatically logged here in real-time  
  - If a user submits inappropriate content (spam, abuse, banned words), they are automatically banned and a notification appears in the channel

### 🔍 Features at a Glance

| Feature                      | Description                                                                 |
|-----------------------------|-----------------------------------------------------------------------------|
| 📡 Real-time logs            | All user suggestions appear in the Telegram channel instantly              |
| 🛠️ Admin controls via bot    | Ban/unban users, list messages, check server status, turn off server       |
| 🚫 Automatic moderation      | Users submitting spam/inappropriate content are auto-banned                |
| 🔐 Secure access             | Admin commands are PIN-protected for safety                                |

> This system ensures **secure, real-time monitoring** and **management of user suggestions** without needing to access the backend directly.

---

## 👨‍💻 Developed By

**[Sanket Padhyal](https://github.com/sanketpadhyal)**  
- Passionate about building secure and cute web applications  
- Focused on improving user experience and creating interactive platforms  
- Follow his projects on GitHub for more innovative creations

---

## 🏷️ Ownership  

© 2025 **Sanket Padhyal**. All rights reserved.  

---
