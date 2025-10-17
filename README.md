# SilkAura Beauty

Premium Skincare for Radiant Skin

---

<p align="center">
  <img alt="SilkAura Logo" src="./public/placeholder.svg" height="100" />
</p>

---

## 🌟 Overview

SilkAura Beauty is a premium skincare shop built using modern web technologies, offering a seamless online shopping experience for skincare lovers. Shop products, manage your cart and wishlist, and quickly find answers to common questions—all on a beautifully designed, responsive site.

---

## 📚 Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Main Scripts](#main-scripts)
- [Contributing](#contributing)
- [Contact & Author](#contact--author)

---

## ✨ Features
- Responsive, modern UI built with React, TypeScript, and Tailwind CSS
- Beautiful shadcn/ui components (Radix UI base)
- Product listing, details, add-to-cart, wishlist, and checkout flow
- Informational pages (FAQ, Contact, Shipping, Returns)
- Accessible design and fast, optimized performance

---

## 🚀 Demo

Once running locally, access: [http://localhost:8080](http://localhost:8080)

---

## 🛠 Tech Stack
- **Vite** — Next-gen frontend tooling
- **React** — Component-driven UI
- **TypeScript** — Static typing for maintainability
- **Tailwind CSS** — Utility-first styling
- **shadcn/ui** — Component library (with Radix UI)
- **Zustand** — Simple state management

---

## 🏁 Getting Started

1. **Clone the repository**
    ```sh
    git clone <YOUR_REPO_URL>
    cd silkaura
    ```

2. **Install dependencies**
    ```sh
    npm install
    ```

3. **Run the development server**
    ```sh
    npm run dev
    ```

4. **Open in your browser**
    - Local: http://localhost:8080
    - Network: http://192.168.1.12:8080

5. **Build for production**
    ```sh
    npm run build
    ```
---

## 📂 Project Structure

```
silkaura/
├── public/                 # Static assets (favicon, logos, placeholder images)
├── src/
│   ├── assets/             # Product and hero images
│   ├── components/         # App-specific and UI component modules
│   │   └── ui/             # shadcn/ui components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities, global store
│   ├── pages/              # Major routes/pages (Cart, Products, FAQ, etc.)
│   ├── App.tsx             # Main app wrapper
│   └── main.tsx            # Entry point
├── index.html              # HTML template
├── tailwind.config.ts      # Tailwind setup
├── vite.config.ts          # Vite bundler config
└── package.json            # Project metadata
```

### 🧭 Navigation
- **Home Page**: `/` — Landing, hero, featured products
- **Products**: `/products` — All products listing
- **Product Detail**: `/products/:id` — Details and buy/add/wishlist
- **Cart**: `/cart` — Manage items for purchase
- **Wishlist**: `/wishlist` — Saved for later
- **Checkout**: `/checkout` — Order summary & payment
- **FAQ**: `/faq` — Common questions
- **Contact**: `/contact` — Get in touch
- **Shipping**: `/shipping` — Shipping information
- **Returns**: `/returns` — Return/refund policy
- **404**: `/notfound` — Not found error page

---

## 📝 Main Scripts

- `npm run dev` — Start development server
- `npm run build` — Build and optimize application
- `npm run preview` — Preview final build locally
- `npm run lint` — Run linter for code checks

---

## 🤝 Contributing

1. **Fork** the repo and **clone** your fork:
   ```sh
   git clone https://github.com/YOUR-USERNAME/silkaura.git
   ```
2. **Create a branch** for your feature or fix:
   ```sh
   git checkout -b feature/your-feature
   ```
3. **Make your changes** and **commit**:
   ```sh
   git add . && git commit -m "Add new feature"
   ```
4. **Push** your branch:
   ```sh
   git push origin feature/your-feature
   ```
5. Open a Pull Request to the `main` branch on GitHub.

---

## 📬 Contact & Author

**Tayab Malik**  
✉️ tayabghafor@gmail.com  
[LinkedIn](https://www.linkedin.com/in/tayabmalik)

Feel free to reach out for questions, suggestions, or collaboration.

---

<p align="center"><em>Made with ❤️ by SilkAura Beauty & Tayab Malik</em></p>
