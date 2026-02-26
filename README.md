# 📚 Library Management System

A Full Stack Library Management System built using Django REST Framework and React.

---

## 🚀 Tech Stack

### Backend
- Django
- Django REST Framework
- Simple JWT Authentication

### Frontend
- React (Vite)
- Axios
- Tailwind CSS

---

## 🔑 Features

- User Registration & Login (JWT Authentication)
- Role-Based Access (Admin / User)
- Add Books (Admin Only)
- Borrow Books
- Return Books
- Automatic Fine Calculation
- Borrow History Page
- Pagination
- Search Functionality

---

## 📂 Project Structure

```
library-management-system/
│
├── backend/
│   ├── accounts/
│   ├── library/
│   └── manage.py
│
├── frontend/
│   ├── src/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 🔹 Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend runs at:
```
http://127.0.0.1:8000/
```

---

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
```
http://localhost:5173/
```

---

## 🔐 Authentication

JWT based authentication using:

- Access Token
- Refresh Token

Protected Routes implemented in React.

---

## 🧪 Test Credentials (Optional)

Admin:
```
Username: admin
Password: admin123
```

User:
```
Username: user1
Password: user123
```

---

## 📈 Future Improvements

- Email notifications
- Fine payment integration
- Book cover image upload
- Deployment to cloud
- Docker support

---

## 👨‍💻 Author

Prasad

GitHub: https://github.com/prasad6302