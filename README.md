# ✍️ The-Write-Attah

**The-Write-Attah** is a personal blog and portfolio website built for **Ojonugwa John Attah** — a creative writer, storyteller, and digital enthusiast. The platform showcases his published works and allows readers to engage through blog content, comments, and more.

---

## 🌍 Live Website

🔗 [https://the-write-attah.vercel.app](https://the-write-attah.vercel.app)



## ✨ Features

### 👤 Portfolio & Personal Brand
- **CV Preview**: Visitors can preview and download the blog owner's CV.
- **Project Showcase**: Displays writing samples, creative projects, and personal achievements.

### 📝 Blog Management
- **Create Posts**: Authenticated blog owner can write and publish new blog articles.
- **Edit/Delete Posts**: Owner can modify or delete any blog post.
- **Rich Content**: Each post supports titles, images, descriptions, and full text.

### 👥 Reader Interaction
- **Read Blog Posts**: All visitors can access published content.
- **Comment System**: Logged-in users can post, edit, and delete comments.
- **Like Posts**: Readers can like articles to show appreciation.
- **Google Authentication**: Secure sign-in for users via Google.

### 📱 Responsive Design
- Fully mobile-friendly and works across all screen sizes.

---

## 🔧 Tech Stack

- **Frontend**: Angular 18, TypeScript, HTML5, SCSS
- **Authentication**: Firebase Google Auth
- **Database**: Firebase Firestore (for blog data and comments)
- **Storage**: Cloudinary (for image uploads)
- **Hosting**: Vercel

---

## 📁 Folder Structure

The-Write-Attah/
├── src/
│ ├── app/
│ │ ├── components/
│ │ ├── services/
│ │ 
│ ├── assets/
│ ├── environments/
│ └── index.html
├── angular.json
├── package.json
├── vercel.json
└── README.md


🛡️ Authentication and Roles
Only the blog owner (identified via ownerUid) can create, edit, or delete posts.

Visitors must log in with Google to comment, like, or manage their own comments.

📬 Contact
Portfolio Website: https://the-write-attah.vercel.app

Email: attahwrites@example.com

📄 License
This project is for personal and professional branding purposes.
All rights reserved © Ojonugwa John Attah.