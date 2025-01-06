# Buwuy Origami Shop E-Commerce Frontend

This repository contains the **React** frontend of the **Buwuy Origami Shop** — a demonstration of an e-commerce platform that offers a storefront (with product browsing, searching, filtering, and checkout) as well as a robust admin panel for managing the store's data and operations. This project is built primarily with **Vite**, **React**, and **Material UI**.

---

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Features](#project-features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Project](#running-the-project)
- [Admin Panel and Access Control](#admin-panel-and-access-control)
- [Local Storage / Session Storage](#local-storage--session-storage)
- [Contributing](#contributing)
- [License](#license)

---

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Vite**: Modern development build tool for fast bundling and hot reloading.
- **Material UI**: UI component library for React.
- **React Router DOM**: For handling routing in the React application.
- **Axios**: For making HTTP requests to the backend.
- **Day.js**: For date manipulation.
- **ApexCharts (via react-apexcharts)**: For rendering charts/graphs in admin dashboards.
- **Joi**: For client-side data validation.
- **React Markdown**: For rendering markdown content (if needed).
- **DND Kit**: For drag-and-drop functionality.
- **ESLint**: For linting and code consistency.

---

## Project Features

1. **Storefront**  
   - **Home page** displaying featured or new products.  
   - **Shop categories** to browse products by category.  
   - **Search** functionality (by text) and **filter** by tags.  
   - **Cart & checkout** procedure with shipping and payment steps.  
   - **Product stock tracking** — users cannot purchase out-of-stock items.

2. **Order Management**  
   - **Demo checkout and payment** flow.  
   - **Order status tracking** for guests and logged-in users.  
   - **Users** can view their order history and see older orders.

3. **User Profile**  
   - **Edit profile** information (contact and address) to simplify checkout steps.  

4. **Admin Panel**  
   - **Dashboard** with sales, income, and user stats displayed via charts/graphs.  
   - Management of categories, tags, products, orders, and users (with role-based restrictions).
   - **User roles**: Admin vs. Moderator vs. Regular User.

---

## Project Structure

Below is a simplified overview of the main directories in `src/`:

```
buwuy-frontend
├── public/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── providers/
│   ├── schema/
│   ├── services/
│   ├── utils/
│   ├── Routes.jsx
│   ├── main.jsx
│   └── ...
├── .env.local      (ignored by Git)
├── package.json
├── vite.config.js
└── ...
```

- **`api/`**: Functions or utilities for making requests to the backend.  
- **`assets/`**: Static or shared assets (images, icons, etc.).  
- **`components/`**: Reusable React components (including UI layout, admin components, etc.).  
- **`hooks/`**: Custom React hooks for encapsulating reusable logic.  
- **`pages/`**: Top-level route pages (e.g., ShopPage, AdminDashboard, etc.).  
- **`providers/`**: Context providers for global state (e.g., theme, cart, categories, tags).  
- **`schema/`**: Validation schemas (e.g., Joi) for forms or data.  
- **`services/`**: Logic that interacts with external services or APIs (beyond simple requests).  
- **`utils/`**: Utility/helper functions (e.g., formatting, data manipulation).  
- **`Routes.jsx`**: Defines the main routing structure for both the storefront and admin panel.  
- **`main.jsx`**: The application entry point for Vite/React.  
- **`.env.local`**: Environment-specific variables (e.g., `VITE_ROOT_URI`) — ignored by Git.

---

## Getting Started

### Prerequisites

- **Node.js** (version 14+ recommended)
- **npm** or **yarn** (npm is used in these instructions)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/buwuy-frontend.git
   cd buwuy-frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

### Environment Variables

The project uses Vite’s approach to environment variables. By default, **VITE_*** variables are loaded from `.env.local`, `.env.development`, and/or `.env` files, depending on your setup.  

An example `.env.local` file might look like:

```
VITE_ROOT_URI=http://localhost:5000
```

- `VITE_ROOT_URI` is the base URL for your backend’s API. You can change this to match your deployed backend or a local backend.

> **Note**: `.env.local` is typically ignored by Git so you can customize settings privately.

### Running the Project

- **Development mode** with hot reload:

  ```bash
  npm run dev
  ```

- **Production build**:

  ```bash
  npm run build
  ```

- **Preview the production build**:

  ```bash
  npm run preview
  ```

---

## Admin Panel and Access Control

- **Admin Panel** is accessible under the path: `/admin`.
- **Login** for admins and moderators: `/admin/login`.
  - **Admins** can manage all areas, including users.  
  - **Moderators** can manage categories, tags, products, and orders (but not users).
- **Dashboard** provides key statistics (sales, income, user registrations) via charts, plus quick links to management pages.

---

## Local Storage / Session Storage

This application stores several items in **localStorage** or **sessionStorage**, such as:

- **Authentication tokens** (e.g., JWT).
- **Shopping cart** data.
- **User-specific settings**, like theme mode.

If you encounter issues or wish to reset your session, **clearing localStorage and sessionStorage** in the browser is often necessary. This can help fix problems related to stale tokens or incomplete cart data.

---

## Contributing

Contributions, bug reports, and feature requests are welcome. Please open an issue or submit a pull request with any improvements or fixes you make. When contributing, please follow best practices for React and ensure consistent code style with ESLint.

---

## License

This project is licensed under the [ISC License](LICENSE). You are free to modify, distribute, or use this project under the terms of the license.

---

**Happy coding and enjoy using the Buwuy Origami Shop frontend!** If you have any questions or suggestions, feel free to reach out.