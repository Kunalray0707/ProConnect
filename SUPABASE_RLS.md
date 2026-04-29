# Supabase Security & RLS Guide

This repository now includes Supabase authentication and profile handling. To keep private data secure, enable Row Level Security (RLS) on the Supabase tables.

## Recommended tables

- `profiles`
  - `id` (uuid)
  - `user_id` (uuid)
  - `name`
  - `role`
  - `location`
  - `skills`
  - `description`
  - `avatar`
  - `available`
  - `verified`
  - `hourly_rate`
  - `public`
  - `created_at`
  - `updated_at`

- `messages`
  - `id`
  - `sender_id`
  - `receiver_id`
  - `content`
  - `read`
  - `created_at`

## RLS policies

Enable RLS for `profiles` and `messages`, then add policies like:

```sql
-- Allow users to read public profiles and their own private profile
create policy "Public profiles and own private profile" on profiles
for select using (
  public = true or auth.uid() = user_id
);

-- Allow a user to insert their own profile row
create policy "Insert own profiles" on profiles
for insert with check (
  auth.uid() = user_id
);

-- Allow a user to update only their profile
create policy "Update own profile" on profiles
for update using (
  auth.uid() = user_id
) with check (
  auth.uid() = user_id
);

-- Allow a user to delete only their profile
create policy "Delete own profile" on profiles
for delete using (
  auth.uid() = user_id
);

-- Allow users to select messages if they are sender or receiver
create policy "Select own messages" on messages
for select using (
  auth.uid() = sender_id or auth.uid() = receiver_id
);

-- Allow users to insert messages only from themselves
create policy "Insert own messages" on messages
for insert with check (
  auth.uid() = sender_id
);
```

## Environment variables

Add these to your `.env` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_RAZORPAY_KEY=rp_test_...
```

## Production notes

- Use Supabase auth for Email/Password, Google, and GitHub.
- Enable email confirmations for password security.
- Do not store secrets in client code.
- Use secure file upload policies and storage signing when uploading avatars or documents.
- Validate all text fields on both client and server.
