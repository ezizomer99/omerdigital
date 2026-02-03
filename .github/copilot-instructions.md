# Portfolio Website - omerdigital.com

## Project Overview

Modern Next.js portfolio/consulting website for omerdigital.com.

## Tech Stack

- **Framework**: Next.js 16+ with App Router
- **Language**: TypeScript
- **UI Library**: Material UI (MUI) - free components only
- **Animations**: Framer Motion
- **Database**: MongoDB (via Mongoose)
- **Image Storage**: Vercel Blob Storage
- **Email**: Nodemailer (contact form)
- **Hosting**: Vercel (free tier)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout with MUI ThemeProvider
│   ├── about/             # About page
│   ├── contact/           # Contact page with form
│   ├── work/              # Portfolio work listing
│   │   └── [id]/          # Dynamic project detail pages
│   └── api/               # API routes
│       ├── contact/       # Contact form submission
│       └── projects/      # Project CRUD API
├── components/            # React components
│   ├── Navigation.tsx     # Main navigation component
│   ├── Footer.tsx         # Footer component
│   ├── DeviceFrames.tsx   # Device mockup frames
│   └── animations/        # Framer Motion animation wrappers
├── hooks/                 # Custom React hooks
│   └── useProjects.ts     # Project data fetching hooks
├── lib/                   # Library configurations
│   └── mongodb.ts         # MongoDB connection & schemas
├── services/              # Service layer (server-side only)
│   └── projectService.ts  # Project CRUD operations
├── theme/                 # MUI Theme configuration
│   ├── theme.ts           # Custom MUI theme
│   └── ThemeRegistry.tsx  # Theme provider wrapper
└── utils/                 # Utility functions
    └── imageUpload.ts     # Vercel Blob upload utilities
```

## Environment Variables

Required environment variables (see `.env.example`):

```env
MONGODB_URI=           # MongoDB connection string
BLOB_READ_WRITE_TOKEN= # Vercel Blob storage token
GMAIL_USER=            # Gmail for contact form
GMAIL_APP_PASSWORD=    # Gmail app password
```

## Key Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Design Notes

- Color palette: Warm amber/cream (#FFFBEB) with gray accents
- Typography: Geist Sans, light weight, wide letter-spacing
- UI Language: Norwegian (Bokmål)

## Deployment

1. Push to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. MongoDB Atlas must whitelist Vercel IPs (0.0.0.0/0)
