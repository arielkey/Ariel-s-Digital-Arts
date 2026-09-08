-- Run this once in the Supabase SQL Editor (Dashboard -> SQL Editor -> New query)
-- to set up the original art gallery table.

create table if not exists art_pieces (
  id text primary key,
  title text not null,
  description text,
  image text not null default '',
  price numeric,
  currency text not null default 'USD',
  status text not null default 'available' check (status in ('available', 'sold', 'inquire')),
  created_at timestamptz not null default now()
);

-- Row Level Security: anyone can read listings, but only the service role
-- (used server-side, e.g. by the checkout webhook) can write.
alter table art_pieces enable row level security;

create policy "Public can read art pieces"
  on art_pieces for select
  using (true);

-- To add, edit, or remove pieces day-to-day, use the Supabase Table Editor
-- (Dashboard -> Table Editor -> art_pieces) -- no SQL needed for that.

-- Example row:
-- insert into art_pieces (id, title, description, image, price, currency, status)
-- values (
--   'the-quillkeeper',
--   'The Quillkeeper',
--   'Original digital painting, fantasy portrait series.',
--   'https://your-project.supabase.co/storage/v1/object/public/art/quillkeeper.png',
--   120,
--   'USD',
--   'available'
-- );
