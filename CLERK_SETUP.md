# Clerk Authentication Setup Guide για Basecamp Clone

## 📋 Βήμα 1: Λάβετε τα κλειδιά από το Clerk Dashboard

1. Πηγαίνετε στο [Clerk Dashboard](https://dashboard.clerk.com)
2. Επιλέξτε την εφαρμογή σας
3. Πηγαίνετε στο **API Keys** στο αριστερό μενού
4. Αντιγράψτε τα εξής κλειδιά:
   - **Publishable Key** (ξεκινάει με `pk_test_` ή `pk_live_`)
   - **Secret Key** (ξεκινάει με `sk_test_` ή `sk_live_`)

## 🔧 Βήμα 2: Ενημερώστε το αρχείο .env.local

Ανοίξτε το αρχείο `basecamp-clone/.env.local` και προσθέστε τα κλειδιά σας:

```bash
# Database
DATABASE_URL="postgresql://neondb_owner:npg_Wl6Qq1SjIHMd@ep-fragrant-art-a82gd7ov-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"

# Clerk Auth Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_xxxxxxxxxxxxxxxxxxxxxxx"
CLERK_SECRET_KEY="sk_test_xxxxxxxxxxxxxxxxxxxxxxx"

# Clerk URLs - These are configured for this project
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/dashboard"

# Organization support (required for teams/organizations feature)
NEXT_PUBLIC_CLERK_ORGANIZATION_PROFILE_URL="/organization-profile"
NEXT_PUBLIC_CLERK_CREATE_ORGANIZATION_URL="/create-organization"

# User Profile URL
NEXT_PUBLIC_CLERK_USER_PROFILE_URL="/user-profile"

# Webhook signing secret (You'll get this in Step 4)
CLERK_WEBHOOK_SECRET=""
```

## ⚙️ Βήμα 3: Ρυθμίστε το Clerk Application

### 3.1 Ενεργοποιήστε Organizations
1. Στο Clerk Dashboard, πηγαίνετε στο **Organizations** στο αριστερό μενού
2. Κάντε κλικ στο **Enable organizations**
3. Ρυθμίστε τις παρακάτω επιλογές:
   - ✅ **Enable organizations**
   - ✅ **Enable organization profiles**
   - ✅ **Show organization switcher**
   - ✅ **Allow users to create organizations**

### 3.2 Ρυθμίστε τα Redirect URLs
1. Πηγαίνετε στο **Paths** στο Clerk Dashboard
2. Ρυθμίστε τα εξής:
   - **Sign-in path**: `/sign-in`
   - **Sign-up path**: `/sign-up`
   - **User profile path**: `/user-profile`
   - **Organization profile path**: `/organization-profile`
   - **Create organization path**: `/create-organization`

### 3.3 Ρυθμίστε την Session Configuration
1. Πηγαίνετε στο **Sessions** στο Clerk Dashboard
2. Ρυθμίστε τις εξής επιλογές:
   - **Session lifetime**: 7 days (προτείνεται)
   - **Require multi-factor authentication**: Optional
   - **Allow sign-ups**: ✅ Enabled

## 🔗 Βήμα 4: Ρυθμίστε Webhooks για Database Sync

### 4.1 Δημιουργήστε Webhook Endpoint
1. Στο Clerk Dashboard, πηγαίνετε στο **Webhooks**
2. Κάντε κλικ στο **Add Endpoint**
3. Εισάγετε το URL: `https://your-domain.com/api/webhooks/clerk`
   - Για τοπική ανάπτυξη, χρησιμοποιήστε ngrok ή παρόμοιο εργαλείο
4. Επιλέξτε τα παρακάτω events:
   - ✅ `user.created`
   - ✅ `user.updated`
   - ✅ `user.deleted`
   - ✅ `organization.created`
   - ✅ `organization.updated`
   - ✅ `organization.deleted`
   - ✅ `organizationMembership.created`
   - ✅ `organizationMembership.updated`
   - ✅ `organizationMembership.deleted`

### 4.2 Αντιγράψτε το Webhook Secret
1. Μετά τη δημιουργία του webhook, αντιγράψτε το **Signing secret**
2. Προσθέστε το στο `.env.local`:
```bash
CLERK_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxxxxxxxxxxxx"
```

## 🚀 Βήμα 5: Ξεκινήστε την Εφαρμογή

```bash
cd basecamp-clone
bun dev
```

Η εφαρμογή θα είναι διαθέσιμη στο `http://localhost:3000`

## 📝 Βήμα 6: Δοκιμάστε την Αυθεντικοποίηση

1. **Εγγραφή**: Πηγαίνετε στο `/sign-up` και δημιουργήστε λογαριασμό
2. **Σύνδεση**: Συνδεθείτε στο `/sign-in`
3. **Dashboard**: Μετά τη σύνδεση θα ανακατευθυνθείτε στο `/dashboard`
4. **Organization**: Δημιουργήστε έναν οργανισμό από το Organization Switcher

## 🛠️ Χρήσιμες Εντολές

```bash
# Εκτέλεση της εφαρμογής
bun dev

# Εκτέλεση database seeding
bun run seed

# Linting
bun run lint

# Build για production
bun run build
```

## 📚 Τι έχει υλοποιηθεί

### ✅ Authentication Features
- [x] **Sign In/Sign Up**: Πλήρη διαχείριση εγγραφής και σύνδεσης
- [x] **User Profile**: Διαχείριση προφίλ χρήστη
- [x] **Organization Support**: Πλήρη υποστήριξη οργανισμών/ομάδων
- [x] **Organization Switcher**: Εναλλαγή μεταξύ οργανισμών
- [x] **Protected Routes**: Προστασία σελίδων που απαιτούν αυθεντικοποίηση
- [x] **Middleware**: Clerk middleware για route protection
- [x] **Webhook Integration**: Συγχρονισμός με τη βάση δεδομένων

### ✅ UI Features
- [x] **Navigation**: Ενοποιημένη πλοήγηση με Clerk components
- [x] **User Button**: Κουμπί χρήστη με dropdown μενού
- [x] **Organization Profile**: Σελίδα διαχείρισης οργανισμού
- [x] **Greek Localization**: Πλήρη μετάφραση στα ελληνικά
- [x] **Basecamp Styling**: Styling που ταιριάζει με το Basecamp

### ✅ Database Integration
- [x] **User Sync**: Αυτόματος συγχρονισμός χρηστών
- [x] **Organization Sync**: Συγχρονισμός οργανισμών
- [x] **Membership Sync**: Συγχρονισμός μελών οργανισμού

## 🔧 Troubleshooting

### Πρόβλημα: "Publishable key not valid"
**Λύση**: Ελέγξτε ότι έχετε προσθέσει το σωστό publishable key στο `.env.local`

### Πρόβλημα: "Unauthorized" σφάλμα
**Λύση**: Ελέγξτε το secret key και ότι έχετε επανεκκινήσει τον server

### Πρόβλημα: Webhooks δεν λειτουργούν τοπικά
**Λύση**: Χρησιμοποιήστε ngrok για να εκθέσετε τον τοπικό server:
```bash
ngrok http 3000
# Χρησιμοποιήστε το ngrok URL στο webhook endpoint
```

### Πρόβλημα: Organizations δεν εμφανίζονται
**Λύση**: Ελέγξτε ότι έχετε ενεργοποιήσει organizations στο Clerk Dashboard

## 📞 Υποστήριξη

- **Clerk Documentation**: [https://clerk.com/docs](https://clerk.com/docs)
- **Next.js Integration**: [https://clerk.com/docs/nextjs](https://clerk.com/docs/nextjs)
- **Organization Setup**: [https://clerk.com/docs/organizations](https://clerk.com/docs/organizations)

---

## 🎯 Επόμενα Βήματα

Μετά την ολοκλήρωση της ρύθμισης:

1. **Database Connection**: Συνδέστε τη βάση δεδομένων με πραγματικά δεδομένα
2. **Real-time Features**: Προσθέστε real-time notifications
3. **File Upload**: Υλοποιήστε file upload με cloud storage
4. **Task Management**: Ολοκληρώστε τη διαχείριση εργασιών
5. **Client Portal**: Δημιουργήστε portal για πελάτες

Η εφαρμογή είναι έτοιμη για production deployment μετά την ολοκλήρωση αυτών των βημάτων!