-- Run this in the Supabase SQL Editor to create and seed the courses table

create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  icon_name text not null default 'book-open',
  created_at timestamptz not null default now()
);

-- Enable Row Level Security and allow public read
alter table courses enable row level security;

create policy "Allow public read access"
  on courses for select
  using (true);

-- Seed data
insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns', 75, 'layers'),
  ('Machine Learning Fundamentals', 42, 'brain'),
  ('System Design & Architecture', 60, 'server'),
  ('TypeScript Deep Dive', 88, 'code-2');
