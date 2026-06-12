create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Bloom',
  avatar_url text,
  bio text,
  country text,
  timezone text not null default 'UTC',
  keyboard_layout text not null default 'qwerty',
  preferred_language text not null default 'en',
  experience_level text not null default 'beginner',
  daily_goal_minutes integer not null default 10,
  target_wpm integer not null default 45,
  target_accuracy numeric(5,2) not null default 97,
  profile_visibility text not null default 'private',
  leaderboard_opt_in boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  theme text not null default 'dark-purple',
  reduced_motion boolean not null default false,
  high_contrast boolean not null default false,
  exercise_text_size integer not null default 28,
  virtual_keyboard_visible boolean not null default true,
  finger_hints_visible boolean not null default true,
  allow_backspace boolean not null default true,
  stop_on_error boolean not null default false,
  strict_mode boolean not null default false,
  show_live_wpm boolean not null default true,
  sound_enabled boolean not null default false,
  volume numeric(4,2) not null default 0.35,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id)
);

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  course_order integer not null,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.course_levels (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  level_order integer not null,
  title text not null,
  unlock_requirement jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(course_id, level_order)
);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  course_level_id uuid not null references public.course_levels(id) on delete cascade,
  lesson_order integer not null,
  title text not null,
  difficulty text not null default 'beginner',
  target_wpm integer not null default 25,
  target_accuracy numeric(5,2) not null default 95,
  estimated_minutes integer not null default 5,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(course_level_id, lesson_order)
);

create table public.lesson_exercises (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  exercise_order integer not null,
  content text not null,
  content_type text not null default 'text',
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now(),
  unique(lesson_id, exercise_order)
);

create table public.typing_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  session_type text not null,
  lesson_id uuid references public.lessons(id) on delete set null,
  started_at timestamptz not null,
  completed_at timestamptz,
  duration_seconds numeric(10,2) not null default 0,
  gross_wpm numeric(8,2) not null default 0,
  net_wpm numeric(8,2) not null default 0,
  raw_wpm numeric(8,2) not null default 0,
  accuracy numeric(5,2) not null default 0,
  consistency numeric(5,2) not null default 0,
  total_characters integer not null default 0,
  correct_characters integer not null default 0,
  incorrect_characters integer not null default 0,
  extra_characters integer not null default 0,
  missed_characters integer not null default 0,
  corrected_errors integer not null default 0,
  uncorrected_errors integer not null default 0,
  backspace_count integer not null default 0,
  key_statistics jsonb not null default '[]',
  word_statistics jsonb not null default '[]',
  timeline_samples jsonb not null default '[]',
  keyboard_layout text not null default 'qwerty',
  device_type text,
  difficulty text,
  is_personal_record boolean not null default false,
  sync_status text not null default 'synced',
  created_at timestamptz not null default now()
);

create table public.custom_exercises (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  content text not null,
  tags text[] not null default '{}',
  target_wpm integer,
  target_accuracy numeric(5,2),
  time_limit_seconds integer,
  strict_mode boolean not null default false,
  is_deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.achievements (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  category text not null,
  rarity text not null default 'common',
  criteria jsonb not null,
  created_at timestamptz not null default now()
);

create table public.user_achievements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  achievement_id uuid not null references public.achievements(id) on delete cascade,
  progress numeric(8,2) not null default 0,
  unlocked_at timestamptz,
  created_at timestamptz not null default now(),
  unique(user_id, achievement_id)
);

create table public.leaderboard_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  typing_session_id uuid not null references public.typing_sessions(id) on delete cascade,
  category text not null,
  score numeric(10,2) not null,
  display_name text not null,
  is_suspicious boolean not null default false,
  created_at timestamptz not null default now()
);

create index profiles_leaderboard_opt_in_idx on public.profiles(leaderboard_opt_in);
create index typing_sessions_user_created_idx on public.typing_sessions(user_id, created_at desc);
create index typing_sessions_type_idx on public.typing_sessions(session_type);
create index custom_exercises_user_idx on public.custom_exercises(user_id) where is_deleted = false;
create index leaderboard_category_score_idx on public.leaderboard_entries(category, score desc) where is_suspicious = false;

alter table public.profiles enable row level security;
alter table public.user_settings enable row level security;
alter table public.typing_sessions enable row level security;
alter table public.custom_exercises enable row level security;
alter table public.user_achievements enable row level security;
alter table public.leaderboard_entries enable row level security;

create policy "profiles are readable by owner" on public.profiles for select using (auth.uid() = id);
create policy "profiles are editable by owner" on public.profiles for update using (auth.uid() = id);

create policy "settings are owned by user" on public.user_settings for all using (auth.uid() = user_id);
create policy "sessions are owned by user" on public.typing_sessions for all using (auth.uid() = user_id);
create policy "custom exercises are owned by user" on public.custom_exercises for all using (auth.uid() = user_id);
create policy "achievements are owned by user" on public.user_achievements for all using (auth.uid() = user_id);

create policy "leaderboards are public when clean" on public.leaderboard_entries
  for select using (is_suspicious = false);

create policy "leaderboard entries are owned by user" on public.leaderboard_entries
  for insert with check (auth.uid() = user_id);
