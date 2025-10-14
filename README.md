# 🏢 Adzani Warehouses — Frontend Only Demo

**Adzani Warehouses Dummy** is a **React.js**-based warehouse management system built entirely on the **frontend**, using **LocalStorage** for data persistence.  
It simulates a real-world warehouse & merchant management system — designed to demonstrate **data architecture, reactivity, and modular frontend design**.

---

## ✨ Key Features

### 🧩 Entity System
Hierarchical data structure with clear relationships:
- **Merchant** → has many **Warehouses**
- **Warehouse** → has many **Categories**
- **Category** → has many **Products**
- **Product** → belongs to `category_id`, `warehouse_id`, and `merchant_id`

### 👥 Role-Based Access
- **Admin**: Manage all merchants, warehouses, and users  
- **Manager / Keeper**: Access only assigned merchant and warehouse data  
- Role synchronization handled by `useAssignUserRole` and `useMerchants`

### 📦 Product Management
- Full CRUD: add, edit, delete products  
- Stock management per warehouse  
- Instant photo preview before saving  
- Automatic UI reactivity using `window.dispatchEvent`

### 💳 Transactions
- Accordion-based transaction list  
- Product detail modal for quick view  
- Dynamic Grandtotal and customer information  

### 🧠 Data Flow & Synchronization
- Hooks like `useProducts`, `useMerchants`, and `useWarehouses` act as data hubs  
- Event-driven architecture ensures all components stay in sync  
- LocalStorage serves as the **single source of truth**  
- Easily replaceable with API integration for real backend data

---

## ⚙️ Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | React 18, React Router, TailwindCSS |
| **State Management** | React Hooks (useState, useEffect, Context) |
| **Validation** | Zod + React Hook Form |
| **Persistence** | LocalStorage (Frontend Only) |
| **UI/UX** | Tailwind Components + Modern Minimalist Design |

---

## 🏗️ Architecture Concepts

### 1️⃣ Event-Driven Updates
Uses `window.dispatchEvent` to broadcast changes between components — ensuring real-time synchronization without complex global state tools.

### 2️⃣ Light vs Heavy Data
Two data layers:
- **Light Data** → optimized for list rendering  
- **Heavy Data** → used for detailed views and editing  

### 3️⃣ Backend-Ready
The entire codebase is structured to easily integrate with a backend (e.g., Axios + REST API).  
Simply replace LocalStorage handlers with API calls — no major refactor needed.


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

src/
├── components/         # Reusable UI components
├── hooks/              # Custom hooks (useProducts, useMerchants, etc.)
├── pages/              # Main app pages (Overview, Users, Transactions, etc.)
├── utils/              # Helpers and constants
├── assets/             # Images & icons
└── App.jsx             # Root component



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
