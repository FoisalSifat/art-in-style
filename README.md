# ART IN — Premium Artistic Streetwear E-Commerce

> **Live Preview:** [https://id-preview--6e67700b-2a56-41ba-a44f-4f89eee58b7f.lovable.app](https://id-preview--6e67700b-2a56-41ba-a44f-4f89eee58b7f.lovable.app)

**ART IN** is a modern, fully responsive e-commerce web application built for a premium streetwear brand. It delivers a smooth, visually engaging shopping experience — from animated hero banners to dynamic product catalogs, CMS-driven landing pages, a real-time admin dashboard, and end-to-end stock-aware order management.

---

## ✨ What It Does

- **Beautiful storefront** — showcases products, best sellers, featured collections, and brand storytelling with polished animations and responsive layouts.
- **CMS-driven landing pages** — admins can update hero banners, brand story, and about page content directly from the admin panel.
- **Product catalog** — supports both static products and dynamic products stored in the backend.
- **Smart shopping cart** — enforces stock limits, supports size/color selection, and allows quick checkout.
- **Admin dashboard** — password-protected area to manage products, categories, inventory, orders, and landing-page content.
- **Real-time inventory** — products can have size-based stock; orders automatically deduct stock on confirmation.
- **Buy-now flow** — product detail page allows direct add-to-cart + checkout shortcut.
- **WhatsApp contact integration** — contact form submissions redirect to the founder's WhatsApp.
- **Dark/light mode ready** — styled with a warm, cream-forward light mode and a deep dark mode.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3 + Tailwind Animate + DaisyUI |
| Components | shadcn/ui + Radix UI primitives |
| Animation | Framer Motion |
| Icons | Lucide React |
| State & Caching | React Context + TanStack Query |
| Backend / Database | Lovable Cloud (Supabase) |
| Storage | Supabase Storage for images |
| Auth | Custom password gate for admin panel |
| Testing | Vitest + React Testing Library |

---

## 📦 Key Features

### Storefront
- Animated hero slider with auto-rotating campaign banners
- Featured collection and best-sellers sections
- Brand story block with editable text and image
- Product listing page with grid layout and responsive filters
- Product detail page with image gallery, size/color selection, stock indicators, and buy-now action
- Cart drawer with quantity controls and total calculation
- Checkout page for completing orders
- About, Contact, FAQ, Shipping, Privacy, and Terms pages
- WhatsApp-integrated contact form
- Mobile-first responsive design with side-drawer navigation

### Admin Panel
- Password-protected access
- **Dashboard** with order stats
- **Product Management**
  - Add / edit products
  - Multi-image upload with gallery previews
  - Cover image selection
  - Color management with per-color image mapping
  - Size-based stock quantities
  - Custom category creation with deduplication
  - Toggle featured, best-seller, and new-product flags
- **Order Management**
  - View order details
  - Confirm orders (auto-deducts stock)
  - Delete orders
- **Landing Page CMS**
  - Hero banner and text editor
  - Brand story section editor
  - About page hero editor
  - Featured / best-seller toggler
- **Stock Management**
  - Total quantity automatically computed from size stock
  - Prevents overselling
  - Stock-out badge shown on product cards

---

## 🗂 Project Structure

```text
art-in/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── admin/           # Admin-specific editors
│   │   ├── home/            # Home page sections
│   │   └── layout/          # Navbar & Footer
│   ├── context/             # Cart, wishlist, theme context
│   ├── data/                # Static product catalog
│   ├── hooks/               # Data-fetching hooks
│   ├── integrations/        # Supabase client & types
│   ├── lib/                 # Helpers & defaults
│   ├── pages/               # Route pages
│   ├── App.tsx              # App routes
│   ├── index.css            # Tailwind + custom styles
│   └── main.tsx             # Entry point
├── supabase/                # Supabase migrations & config
├── index.html
├── tailwind.config.ts
├── vite.config.ts
├── vitest.config.ts
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:8080`.

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Run tests

```bash
npm run test
```

---

## ⚙️ Environment Variables

This project uses Lovable Cloud for the backend. Required variables are automatically injected by the platform. No manual Supabase key setup is needed during development.

```env
VITE_SUPABASE_URL=<auto-provided>
VITE_SUPABASE_PUBLISHABLE_KEY=<auto-provided>
VITE_SUPABASE_PROJECT_ID=<auto-provided>
```

---

## 🎨 Design Philosophy

- **Premium & bold:** strong typography (Outfit + Space Grotesk) and a gold accent color.
- **Warm and clean:** light mode uses cream/warm-gray tones instead of stark white.
- **Mobile-first:** every section is optimized for phones, tablets, and large screens.
- **Motion with purpose:** subtle Framer Motion animations guide attention without distraction.

---

## 👤 Developed By

**Foisal Hasan Sifat**  
*Full Stack Web Developer*

---

## 📝 License

This project is private and proprietary. All rights reserved by the project owner.

---

*Built with care for the ART IN brand — Wear The Art.*
