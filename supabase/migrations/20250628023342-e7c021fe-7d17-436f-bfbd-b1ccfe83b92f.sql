
-- Create a policy that allows everyone to read from editable_markdown_files
-- This will enable the homepage to load content for all visitors
CREATE POLICY "Allow public read access to editable_markdown_files"
  ON public.editable_markdown_files
  FOR SELECT
  TO public
  USING (true);
