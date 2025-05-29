// Example Clerk Configuration για Basecamp Clone
// Αντιγράψτε αυτό το αρχείο ως clerk-config.js και συμπληρώστε τα στοιχεία σας

const clerkConfig = {
  // Από το Clerk Dashboard -> API Keys
  publishableKey: "pk_test_your_publishable_key_here",
  secretKey: "sk_test_your_secret_key_here",
  
  // Webhook configuration
  webhookSecret: "whsec_your_webhook_secret_here",
  
  // URLs που έχουν ήδη ρυθμιστεί στο project
  paths: {
    signIn: "/sign-in",
    signUp: "/sign-up",
    afterSignIn: "/dashboard",
    afterSignUp: "/dashboard",
    userProfile: "/user-profile",
    organizationProfile: "/organization-profile",
    createOrganization: "/create-organization"
  },
  
  // Organization settings που πρέπει να ενεργοποιήσετε στο Clerk Dashboard
  organizationSettings: {
    enabled: true,
    allowCreation: true,
    showSwitcher: true,
    enableProfiles: true
  },
  
  // Webhook events που πρέπει να ενεργοποιήσετε
  webhookEvents: [
    "user.created",
    "user.updated", 
    "user.deleted",
    "organization.created",
    "organization.updated",
    "organization.deleted",
    "organizationMembership.created",
    "organizationMembership.updated", 
    "organizationMembership.deleted"
  ]
}

module.exports = clerkConfig