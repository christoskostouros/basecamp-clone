# Quick Deployment Checklist

## 🚀 Deploy to Netlify in 5 Minutes

### Step 1: Netlify Setup
1. Go to [netlify.com](https://netlify.com) → "Add new site" → "Import an existing project"
2. Connect GitHub and select `christoskostouros/basecamp-clone`
3. Build settings:
   - Build command: `bun run build`
   - Publish directory: `.next`
4. Click "Deploy site"

### Step 2: Add Environment Variables
Go to Site Settings → Environment Variables and add:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_YOUR_KEY_HERE
CLERK_SECRET_KEY=sk_live_YOUR_KEY_HERE
DATABASE_URL=postgresql://username:password@hostname/database
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_ORGANIZATION_PROFILE_URL=/organization-profile
NEXT_PUBLIC_CLERK_CREATE_ORGANIZATION_URL=/create-organization
NEXT_PUBLIC_CLERK_USER_PROFILE_URL=/user-profile
```

### Step 3: Redeploy
After adding environment variables, trigger a new deployment.

### Step 4: Update Clerk Domain
Add your Netlify URL to Clerk dashboard → Domains

## ✅ Verification Checklist
- [ ] Site builds successfully
- [ ] Can sign up/login
- [ ] Dashboard loads
- [ ] Can create organizations
- [ ] Can create projects
- [ ] No console errors

**Your repository:** https://github.com/christoskostouros/basecamp-clone