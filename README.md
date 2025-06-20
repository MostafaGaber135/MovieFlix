# 🎬 MovieFlix

MovieFlix is a React-based movie browser that lets users search, explore, and view details of movies using the TMDb API. Users can register, log in, add favorite movies (saved in `localStorage` per user), and enjoy a responsive, clean UI built with Tailwind CSS and DaisyUI.

---

## 🚀 Features

- 🔍 Live movie search  
- 🎞 View movie details  
- ❤️ Add/remove favorite movies (Login required)  
- 🔐 User Authentication (Login/Register)  
- 🚫 Protected routes (Favorites page requires login)  
- 🧭 Navigation with React Router  
- ⚠️ Custom 404 Not Found Page  
- 🎨 Clean design with Tailwind CSS & DaisyUI  

---

## 🧰 Technologies Used

- React JS  
- React Router DOM  
- Tailwind CSS + DaisyUI  
- TMDb API  
- LocalStorage  
- Context API (for auth state)

---

## 📦 Installation

To run the app locally:

```bash
git clone https://github.com/MostafaGaber135/MovieFlix.git
cd movieflix
npm install
npm run dev
```
---

## 🔗 Live Demo

[👉 View Live App](https://movieflixyz.netlify.app/)

---

## 🔐 Authentication Rules
✅ Visitors can browse movies and use the search feature without logging in.

❌ Visitors cannot access the Favorites page unless they log in.

✅ Once logged in, favorites are saved per user in localStorage.

---

## 📸 Screenshots

| Home | Search | Favorites (Protected) | Login | Register | 404 Page |
|------|--------|-----------------------|-------|--------- | -------- |
| ![Home](src/assets/Home_Page.png) | ![Search](src/assets/Search_Page.png) | ![Favorites](src/assets/Favorites_Page.png) | ![Details](src/assets/Movies_Details_Page.png) |

> 🖼 Make sure these image files exist in a folder named `assets` in your repo.

---

## 🙏 Acknowledgments

- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [TMDb API](https://www.themoviedb.org/)
