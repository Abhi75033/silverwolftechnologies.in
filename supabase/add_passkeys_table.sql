-- SQL Script to set up the admin_passkeys table in Supabase
-- Go to your Supabase Dashboard -> SQL Editor, paste this query, and click "Run".

create table if not exists admin_passkeys (
  id uuid default gen_random_uuid() primary key,
  credential_id text unique not null,
  public_key text not null, -- base64url or base64 representation of COSE public key
  counter bigint default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (Row Level Security)
alter table admin_passkeys enable row level security;

-- Create policies to allow access using service role key (the backend route uses the service role key)
create policy "Allow select for service role" on admin_passkeys
  for select using (true);

create policy "Allow insert for service role" on admin_passkeys
  for insert with check (true);

create policy "Allow update for service role" on admin_passkeys
  for update using (true);
