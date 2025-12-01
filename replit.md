# Italy Trip Countdown Website

## Overview

A single-page countdown website celebrating an upcoming trip to Italy on May 12, 2025. The site features a vibrant, travel-inspired design with a real-time countdown timer displayed over scenic Italian imagery. Built with React, TypeScript, and Express, using shadcn/ui components for a polished, modern interface. The design draws inspiration from Airbnb's travel aesthetic combined with playful countdown interfaces.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server, providing fast HMR and optimized production builds
- Wouter for lightweight client-side routing
- Single-page application architecture with minimal routes (home page and 404 fallback)

**UI Component Library**
- shadcn/ui component library built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Component architecture follows the "New York" style variant
- Comprehensive UI component collection including buttons, cards, dialogs, forms, and data display elements

**Design System**
- Custom CSS variables for theming (defined in `client/src/index.css`)
- Italian flag color palette integrated into the design (`--italy-green`, `--italy-white`, `--italy-red`)
- Typography: Playfair Display for display text, Inter for body text
- Glass-morphism effects using `backdrop-blur` for the countdown display
- Responsive design with mobile-first approach

**State Management**
- React Query (TanStack Query) for server state management and data fetching
- Local component state using React hooks (useState, useEffect, useCallback)
- Custom hooks for reusable logic (e.g., `use-mobile` for responsive behavior, `use-toast` for notifications)

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- HTTP server setup using Node's built-in `http` module
- Modular route registration system via `registerRoutes` function
- Custom logging middleware for request/response tracking

**Development vs Production**
- Development: Vite middleware integration for HMR and live reloading
- Production: Static file serving from pre-built `dist/public` directory
- Fallback routing to `index.html` for SPA support

**API Design**
- RESTful API structure with `/api` prefix for all backend routes
- JSON request/response handling with Express middleware
- Request body parsing with raw body capture for webhook support
- Centralized error handling and logging

### Data Storage

**Database Configuration**
- Drizzle ORM configured for PostgreSQL
- Neon Database serverless PostgreSQL integration (`@neondatabase/serverless`)
- Schema-first approach with TypeScript types generated from Drizzle schemas
- Migration management via `drizzle-kit`

**Schema Definition**
- User table with UUID primary keys, username, and password fields
- Zod validation schemas derived from Drizzle schemas for runtime validation
- Shared schema types between frontend and backend via `shared/schema.ts`

**Storage Abstraction**
- `IStorage` interface defining CRUD operations
- PostgreSQL database storage implementation (`DatabaseStorage`) using Drizzle ORM
- Neon HTTP driver for database connections (avoids WebSocket issues)
- Storage interface supports user management (create, get by ID, get by username)
- Chat message storage with create and list operations - **persists across deployments**

### Chat Feature

**Chat Box Component** (`client/src/components/chat-box.tsx`)
- Collapsible chat interface positioned in bottom-right corner
- Expand/collapse functionality with smooth transitions
- Nickname prompt on first message (stored in localStorage for persistence)
- Real-time message display with auto-refresh every 3 seconds
- Avatar system with color-coded initials based on nickname

**Chat API Endpoints**
- `GET /api/chat/messages` - Retrieves all chat messages sorted by timestamp
- `POST /api/chat/messages` - Creates a new message (requires nickname and message)

**Chat Schema** (in `shared/schema.ts`)
- `chatMessages` table with id, nickname, message, and createdAt fields
- Zod validation for message creation

### External Dependencies

**Core Framework Dependencies**
- `@neondatabase/serverless` - Serverless PostgreSQL driver for Neon Database
- `drizzle-orm` & `drizzle-kit` - Type-safe ORM and migration toolkit
- `express` - Web application framework
- `react` & `react-dom` - UI library
- `vite` - Build tool and dev server
- `@tanstack/react-query` - Server state management

**UI & Styling**
- `@radix-ui/*` - Accessible component primitives (30+ packages)
- `tailwindcss` - Utility-first CSS framework
- `class-variance-authority` - Component variant management
- `clsx` & `tailwind-merge` - Conditional className utilities
- `lucide-react` - Icon library
- Google Fonts - Playfair Display, Inter, and other typefaces

**Form & Validation**
- `react-hook-form` - Form state management
- `@hookform/resolvers` - Validation resolver integration
- `zod` - Schema validation library
- `drizzle-zod` - Zod schema generation from Drizzle schemas

**Additional Libraries**
- `date-fns` - Date/time manipulation for countdown logic
- `embla-carousel-react` - Carousel component functionality
- `cmdk` - Command menu component
- `vaul` - Drawer component
- `wouter` - Lightweight routing

**Development Tools**
- `typescript` - Type checking and compilation
- `tsx` - TypeScript execution for Node.js
- `esbuild` - Fast JavaScript bundler for server builds
- `@replit/vite-plugin-*` - Replit-specific development tooling

**Build Process**
- Client build: Vite bundles React application to `dist/public`
- Server build: esbuild bundles Express server to `dist/index.cjs` with selective dependency bundling (allowlist approach to reduce syscalls)
- TypeScript compilation managed separately via `tsc --noEmit` for type checking