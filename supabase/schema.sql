-- SQL Script to set up the careers_responses table in Supabase
-- Go to your Supabase Dashboard -> SQL Editor, paste this query, and click "Run".

create table if not exists careers_responses (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text not null,
  college text not null,
  semester_year text not null,
  portfolio text,
  source text not null,
  job_id bigint not null,
  job_title text not null,
  submitted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (Row Level Security) if desired, or disable it for simple admin panel access
alter table careers_responses enable row level security;

-- Create policy to allow anonymous inserts from the API route (using service role key or public policy)
create policy "Allow public inserts" on careers_responses
  for insert with check (true);

-- Create policy to allow authenticated reads
create policy "Allow select for service role" on careers_responses
  for select using (true);
