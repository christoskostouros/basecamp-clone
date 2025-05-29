# Netlify Deployment Guide for Basecamp Clone

This guide will walk you through deploying your Basecamp clone application to Netlify from your GitHub repository.

## Prerequisites

- [x] GitHub repository created and code pushed
- [x] Clerk account with application configured
- [x] Neon PostgreSQL database set up
- [ ] Netlify account (free tier is sufficient)

## Step 1: Connect GitHub Repository to Netlify

1. **Go to Netlify Dashboard**
   - Visit [netlify.com](https://netlify.com) and sign up/log in
   - Click "Add new site" → "Import an existing project"

2. **Connect GitHub**
   - Click "Deploy with GitHub"
   - Authorize Netlify to access your GitHub account
   - Select your `basecamp-clone` repository

3. **Configure Build Settings**
   ```
   Branch to deploy: main
   Build command: bun run build
   Publish directory: .next
   ```

4. **Advanced Build Settings** (click "Show advanced")
   ```
   Functions directory: netlify/functions (leave empty for now)
   ```

## Step 2: Add Environment Variables

In the Netlify dashboard for your site:

1. Go to **Site settings** → **Environment variables**
2. Click **"Add a variable"** for each of the following:

### Required Environment Variables

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE
CLERK_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE

# Clerk URLs (use your actual Netlify domain)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_ORGANIZATION_PROFILE_URL=/organization-profile
NEXT_PUBLIC_CLERK_CREATE_ORGANIZATION_URL=/create-organization
NEXT_PUBLIC_CLERK_USER_PROFILE_URL=/user-profile

# Database
DATABASE_URL=postgresql://username:password@hostname/database?sslmode=require

# WebSocket (optional - for real-time features)
NEXT_PUBLIC_SOCKET_URL=https://your-socket-server.com
```

### Getting Your Values

**Clerk Keys:**
1. Go to clerk.com/dashboard
2. Select your application
3. Go to **API Keys** in the sidebar
4. Copy the **Publishable key** and **Secret key**
5. Make sure you're using the **production keys** (they start with pk_live_ and sk_live_)

**Database URL:**
1. Go to console.neon.tech
2. Select your project
3. Go to **Connection Details**
4. Copy the connection string (make sure it includes ?sslmode=require)

## Step 3: Deploy

1. After adding all environment variables, click **"Deploy site"**
2. Wait for the build to complete (usually 2-3 minutes)
3. Your site will be available at https://[random-name].netlify.app

## Step 4: Configure Custom Domain (Optional)

1. In Netlify dashboard, go to **Domain settings**
2. Click **"Add custom domain"**
3. Enter your domain name
4. Follow the DNS configuration instructions

## Step 5: Update Clerk Settings

1. In your Clerk dashboard, go to **Domains**
2. Add your Netlify domain (e.g., https://your-app.netlify.app)
3. Go to **Webhooks** and update any webhook URLs if needed

## Step 6: Test Your Deployment

1. Visit your deployed site
2. Test user registration/login
3. Create an organization
4. Test project and task creation
5. Verify real-time features work

## Troubleshooting

### Build Fails
- Check the **Deploy log** in Netlify for specific error messages
- Ensure all dependencies are in `package.json`
- Verify environment variables are set correctly

### Authentication Issues
- Double-check Clerk keys are production keys
- Verify all Clerk URLs point to your Netlify domain
- Check that Organizations feature is enabled in Clerk

### Database Connection Issues
- Verify DATABASE_URL includes ?sslmode=require
- Check that your Neon database allows connections
- Test database connection locally first

### Runtime Errors
- Check the browser console for client-side errors
- Verify all environment variables are set in Netlify
- Make sure you're using the correct Clerk configuration

## Updating Your Deployment

Whenever you push changes to your `main` branch:
1. Netlify will automatically trigger a new build
2. The build will take 2-3 minutes
3. Your site will be updated automatically

## Environment Variables Checklist

- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- [ ] `CLERK_SECRET_KEY`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL`
- [ ] `NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL`
- [ ] `NEXT_PUBLIC_CLERK_ORGANIZATION_PROFILE_URL`
- [ ] `NEXT_PUBLIC_CLERK_CREATE_ORGANIZATION_URL`
- [ ] `NEXT_PUBLIC_CLERK_USER_PROFILE_URL`
- [ ] `DATABASE_URL`
- [ ] `NEXT_PUBLIC_SOCKET_URL` (optional)

## Need Help?

If you encounter issues:
1. Check Netlify's build logs
2. Review the troubleshooting section above
3. Verify all prerequisites are met
4. Test the application locally first

Your Basecamp clone should now be live and accessible to users worldwide! 🚀