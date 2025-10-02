# 🏭 Warehouses Management App

A warehouse & user management system built with **React**, **TailwindCSS**, and **React Router**.  
This project demonstrates CRUD operations, state management, and reusable UI components with a focus on scalability and clean code.

---

## ✨ Features

### 🏢 Warehouses
- Add new warehouses  
- Edit warehouse details  
- Delete warehouses  
- List all warehouses  

### 📦 Products
- Add, edit, delete, and list products  
- Stock management per warehouse  

### 🧑‍🤝‍🧑 Users
- Add, edit, delete, and list users with persistence  
- Dynamic routing with `/users/edit/:id`  
- Validation using **Zod + React Hook Form**  

### 📂 Categories & Merchants
- Full CRUD operations  
- Consistent UI/UX design  

---

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router, TailwindCSS  
- **State Management**: React Hooks (`useState`, `useEffect`, `useContext`)  
- **Validation**: [Zod](https://zod.dev/) + React Hook Form  
- **Persistence**: LocalStorage (can be swapped with API/Database later)  
- **UI Components**: Reusable components (e.g., `UserProfileCard`)  

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Efwan016/Dummy-warehouses
cd warehouses-store
2. Install dependencies
bash
Copy code
npm install
3. Run the app
bash
Copy code
npm run dev
📖 Project Structure
bash
Copy code
src/
├── components/        # Reusable components (UserProfileCard, Sidebar, etc.)
├── pages/
│   ├── products/      # Product CRUD pages
│   ├── warehouses/    # Warehouse CRUD pages
│   ├── users/         # User CRUD pages
│   ├── categories/    # Category CRUD pages
│   ├── merchants/     # Merchant CRUD pages
│   └── auth/          # Login, Forgot Password
├── hooks/             # Custom hooks (useAuth, etc.)
├── api/               # Axios config (future API integration)
└── App.jsx            # Main routing setup
📝 Milestones
✅ Built Warehouse Section with modal & CRUD operations

✅ Implemented Product Management linked to warehouses

✅ Added User Management Section with Zod validation

✅ Integrated Role-based Protected Routes

✅ Designed scalable UI with TailwindCSS

📌 Roadmap
 Replace LocalStorage with REST API / Database (e.g., Laravel backend)

 Add Authentication & Authorization

 Implement Search & Filtering

 Dark Mode Support

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

📜 License
MIT License © 2025 Efwan Rizaldi
