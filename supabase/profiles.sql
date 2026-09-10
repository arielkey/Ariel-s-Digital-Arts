-- Run this in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  stripe_customer_id text,
  shipping_address1 text,
  shipping_address2 text,
  shipping_city text,
  shipping_state text,
  shipping_zip text,
  shipping_country text default 'US',
  updated_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Users can view their own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

-- Service-role key (used server-side by the checkout webhook) bypasses RLS
-- automatically, so no extra policy is needed for that.

-- Auto-create an empty profile row whenever someone signs up, so the
-- account page always has a row to read/update instead of needing to
-- handle a "no profile yet" case.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
