-- Create a table to store login events
CREATE TABLE IF NOT EXISTS public.login_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  email text,
  provider text,
  metadata jsonb,
  created_at timestamptz DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.login_events ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to insert a row where user_id equals auth.uid()
CREATE POLICY "Allow authenticated insert for own user_id"
  ON public.login_events
  FOR INSERT
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (user_id::text = auth.uid());