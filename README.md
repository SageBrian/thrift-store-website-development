# The Thrift Edit

A modern thrift-store storefront built with Next.js, TypeScript, Tailwind CSS, and Supabase. The project combines a polished customer-facing shopping experience with a protected inventory management interface for managing products and stock.

**Live Demo:** https://thrift-store-website-development.vercel.app/
**Repository:** https://github.com/SageBrian/thrift-store-website-development

---

## Overview

The Thrift Edit is a full-stack web application for a curated second-hand clothing store based in Nairobi, Kenya.

The project focuses on creating a clean, editorial-style shopping experience while connecting the storefront to a Supabase database for dynamic product data and inventory management.

The application includes a public storefront where customers can browse available pieces and search the collection, alongside an authenticated admin interface for managing products, availability, pricing, and inventory.

The interface was designed around the idea of a small premium thrift brand rather than a conventional marketplace, using a minimal layout, neutral color palette, typography-focused sections, and responsive product grids.

---

## Features

### Customer Storefront

* Responsive thrift-store storefront
* Product listings loaded dynamically from Supabase
* Product availability based on active status and stock quantity
* Product search
* Product categories including:

  * Dresses
  * Tops
  * Denim
  * Accessories
* Product information including:

  * Name
  * Category
  * Size
  * Price in Kenyan Shillings
  * Product image
  * Availability badge
* Responsive navigation for desktop and mobile
* Curated editorial-style homepage
* Nairobi-focused store branding
* Responsive layout across different screen sizes

### Inventory Management

The project also includes a protected `/admin` interface for store management.

Authenticated administrators can:

* Add new products
* Edit existing product information
* Update product prices
* Update product categories and sizes
* Update product images
* Change product badges
* Adjust stock quantities
* Publish or hide products
* View current inventory
* Record reasons for inventory adjustments

Inventory changes are recorded through an inventory movement log rather than simply changing the displayed quantity.

---

## Authentication & Access Control

Authentication and session management are handled using Supabase.

The application uses Supabase's server-side authentication integration with Next.js and maintains authentication state through cookies.

Administrative access is restricted using a Supabase user metadata flag:

```text
app_metadata.is_admin = true
```

Users without the required administrator permission cannot access inventory management functionality.

Server-side actions independently verify administrator privileges before performing product or inventory mutations.

This prevents administrative operations from relying solely on client-side UI restrictions.

---

## Architecture

```text
                         ┌──────────────────────┐
                         │      Customer        │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      Next.js         │
                         │   App Router / SSR   │
                         └──────────┬───────────┘
                                    │
                   ┌────────────────┴────────────────┐
                   │                                 │
                   ▼                                 ▼
        ┌────────────────────┐           ┌────────────────────┐
        │ Public Storefront  │           │   Admin Interface  │
        │                    │           │                    │
        │ Product browsing   │           │ Product management │
        │ Search             │           │ Inventory control  │
        └─────────┬──────────┘           └─────────┬──────────┘
                  │                                │
                  └───────────────┬────────────────┘
                                  ▼
                       ┌──────────────────────┐
                       │       Supabase       │
                       │                      │
                       │ PostgreSQL           │
                       │ Authentication       │
                       │ Inventory data       │
                       └──────────────────────┘

                                  │
                                  ▼
                         ┌──────────────────────┐
                         │       Vercel         │
                         │      Deployment      │
                         └──────────────────────┘
```

---

## Tech Stack

| Technology       | Purpose                                      |
| ---------------- | -------------------------------------------- |
| Next.js 16       | React framework and application architecture |
| React 19         | UI development                               |
| TypeScript       | Type-safe application development            |
| Tailwind CSS 4   | Styling and responsive layouts               |
| Supabase         | PostgreSQL database and authentication       |
| `@supabase/ssr`  | Server-side Supabase integration             |
| Lucide React     | Interface icons                              |
| Vercel Analytics | Production analytics                         |
| Vercel           | Application deployment                       |
| pnpm             | Package management                           |

---

## Project Structure

```text
thrift-store-website-development/
│
├── app/
│   ├── admin/
│   │   ├── actions.ts
│   │   └── page.tsx
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   └── thrift-edit-home.tsx
│
├── lib/
│   └── supabase/
│       ├── proxy.ts
│       └── server.ts
│
├── public/
│   └── application assets
│
├── middleware.ts
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── postcss.config.mjs
└── tsconfig.json
```

