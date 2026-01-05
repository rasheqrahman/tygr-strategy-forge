
-- Enable Row Level Security on admin_users table (safe to run if already enabled)
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone (including unauthenticated users) to select from admin_users
CREATE POLICY "Anyone can select admin user" 
  ON public.admin_users
  FOR SELECT
  USING (true);
