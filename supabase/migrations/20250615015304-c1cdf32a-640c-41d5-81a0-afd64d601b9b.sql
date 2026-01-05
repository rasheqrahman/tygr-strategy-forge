
-- Create a table to store editable markdown content for each page
CREATE TABLE public.editable_markdown_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL,
  type TEXT NOT NULL, -- Should be one of: blog, service, industry, media
  content TEXT NOT NULL,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (slug, type)
);

-- Enable Row Level Security
ALTER TABLE public.editable_markdown_files ENABLE ROW LEVEL SECURITY;

-- Allow only admins to SELECT, INSERT, UPDATE, and DELETE
CREATE POLICY "Allow admins full access to editable_markdown_files"
  ON public.editable_markdown_files
  FOR ALL
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE email = auth.jwt() ->> 'email'));

