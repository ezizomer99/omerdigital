# Supabase Integration Setup Guide

This guide will help you set up Supabase for your portfolio website to manage projects dynamically.

## 🚀 Quick Setup

### 1. Database Setup

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Open the SQL Editor
3. Copy and paste the content from `supabase-schema.sql` 
4. Run the SQL script to create tables and sample data

### 2. Environment Variables

The environment variables are already configured in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://bchgoaxmxbqhpfiwkcte.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Test the Integration

1. Start your development server: `npm run dev`
2. Visit `/work` to see projects loaded from Supabase
3. Click on any project to see the detail page

## 📊 Database Schema

### Projects Table
- `id`: Primary key
- `title`: Project title
- `description`: Short description
- `long_description`: Detailed description (optional)
- `category`: Project category
- `tech`: Array of technologies used
- `image_url`: Main project image (optional)
- `project_url`: Live project URL (optional)
- `github_url`: GitHub repository URL (optional)
- `featured`: Boolean to mark featured projects
- `created_at`, `updated_at`: Timestamps

### Project Images Table
- `id`: Primary key
- `project_id`: Foreign key to projects
- `image_url`: Image URL
- `alt_text`: Alt text for accessibility
- `order_index`: Display order
- `created_at`: Timestamp

## 🛠️ Managing Content

### Adding New Projects

1. Go to Supabase Dashboard > Table Editor
2. Open the `projects` table
3. Click "Insert" > "Insert row"
4. Fill in the project details
5. For the `tech` array, use format: `{"Next.js","TypeScript","Tailwind CSS"}`

### Adding Project Images

1. First, upload images to Supabase Storage or use external URLs
2. Go to `project_images` table
3. Add new rows with:
   - `project_id`: The ID of the project
   - `image_url`: URL to the image
   - `alt_text`: Descriptive text
   - `order_index`: Display order (0, 1, 2, etc.)

### Uploading Images to Supabase Storage

1. Go to Storage in Supabase Dashboard
2. Create a bucket called `project-images`
3. Make it public for easy access
4. Upload your project screenshots
5. Copy the public URLs to use in the `image_url` fields

## 🎯 Features Implemented

- ✅ Dynamic project loading from Supabase
- ✅ Individual project detail pages
- ✅ Multiple images per project
- ✅ Featured projects support
- ✅ Responsive design maintained
- ✅ Loading states and error handling
- ✅ SEO-friendly URLs
- ✅ Type-safe TypeScript integration

## 🔄 Future Enhancements

Consider adding:
- Admin dashboard for easier content management
- Image optimization and resizing
- Search and filtering capabilities
- Tags system for better categorization
- Blog posts or case studies
- Client testimonials
- Contact form submissions storage

## 🐛 Troubleshooting

### Projects not loading?
1. Check browser console for errors
2. Verify environment variables are set correctly
3. Ensure Supabase RLS policies allow public read access
4. Check if the database tables exist

### Images not displaying?
1. Verify image URLs are publicly accessible
2. Check if images are properly uploaded to Supabase Storage
3. Ensure proper CORS settings in Supabase if using external images

### Build errors?
1. Make sure all environment variables are present
2. Check TypeScript types match the database schema
3. Verify all imports are correct

## 📝 Notes

- The integration maintains backward compatibility
- All animations and styling are preserved
- The app gracefully handles missing data
- Loading states provide good user experience
- Error boundaries prevent crashes

Your portfolio is now powered by Supabase and ready for dynamic content management! 🎉
