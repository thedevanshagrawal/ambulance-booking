# 🚑 **Ambulance Booking System**

A **comprehensive ambulance booking system** designed to streamline emergency medical services by connecting **patients, ambulance drivers, and hospitals** through a unified platform. The system allows users to **book an ambulance, track their previous bookings**, and enables **admins to manage users and booking history** efficiently.

---

## **📌 Features**

### **For Users (Patients)**

✅ **User Registration & Login** – Secure authentication for users to access the system.  
✅ **Book an Ambulance** – Easily request an ambulance based on availability and location.  
✅ **View Previous Bookings** – Keep track of past ambulance bookings and their statuses.

### **For Admins**

✅ **Manage Users** – View registered users and their details.  
✅ **View Booking History** – Track all past bookings with real-time data.  
✅ **Admin Dashboard** – Centralized management of the entire system.

### **General Features**

✅ **Dark Mode** – Toggle between light and dark themes.  
✅ **Mobile-Friendly UI** – Fully responsive for mobile, tablet, and desktop.  
✅ **Secure API Integration** – Built with **Node.js & Express.js** for backend operations.  
✅ **Fast Performance** – Optimized frontend with **React.js & Vite.js**.

---

## **🛠️ Tech Stack**

| **Technology**   | **Purpose**                                    |
| ---------------- | ---------------------------------------------- |
| **React.js**     | Frontend framework for a fast & dynamic UI.    |
| **Vite.js**      | Bundler for optimized performance.             |
| **Tailwind CSS** | Modern styling for responsiveness & dark mode. |
| **Node.js**      | Backend for handling API requests.             |
| **Express.js**   | Lightweight framework for server-side logic.   |
| **MongoDB**      | NoSQL database to store user & booking data.   |
| **JWT**          | Secure authentication & session management.    |
| **Lucide Icons** | High-quality icons for UI enhancements.        |

---

## **🚀 Installation & Setup**

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/thedevanshagrawal/ambulance-booking.git
cd ambulance-booking
```

### **2️⃣ Install Backend Dependencies**

Navigate to the backend directory and install necessary packages:

```sh
cd ambulance-booking-backend
npm install
```

### **3️⃣ Configure Environment Variables**

Create a `.env` file in the backend directory and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### **4️⃣ Start the Backend Server**

```sh
npm run dev
```

The backend will run on `http://localhost:5000`.

### **5️⃣ Install Frontend Dependencies**

Open a new terminal, navigate to the frontend directory, and install necessary packages:

```sh
cd ../ambulance-booking-frontend-core
npm install
```

### **6️⃣ Start the Frontend Server**

```sh
npm run dev
```

The frontend will run on `http://localhost:5173`.

---

## **📂 Project Structure**

```
ambulance-booking/
├── ambulance-booking-backend/
│   ├── config/                # Configuration files (DB, auth, etc.)
│   ├── controllers/           # Business logic for API endpoints
│   ├── models/                # MongoDB schemas (User, Booking, etc.)
│   ├── routes/                # Express routes for users & bookings
│   ├── .env                   # Environment variables
│   ├── server.js              # Main backend entry point
│   └── package.json           # Backend dependencies
│
└── ambulance-booking-frontend-core/
    ├── public/                # Static assets
    ├── src/
    │   ├── components/        # Reusable UI components (Navbar, Forms)
    │   ├── pages/             # Page-level components (Booking, Admin)
    │   ├── App.js             # Main React app component
    │   ├── index.js           # Entry point for React
    └── package.json           # Frontend dependencies
```

---

## **🔮 Future Enhancements**

🚀 **Live Ambulance Tracking** – Integrate Google Maps API to track ambulance locations in real time.  
🚀 **Emergency Alerts** – Implement **SMS/email notifications** for booking confirmations.  
🚀 **Payment Integration** – Add **online payment gateways** for service charges.  
🚀 **Driver Module** – Allow ambulance drivers to update their availability & manage rides.
