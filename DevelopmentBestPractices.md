# Development Best Practices: Orange Concrete Services Web App

This document outlines the recommended development best practices for the Orange Concrete Services web application using the selected technology stack.

## Architecture Overview

The application will follow a modern frontend-focused architecture with:

- React.js for the UI layer
- Next.js for routing and server-side features
- Express.js backend for API endpoints
- MongoDB for data storage

## Frontend Best Practices

### React.js & Next.js

#### Project Structure

```
src/
├── components/
│   ├── common/             # Reusable UI components
│   ├── layout/             # Layout components (header, footer)
│   ├── features/           # Feature-specific components
│   │   ├── gallery/        # Interactive project gallery (FR003)
│   │   ├── calculator/     # Concrete calculator (FR015)
│   │   ├── models/         # 3D models viewer (FR004)
│   │   └── services/       # Service catalog (FR002)
├── pages/                  # Next.js pages
├── hooks/                  # Custom React hooks
├── context/                # React context providers
├── lib/                    # Utility functions
├── styles/                 # Global styles and theme
└── public/                 # Static assets
```

#### Component Design

- Use functional components with hooks instead of class components
- Implement component composition over complex inheritance
- Create atomic design principles: atoms → molecules → organisms → templates → pages
- Separate UI logic from business logic
- Apply proper prop validation with PropTypes or TypeScript

#### State Management

- Use React Context for theme state (FR008)
- Use local component state for isolated UI states
- Consider Redux Toolkit only for complex global state needs
- Implement React Query for server state management

#### Performance Optimization

- Use React.memo() for expensive components
- Implement dynamic imports for code splitting
- Utilize Next.js Image optimization for project gallery images
- Apply lazy loading for below-the-fold content
- Use webp/avif image formats with fallbacks

### CSS & Styling

#### Tailwind CSS Implementation

- Use a consistent configuration file (tailwind.config.js)
- Create custom brutalist design theme extensions
- Implement proper responsive design classes
- Maintain a design system with consistent spacing and typography

```js
// tailwind.config.js example
module.exports = {
  theme: {
    extend: {
      colors: {
        concrete: {
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        accent: "#FFB800", // Safety yellow accent
      },
      fontFamily: {
        sans: ["Industry", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["dark", "dark-hover"],
      textColor: ["dark", "dark-hover"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
  darkMode: "class",
};
```

#### Dark Mode Implementation (FR008)

- Use CSS variables for theming
- Implement with next-themes library
- Create consistent color palette for both modes

```css
:root {
  --color-bg-primary: #ffffff;
  --color-text-primary: #171717;
  --color-accent: #ffb800;
}

[data-theme="dark"] {
  --color-bg-primary: #171717;
  --color-text-primary: #f5f5f5;
  --color-accent: #ffb800;
}
```

### Animation & Interactions

#### Animation Best Practices

- Use CSS transitions for simple animations
- Implement GSAP for complex animations
- Apply consistent easing functions
- Respect user preferences with `prefers-reduced-motion`

```js
// Example GSAP animation for quote form submission (FR005)
const animateFormSubmission = () => {
  const tl = gsap.timeline();
  tl.to(".form-element", {
    y: -10,
    opacity: 0,
    stagger: 0.05,
    ease: "power2.out",
  }).to(".confirmation", {
    opacity: 1,
    y: 0,
    duration: 0.5,
  });
  return tl;
};
```

#### Micro-interactions

- Keep animations under 400ms for responsiveness
- Use subtle hover states for interactive elements
- Implement loading states for all async operations
- Provide visual feedback for form interactions

### 3D Model Implementation (FR004)

#### Three.js Best Practices

- Use react-three-fiber for React integration
- Implement proper lighting for concrete material rendering
- Optimize 3D models (reduce polygons, texture sizes)
- Use DRACO compression for model loading
- Implement progressive loading for 3D assets

```jsx
// Example Three.js concrete model component
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function ConcreteModel({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} />;
}

export default function ModelViewer() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Suspense fallback={<LoadingPlaceholder />}>
        <ConcreteModel modelPath="/models/concrete-countertop.glb" />
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
}
```

### Accessibility (A11y)

#### Core A11y Requirements

- Implement semantic HTML5 elements
- Maintain WCAG 2.1 AA compliance
- Ensure keyboard navigation for all interactive elements
- Provide proper focus management
- Test with screen readers (NVDA, VoiceOver)
- Implement proper ARIA attributes where needed

#### Dark Mode Accessibility (FR008)

- Ensure sufficient contrast in both themes
- Test color combinations for color blindness
- Provide clear visual indicators for interactive elements

## Backend Best Practices

### Express.js API

#### API Structure

```
api/
├── controllers/          # Request handlers
├── models/               # Data models
├── routes/               # Route definitions
├── middleware/           # Custom middleware
├── services/             # Business logic
├── utils/                # Helper functions
└── config/               # Configuration
```

