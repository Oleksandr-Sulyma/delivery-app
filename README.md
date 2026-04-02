# 🍔 Delivery App — Fullstack E-commerce Solution

A modern, high-performance food delivery application built with **Next.js 16**, **Node.js/Express**, and **MongoDB**. This project features a persistent shopping cart, real-time order history tracking, and a sophisticated coupon engine with automated lifecycle management.

---

## 🏆 Implementation Levels (Technical Requirements)

This project has been developed to meet and exceed the requirements of the technical task:

### ✅ Basic Level (Core)
* **Shop Selection**: Dynamic sidebar to switch between different restaurant catalogs.
* **Product Management**: Grid display of shop-specific products with real-time availability checks.
* **Shopping Cart**: Full CRUD functionality (Add, Remove, Update quantity) with automatic subtotal calculation.
* **Checkout Workflow**: Integrated form for user data (Name, Email, Phone, Address) with format validation.
* **Local Persistence**: Shopping cart state is managed via `Zustand` and persisted in `localStorage`.

### 🚀 Intermediate Level (Enhanced)
* **Order History**: Dedicated "History" page allowing users to retrieve past orders by Email and Phone number.
* **Backend Validation**: Robust server-side data integrity using `Joi` and `Celebrate` middleware.
* **Dynamic Calculations**: Real-time price updates including discounts and quantity changes.

### 🔥 Advanced Level (High Complexity)
* **Coupon & Promo Engine**: 
    * **Coupons Page**: A dedicated UI displaying active promotional offers.
    * **Copy-to-Clipboard**: Enhanced UX for quick promo code usage.
    * **Server-side Validation**: Coupons feature expiration dates (`expiresAt`) and status flags (`isActive`).
    * **Single-use Automation**: Coupons are automatically marked as `isActive: false` in the database upon successful order placement to prevent reuse.
    * **Database Automation**: Implemented **TTL (Time To Live) Indexes** in MongoDB for automatic cleanup of expired coupons.
* **Advanced UI/UX**: 
    * Custom phone number masking (`XX-XXX-XX-XX`).
    * Responsive layouts using `Ant Design` and `Styled JSX`.
    * Global notifications and modal confirmations for critical actions.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **State Management**: Zustand (Persist Middleware)
- **UI Components**: Ant Design (antd)
- **Styling**: Styled JSX & CSS Modules
- **API Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Validation**: Joi / Celebrate
- **Security**: CORS, Helmet

---

## ⚙️ Key Architecture & Logic

### 🎟 Coupon Lifecycle
1. **Fetch**: Frontend retrieves only active and non-expired coupons from `GET /api/coupons`.
2. **Validate**: Before applying, the app verifies the code via `GET /api/coupons/validate/:code`.
3. **Apply**: Discount is calculated on the client-side and verified on the server-side during order creation.
4. **Deactivate**: Once the order is saved, the backend immediately updates the coupon's `isActive` status to `false`.

### 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone [https://github.com/Oleksandr-Sulyma/delivery-app.git](https://github.com/Oleksandr-Sulyma/delivery-app.git)
   ```

2. **Backend Configuration**:
   - Navigate to `/backend`
   - Run `npm install`
   - Create a `.env` file with `MONGODB_URL` and `PORT`
   - Start: `npm run dev`

3. **Frontend Configuration**:
   - Navigate to `/frontend`
   - Run `npm install`
   - Start: `npm run dev`

---

## 📝 License
Distributed under the MIT License. See `LICENSE` for more information.

**Author**: [Oleksandr Sulyma](https://github.com/Oleksandr-Sulyma)
```
