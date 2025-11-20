# Prashikshan Platform Testing Guide

This document provides comprehensive testing instructions for the Prashikshan educational platform implementation.

## Overview

The Prashikshan platform has been implemented using:
- **Framework**: Vite + React + TypeScript (adapted from Next.js requirements)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS with custom green palette
- **Routing**: React Router

## Important Note: Vite vs Next.js

The original requirements specified a Next.js implementation, but this project uses **Vite + React**. The implementation has been adapted to work with the existing project structure while maintaining all core functionality requirements.

## Phase 1: Configuration Verification

### Environment Setup
1. Ensure `.env` file contains valid Supabase credentials:
   ```bash
   VITE_SUPABASE_PROJECT_ID="your-project-id"
   VITE_SUPABASE_PUBLISHABLE_KEY="your-publishable-key"
   VITE_SUPABASE_URL="https://your-project-id.supabase.co"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```
   **Expected Result**: Build completes successfully without errors

4. Run the dev server:
   ```bash
   npm run dev
   ```
   **Expected Result**: Server starts on http://localhost:8080 or http://localhost:8081

## Phase 2: Supabase Policy Testing (SQL)

Run these queries directly in your Supabase SQL editor:

### TEST 1: Check if RLS is enabled on the profiles table
```sql
select relrowsecurity from pg_class where relname='profiles';
```
**Expected Result**: Returns 't' (true)

### TEST 2: Attempt to read a profile as a non-authenticated user (should fail)
```sql
set role public;
select * from public.profiles limit 1;
```
**Expected Result**: Query should fail or return no results due to RLS policies

### TEST 3: Attempt to insert a profile for a different user (should fail when logged in)
```sql
-- Replace 'OTHER_USER_UUID' with a valid UUID NOT matching your current session ID.
-- Will only work if you execute this through a client that respects RLS.
```
**Expected Result**: Insert should fail due to RLS policy preventing unauthorized inserts

## Phase 3: Manual Functionality Tests (Client-Side)

### Test 1: Authentication (Sign Up)
**Steps**:
1. Navigate to `/login` (or `/` for original auth page)
2. Click "Sign Up" button
3. Enter a valid email and password (min 6 characters)
4. Click the "Sign Up" button

**Expected Result**:
- New user created in Supabase auth.users table
- User is redirected to `/discover` (or `/discover-new` for new implementation)
- No error messages appear

**Action if Failed**: 
- Check Supabase logs
- Verify VITE_SUPABASE_PUBLISHABLE_KEY in .env
- Check RLS insert policy on profiles table

### Test 2: Authentication (Login)
**Steps**:
1. Navigate to `/login` (or `/` for original auth page)
2. Enter existing user credentials
3. Click "Login" button

**Expected Result**:
- Existing user is logged in successfully
- User is redirected to `/discover` (or `/discover-new` for new implementation)
- No error messages appear

**Action if Failed**:
- Check VITE_SUPABASE_PUBLISHABLE_KEY in .env
- Verify credentials are correct
- Check browser console for errors

### Test 3: Route Protection
**Steps**:
1. Ensure you are logged out
2. Manually type `/discover` or `/discover-new` in the browser URL bar
3. Press Enter

**Expected Result**:
- User is automatically redirected to `/` (login page)
- Discover page does not display

**Action if Failed**:
- Check AuthGuard.tsx logic
- Check ProtectedRoute.tsx logic
- Verify AuthContext is properly configured

### Test 4: Logout
**Steps**:
1. Log in successfully
2. Navigate to discover page
3. Click "Logout" button (or Settings icon on original page)

**Expected Result**:
- User is redirected to `/` (login page)
- Session token is cleared from localStorage
- Attempting to navigate to `/discover` redirects to login

**Action if Failed**:
- Check supabase.auth.signOut() call
- Verify router navigation
- Check localStorage to ensure session is cleared

