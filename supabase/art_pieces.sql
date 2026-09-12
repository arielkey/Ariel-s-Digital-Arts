-- Run this in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.

create table if not exists art_pieces (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image text not null,
  price numeric,
  currency text not null default 'USD',
  status text not null default 'available' check (status in ('available', 'sold', 'inquire')),
  longest_side_inches numeric,
  created_at timestamptz not null default now()
);

alter table art_pieces enable row level security;

-- Anyone (including anonymous site visitors) can read art pieces — this
-- is public gallery/shop data.
create policy "Anyone can view art pieces"
  on art_pieces for select
  using (true);

-- Inserts/updates (adding new pieces, marking sold) go through the
-- service-role key from the admin/checkout code, which bypasses RLS
-- automatically — no additional policy needed for that.
