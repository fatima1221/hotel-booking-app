# Hotel Booking App (LuxeStay)

A modern hotel booking application built with React and TypeScript. This application allows users to create multi-day hotel bookings with meal selections, save/load booking configurations, and export booking summaries as PDFs.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Technology Choices and Justifications](#technology-choices-and-justifications)
- [Architecture Decisions](#architecture-decisions)

## Setup Instructions

### Prerequisites

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher (comes with Node.js)

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:

   ```bash
   cd hotel-booking-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:8080` (or the port specified in your Vite config).

### Available Scripts

- `npm run dev` - Start the development server with hot module replacement (HMR)
- `npm run build` - Build the application for production (outputs to `dist/spa/`)
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code quality issues

### Development Environment

The application uses Vite as the build tool, which provides:

- Fast Hot Module Replacement (HMR) for instant updates during development
- Optimized production builds
- Native ES modules support
- Path aliases configured (`@/` for `src/` directory)

## Technology Choices and Justifications

### Core Framework

**React 19.2.0** with **TypeScript 5.9.3**

- **Justification**: React provides a robust, component-based architecture that scales well. TypeScript adds type safety, reducing runtime errors and improving developer experience through better IDE support and autocomplete.

### Build Tool

**Vite 7.2.2** with **@vitejs/plugin-react-swc**

- **Justification**: Vite offers significantly faster development server startup and HMR compared to traditional bundlers. SWC (Speedy Web Compiler) provides faster compilation than Babel, improving both development and build performance.

### State Management

**Redux Toolkit 2.10.1** with **Redux Persist 6.0.0**

- **Justification**:
  - Redux Toolkit simplifies Redux boilerplate and provides excellent DevTools support
  - Redux Persist enables local storage of booking data, allowing users to save and restore booking configurations
  - Centralized state management is ideal for complex multi-step forms with interdependent data

### Routing

**React Router DOM 7.9.6**

- **Justification**: Industry-standard routing solution for React applications. Version 7 provides improved TypeScript support and better performance. Lazy loading is implemented for code splitting.

### Styling

**Tailwind CSS 3.4.18** with **tailwindcss-animate**

- **Justification**:
  - Utility-first CSS framework enables rapid UI development
  - Consistent design system through configuration
  - Smaller bundle size through purging unused styles
  - Custom color palette (`luxe-dark`, `luxe-lime`, `luxe-purple`) for brand consistency

### UI Component Library

**Radix UI** (`@radix-ui/react-dropdown-menu`, `@radix-ui/themes`)

- **Justification**:
  - Accessible, unstyled components that follow WAI-ARIA guidelines
  - Headless components allow full styling control with Tailwind
  - Better accessibility out-of-the-box compared to custom implementations

### Animation

**Framer Motion 12.23.24**

- **Justification**:
  - Declarative animation API that integrates seamlessly with React
  - Smooth page transitions and component animations enhance UX
  - Used for step transitions and loading states

### PDF Generation

**jsPDF 3.0.3** with **html2canvas 1.4.1**

- **Justification**: Client-side PDF generation allows users to export booking summaries without server dependencies. jsPDF provides programmatic PDF creation with full control over layout.

### Notifications

**Sonner 2.0.7**

- **Justification**: Lightweight, accessible toast notification library with excellent customization options and smooth animations.

### Icons

**Lucide React 0.554.0**

- **Justification**: Modern, consistent icon library with tree-shaking support, providing only the icons used in the bundle.

## Architecture Decisions

### Project Structure

The application follows a **feature-based architecture** with clear separation of concerns:

```
src/
├── components/          # Shared, reusable UI components
│   ├── ui/             # Base UI components (buttons, inputs, dialogs)
│   └── ...             # App-level components (LoadingOverlay, etc.)
├── features/           # Feature modules
│   └── booking/        # Booking feature
│       ├── components/ # Feature-specific components
│       ├── constants/  # Feature constants (hotels, meals data)
│       └── utils/      # Feature utilities (calculations, PDF export)
├── pages/              # Route-level page components
├── store/              # Redux store configuration
│   ├── slices/         # Redux slices (feature state)
│   └── hooks.ts        # Typed Redux hooks
└── lib/                # Shared utilities
```

**Rationale**:

- Features are self-contained, making the codebase easier to navigate and maintain
- Shared components are clearly separated from feature-specific code
- Easy to scale by adding new features without affecting existing code

### State Management Pattern

**Redux Toolkit with Feature Slices**

- Single slice (`bookingSlice`) manages all booking-related state
- Actions are co-located with reducers for better maintainability
- Redux Persist configured to persist only booking data (not loading states)
- Typed hooks (`useAppSelector`, `useAppDispatch`) provide type safety

**Rationale**:

- Centralized state makes it easy to track booking flow across multiple steps
- Persistence ensures user data survives page refreshes
- TypeScript integration prevents common state management errors

### Multi-Step Form Pattern

The booking flow is implemented as a **controlled multi-step form**:

1. **Step 1**: Initial configuration (citizenship, destination, dates, board type)
2. **Step 2**: Daily hotel and meal selections
3. **Step 3**: Summary and confirmation

**Rationale**:

- Progressive disclosure reduces cognitive load
- Validation at each step prevents invalid submissions
- State is maintained in Redux, allowing navigation between steps without data loss

### Code Splitting

**Lazy Loading for Routes**

- All route components are lazy-loaded using React's `lazy()` and `Suspense`
- Reduces initial bundle size
- Components load on-demand when routes are accessed

**Rationale**:

- Improves initial page load time
- Better user experience, especially on slower connections
- Minimal impact on development experience

### Styling Strategy

**Tailwind CSS with CSS Variables**

- Custom color palette defined in `tailwind.config.ts`
- CSS variables in `global.css` enable theme customization
- Component variants managed with `class-variance-authority`

**Rationale**:

- Consistent design system across the application
- Easy to maintain and update colors/spacing
- Theme switching capability (prepared for future dark mode support)

### Data Structure

**Static Data in Constants**

- Hotels and meals data stored in `constants/data.ts`
- Organized by destination country for easy lookup
- Type-safe with TypeScript interfaces

**Rationale**:

- Simple for MVP/demo purposes
- Easy to replace with API calls later
- Type safety ensures data consistency

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
