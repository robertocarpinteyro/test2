# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Technology Stack
- **Framework**: Next.js 13.4.x with App Router (experimental features enabled)
- **Language**: TypeScript 5.0.4
- **Styling**: Tailwind CSS 3.3.2 with custom SCSS extensions and CSS variables
- **UI Components**: Headless UI, Heroicons, Line Awesome icons
- **Database**: MongoDB with Mongoose (setup incomplete)
- **Authentication**: NextAuth.js
- **External Services**: Twilio for SMS verification, Google APIs, Google Maps

## Development Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture Overview

### App Router Structure
This project uses Next.js 13+ App Router with grouped routes in parentheses for organization:
- `(account-pages)` - User account management
- `(listing-detail)` - Individual property/service detail pages with multiple property types
- `(stay-listings)`, `(car-listings)`, `(experience-listings)`, `(real-estate-listings)` - Different listing types
- `(client-components)` - Client-side React components
- `(server-components)` - Server-side components

### Component Organization
- **Search Forms**: Comprehensive search functionality split by category (stays, cars, experiences, real estate) with both desktop and mobile variants
- **Cards**: Modular card components for different content types (StayCard, CarCard, ExperiencesCard, PropertyCardH)
- **Gallery**: Advanced image gallery with modal functionality in `src/components/listing-image-gallery/`
- **Shared Components**: Reusable UI elements in `src/shared/`

### Data Layer
- **Types**: Comprehensive TypeScript interfaces in `src/data/types.ts`
- **Mock Data**: JSON files in `src/data/jsons/` for development
- **State Management**: React Hooks Global State for client-side state

### Styling System
- **Custom Colors**: Uses CSS variables defined in `src/styles/__theme_colors.scss`
- **Tailwind Extension**: Custom color system extending Tailwind's defaults
- **SCSS Modules**: Component-specific styles in `src/styles/`
- **Dark Mode**: Class-based dark mode switching supported

### Key Features
- Multi-type booking platform (accommodations, cars, experiences, real estate)
- Advanced search with filters and map integration
- Responsive design with mobile-specific components
- Image galleries with download and sharing capabilities
- User authentication and account management
- SMS verification via Twilio integration

## Environment Setup
Required environment variables (configure in `.env.local`):
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_VERIFY_SERVICE_SID` for SMS verification
- Google API keys for Maps integration
- NextAuth configuration variables

## Important Notes
- No testing framework is currently configured
- Database setup in `src/lib/mongoose.ts` needs completion
- Image handling supports multiple CDN sources (Pexels, Unsplash, Cloudinary)
- Route organization uses Next.js grouped routes for better file structure
- Custom Tailwind configuration requires understanding of CSS variable system