### Test 5: UI/Styling - Green Palette
**Steps**:
1. Navigate to `/login` page
2. Inspect the following elements:
   - Page background should be light green (#E8F5E9)
   - Title "Prashikshan Login" should be dark green (#388E3C)
   - Login button should have green background
   - Input borders should be green-tinted

3. After logging in, navigate to `/discover-new`
4. Inspect the discover cards:
   - Cards should have light green background (#E8F5E9)
   - Cards should have green left border (#388E3C)
   - Logout button should be green

**Expected Result**:
- All elements use the Prashikshan green color palette
- Hover effects work smoothly
- Responsive design works on mobile and desktop

**Action if Failed**:
- Check Tailwind class names in the browser developer tools
- Verify custom CSS classes in src/index.css
- Check tailwind.config.ts for custom color definitions

## Phase 4: Frontend Error Handling Test

### Test: Invalid Supabase URL
**Steps**:
1. Stop the dev server
2. Change VITE_SUPABASE_URL in .env to an incorrect value (e.g., add "xxx" to the URL)
3. Restart the dev server
4. Navigate to the login page
5. Attempt to log in with valid credentials

**Expected Result**:
- Application should display an error message via alert() 
- Application should NOT crash or show blank page
- Error message should be descriptive

**Action if Failed**:
- Check error handling in LoginPage.tsx
- Verify the alert(error.message) line exists
- Check browser console for unhandled errors

## Phase 5: Build and Deployment Tests

### Test 1: Production Build
```bash
npm run build
```
**Expected Result**: Build completes without errors, creates dist/ folder

### Test 2: Build Preview
```bash
npm run preview
```
**Expected Result**: Preview server starts and application works correctly

### Test 3: Linting
```bash
npm run lint
```
**Expected Result**: No new errors (existing warnings are acceptable)

## Implementation Notes

### Routes Available
1. **Original Implementation**:
   - `/` - Auth page (existing)
   - `/discover` - Discover dashboard (existing)

2. **Prashikshan Implementation**:
   - `/login` - Prashikshan login page (new)
   - `/discover-new` - Prashikshan discover page (new)

### Key Files Modified/Created
- `src/lib/supabase.ts` - Added getSession function
- `src/components/AuthGuard.tsx` - Route protection component
- `src/components/common/Button.tsx` - Prashikshan green button
- `src/hooks/useSession.tsx` - Session hook
- `src/hooks/useRouter.tsx` - Router compatibility hook
- `src/pages/LoginPage.tsx` - Prashikshan login page
- `src/pages/DiscoverPage.tsx` - Prashikshan discover page
- `src/index.css` - Custom green palette CSS
- `tailwind.config.ts` - Prashikshan colors
- `.env.example` - Updated with proper documentation

### Deviations from Original Requirements

The original problem statement specified a **Next.js** implementation with these characteristics:
- Next.js routing with `useRouter` from `next/router`
- Environment variables prefixed with `NEXT_PUBLIC_`
- File structure in `src/pages/` following Next.js conventions

**This implementation uses Vite + React** instead, with these adaptations:
- React Router for routing
- Environment variables prefixed with `VITE_`
- Existing Vite/React project structure maintained
- Created compatibility layer with `useRouter` hook wrapping React Router

All core functionality requirements have been met:
- ✅ Supabase authentication
- ✅ Green Prashikshan color palette
- ✅ Route protection with AuthGuard
- ✅ Login/Sign Up pages
- ✅ Discover dashboard
- ✅ Error handling
- ✅ Session management

## Security Considerations

1. **Row Level Security (RLS)**: Ensure RLS policies are enabled in Supabase
2. **Environment Variables**: Never commit actual credentials to git
3. **HTTPS**: Use HTTPS in production
4. **Session Storage**: Sessions are stored in localStorage with auto-refresh

## Troubleshooting

### Issue: "React is not defined" error
**Solution**: Fixed in commit by updating use-toast.ts implementation

### Issue: Pages redirect to login immediately
**Solution**: Check browser localStorage for valid session token

### Issue: Green colors not appearing
**Solution**: 
- Clear browser cache
- Rebuild with `npm run build`
- Verify Tailwind purge settings

### Issue: Supabase connection fails
**Solution**: 
- Verify .env file has correct credentials
- Check Supabase project is active
- Verify API keys are valid

## Manual Test Checklist

Use this checklist to verify all functionality:

- [ ] Environment variables are configured correctly
- [ ] Project builds without errors
- [ ] Dev server starts successfully
- [ ] Sign up creates new user
- [ ] Login works with valid credentials
- [ ] Invalid credentials show error message
- [ ] Protected routes redirect when not authenticated
- [ ] Logout clears session and redirects
- [ ] Green color palette is applied correctly
- [ ] Login page displays properly
- [ ] Discover page displays properly
- [ ] Buttons have hover effects
- [ ] Forms validate input
- [ ] Error handling shows user-friendly messages
- [ ] Mobile responsive design works
- [ ] Production build succeeds

## Conclusion

All core requirements have been successfully implemented and adapted for the Vite + React environment. The Prashikshan educational platform is ready for testing and deployment.
