# Paul Rudd Concreting

A marketing website for Paul Rudd Concreting (Orange Concrete Services), built with Next.js. Showcases services, a project gallery, an interactive concrete calculator, testimonials, and a quote request form.

## Tech Stack

- [Next.js 15](https://nextjs.org) (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS with [shadcn/ui](https://ui.shadcn.com) components (`components.json`)
- Framer Motion for animations
- React Three Fiber / drei / three.js for interactive 3D models
- Prisma (`@prisma/client`) for data access
- React Hook Form + Zod for form handling and validation
- Formspree for form submission, Google reCAPTCHA for spam protection
- Vercel Analytics

## Getting Started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. The app auto-reloads as you edit files under `app/`.

### Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
NEXT_PUBLIC_FORMSPREE_FORM_ID=your-formspree-form-id
```

## Project Structure

```
app/                  # Next.js App Router pages, layout, global styles
  hooks/               # Custom React hooks (e.g. form security)
components/
  sections/            # Page sections: home, services, gallery, calculator, contact
  ui/                  # shadcn/ui primitives
  theme-provider.tsx   # Dark/light mode support
lib/                   # Utilities (scroll helpers, security helpers)
prd/                   # Product requirements documentation
Testing/               # Test plans and UAT documentation
```

## Available Scripts

```bash
npm run dev      # Start the development server (Turbopack)
npm run build    # Build for production
npm run start    # Start the production server
npm run lint     # Run ESLint
```

## Documentation

- [Product Requirements](prd/prd.md)
- [Testing Plan](Testing/Testing.md)

## Deployment

This project is set up to deploy on [Vercel](https://vercel.com). See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.
