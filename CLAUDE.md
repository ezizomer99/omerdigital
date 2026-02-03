# CLAUDE.md - AI Coding Context for omerdigital.com

## Project Overview

This is a **Next.js 16+ portfolio/consulting website** for omerdigital.com built with:
- **Framework**: Next.js 16+ with App Router
- **Language**: TypeScript
- **UI Library**: Material UI (MUI) - free components only
- **Animations**: Framer Motion
- **Database**: MongoDB (via Mongoose)
- **Image Storage**: Vercel Blob Storage
- **Email**: Nodemailer
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
│       └── contact/       # Contact form submission
├── components/            # React components
│   ├── Navigation.tsx     # Main navigation component
│   ├── Footer.tsx         # Footer component
│   ├── DeviceFrames.tsx   # Device mockup frames
│   ├── SocialIcons.tsx    # Social media icons
│   └── animations/        # Framer Motion animation wrappers
├── data/                  # Static data files
│   ├── personal.ts        # Personal info & contact
│   └── services.ts        # Services offered
├── hooks/                 # Custom React hooks
│   └── useProjects.ts     # Project data fetching hooks
├── lib/                   # Library configurations
│   └── mongodb.ts         # MongoDB connection
├── services/              # Service layer
│   └── projectService.ts  # Project CRUD operations
├── theme/                 # MUI Theme configuration
│   └── theme.ts           # Custom MUI theme
└── utils/                 # Utility functions
    └── imageUpload.ts     # Vercel Blob upload utilities
```

## Tech Stack Details

### Material UI (MUI)
- Using only **free/open-source** components from `@mui/material`
- Custom theme defined in `src/theme/theme.ts`
- Following MUI best practices for Next.js App Router
- Color palette: Warm amber/cream tones with gray accents

### MongoDB
- Connection via Mongoose ODM
- Collections: `projects`, `project_images`
- Environment variable: `MONGODB_URI`

### Vercel Blob Storage
- Used for project images and assets
- Environment variable: `BLOB_READ_WRITE_TOKEN`
- Images served via Vercel's CDN

### Environment Variables Required
```env
# MongoDB
MONGODB_URI=mongodb+srv://...

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_...

# Email (Contact Form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=destination@email.com
```

## Design System

### Color Palette (MUI Theme)
- **Primary**: Gray tones (#171717 to #gray-800)
- **Background**: Warm amber/cream (#FFFBEB - amber-50 equivalent)
- **Text**: Dark gray for headings, medium gray for body
- **Accents**: White pills/cards with subtle shadows

### Typography
- Font: Geist Sans (primary), Geist Mono (code)
- Headings: Light weight, wide letter-spacing, uppercase
- Body: Light weight, relaxed line-height

### Components Style Guidelines
- Rounded corners on cards and buttons
- Subtle shadows for depth
- Minimalist, clean aesthetic
- Norwegian language for UI text

## Key Commands

```bash
# Development
npm run dev          # Start dev server (port 3000 by default)

# Build
npm run build        # Production build

# Lint
npm run lint         # Run ESLint

# Start Production
npm start            # Start production server
```

## API Routes

### POST /api/contact
Contact form submission endpoint
- Body: `{ name, email, message }`
- Sends email via Nodemailer
- Returns: `{ success: boolean, message: string }`

## Data Models

### Project
```typescript
interface Project {
  _id: ObjectId
  title: string
  description: string
  long_description?: string
  category: string
  tech: string[]
  image_url?: string
  project_url?: string
  github_url?: string
  featured: boolean
  created_at: Date
  updated_at: Date
}
```

### ProjectImage
```typescript
interface ProjectImage {
  _id: ObjectId
  project_id: ObjectId
  image_url: string
  alt_text?: string
  order_index: number
  created_at: Date
}
```

## MCP Servers for AI Development

This project recommends the following MCP servers for AI-assisted development:

### Essential MCPs
1. **GitHub MCP** - For PR reviews, issues, and code management
   ```bash
   claude mcp add --transport http github https://api.githubcopilot.com/mcp/
   ```

2. **Figma MCP** - For design-to-code workflows (if using Figma)
   ```bash
   claude mcp add --transport http figma-remote-mcp https://mcp.figma.com/mcp
   ```

### Database MCPs (if needed for direct DB access)
- MongoDB can be accessed through standard Mongoose in code
- No specific MCP needed for this project

## Coding Conventions

### TypeScript
- Strict mode enabled
- Use explicit types, avoid `any`
- Prefer interfaces over types for object shapes

### React/Next.js
- Use functional components with hooks
- 'use client' directive for client-side interactivity
- Server components by default (Next.js 13+ convention)
- Colocate related files

### MUI Components
- Import from `@mui/material` directly
- Use `sx` prop for component-specific styling
- Use theme for consistent colors/spacing
- Wrap with `ThemeProvider` in layout

### Framer Motion
- Use existing animation wrappers in `src/components/animations/`
- Keep animations subtle and performant
- Use `motion` components for interactive elements

## Norwegian Language Notes

UI text is in Norwegian (Bokmål):
- "HJEM" = Home
- "ARBEID" = Work
- "OM MEG" = About Me
- "KONTAKT" = Contact
- "TA KONTAKT" = Get in Touch
- "Tjenester" = Services
- "Klar til å jobbe sammen?" = Ready to work together?

## Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Setup for Vercel
- Add all required environment variables
- MongoDB Atlas must whitelist Vercel IPs (0.0.0.0/0 for simplicity)
- Vercel Blob storage is automatically configured

## Testing Checklist

Before deploying:
- [ ] All pages load without errors
- [ ] Contact form submits successfully
- [ ] Projects load from MongoDB
- [ ] Images load from Vercel Blob
- [ ] Navigation works on mobile
- [ ] Animations are smooth

## Common Issues & Solutions

### MongoDB Connection
- Ensure `MONGODB_URI` includes database name
- Check Atlas IP whitelist settings
- Verify credentials are correct

### Vercel Blob
- Token must have read/write permissions
- Check storage quota on free tier

### MUI + Next.js
- Ensure `ThemeProvider` is in client component
- Use `'use client'` for components using MUI hooks