---

## Data Flow

The storefront retrieves active products directly from Supabase.

Only products that are both active and currently in stock are displayed to customers.

```text
Supabase products
       │
       ▼
Filter active products
       │
       ▼
Filter products with stock
       │
       ▼
Sort by newest
       │
       ▼
Next.js Server Component
       │
       ▼
Storefront UI
```

Product records contain information such as:

```text
id
name
slug
category
size
price_kes
image_url
badge
stock_quantity
is_active
created_at
updated_at
```

Inventory adjustments are recorded separately through an `inventory_movements` table, providing a history of stock changes and the reason for each adjustment.

---

## Server-Side Inventory Operations

Administrative product operations are implemented using Next.js Server Actions.

The following operations are supported:

```text
createProduct()
updateProduct()
toggleProduct()
adjustInventory()
```

Each operation first verifies that the current authenticated user has administrator privileges.

Product inputs are also validated server-side before database mutations are performed.

For example, prices must be positive integers, stock quantities cannot be negative, and required product information must be present.

---

## Responsive Design

The storefront was designed with a responsive-first approach.

The interface adapts between:

* Mobile navigation
* Desktop navigation
* Two-column mobile product grids
* Four-column desktop product grids
* Responsive hero sections
* Responsive category layouts
* Mobile-friendly inventory management

The visual design uses a restrained neutral palette with serif display typography and minimal UI elements to create an editorial fashion-store experience.

---

## Security Considerations

Administrative operations are not exposed as unrestricted client-side functionality.

The application:

* Uses Supabase authentication
* Maintains authenticated sessions through server-side cookies
* Checks the authenticated user before administrative operations
* Uses `app_metadata.is_admin` for administrator authorization
* Performs product validation on the server
* Keeps the Supabase service-role key server-side
* Uses server actions for product and inventory mutations
* Prevents inventory adjustments that would result in negative stock

The middleware also keeps Supabase authentication sessions synchronized between requests.

---

## Local Development

### Prerequisites

* Node.js
* pnpm
* Supabase project

### Clone the repository

```bash
git clone https://github.com/SageBrian/thrift-store-website-development.git

cd thrift-store-website-development
```

### Install dependencies

```bash
pnpm install
```

### Configure environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

The service-role key must remain server-side and should never be exposed to client-side code.

### Start the development server

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

### Production build

```bash
pnpm build
```

Run the production build locally:

```bash
pnpm start
```

---

## Deployment

The application is deployed using Vercel.

The production deployment is available at:

**https://thrift-store-website-development.vercel.app/**

The project uses environment variables for Supabase configuration, allowing the database credentials to remain outside the source code.

---

## What I Learned

This project provided practical experience building a production-shaped Next.js application rather than only creating a static frontend.

Key areas explored include:

* Next.js App Router
* Server Components
* Client Components
* Next.js Server Actions
* Supabase PostgreSQL
* Supabase authentication
* Server-side authentication
* Cookie-based session management
* Middleware
* Server-side authorization
* Inventory management
* Database-driven rendering
* Form handling
* Input validation
* Responsive UI development
* Tailwind CSS
* Vercel deployment
* Environment variable management

---

## Future Improvements

Potential improvements for future versions include:

* Dedicated product detail pages
* Shopping cart functionality
* Wishlist persistence
* Checkout and payment integration
* Customer accounts
* Order management
* Product image uploads through Supabase Storage
* Advanced product filtering
* Pagination for larger inventories
* Inventory reporting
* Automated tests
* CI/CD through GitHub Actions

---

## Project Purpose

This project was built as a practical full-stack application to demonstrate how a modern e-commerce storefront can be connected to a real database and supported by an authenticated administrative workflow.

Rather than building only a visual mockup, the project connects the customer-facing interface to persistent product and inventory data and provides server-side administrative operations for managing the store.

---

## Author

**Brian Too**

GitHub: [@SageBrian](https://github.com/SageBrian)

LinkedIn: [Brian Too](https://linkedin.com/in/brian-too-4b57a9227/)

Portfolio: [Cloud & Backend Engineer Portfolio](https://cloud-backend-engineer-porfolio.vercel.app/)
