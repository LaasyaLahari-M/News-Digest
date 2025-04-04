/*
  # Create User Preferences Schema

  1. New Tables
    - `user_preferences`
      - `id` (text, primary key) - matches the Nhost auth user ID
      - `categories` (text array) - stores selected news categories
      - `saved_articles` (integer array) - stores IDs of saved articles
      - `read_articles` (integer array) - stores IDs of read articles
      - `created_at` (timestamp with timezone) - when the preferences were created
      - `updated_at` (timestamp with timezone) - when the preferences were last updated

  2. Security
    - Enable RLS on `user_preferences` table
    - Add policies for:
      - Select: Users can read their own preferences
      - Insert: Users can create their own preferences
      - Update: Users can update their own preferences
*/

CREATE TABLE IF NOT EXISTS user_preferences (
  id text PRIMARY KEY,
  categories text[] DEFAULT ARRAY[]::text[],
  saved_articles integer[] DEFAULT ARRAY[]::integer[],
  read_articles integer[] DEFAULT ARRAY[]::integer[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own preferences
CREATE POLICY "Users can read own preferences"
  ON user_preferences
  FOR SELECT
  USING (auth.uid()::text = id);

-- Policy for users to insert their own preferences
CREATE POLICY "Users can insert own preferences"
  ON user_preferences
  FOR INSERT
  WITH CHECK (auth.uid()::text = id);

-- Policy for users to update their own preferences
CREATE POLICY "Users can update own preferences"
  ON user_preferences
  FOR UPDATE
  USING (auth.uid()::text = id);

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update the updated_at column
CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();