#### API Design

- Follow RESTful API design principles
- Implement proper error handling with status codes
- Use middleware for cross-cutting concerns
- Validate all input with Joi or express-validator
- Implement rate limiting for public endpoints

```js
// Example API endpoint for quote request (FR005)
router.post("/quote-request", validateQuoteRequest, async (req, res) => {
  try {
    const quoteRequest = await QuoteService.createQuote(req.body);
    return res.status(201).json({
      success: true,
      data: quoteRequest,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
```

### MongoDB Integration

#### Data Modeling

- Design schemas based on access patterns
- Use Mongoose for schema validation
- Implement proper indexing for frequent queries
- Use references for related data where appropriate

```js
// Example Mongoose schema for concrete services
const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  features: [
    {
      type: String,
    },
  ],
  category: {
    type: String,
    enum: ["residential", "commercial", "industrial"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
```

#### Database Operations

- Use async/await for database operations
- Implement connection pooling
- Handle database errors gracefully
- Use transactions for related operations

### Chatbot Integration (FR010)

#### Dialogflow Implementation

- Define clear intents for concrete-related queries
- Create comprehensive training phrases
- Design fallback responses
- Implement webhook fulfillment for dynamic responses

## DevOps & Deployment

### CI/CD Pipeline

- Use GitHub Actions for continuous integration
- Implement automated testing on pull requests
- Configure deployment to Vercel for frontend
- Set up environment-specific variables

### Environment Configuration

```
.env.development    # Development environment
.env.test           # Testing environment
.env.production     # Production environment
```

### Testing Strategy

#### Frontend Testing

- Unit tests with Jest for utility functions
- Component tests with React Testing Library
- E2E tests with Cypress for critical user flows
- Visual regression testing with Percy

#### Backend Testing

- Unit tests for service layer
- Integration tests for API endpoints
- Database tests with in-memory MongoDB

```js
// Example Jest test for concrete calculator
describe("Concrete Calculator", () => {
  it("calculates correct volume for rectangular slab", () => {
    const dimensions = { length: 10, width: 10, depth: 0.5 };
    const volume = calculateConcreteVolume(dimensions);
    expect(volume).toEqual(50); // 10 * 10 * 0.5 = 50 cubic ft
  });
});
```

### Performance Monitoring

- Implement Lighthouse CI
- Configure Core Web Vitals monitoring
- Set up error tracking with Sentry
- Use Google Analytics for user behavior

## Security Best Practices

### Application Security

- Implement proper input validation
- Set up CSP headers
- Use helmet.js for security headers
- Sanitize all user inputs
- Protect against XSS and CSRF attacks

### API Security

- Rate limiting for all endpoints
- Input validation with strict schemas
- Proper error handling without exposure of internals

## Mobile Responsiveness (FR007)

### Mobile-First Approach

- Design for mobile screens first
- Use appropriate touch targets (min 44px)
- Implement responsive typography with rem units
- Test on real mobile devices
- Optimize for different screen sizes

```css
/* Example responsive breakpoints */
@media (min-width: 640px) {
  /* Small devices */
}
@media (min-width: 768px) {
  /* Medium devices */
}
@media (min-width: 1024px) {
  /* Large devices */
}
@media (min-width: 1280px) {
  /* Extra large devices */
}
```

## Feature-Specific Implementation Guidelines

### FR001: Immersive Landing Page

- Optimize video background for performance
- Implement proper preloading strategies
- Use IntersectionObserver for parallax effects
- Provide fallbacks for older browsers

### FR003: Interactive Project Gallery

- Implement virtualized list for performance
- Use proper image loading strategies
- Create smooth transitions between filters
- Optimize before/after slider performance

### FR005: Quote Request Form

- Implement multi-step form with progress indicators
- Use client-side validation with visual feedback
- Add micro-animations for form transitions
- Ensure proper form state management

### FR015: Concrete Calculator

- Implement accurate calculation formulas
- Provide instant feedback on input changes
- Use proper number formatting
- Create visual representation of calculations

## Documentation

### Code Documentation

- Document complex functions with JSDoc
- Create README files for major features
- Document component props
- Maintain API documentation

### User Documentation

- Create user guides for interactive features
- Document calculator formulas and assumptions
- Provide tooltips for complex interactions

## Version Control

### Git Workflow

- Use feature branches
- Create meaningful commit messages
- Implement proper PR review process
- Follow conventional commits format

```
feat: add concrete calculator component (FR015)
fix: resolve 3D model loading issues on mobile
docs: update README with setup instructions
style: improve dark mode contrast ratios
```

## Conclusion

Following these best practices will ensure a high-quality, maintainable codebase for the Orange Concrete Services web application. The focus on performance, accessibility, and user experience will result in a robust application that meets all the requirements specified in the PRD while providing a solid foundation for future enhancements.
