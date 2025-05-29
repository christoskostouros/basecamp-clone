# Netlify Environment Variables Setup

## Site URL
- **Live Site**: https://same-3z3tp0mivhx-latest.netlify.app

## Required Environment Variables

Add these environment variables to your Netlify site settings:

### Clerk Authentication
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_c2V0LXNlYWhvcnNlLTE1LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY=sk_test_8apKEyCUgrgUt0Ht9iGMPPIeidlChkeTPdDMxdmgJT
```

### Database Connection
```
DATABASE_URL=postgresql://neondb_owner:npg_Wl6Qq1SjIHMd@ep-fragrant-art-a82gd7ov-pooler.eastus2.azure.neon.tech/neondb?sslmode=require
```

### Clerk Configuration URLs
```
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
NEXT_PUBLIC_CLERK_ORGANIZATION_PROFILE_URL=/organization-profile
NEXT_PUBLIC_CLERK_CREATE_ORGANIZATION_URL=/create-organization
NEXT_PUBLIC_CLERK_USER_PROFILE_URL=/user-profile
```

## How to Add Environment Variables to Netlify

### Step 1: Access Site Settings
1. Go to your [Netlify Dashboard](https://app.netlify.com/)
2. Find your site: `same-3z3tp0mivhx-latest`
3. Click on the site name to enter the site dashboard
4. Navigate to **Site settings** → **Environment variables**

### Step 2: Add Each Variable
For each environment variable above:
1. Click **Add a variable**
2. Enter the **Key** (e.g., `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`)
3. Enter the **Value** (e.g., `pk_test_c2V0LXNlYWhvcnNlLTE1LmNsZXJrLmFjY291bnRzLmRldiQ`)
4. Set **Scopes** to **All scopes** (or at minimum **Production**)
5. Click **Create variable**

### Step 3: Trigger Redeploy
After adding all environment variables:
1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Wait for the deployment to complete

### Alternative: Using Netlify CLI

If you have Netlify CLI installed, you can add variables via command line:

```bash
# Install Netlify CLI if not already installed
npm install -g netlify-cli

# Login to Netlify
netlify login

# Set each environment variable
netlify env:set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY "pk_test_c2V0LXNlYWhvcnNlLTE1LmNsZXJrLmFjY291bnRzLmRldiQ"
netlify env:set CLERK_SECRET_KEY "sk_test_8apKEyCUgrgUt0Ht9iGMPPIeidlChkeTPdDMxdmgJT"
netlify env:set DATABASE_URL "postgresql://neondb_owner:npg_Wl6Qq1SjIHMd@ep-fragrant-art-a82gd7ov-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"
netlify env:set NEXT_PUBLIC_CLERK_SIGN_IN_URL "/sign-in"
netlify env:set NEXT_PUBLIC_CLERK_SIGN_UP_URL "/sign-up"
netlify env:set NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL "/dashboard"
netlify env:set NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL "/dashboard"
netlify env:set NEXT_PUBLIC_CLERK_ORGANIZATION_PROFILE_URL "/organization-profile"
netlify env:set NEXT_PUBLIC_CLERK_CREATE_ORGANIZATION_URL "/create-organization"
netlify env:set NEXT_PUBLIC_CLERK_USER_PROFILE_URL "/user-profile"

# Redeploy the site
netlify deploy --prod
```

## Verification

After redeployment:
1. Visit https://same-3z3tp0mivhx-latest.netlify.app
2. Try to sign in/sign up - authentication should work
3. Check browser console for any remaining errors
4. Test the dashboard and other protected routes

## Important Notes

- **CLERK_SECRET_KEY** is sensitive - never expose it in client-side code
- **NEXT_PUBLIC_** prefixed variables are exposed to the browser
- Environment variables are encrypted and secure in Netlify
- Changes to environment variables require a redeploy to take effect

## Troubleshooting

If authentication still doesn't work after adding environment variables:
1. Check that all variable names match exactly (case-sensitive)
2. Ensure no extra spaces in values
3. Verify the deployment completed successfully
4. Check browser console for specific error messages
5. Test authentication on localhost first to confirm keys work