# Artizans' Mart E-Commerce Frontend 🛍️

This repository contains the full frontend implementation for Artizans' Mart, a modern e-commerce platform built with **React** and **Tailwind CSS**. The project features robust authentication flows, role-based access control, dynamic product views, and a secure checkout experience.

---

## ✨ Key Features

This project focuses on enterprise-level security and user experience by implementing the following core features:

* **Role-Based Access Control (RBAC):** Restricts key routes, like the admin dashboard, to only authorized users.
* **Modal Authentication System:** Provides a smooth user flow by presenting a login modal on the current page when users attempt protected actions (e.g., clicking "Buy Now").
* **Google Sign-In Integration:** Offers fast, convenient social login via Firebase/third-party services.
* **Server-Side Pagination:** Efficiently handles large product catalogs by fetching data slices from the backend API, ensuring fast page loads and scalability.
* **Global State Management:** Uses **React Context API** for managing user session, cart state, and modal visibility globally.

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

* **Node.js** (LTS version)
* A running **Backend API** (must support the required user, product, and login endpoints as designed in this project).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/artizans-mart-frontend.git](https://github.com/yourusername/artizans-mart-frontend.git)
    cd artizans-mart-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add your Firebase credentials or other configuration details:
    ```env
    # Example Firebase Config
    VITE_FIREBASE_API_KEY="your_api_key"
    VITE_AUTH_DOMAIN="your_auth_domain"
    # ... other variables
    
    # Example Backend API URL
    VITE_API_BASE_URL="http://localhost:5000" 
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

The application should now be accessible at `http://localhost:5173` (or the port specified by your Vite/React setup).

---

## 🔒 Authentication & Protection Flow

### 1. The `ModalRoute` System

Protected pages (e.g., `/checkout`, `/place-order`) are wrapped with the `<ModalRoute />`.

* **If authenticated:** Access is granted (`return children`).
* **If unauthenticated:** The route calls `openLoginModal()` from the context and returns `null`, preventing navigation and displaying the login modal on the user's current page.

### 2. Role-Based Access Control (RBAC)

The **Dashboard** route is specifically restricted using an `AdminRoute` component (or logic within `ModalRoute`):

* **Logic:** Access requires `user && user.role === 'admin'`.
* **Implementation:** The user's role is stored in the **`AuthContext`** upon successful login, eliminating the need for an extra network request.

### 3. Conditional UI (Navbar)

The **Dashboard button** in the `Navbar` is only rendered if `user && user.role === 'admin'`.

---

## 📦 Project Structure

The codebase is organized using a clean component architecture:
