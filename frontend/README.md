# 📚 Library Management System (Full Stack)

A full-stack Library Management System built using **Django REST Framework** and **React (Vite)** with JWT authentication.

---

## 🚀 Features

### 👨‍🎓 Student

- Register & Login (JWT)
- View available books
- Issue books
- Return issued books
- View personal issued books

### 📖 Book Management

- Track total copies
- Track available copies
- Auto-update availability on issue/return

---

## 🛠 Tech Stack

### Backend

- Python
- Django
- Django REST Framework
- Simple JWT
- SQLite (development)
- PostgreSQL (production-ready)

### Frontend

- React (Vite)
- Tailwind CSS
- Axios
- React Router

---

## 📂 Project Structure

Library_Management_System/
│
├── backend/
│ ├── books/
│ ├── users/
│ ├── transactions/
│ ├── core/
│ └── manage.py
│
└── frontend/
├── src/
│ ├── pages/
│ ├── api/
│ └── App.jsx

---

## ⚙️ Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver


Backend runs at:

http://127.0.0.1:8000

⚙️ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173

🔐 Authentication

JWT-based authentication

Access token stored in localStorage

Protected routes using React Router

🌐 API Endpoints (Sample)

POST /api/token/ → Login

GET /api/books/ → List books

POST /api/transactions/ → Issue book

POST /api/transactions/{id}/return_book/ → Return book

GET /api/transactions/ → My issued books

📌 Future Enhancements

Librarian role (add/edit books)

Search & filter books

Email notifications

Deployment (Render + Vercel)

👤 Author

Your Name
Full Stack Developer (Django + React)

⭐ Notes

This project demonstrates:

REST API design

JWT authentication

Frontend–backend integration

Real-world CRUD operations


---

## 🏁 YOU ARE HERE NOW

✔ Polished UI
✔ Clean logic
✔ Interview-ready
✔ README done

### 👉 Next (your choice):
- **`roles`** → Librarian vs Student
- **`deploy`** → PostgreSQL + Render + Vercel (FINAL)

Just tell me the word.
```
