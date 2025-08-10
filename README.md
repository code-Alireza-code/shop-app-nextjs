# Shop App (Next.js)

A full-stack e-commerce platform built with Next.js, React, and Node.js. This project features an admin panel, user authentication, product management, coupon system, cart, payment integration, and more.

## Features

- Modern Next.js frontend with Tailwind CSS
- Admin panel for managing products, categories, coupons, payments, and users
- User authentication and profile management
- Cart and checkout flow
- Coupon/discount system
- Persian (Jalali) calendar support for coupons
- RESTful backend API (Node.js/Express)
- React Query for data fetching
- Form validation with Zod and React Hook Form

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/code-Alireza-code/shop-app-nextjs.git
   cd shop-app-nextjs
   ```
2. Install dependencies for both frontend and backend:
   ```sh
   cd frontend && npm install
   cd ../backend && npm install
   ```

### Running the App

- **Frontend (Next.js):**
  ```sh
  cd frontend
  npm run dev
  ```
- **Backend (Node.js/Express):**
  ```sh
  cd backend
  npm start
  ```

### Environment Variables

- Configure your environment variables in `frontend/.env.local` and `backend/.env` as needed (e.g., API URLs, database connection).

## Folder Structure

```
shop-app-nextjs/
├── frontend/   # Next.js app
│   ├── src/
│   ├── public/
│   └── ...
├── backend/    # Node.js/Express API
│   ├── app/
│   ├── models/
│   └── ...
└── README.md
```

## Technologies Used

- Next.js
- React
- Tailwind CSS
- React Query
- React Hook Form
- Zod
- Node.js
- Express
- MongoDB

## License

This project is licensed under the MIT License.

## Author

- [code-Alireza-code](https://github.com/code-Alireza-code)
