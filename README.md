# OmerDigital - Portfolio & Consulting Website

A modern, dynamic portfolio and consulting website built with Next.js 15, TypeScript, Tailwind CSS, and Supabase. Features smooth animations, responsive design, and a powerful content management system.

## 🌟 Live Demo

- **Website**: [oemerdigital.com](https://oemerdigital.com)

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Development**: Turbopack for fast development builds
- **Linting**: ESLint with Next.js configuration

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage for images
- **Authentication**: Supabase Auth (ready for future features)
- **Real-time**: Supabase real-time subscriptions

### Deployment
- **Hosting**: Vercel (recommended)
- **Domain**: Custom domain ready
- **Environment**: Production and development configs

## ✨ Key Features

### 🎨 Design & UX
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Smooth Animations**: Custom Framer Motion components
- **Modern Aesthetics**: Clean, professional Norwegian design
- **Performance Optimized**: Fast loading with Next.js optimizations
- **SEO Friendly**: Meta tags, structured data, and semantic HTML

### 📱 Device Mockups
- **Desktop Frames**: Laptop-style mockups for desktop screenshots
- **Mobile Frames**: iPhone-style frames for mobile screenshots
- **Smart Detection**: Automatically detects image type based on filename/alt text
- **Professional Presentation**: Portfolio projects displayed in realistic device frames

### 🗄️ Content Management
- **Dynamic Projects**: Add/edit projects via Supabase dashboard
- **Image Galleries**: Multiple images per project with ordering
- **Rich Content**: Support for short and detailed descriptions
- **Technology Tags**: Flexible tech stack display
- **Featured Projects**: Mark projects as featured for homepage display

### 🔧 Developer Experience
- **Type Safety**: Full TypeScript integration with database types
- **Custom Hooks**: Reusable React hooks for data fetching
- **Component Library**: Modular animation and UI components
- **Error Handling**: Graceful error states and loading indicators
- **Development Tools**: Hot reload, TypeScript checking, and ESLint

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage with hero and services
│   ├── about/             # About page
│   ├── contact/           # Contact form with email integration
│   ├── work/              # Portfolio overview
│   │   └── [id]/          # Dynamic project detail pages
│   └── api/               # API routes
│       └── contact/       # Contact form handler
├── components/            # Reusable components
│   ├── animations/        # Framer Motion components
│   ├── DeviceFrames.tsx   # Device mockup components
│   ├── Navigation.tsx     # Main navigation
│   └── Footer.tsx         # Site footer
├── data/                  # Static data files
│   ├── personal.ts        # Personal information
│   ├── projects.ts        # Project data (legacy)
│   └── services.ts        # Services offered
├── hooks/                 # Custom React hooks
│   └── useProjects.ts     # Project data fetching hooks
├── lib/                   # Utilities and configurations
│   └── supabase.ts        # Supabase client and types
├── services/              # API service layer
│   └── projectService.ts  # Project CRUD operations
└── utils/                 # Utility functions
    └── imageUpload.ts     # Image upload helpers

database/                  # Database files
├── supabase-schema.sql    # Database schema and setup
├── image-urls.sql         # Image insertion examples
└── projects-import.csv    # CSV import template

public/                    # Static assets
├── me/                    # Personal images
└── images/                # Project images (if not using Supabase Storage)
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Git

### 1. Clone and Install
```bash
git clone https://github.com/your-username/omerdigital.git
cd omerdigital
npm install
```

### 2. Environment Setup
Create `.env.local`:
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Gmail SMTP (for contact form)
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_app_password
```

### 3. Database Setup
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Run the SQL from `database/supabase-schema.sql` in the SQL Editor
4. Set up Storage bucket named `project-images` (make it public)

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

### Projects Table
```sql
projects (
  id              SERIAL PRIMARY KEY,
  title           VARCHAR(255) NOT NULL,
  description     TEXT NOT NULL,
  long_description TEXT,
  category        VARCHAR(100) NOT NULL,
  tech            TEXT[] NOT NULL,
  image_url       TEXT,
  project_url     TEXT,
  github_url      TEXT,
  featured        BOOLEAN DEFAULT false,
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)
```

### Project Images Table
```sql
project_images (
  id          SERIAL PRIMARY KEY,
  project_id  INTEGER REFERENCES projects(id) ON DELETE CASCADE,
  image_url   TEXT NOT NULL,
  alt_text    TEXT,
  order_index INTEGER DEFAULT 0,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)
```

## 🎯 Content Management

### Adding New Projects
1. **Via Supabase Dashboard**:
   - Go to Table Editor → `projects`
   - Click "Insert row"
   - Fill in project details
   - For `tech` array: `{"Next.js","TypeScript","Tailwind CSS"}`

2. **Via SQL**:
```sql
INSERT INTO projects (title, description, category, tech, project_url, featured) 
VALUES (
  'Project Name',
  'Short description',
  'Webutvikling',
  ARRAY['Next.js', 'TypeScript'],
  'https://project-url.com',
  true
);
```

### Adding Project Images
1. Upload images to Supabase Storage bucket `project-images`
2. Add records to `project_images` table:
```sql
INSERT INTO project_images (project_id, image_url, alt_text, order_index)
VALUES (1, 'storage-url', 'Desktop view', 0);
```

### Image Organization
- **Desktop images**: Use alt text without "mobile" keyword
- **Mobile images**: Include "mobile" or "phone" in alt text for automatic phone frame detection
- **Order**: Use `order_index` to control display order (0, 1, 2, etc.)

## 🎨 Customization

### Personal Information
Edit `src/data/personal.ts`:
```typescript
export const personalInfo = {
  name: "Your Name",
  title: "Your Title",
  email: "your@email.com",
  social: {
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername"
  }
}
```

### Services
Edit `src/data/services.ts`:
```typescript
export const services = [
  { id: 1, name: "Web Development" },
  { id: 2, name: "Digital Strategy" }
]
```

### Animations
All animations use Framer Motion. Customize in `src/components/animations/`:
- `FadeIn.tsx` - Fade animations
- `HoverEffect.tsx` - Hover interactions
- `AnimatedButton.tsx` - Button animations
- `PageTransition.tsx` - Page transitions

## 📱 Device Frames

The portfolio features custom SVG device frames for professional project presentation:

### Desktop Frame (Laptop Style)
```tsx
<DesktopFrame>
  <Image src="desktop-screenshot.png" alt="Desktop view" />
</DesktopFrame>
```

### Mobile Frame (iPhone Style)
```tsx
<MobileFrame>
  <Image src="mobile-screenshot.png" alt="Mobile view" />
</MobileFrame>
```

### Smart Detection
Images are automatically placed in appropriate frames based on alt text:
- Contains "mobile" or "phone" → Mobile frame
- Default → Desktop frame

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

### Environment Variables for Production
```bash
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_app_password
```

## 🔧 API Reference

### Custom Hooks
```typescript
// Get all projects
const { projects, loading, error } = useProjects()

// Get single project
const { project, loading, error } = useProject(projectId)

// Get featured projects only
const { projects, loading, error } = useFeaturedProjects()
```

### Project Service
```typescript
// Get all projects
const projects = await ProjectService.getAllProjects()

// Get project by ID
const project = await ProjectService.getProjectById(1)

// Get project images
const images = await ProjectService.getProjectImages(1)
```
## 📈 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: Next.js Image component with Supabase Storage
- **Code Splitting**: Automatic with Next.js App Router
- **Caching**: Supabase queries cached with React hooks

## 🔒 Security

- **Environment Variables**: Sensitive data in `.env.local`
- **Row Level Security**: Enabled on Supabase tables
- **CORS**: Configured for production domains
- **Input Validation**: Form validation on contact forms
- **Image Security**: Supabase Storage with access policies

## 🐛 Troubleshooting

### Common Issues

**Projects not loading?**
- Check Supabase connection and environment variables
- Verify RLS policies allow public read access
- Check browser console for errors

**Images not displaying?**
- Ensure Supabase Storage bucket is public
- Verify image URLs are accessible
- Check Next.js image configuration in `next.config.ts`

**Build errors?**
- Verify all environment variables are set
- Check TypeScript types match database schema
- Ensure all imports are correct

### Development Tips
- Use browser dev tools to check network requests
- Monitor Supabase logs for database errors
- Check Vercel function logs for API issues

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is for portfolio purposes. Feel free to use as inspiration for your own portfolio.

## 📞 Contact

- **Website**: [omerdigital.com](https://omerdigital.com)
- **Email**: oemerdigital@gmail.com
- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Supabase** - Excellent backend-as-a-service
- **Vercel** - Seamless deployment platform
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Beautiful animations library

---

**Built with ❤️ in Norway** 🇳🇴
