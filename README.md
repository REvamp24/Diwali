# Diwali Lights Showcase

This is a Next.js project for the Revamp GSoC cohort to submit their Diwali celebrations. It uses Supabase for the backend and the GitHub API for tracking pull request merge status.

The application provides a festive, dark-themed interface where users can "light a diya" by submitting their name, a message, and a link to their HTML submission. The grid of diyas updates in real-time.

## Getting Started

### 1. Prerequisites

- Node.js (v18 or later)
- A Supabase account and project
- A GitHub Personal Access Token

### 2. Environment Setup

Create a `.env.local` file in the root of the project and add the following environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
GITHUB_TOKEN=YOUR_GITHUB_PERSONAL_ACCESS_TOKEN
```

- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`: You can find these in your Supabase project's API settings.
- `GITHUB_TOKEN`: A GitHub Personal Access Token with `repo` scope is required to check the status of pull requests.

### 3. Supabase Database Setup

Run the following SQL script in your Supabase project's SQL Editor to create the `diyas` table and enable real-time functionality.

```sql
-- Create the table for storing diya submissions
CREATE TABLE diyas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  message text,
  html_path text NOT NULL UNIQUE,
  pr_url text,
  is_merged boolean DEFAULT false NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE diyas ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
-- Allow anyone to read all diyas
CREATE POLICY "Public read access" ON diyas FOR SELECT USING (true);
-- Allow anyone to insert a new diya
CREATE POLICY "Public insert access" ON diyas FOR INSERT WITH CHECK (true);
-- Allow service_role (server-side) to update diyas
CREATE POLICY "Allow updates for admins" ON diyas FOR UPDATE USING (auth.role() = 'service_role');


-- Enable Realtime on the 'diyas' table
alter publication supabase_realtime add table diyas;
```

### 4. Install Dependencies

Install the project dependencies using npm:

```bash
npm install
```

### 5. Add Sound Asset

Place a sound file named `diya-sound.mp3` inside the `public/assets/` directory. This sound will be played when a new diya is submitted.

### 6. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## How It Works

- **Submission:** Users click "Light Your Diya" to open a modal where they can submit their details. The `html_path` must be unique.
- **Real-time Grid:** The main page displays a grid of all submitted diyas. This grid listens for changes in the Supabase database and updates in real-time.
- **PR Status:** The application periodically checks the status of submitted GitHub Pull Requests. Once a PR is merged, the corresponding diya becomes clickable, opening the student's HTML page.
- **Festive UI:** The app features a dark, festive theme with glowing diyas, particle animations, and sound effects to create an engaging experience.
