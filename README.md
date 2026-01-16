# 🎬 Netflix Clone Web Application

A Netflix-inspired streaming platform built with **React** + **Vite**, showcasing modern frontend architecture, authentication, API integration, and responsive UI design.

## 🚀 Overview

This project replicates the core Netflix experience:

- User authentication  
- Movie discovery  
- Trailers  
- Favorites  
- Personalized accounts  

Focuses on clean UI, scalable folder structure, and real-world tools used in production-grade React applications.

## ✨ Features

- 🔐 **Authentication System** – Signup, login, password recovery (Firebase Auth)  
- 🎞️ **Movie Discovery** – Netflix-style rows & categories  
- 📄 **Movie Details Pages** – Trailers + detailed information  
- 🔍 **Search Functionality** – Search movies across the platform  
- ❤️ **Favorites** – Save and manage favorite movies  
- 👤 **User Account Page** – Profile and preferences management  
- 💳 **Subscription Plans** – Display available tiers (mock)  
- ▶️ **Trailer Playback** – YouTube integration  
- 📱 **Responsive UI** – Mobile-first design with Tailwind CSS  

## 🛠️ Tech Stack

### Frontend
- React 19  
- Vite  
- React Router v7  

### Styling
- Tailwind CSS  
- Lucide React (icons)  

### Backend / Auth
- Firebase Authentication  

### Data & APIs
- Axios  
- The Movie Database (**TMDb**) API  

### Media
- react-youtube  

## 📁 Project Structure

```text
src/
├── components/       # Reusable UI pieces
│   ├── Navbar.jsx
│   ├── MovieCard.jsx
│   ├── Banner.jsx
│   └── ...
├── pages/            # Route-level pages
│   ├── Login.jsx
│   ├── Home.jsx
│   ├── Movie.jsx
│   ├── Account.jsx
│   └── ...
├── context/          # Global state & auth context
├── data/             # API requests, constants, helpers
├── assets/           # images, logos, etc.
├── App.jsx
└── main.jsx
```
## 📸 Screenshots
### Landing Page
<img width="1914" height="854" alt="image" src="https://github.com/user-attachments/assets/f2c4606e-7c27-4ed2-9ef1-e6a6d416757c" />

### Home Page
<img width="1899" height="875" alt="image" src="https://github.com/user-attachments/assets/58681215-4556-4800-b390-b570084a2db3" />

### Search Feature
<img width="1588" height="707" alt="image" src="https://github.com/user-attachments/assets/3a0df495-d369-4a35-806e-5007467378fc" />

### Movie Details
<img width="1669" height="847" alt="image" src="https://github.com/user-attachments/assets/30259964-effb-48ef-886f-cac421645b75" />


## 🎯 Learning Outcomes

- Implemented full authentication flow + protected routes
- Integrated third-party APIs (TMDb) with clean data fetching
- Built scalable React architecture using Context API
- Created responsive, modern UI with Tailwind CSS
- Worked with embedded video playback (YouTube)

## 📌 Future Improvements

- Real payment integration (Stripe / subscription handling)
- Watch history & continue watching
- Advanced recommendation system
- Lazy loading + performance optimizations
- Caching (React Query / SWR)
- Dark/light theme toggle
- Trailers autoplay on hover (like Netflix)
