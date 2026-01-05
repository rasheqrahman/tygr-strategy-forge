
-- Create a table to store the order of services and industries
CREATE TABLE public.content_order (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL,
  type TEXT NOT NULL, -- 'service' or 'industry'
  order_position INTEGER NOT NULL,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (slug, type)
);

-- Enable Row Level Security
ALTER TABLE public.content_order ENABLE ROW LEVEL SECURITY;

-- Allow only admins to manage content order
CREATE POLICY "Allow admins full access to content_order"
  ON public.content_order
  FOR ALL
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE email = auth.jwt() ->> 'email'));
