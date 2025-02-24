## **Hayya Alal Falah**

> A Qada Salah tracker web application to help Muslims keep track of missed prayers and stay motivated with Hadith reminders.

### **📌 Overview**
Hayya Alal Falah is a **full-stack web application** built with **Django REST Framework (backend) and React (frontend using Vite + pnpm)**. 
It allows users to:
✅ **Track missed & completed Salah (Qada Salah)**  
✅ **Receive Hadith & motivational messages**  
✅ **Set reminders & notifications** (coming in future phases)  

---

### **🛠 Tech Stack**
#### **Frontend:**
- React (Vite)
- pnpm (Package Manager)
- React Router for navigation
- Axios for API calls
- Context API for authentication

#### **Backend:**
- Django & Django REST Framework (DRF)
- Simple JWT for authentication
- Django Filter for filtering Salah records
- SQLite (for development, PostgreSQL planned for production)

#### **Deployment (Planned):**
- Backend: **Heroku / Render / DigitalOcean**
- Frontend: **Vercel / Netlify**

---

### **📂 Folder Structure**
```
Hayya_Alal_Falah/
│── backend/          # Django Backend
│   │── apps/
│   │   │── users/          # User authentication & JWT
│   │   │── salah_tracker/  # Salah tracking API
│   │   │── hadiths/        # Hadith & motivation API
│   │── config/       # Django settings
│   │── manage.py     # Django CLI
│
│── frontend/         # React Frontend (Vite + pnpm)
│   │── src/
│   │   │── api/           # Axios instance
│   │   │── context/       # Auth Context
│   │   │── pages/         # Salah Tracker UI
│   │   │── components/    # Login UI
│   │── vite.config.js  # Vite configuration
│   │── index.html      # Root HTML
│
│── README.md         # Project Documentation
│── requirements.txt  # Backend dependencies
│── .env.example      # Environment variables example
```

---

### **⚡ Setup & Installation**
#### **1️⃣ Backend (Django Setup)**
```bash
cd backend
python -m venv venv  # Create virtual environment
source venv/bin/activate  # (Mac/Linux)
venv\Scripts\activate  # (Windows)
pip install -r requirements.txt  # Install dependencies
python manage.py migrate  # Apply migrations
python manage.py runserver  # Start backend server
```

#### **2️⃣ Frontend (React + Vite Setup)**
```bash
cd frontend
pnpm install  # Install dependencies
pnpm run dev  # Start frontend server
```

---

### **🚀 API Endpoints**
#### **User Authentication**
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/users/api/register/` | Register a new user |
| POST   | `/users/api/token/` | Obtain JWT access & refresh token |
| POST   | `/users/api/token/refresh/` | Refresh access token |
| POST   | `/users/api/logout/` | Logout user & blacklist refresh token |

#### **Salah Tracker**
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET    | `/salah_tracker/api/salah/` | Get all Salah records for logged-in user |
| POST   | `/salah_tracker/api/salah/` | Add a new Salah record |
| PUT    | `/salah_tracker/api/salah/:id/` | Update a Salah record |
| DELETE | `/salah_tracker/api/salah/:id/` | Delete a Salah record |

---

### **✅ Features Completed (MVP)**
✔ JWT Authentication (Login, Signup, Logout)  
✔ Salah Tracker API (CRUD)  
✔ React Frontend with Authentication  
✔ Salah Filtering (Date, Prayer Name, Status)  

### **🚀 Upcoming Features (Phase 2)**
⏳ Pagination for Salah records  
⏳ Hadith API with motivational messages  
⏳ Salah reminders & notifications  
⏳ Mobile app support  

---

### **🤝 Contributing**
Pull requests are welcome! Please open an issue first for major changes. Follow the project structure and coding style.

---

### **📩 Contact & Support**
For any queries, reach out to [your email or GitHub].

🚀 **Hayya Alal Falah – Track, Pray, Succeed!**