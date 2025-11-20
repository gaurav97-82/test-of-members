# Deployment Guide

This project can be deployed using two approaches:

## Option 1: Frontend on Vercel (Recommended for this project)

This React + Vite application is best suited for Vercel deployment since it's a static frontend with Supabase as the backend.

### Deploy to Vercel

1. **Connect Repository to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Add Environment Variables**
   ```
   VITE_SUPABASE_PROJECT_ID=your-project-id
   VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

### Automatic Deployments
- Every push to the main branch will trigger a new deployment
- Pull requests will get preview deployments

## Option 2: Backend on Render (Alternative approach)

If you prefer to serve the built static files through an Express server:

### Deploy to Render

1. **Connect Repository to Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**
   - Name: `test-of-members-backend`
   - Runtime: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `node server.cjs`
   - Instance Type: Free

3. **Add Environment Variables**
   ```
   NODE_ENV=production
   PORT=10000
   VITE_SUPABASE_PROJECT_ID=your-project-id
   VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy your application

### Auto-Deploy
- Push to main branch triggers automatic deployments

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint

# Start production server (after build)
npm start
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

## Project Structure

- `src/` - React application source code
- `dist/` - Production build output (generated)
- `server.cjs` - Express server for serving static files
- `vercel.json` - Vercel deployment configuration
- `render.yaml` - Render deployment configuration

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Library**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query
- **Routing**: React Router
- **Backend**: Supabase
- **Form Handling**: React Hook Form + Zod

## Notes

- The `.env` file contains sensitive credentials and should never be committed
- Update environment variables in your deployment platform after deployment
- The Supabase backend is already configured and doesn't need separate deployment
- For Vercel deployment, the `server.cjs` file is not needed (Vercel serves static files automatically)
- For Render deployment, the Express server serves the built static files from the `dist` folder
